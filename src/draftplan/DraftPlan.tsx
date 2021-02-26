import { useEffect, useRef } from "react"
import './index.css'
import marked from 'marked'
import { useLocation } from "react-router-dom"
const DOC_PATH = 'draftdoc/'

export default function DraftPlan() {
  const divRef = useRef<HTMLDivElement>(null)
  const loction = useLocation<Location>()
  const dpath = DOC_PATH + loction.search.slice(1)
  useEffect(() => {
    const div = divRef.current!
    let innerHTML = '文章不存在！'
    fetch(dpath).then(res => res.text()).then(res => {
      if (res.slice(0, 15).toUpperCase() !== '<!DOCTYPE HTML>') {
        innerHTML = marked(res)
      }
      div.innerHTML = innerHTML
    })
  }, [dpath])
  return (
    <div ref={divRef} className="dp" />
  )
}