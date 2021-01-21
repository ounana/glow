declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: undefined | Function

  ClipperLib: any
}

declare module 'wangeditor' {
  export default class E {
    constructor(toolbar: string, content: string)
    constructor(root: string)
    create(): void
    txt: {
      html(def?: string): string
    }
  }
}

declare module 'highlight.js/lib/highlight' {
  function registerLanguage(lang: string, mol: module)
  function highlightBlock(el: HTMLElement)
}

declare module 'highlight.js/lib/languages/typescript'