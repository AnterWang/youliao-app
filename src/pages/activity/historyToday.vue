<template>
    <view class="page-wrapper">
        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class="cuIcon-titles text-orange"></text>卡片风格
            </view>
            <view class="action">
                <switch :class="isCard?'checked':''" :checked="isCard?true:false" @change="IsCard"></switch>
            </view>
        </view>
        <view
            class="cu-card article"
            :class="!isCard?'no-card':''"
            v-for="(item, index) in listData"
            :key="index"
        >
            <view class="cu-item shadow">
                <view class="title">
                    <view class="text-cut">{{item.title}}</view>
                </view>
                <view class="content">
                    <image :src="item.picUrl" style="height:152rpx;" mode="aspectFill" />
                    <view class="desc">
                        <view
                            class="text-content over_three_lines"
                            style="height:114rpx;line-height:1.4;"
                        >{{item.details}}</view>
                        <view>
                            <view class="cu-tag bg-red light sm round">{{item.year}}</view>
                            <view
                                class="cu-tag bg-green light sm round"
                            >{{item.month}}月{{item.day}}日</view>
                        </view>
                    </view>
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
    historyToday
} from '@/api/all';
export default {
    data () {
        return {
            listData: [],
            isCard: false
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news']),
    },
    onLoad () {
        uni.showLoading({
            title: '加载中'
        })
        // type 0 不需要详情
        historyToday(1).then(res => {
            if (res.code === 1) {
                this.listData = res.data
                uni.hideLoading()
            }else{
                uni.hideLoading()
            }
        })
    },
    onShow () {

    },
    onShareAppMessage (res) {

    },
    methods: {
        IsCard (e) {
            this.isCard = e.detail.value
        },
    }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: 100vh;
    position: relative;
    background-color: #f1f1f1;
}
</style>
