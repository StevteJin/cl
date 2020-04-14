/**
 * 检测是否在微信打开
 */
function is_weixin() {
  return /MicroMessenger/i.test(navigator.userAgent)
}

function getUrlKey(name) {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.href
      ) || [, ''])[1].replace(/\+/g, '%20')
    ) || ''
  )
}


export { is_weixin, getUrlKey }
