/**
 * 获取cookie
 * @param key 
 */
export function getCookie(key: string) {
  const reg = new RegExp("(^| )" + encodeURI(key) + "=([^;]*)(;|$)")
  const res = document.cookie.match(reg)
  return res ? decodeURI(res[2]) : null
}

export interface Cookie {
  key: string
  value: string
  day?: number
  path?: string
}

/**
 * 设置cookie
 * 删除cookie 设置时间为0
 * @param o 
 */
export function setCookie(o: Cookie) {
  const { key, value, day = 1, path = '/' } = o
  const time = Date.now() + day * 24 * 60 * 60 * 1000
  const expires = 'expires=' + new Date(time).toUTCString()
  const kv = encodeURI(key) + '=' + encodeURI(value)
  document.cookie = kv + '; ' + expires + '; path=' + path
}