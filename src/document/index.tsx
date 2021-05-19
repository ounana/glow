import { useEffect, useRef } from "react"
import './index.css'
import marked from 'marked'
import { useLocation } from "react-router-dom"
const DOC_PATH = '/document/'

export default function Document() {
  const divRef = useRef<HTMLDivElement>(null)
  const loction = useLocation<Location>()
  const search = loction.search.slice(1) || 'git.md'
  useEffect(() => {
    const div = divRef.current!
    let innerHTML = '文章不存在！'
    fetch(DOC_PATH + search).then(res => res.text()).then(res => {
      if (res.slice(0, 15).toUpperCase() !== '<!DOCTYPE HTML>') {
        innerHTML = marked(res)
      }
      div.innerHTML = innerHTML
    })
  }, [search])
  return (
    <div ref={divRef} className="dp" />
  )
}