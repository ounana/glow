# rxjs

## rxjs/operators

debounceTime ->
```
/**
 * debounceTime<T>(
 *  dueTime: number, 
 *  scheduler: SchedulerLike = async
 * ): MonoTypeOperatorFunction<T>
 * 防抖，延迟发射，忽略后续值
 * 特定时间跨度而没有其他源发射，从源Observable发出值
 */
```

delay ->
```
/**
 * delay<T>(
 *  delay: number | Date, 
 *  scheduler: SchedulerLike = async
 * ): MonoTypeOperatorFunction<T>
 * 延迟发射
 */
```

throttleTime ->
```
/**
 * throttleTime<T>(
 *  duration: number, 
 *  scheduler: SchedulerLike = async, 
 *  config: ThrottleConfig = defaultThrottleConfig
 * ): MonoTypeOperatorFunction<T>
 * 节流，从源Observable发出一个值，忽略后续毫秒内值，然后重复此过程
 */
```