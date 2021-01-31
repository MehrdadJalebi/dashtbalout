import Server from '../server'
export default (APP_CONFIG, token, requestInterceptor, responseInterceptor) => {
  return Server({
    baseURL: APP_CONFIG.apiBaseURL,
    token: token,
    requestInterceptor: requestInterceptor,
    responseInterceptor: responseInterceptor
  }, APP_CONFIG.apiJson)
}
