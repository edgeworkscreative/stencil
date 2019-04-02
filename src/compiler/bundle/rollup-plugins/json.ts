import * as d from '../../../declarations';


export default function bundleJson(config: d.Config) {
  const path = config.sys.path;

  const collectionDirs = (config.outputTargets as d.OutputTargetDist[]).filter(o => o.collectionDir).map(o => o.collectionDir);

  return {
    name: 'json',

    resolveId(importee: string, importer: string): any {
      if (typeof importer === 'string' && importee.endsWith('.json')) {
        const collectionDir = collectionDirs.find(cd => importer.startsWith(cd));

        if (collectionDir) {
          return path.resolve(
            path.dirname(importer).replace(collectionDir, config.srcDir),
            importee
          );
        }
      }

      return null;
    },

    transform(json: string, id: string) {
      if (typeof id !== 'string') return null;
      if (/\0/.test(id)) return null;
      if (id.slice(-5) !== '.json') return null;

      const data = JSON.parse(json);
      let code = '';

      const ast: ASTNode = {
        type: 'Program',
        sourceType: 'module',
        start: 0,
        end: null,
        body: []
      };

      if (Object.prototype.toString.call(data) !== '[object Object]') {
        code = `export default ${json};`;

        ast.body.push({
          type: 'ExportDefaultDeclaration',
          start: 0,
          end: code.length,
          declaration: {
            type: 'Literal',
            start: 15,
            end: code.length - 1,
            value: null,
            raw: 'null'
          }
        });
      } else {
        const indent = '\t';

        const validKeys: string[] = [];
        const invalidKeys: string[] = [];

        Object.keys(data).forEach(key => {
          if (key === makeLegalIdentifier(key)) {
            validKeys.push(key);
          } else {
            invalidKeys.push(key);
          }
        });

        let char = 0;

        validKeys.forEach(key => {
          const declarationType = 'const';
          const declaration = `export ${declarationType} ${key} = ${JSON.stringify(data[key])};`;

          const start = char;
          const end = start + declaration.length;

          // generate fake AST node while we're here
          ast.body.push({
            type: 'ExportNamedDeclaration',
            start: char,
            end: char + declaration.length,
            declaration: {
              type: 'VariableDeclaration',
              start: start + 7, // 'export '.length
              end,
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: start + 7 + declarationType.length + 1, // `export ${declarationType} `.length
                  end: end - 1,
                  id: {
                    type: 'Identifier',
                    start: start + 7 + declarationType.length + 1, // `export ${declarationType} `.length
                    end: start + 7 + declarationType.length + 1 + key.length, // `export ${declarationType} ${key}`.length
                    name: key
                  },
                  init: {
                    type: 'Literal',
                    start: start +
                      7 +
                      declarationType.length +
                      1 +
                      key.length +
                      3, // `export ${declarationType} ${key} = `.length
                    end: end - 1,
                    value: null,
                    raw: 'null'
                  }
                }
              ],
              kind: declarationType
            },
            specifiers: [],
            source: null
          });

          char = end + 1;
          code += `${declaration}\n`;
        });

        const defaultExportNode: ASTNode = {
          type: 'ExportDefaultDeclaration',
          start: char,
          end: null,
          declaration: {
            type: 'ObjectExpression',
            start: char + 15,
            end: null,
            properties: []
          }
        };

        char += 17 + indent.length; // 'export default {\n\t'.length'

        const defaultExportRows = validKeys
          .map(key => {
            const row = `${key}: ${key}`;

            const start = char;
            const end = start + row.length;

            defaultExportNode.declaration.properties.push({
              type: 'Property',
              start,
              end,
              method: false,
              shorthand: false,
              computed: false,
              key: {
                type: 'Identifier',
                start,
                end: start + key.length,
                name: key
              },
              value: {
                type: 'Identifier',
                start: start + key.length + 2,
                end,
                name: key
              },
              kind: 'init'
            });

            char += row.length + (2 + indent.length); // ',\n\t'.length

            return row;
          })
          .concat(
            invalidKeys.map(key => `"${key}": ${JSON.stringify(data[key])}`)
          );

        code += `export default {\n${indent}${defaultExportRows.join(`,\n${indent}`)}\n};`;
        ast.body.push(defaultExportNode);

        const end = code.length;

        defaultExportNode.declaration.end = end - 1;
        defaultExportNode.end = end;
      }

      ast.end = code.length;

      return { ast, code, map: { mappings: '' } };
    }
  };
}

const reservedWords = 'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public'.split(
  ' '
);
const builtins = 'arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl'.split(
  ' '
);

const blacklisted: { [key: string]: boolean } = Object.create(null);
reservedWords.concat(builtins).forEach(word => (blacklisted[word] = true));

function makeLegalIdentifier(str: string): string {
  str = str.replace(/-(\w)/g, (_, letter) => letter.toUpperCase()).replace(/[^$_a-zA-Z0-9]/g, '_');

  if (/\d/.test(str[0]) || blacklisted[str]) str = `_${str}`;

  return str;
}

export interface Options {
  indent?: string;
  preferConst?: boolean;
  include?: any;
  exclude?: any;
}

export interface ASTNode {
  type: string;
  sourceType?: string;
  start: number | null;
  end: number | null;
  body?: any[];
  declaration?: any;
}
