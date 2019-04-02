/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface SiblingRoot {}
  interface SiblingRootAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'SiblingRoot': Components.SiblingRoot;
  }

  interface StencilIntrinsicElements {
    'sibling-root': Components.SiblingRootAttributes;
  }


  interface HTMLSiblingRootElement extends Components.SiblingRoot, HTMLStencilElement {}
  var HTMLSiblingRootElement: {
    prototype: HTMLSiblingRootElement;
    new (): HTMLSiblingRootElement;
  };

  interface HTMLElementTagNameMap {
    'sibling-root': HTMLSiblingRootElement
  }

  interface ElementTagNameMap {
    'sibling-root': HTMLSiblingRootElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
