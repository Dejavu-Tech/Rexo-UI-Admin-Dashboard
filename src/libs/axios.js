import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
// 可在此处添加标题
// baseURL:'https://some-domain.com/api/', 网址
// timeout：1000，超时
// headers：{'Custom-Header'：'Rexo'} 标题
})

Vue.prototype.$http = axiosIns

export default axiosIns
