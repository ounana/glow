export default 2

// import axios from 'axios'

// export const service = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   timeout: 3000
// })

// service.interceptors.request.use(config => {
//   const AUTH_TOKEN = sessionStorage.getItem('token')
//   config.headers['Authorization'] = AUTH_TOKEN
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// service.interceptors.response.use(response => {
//   const { data } = response
//   return data
// }, error => {
//   const { code, response, message } = error
//   if (code === 'ECONNABORTED' && message.includes('timeout')) {
//     console.error('请求超时')
//   }
//   if (response) {
//     console.error(message)
//   }
//   return Promise.reject(error)
// })