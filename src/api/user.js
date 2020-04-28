import request from '@/lib/request'

// 登录 例子
export function loginByusername({ userName, passWord }) {
    return request.post({
        url: '/ops/merchant/login',
        data: { userName, passWord }
    })
}

