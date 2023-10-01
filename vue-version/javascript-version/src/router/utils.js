/**
 * @isUserLoggedIn 该函数返回用户是否已登录
 * 模板中使用 jwt 和 mock 模拟数据以本地方式存储 token
 * 开发中请结合实际情况决定使用何种 token 存储方式
 * 如果使用 cookie 来存储，请根据实际情况修改此函数
 * 例如：export const isUserLoggedIn = () => !!getCookie('userData') && !!getCookie('accessToken');
 * 以上例子中使用名为 getCookie 函数获取 Cookie 值，需根据具体实现来编写 getCookie 函数并修改 /src/@fake-db/jwt/index 文件
 */
export const isUserLoggedIn = () => !!(localStorage.getItem('userData') && localStorage.getItem('accessToken'))
