export default class Utils {
  private static ins: Utils | null = null
  private constructor() { }
  static get instance() {
    if (!this.ins) {
      this.ins = new Utils()
    }
    return this.ins
  }
  loadImage(url: string, call: (image: HTMLImageElement) => void) {
    const image = new Image()
    image.src = url
    image.onload = () => {
      call(image)
    }
  }
  playAudio(url: string) {
    const audio = document.createElement('audio')
    audio.volume = 0.3
    audio.src = url
    audio.autoplay = true
  }
}
