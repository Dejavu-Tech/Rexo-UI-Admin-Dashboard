export default {
  // 端点路由
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // 授权头中以 Bearer <token> 作为前缀
  tokenType: 'Bearer',

  // 下列属性值将用作存储 JWT token 的密钥
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
