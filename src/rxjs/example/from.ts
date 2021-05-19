/**
 * from<T>(
 * input: ObservableInput<T>, scheduler?: SchedulerLike
 * ): Observable<T>
 * 
 * 从Array，类似数组的对象，Promise，可迭代对象
 * 创建发射源
 * 
 */

import { from } from 'rxjs'
import { take } from 'rxjs/operators'

// from([1,2,3]).subscribe(x=>console.log(x))

function* generateDoubles(seed: number) {
  let i = seed
  while (true) {
    yield i
    i *= 2
  }
}
const iterator = generateDoubles(3)
from(iterator).pipe(
  take(10)
).subscribe(x => console.log(x))