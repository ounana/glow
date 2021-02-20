import { useEffect, useRef } from "react"
import './index.css'
import marked from 'marked'

export default function DraftPlan() {
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const div = divRef.current!
    fetch('/draftdoc/matrix.md'
    ).then(res => res.text()).then(res => {
      div.innerHTML = marked(res)
    })
  })
  return (
    <div ref={divRef} className="dp">
      Matrix Words
    </div>
  )
}