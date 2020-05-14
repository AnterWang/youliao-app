import {
    newsClass
} from '@/api/all';

export default {
    state: {
        classData: [], // 509财经 510科技 512时尚 513nba 514股票
    },
    mutations: {
        updateClass(state, details) {
            state.classData = details
        }
    },
    actions: {
        async updateClass({ dispatch, commit, state }) {
            let res = await newsClass()
            if (res.code === 1) {
                let data = res.data
                let arr = []
                data.map(item=>{
                    if(item.typeName.indexOf('视频') === -1){
                        arr.push(item)
                    }
                })
                commit('updateClass', arr)
            }

            return res
        }
    }
}
