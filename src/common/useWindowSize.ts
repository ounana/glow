import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'

interface WindowSize {
  innerHeight: number
  innerWidth: number
  outerHeight: number
  outerWidth: number
}

function getSize(): WindowSize {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  }
}

export default function useWindowSize(): WindowSize {
  let [windowSize, setWindowSize] = useState(getSize())
  useEffect(() => {
    const observable = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map(e => getSize())
    )
    const subscription = observable.subscribe(v => setWindowSize(v))
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return windowSize;
}