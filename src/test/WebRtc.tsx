import { Button, Divider } from "antd";
import { createRef, PureComponent } from "react";

export default class WebRtc extends PureComponent {
  audioBoxRef = createRef<HTMLDivElement>()
  canvasRef = createRef<HTMLCanvasElement>()
  mediaRecorder: any
  mediaStream: MediaStream | null = null

  analyser: AnalyserNode | null = null
  dataArray: Uint8Array = new Uint8Array(1024) // 长度为 this.analyser.frequencyBinCount
  state = {
    recorderState: 'inactive'
  }
  componentDidMount() {
    this.getMediaStream()
  }

  drawNextFrame = () => {
    if (!this.analyser) return
    requestAnimationFrame(this.drawNextFrame)
    const dataArray = this.dataArray
    const bufferLength = dataArray.length
    const canvas = this.canvasRef.current!
    const ctx = canvas.getContext('2d')!
    //复制当前波形或时域数据到buffer
    this.analyser.getByteTimeDomainData(dataArray)
    const [WIDTH, HEIGHT] = [400, 50]
    canvas.width = WIDTH
    canvas.height = HEIGHT
    ctx.fillStyle = 'rgb(200, 200, 200)'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgb(0, 0, 0)'
    ctx.beginPath()
    let sliceWidth = WIDTH * 1.0 / bufferLength
    let x = 0
    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0
      let y = v * HEIGHT / 2
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
      x += sliceWidth
    }
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()
  }

  getMediaStream() {
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(stream => {
      this.mediaStream = stream
      this.mediaRecorder = new window.MediaRecorder(stream)
      this.mediaRecorder.ondataavailable = this.onDataAvailable

      const audioCtx = new AudioContext()
      //创建一个新的媒体流节点
      const source = audioCtx.createMediaStreamSource(stream)
      //实时频域和时域信息节点
      this.analyser = new AnalyserNode(audioCtx)
      source.connect(this.analyser)
      this.drawNextFrame()

    }).catch(err => {
      console.log(err)
    })
  }
  onDataAvailable = (evt: any) => {
    console.log(evt.data)
    const audicBox = this.audioBoxRef.current!
    const audio = document.createElement('audio')
    audio.controls = true
    // const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' })
    const audioURL = window.URL.createObjectURL(evt.data)
    audio.src = audioURL
    audicBox.appendChild(audio)
  }
  onRecordClick = () => {
    if (this.mediaRecorder.state === 'inactive') {
      this.mediaRecorder.start()
      this.setState({ ...this.state, recorderState: 'recording' })
    }
  }
  onStopClick = () => {
    if (this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop()
      this.setState({ ...this.state, recorderState: 'inactive' })
    }
  }
  onPausedClick = () => {
    const state = this.mediaRecorder.state
    //暂停
    if (state === 'recording') {
      this.mediaRecorder.pause()
      this.setState({ ...this.state, recorderState: 'paused' })
    }
    //继续
    if (state === 'paused') {
      this.mediaRecorder.resume()
      this.setState({ ...this.state, recorderState: 'recording' })
    }
  }
  getColor = (recorderState: string) => {
    switch (recorderState) {
      case 'recording':
        return 'rgb(255, 0, 0)'
      case 'inactive':
        return 'rgb(10, 10, 10)'
      case 'paused':
        return 'rgb(35, 116, 15)'
    }
  }
  render() {
    return (
      <div>
        <h1>Web RTC {this.state.recorderState}</h1>
        <canvas ref={this.canvasRef} />
        <Divider />
        <div style={{
          display: 'inline-block', verticalAlign: 'top', marginRight: '10px',
          width: 32, height: 32, borderRadius: '50%',
          background: this.getColor(this.state.recorderState),
        }} />
        <Button onClick={this.onRecordClick}>RECORD</Button>
        <Button onClick={this.onStopClick}>STOP</Button>
        <Button onClick={this.onPausedClick}>PAUSED</Button>
        <div ref={this.audioBoxRef} />
      </div>
    )
  }
}