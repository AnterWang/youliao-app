<template>
    <view class="page-wrapper">
        <view>尽请期待</view>
    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import {
    wenzhangDetail
} from '@/api/all';
export default {
    data () {
        return {
            con: ''
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news']),
    },
    onLoad () {
        wenzhangDetail('9716101').then(res=>{
            if(res.code === 200){
                this.con = res.data.body
            }
        })
    },
    onShareAppMessage (res) {

    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: 100vh;
    position: relative;
    background-color: #ffffff;
}
</style>
