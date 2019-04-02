import * as d from '../../declarations';
import { getGlobalFileName, getRegistryFileName } from '../app/app-file-naming';
import { HOST_CONFIG_FILENAME } from '../prerender/host-config';


export function validateServiceWorker(config: d.Config, outputTarget: d.OutputTargetWww) {
  if (config.devMode && !config.flags.serviceWorker) {
    outputTarget.serviceWorker = null;
    return;
  }

  if (outputTarget.serviceWorker === null) {
    outputTarget.serviceWorker = null;
    return;
  }

  if (!outputTarget.serviceWorker && outputTarget.type !== 'www') {
    outputTarget.serviceWorker = null;
    return;
  }

  if (!outputTarget.serviceWorker && config.devMode) {
    outputTarget.serviceWorker = null;
    return;
  }

  if (typeof outputTarget.serviceWorker !== 'object') {
    // what was passed in could have been a boolean
    // in that case let's just turn it into an empty obj so Object.assign doesn't crash
    outputTarget.serviceWorker = {workbox: {}};
  }

  if (typeof outputTarget.serviceWorker.workbox !== 'object') {
    outputTarget.serviceWorker.workbox = {};
  }

  if (!Array.isArray(outputTarget.serviceWorker.workbox.globPatterns)) {
    if (typeof outputTarget.serviceWorker.workbox.globPatterns === 'string') {
      outputTarget.serviceWorker.workbox.globPatterns = [outputTarget.serviceWorker.workbox.globPatterns];

    } else if (typeof outputTarget.serviceWorker.workbox.globPatterns !== 'string') {
      outputTarget.serviceWorker.workbox.globPatterns = [DEFAULT_GLOB_PATTERNS];
    }
  }

  if (typeof outputTarget.serviceWorker.workbox.globDirectory !== 'string') {
    outputTarget.serviceWorker.workbox.globDirectory = outputTarget.dir;
  }

  if (typeof outputTarget.serviceWorker.workbox.globIgnores === 'string') {
    outputTarget.serviceWorker.workbox.globIgnores = [outputTarget.serviceWorker.workbox.globIgnores];
  }

  outputTarget.serviceWorker.workbox.globIgnores = outputTarget.serviceWorker.workbox.globIgnores || [];

  addGlobIgnores(config, outputTarget.serviceWorker.workbox.globIgnores);

  if (!outputTarget.serviceWorker.workbox.swDest) {
    outputTarget.serviceWorker.workbox.swDest = config.sys.path.join(outputTarget.dir, DEFAULT_FILENAME);
  }

  if (!config.sys.path.isAbsolute(outputTarget.serviceWorker.workbox.swDest)) {
    outputTarget.serviceWorker.workbox.swDest = config.sys.path.join(outputTarget.dir, outputTarget.serviceWorker.workbox.swDest);
  }
}


function addGlobIgnores(config: d.Config, globIgnores: string[]) {
  const appRegistry = `**/${getRegistryFileName(config)}`;
  globIgnores.push(appRegistry);

  const appGlobal = `**/${getGlobalFileName(config)}`;
  globIgnores.push(appGlobal);

  const hostConfigJson = `**/${HOST_CONFIG_FILENAME}`;
  globIgnores.push(hostConfigJson);
}


const DEFAULT_GLOB_PATTERNS = '**/*.{js,css,json,html}';
const DEFAULT_FILENAME = 'sw.js';
