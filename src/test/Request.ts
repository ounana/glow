interface Request {
	type?: 'GET' | 'POST'
	headers?: { [key: string]: string }
	params?: { [key: string]: string }
	body?: Document | BodyInit | null
	timeout?: number
	getXhr?: (xhr: XMLHttpRequest) => void
	responseType?: XMLHttpRequestResponseType
	onprogress?: (evt: ProgressEvent<EventTarget>) => void
}

/**
 * 原生ajax
 * post数据 需要给一个Content-type
 * application/x-www-form-urlencoded
 * multipart/form-data
 * @param url 
 * @param opt 
 */
export function request(url: string, opt: Request) {
	const {
		type = 'GET', headers, params, timeout,
		getXhr, responseType, body, onprogress
	} = opt
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		//处理get请求
		if (type === 'GET' && params) {
			const paramList = []
			for (let key in opt.params) {
				paramList.push(key + '=' + opt.params[key])
			}
			url += '?' + paramList.join('&')
		}
		xhr.open(type, url)
		//设置超时
		xhr.timeout = timeout ?? 0
		//设置返回类型
		xhr.responseType = responseType ?? ''
		//上传进度
		xhr.upload.onprogress = onprogress ?? null
		//设置请求头
		if (headers) {
			for (let key in headers) {
				xhr.setRequestHeader(key, headers[key])
			}
		}
		xhr.send(body)
		//监听响应
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				const { responseURL, status, statusText, response } = xhr
				switch (status) {
					case 0:
						return reject({ url: responseURL, status, statusText: '请求超时' })
					case 200:
					case 206:
						return resolve(response)
					default:
						return reject({ url: responseURL, status, statusText })
				}
			}
		}
		//把xhr抛出去，以便可以取消请求
		if (getXhr) getXhr(xhr)
	})
}

/**
 * jsonp跨域 支持超时
 * @param url 
 * @param opt 
 */
export function jsonp(url: string, opt: Request) {
	return new Promise((resolve, reject) => {
		let { params, timeout = 5000 } = opt
		const callback = 'JSONP_CALLBACK_' + Date.now()
		const s = document.createElement('script')
		const body = document.getElementsByTagName('body')[0];
		let windowThis = window as any;
		windowThis[callback] = function (data: any) {
			resolve(data)
			body.removeChild(s)
			delete windowThis[callback]
			clearTimeout(timerId)
		}
		s.src += url + '?' + 'callback=' + callback
		s.async = true
		if (params) {
			let arr = []
			for (let key in params) arr.push(key + '=' + params[key])
			s.src += '&' + arr.join('&')
		}
		body.appendChild(s)
		s.onerror = function (err) {
			reject(err)
			body.removeChild(s)
			delete windowThis[callback]
			clearTimeout(timerId)
		}
		const timerId = setTimeout(() => {
			resolve(`Request Timeout, By ${timeout / 1000}s`)
			body.removeChild(s)
			delete windowThis[callback]
			windowThis[callback] = function () {
				delete windowThis[callback]
			}
		}, timeout)
	})
}

/**
 * 返回css当前属性
 * @param {string} ele 节点
 * @param {string} attr 属性
 */
export function getStyle(ele: Element, attr: keyof CSSStyleDeclaration) {
  return window.getComputedStyle(ele, null)[attr]
}

/**
 * 冒泡排序
 * @param arr 
 */
export function arrSort(arr: number[]) {
  let k = arr.length
  while (k > 0) {
    for (let i = 0; i < arr.length - 1; i++) {
      //如果相邻第一个数大于第二个数，就替换位置
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
    k--
  }
  return arr
}
