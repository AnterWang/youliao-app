import {
    newsClass
} from '@/api/all';

export default {
    state: {
        // classData: [521,525], // 默认
        classData: [509,510,512,513,514,515,516,519,520], // 509财经 510科技 512时尚 513nba 514股票
    },
    mutations: {
        updateClass(state, details) {
            state.classData = details
        }
    },
    actions: {
        // async updateClass({ dispatch, commit, state }) {
        //     let res = await newsClass()
        //     if (res.code === 1) {
        //         let data = res.data
        //         let arr = []
        //         data.map(item=>{
        //             if(item.typeName.indexOf('视频') === -1 && item.typeId !== 521){
        //                 arr.unshift(item.typeId)
        //             }
        //         })
        //         arr.unshift(521)
        //         commit('updateClass', arr)
        //     }

        //     return res
        // }
    }
}
