import { loginByusername } from '@/api/user'

export default {
    state: {
        token: '',
        details: {}
    },
    getters: {
        isLogin(state) {
            return !!state.token
        }
    },
    mutations: {
        login(state, { token, details }) {
            state.token = token
            state.details = details
        }
    },
    actions: {
        // 登录
        async login({ dispatch, commit, state }, { userName, passWord }) {
            let res = await loginByusername({ userName, passWord })
            if (res.code == 200) {
                let data = res.data
                commit('login', {
                    token: data.token,
                    details: {
                        userid: data.id,
                        phone: data.phone,
                        merchant: data.merchant,
                        type: data.type, // type 1商户  2门店
                        merchant_name: data.merchant_name,
                        real_name: data.real_name,
                        store_name: data.store_name
                    }
                })
            }

            return res
        },
        // 登出
        loginOut({ dispatch, commit, state }){
            commit('login', {
                token: '',
                details: {
                    
                }
            })
            uni.redirectTo({
                url: '/pages/login/index'
            })
        }
    }
}
