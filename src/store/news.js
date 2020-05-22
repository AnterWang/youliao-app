import {
    newsClass
} from '@/api/all';

export default {
    state: {
        classData: [], // 509财经 510科技 512时尚 513nba 514股票
        video: {}, // 新闻视频信息 解决url参数过长
    },
    mutations: {
        updateClass (state, details) {
            state.classData = details
        },
        updateVideo (state, video) {
            state.video = video
        }
    },
    actions: {
        async updateClass ({ dispatch, commit, state }) {
            let res = await newsClass()
            if (res.code === 1) {
                let data = res.data
                let arr = []
                data.map(item => {
                    if (item.typeName.indexOf('视频') === -1) {
                        arr.push(item)
                    }
                })
                commit('updateClass', arr)
            }

            return res
        },
        updateVideo ({ dispatch, commit, state }, obj) {
            commit('updateVideo', obj)
            return 'ok'
        }
    }
}
