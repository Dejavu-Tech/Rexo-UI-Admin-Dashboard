import axios from 'axios'
import router from '@/router'

// 创建 Axios 实例
const axiosIns = axios.create({
// 根据实际开发需求定制以下 axios 配置
// baseURL: 'https://www.example.com/api/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
})

// Axios 请求拦截器
// ℹ️ 实际开发中建议在登录之后后的每个后续请求中都添加授权头的请求拦截器
axiosIns.interceptors.request.use(config => {
  // 从本地存储中获取 token
  const token = localStorage.getItem('accessToken')
  if (token) {
    // 获取请求头并在未定义时分配一个空对象
    config.headers = config.headers || {}

    // 设置授权头 并将 token 转换为字符串
    config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : ''
  }

  // 返回修改后的配置
  return config
})

// ℹ️ 添加 Axios 响应拦截器来处理 401 响应错误
axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  // 处理 401 错误
  if (error.response.status === 401) {
    // ℹ️ 注销用户并重定向到登录页
    // 从本地存储移除用户数据
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userAbilities')

    // 如果从 API 返回 401，则导航至登录页
    router.push('/login')
  }
  else {
    return Promise.reject(error)
  }
})
export default axiosIns
