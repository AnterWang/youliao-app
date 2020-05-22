import config from '@/config/base.config'
import store from '@/store/index'

class Request {

    constructor() {
        this.genRequestMethod();
    }

    /**
     * 处理参数
     * @param {*} url
     * @param {*} options
     * @param {*} data
     */
    _handleParams(options) {
        let header = options.header || {}, rest = options.data || {}, full_url = options.url, { user } = store.state

        if (!/http|https/.test(full_url)) {
            full_url = `${config.path ? config.path : ''}${full_url}`
        }

        let params = {
            url: full_url,
            timeout: 10 * 1000,
            header: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `${user.token || ''}`,
                'type': config.type,
                // 'WISE-CI': config.wise_ci,
                // 'WISE-FROM': config.wise_from,
                ...header,
            },
            data: rest
        };

        if (!user.token || config.whiteList.indexOf(options.url) > -1) {
            delete params.header.Authorization;
        }

        return params;
    }

    /**
     * 处理返回结果
     * @param {*} res
     * @param {*} resolve
     * @param {*} reject
     */
    _handleResult(res, resolve, reject) {
        //防止后端返回的是一个字符串
        if (typeof res.data === 'string') {
            try {
                res.data = JSON.parse(res.data);
            } catch (err) {
                res.data = {}
            }
        }

        if (res.statusCode === 200 && (parseFloat(res.data.code) === 1 || parseFloat(res.data.code) === 200)) {
            resolve({ ...res.data, code: parseFloat(res.data.code) });
        } else if (res.statusCode === 200 && (parseFloat(res.data.code) !== 1 || parseFloat(res.data.code) !== 200)) {
            uni.showToast({ title: res.data.msg, icon: 'none', duration: 1500 });
            resolve({ ...res.data, code: parseFloat(res.data.code) });
        } else if (res.statusCode !== 200) {
            if (res.statusCode === 401) {
                uni.showToast({ title: '登录状态过期，请重新登录', icon: 'none' });
                uni.redirectTo({
                    url: '/pages/login/index'
                });
                reject({
                    code: '401',
                    msg: '登录状态过期，请重新登录'
                })
            } else {
                uni.showToast({ title: '服务器异常', icon: 'none' });
                reject({
                    code: '1000000',
                    msg: '服务器异常'
                })
            }

        }
    }

    /**
     * 生成请求方法
     */
    genRequestMethod() {
        ['get', 'post', 'delete', 'put'].forEach(methodName => {
            this[methodName] = (options) => {
                return new Promise((resolve, reject) => {
                    let params = this._handleParams(options);
                    params.method = methodName.toUpperCase();

                    uni.request(params)
                        .then(res => {
                            uni.hideLoading()
                            this._handleResult(res, resolve, reject);
                        })
                        .catch(err => {
                            uni.hideLoading()
                            uni.showToast({
                                title: '服务器异常',
                                icon: 'none',
                                duration: 2000
                            })
                            reject({
                                code: '1000000',
                                msg: '服务器异常',
                                err
                            })
                        })
                })
            }
        })
    }

    /**
     * 上传文件
     */
    upload(options) {
        let params = this._handleParams(options);
        return new Promise((resolve, reject) => {
            uni.uploadFile(params)
                .then(res => {
                    this._handleResult(res, resolve, reject);
                })
                .catch(err => {
                    console.error(err)
                    reject({
                        errorCode: '1000000',
                        errorMsg: '服务器异常'
                    })
                })
        })
    }
}

export default new Request();
