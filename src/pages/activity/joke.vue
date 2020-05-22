<template>
    <view class="page-wrapper">
        <view class="cu-timeline">
            <view class="cu-time" style="width:280rpx">随机一笑，下拉刷新</view>
            <block v-for="(item, index) in listData" :key="index">
                <view class="cu-item">
                    <view class="content shadow-blur">
                        <view class="cu-capsule radius">
                            <view class="cu-tag bg-cyan">
                                <text class="cuIcon-emoji"></text>
                            </view>
                            <view class="cu-tag line-cyan">{{index+1}}</view>
                        </view>
                        <view class="margin-top" v-html="item.content"></view>
                    </view>
                </view>
            </block>
            <view class="cu-item">
                <view class="content shadow-blur">
                    <view class="margin-top">我是有底线的亲～</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import {
    jokeList
} from '@/api/all';
export default {
    data () {
        return {
            listData: [],
            isCard: false,
            flag: 0, // 触发器
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news']),
    },
    watch: {
        'flag': function (val, oldval) {
            if (val > 0) {
                this.getList()
            }
        }
    },
    onLoad () {
        this.getList()
    },
    onShow () {

    },
    onPullDownRefresh () {
        setTimeout(() => {
            uni.stopPullDownRefresh()
            this.flag++
        }, 500)
    },
    onShareAppMessage (res) {

    },
    methods: {
        IsCard (e) {
            this.isCard = e.detail.value
        },
        getList () {
            uni.showLoading({
                title: '加载中'
            })
            jokeList().then(res => {
                if (res.code === 1) {
                    this.listData = res.data
                }
            })
        }
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
