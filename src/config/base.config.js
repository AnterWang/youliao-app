let common = {
	supportWxSDKVersion: '2.1.0',
	// 商户类型
    type: 'merchant',
	whiteList: [

	]
}

let config = {
	development: {
		...common,
		// 正式地址
		// path: 'https://saas-api.miyapay.com',
		// wxAuthH5: 'https://hh-oss-html.miyapay.com/saas/prod/wx_pay_auth/index.html',

		// 测试地址
		// path: 'https://hhsaas-test.miyapay.com/api',
		// wxAuthH5: 'https://hh-oss-html.miyapay.com/saas/testing/wx_pay_auth/index.html',

		// 开发地址
		path: '',
		// wxAuthH5: 'https://hh-oss-html.miyapay.com/saas/testing/wx_pay_auth/index.html',

	},
	production: {
		...common,
		// 正式地址
		path: 'https://saas-api.miyapay.com',
		// wxAuthH5: 'https://hh-oss-html.miyapay.com/saas/prod/wx_pay_auth/index.html',
	}
}

module.exports = config[process.env.NODE_ENV]
