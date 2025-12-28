/**
 * Created by yishide on 16/7/18.
 */

const config = {
  env: process.env.NODE_ENV,
  PROJECT: 'dpzvc3',
  VERSION: '3.0',
  doc_title: '',
  baseUrl: '',
  isIPad: /ipad/i.test(window.navigator.userAgent),
  isIphone: /iphone|ipad|ipod/i.test(window.navigator.userAgent),
  isWechat: /MicroMessenger/i.test(window.navigator.userAgent),
  isUCBrowser: /UCWEB|UCBrowser/i.test(window.navigator.userAgent)
}
export default config
