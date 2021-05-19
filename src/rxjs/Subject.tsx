import React, { useEffect } from 'react'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { Input } from 'antd'
/**
 * Subject 多播
 * 多数据源发射到一处
 */

const subject = new Subject()
export default function RxSubject() {
  useEffect(() => {
    const observable = subject.pipe(
      debounceTime(1000)
    )
    const subscription = observable.subscribe(search => {
      console.log('发送请求')
      console.log(search)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    const { value: v } = e.target
    subject.next(v)
  }
  return (
    <>
      <h1>RxSubject</h1>
      <Input onChange={change} />
      <Input onChange={change} />
    </>
  )
}