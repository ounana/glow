import { useEffect } from "react"

export default function WebEditor() {
  function select(el:string): HTMLElement  {
    return document.getElementById(el)!
  }
  useEffect(() => {
    select('btn').addEventListener('click', function (e) {
      console.log(select('#content').innerHTML)
    })
    select('bold').addEventListener('click', function (e) {
      document.execCommand('Bold', false)
    })
    select('fontsize').addEventListener('click', function (e) {
      document.execCommand('FontSize', false, '5')
    })
    select('bgcolor').addEventListener('click', function (e) {
      document.execCommand('BackColor', false, '#ccc')
    })
    select('color').addEventListener('click', function (e) {
      document.execCommand('ForeColor', false, '#fff')
    })
    select('line').addEventListener('click', function (e) {
      document.execCommand('Underline', false)
    })
  }, [])
  return (
    <div>
      <div style={{
        width: 600,
        height: 300,
        border: '1px solid #e2e2e2',
        padding: '5px',
        overflow: 'auto'
      }} id="content" contentEditable="true">
        <p><br /></p>
      </div>
      <button id="btn">提交</button>
      <button id="bold">加粗</button>
      <button id="fontsize">字号</button>
      <button id="bgcolor">背景</button>
      <button id="color">字体颜色</button>
      <button id="line">下划线</button>
    </div>
  )
}