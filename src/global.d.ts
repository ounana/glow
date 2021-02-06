declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: undefined | Function

  ClipperLib: any,

  MediaRecorder: any
}

declare module 'highlight.js/lib/highlight' {
  function registerLanguage(lang: string, mol: module)
  function highlightBlock(el: HTMLElement)
}

declare module 'highlight.js/lib/languages/typescript'