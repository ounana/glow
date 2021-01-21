import React, { useEffect } from 'react'
import { Observable } from 'rxjs'

export default function RxObservable() {
  useEffect(() => {
    let obs = new Observable<number>(sbr => {
      sbr.next(1)
      sbr.next(2)
      sbr.next(3)
      setTimeout(() => {
        sbr.next(4)
        sbr.complete()
      }, 1000)
    })
    const subscription = obs.subscribe({
      next(v) { console.log(v) },
      error(e) { console.log(e) },
      complete() {
        console.log('done')
        subscription.unsubscribe()
      }
    })

  }, [])

  return (
    <div>
      <h1>RxObservable</h1>
    </div>
  )
}