// let domain = process.env.NODE_ENV === 'development' ? 'gcox.dev.koall.io' : location.host.split(':')[0]
// let domain = process.env.NODE_ENV === 'development' ? 'sit.gcox.cc' : location.host.split(':')[0]
// let domain = process.env.NODE_ENV === 'development' ? 'gcox.com' : location.host.split(':')[0]
let domain = process.env.NODE_ENV === 'development' ? 'ws-exchange.gcox.com' : location.host.split(':')[0]
// let domain = process.env.NODE_ENV === 'development' ? 'exchange-staging.gcox.com' : location.host.split(':')[0]
if (process.env.VUE_APP_BASEURL) {
  domain = process.env.VUE_APP_BASEURL
}
let https = window.location.protocol === 'https:'?true:false
if (process.env.VUE_APP_HTTPS==='true') {
  https = true
}
const protocol = window.location.protocol === 'https:' || https ? 'wss://': 'ws://'
const http = window.location.protocol === 'https:' || https ? 'https://' : 'http://'
const config = {
  domain: domain,
  imageType: /\.(jpg|png|jpeg|bmp)/i,
  http: http,
  url: `${http}${domain}`,
  protocol: protocol,
  brand: 'GCOX',
  version:'1.1.1',
  updateInfo:{  //更新日志
  	'zh-CN':`
	<p>1. 优化市场显示</p>
	`,
	'en':`
	<p>1. Optimize market display</p>
	`,
	'kr':`
	<p>1. 최적화 시장 디스플레이</p>
	`
  }
}

export default config
