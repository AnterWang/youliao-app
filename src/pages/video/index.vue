<template>
    <view class="page-wrapper">
        <view class="cu-card case" v-if="timeGone">
            <block v-for="(item,index) in listData" :key="index">
                <view class="cu-item shadow">
                    <view class="image" @click="jumpDetail(item)">
                        <image
                            :src="item.imgList[0]||'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'"
                            style="height:388rpx;"
                        />
                        <!-- <view class="cu-tag bg-blue">史诗</view> -->
                        <view class="cu-bar bg-shadeBottom">
                            <text class="text-cut">{{item.title}}</text>
                        </view>
                        <view class="playBox">
                            <text class="cuIcon-playfill"></text>
                        </view>
                    </view>
                    <view class="cu-list menu-avatar">
                        <view class="cu-item">
                            <!-- <view
                                class="cu-avatar round lg"
                                style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
                            ></view>-->
                            <view class="content flex-sub" style="width:100%;left:0;">
                                <view class="text-grey">{{item.source}}</view>
                                <view class="text-gray text-sm flex justify-between">
                                    {{timestampToTime(Number(item.postTime))}}
                                    <view class="text-gray text-sm">
                                        <text class="cuIcon-attentionfill margin-lr-xs"></text>
                                        {{randomNumber()}}
                                        <text class="cuIcon-appreciatefill margin-lr-xs"></text>
                                        {{randomNumber()}}
                                        <!-- <text class="cuIcon-messagefill margin-lr-xs"></text>30 -->
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <view class="cu-card case" v-if="!timeGone">
            尽情期待
        </view>
        <view class="bottomText" v-if="loading">加载中...</view>
        <view class="bottomText" v-if="!loading && page===10">我是有底线的,回到顶部下拉刷新一下吧～</view>
    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import {
    newsList
} from '@/api/all';
export default {
    data () {
        return {
            page: 1,
            listData: [],
            loading: false,
            flag: 0, // 触发器
            // 时间审核
            timeGone: false,
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news'])
    },
    watch: {
        'flag': function (val, oldval) {
            if (val > 0) {
                this.page = 1
                this.getList()
            }
        }
    },
    onLoad () {
        this.getList()
        // 时间审核 显示
        let time = Math.round(new Date() / 1000)
        console.log(time)
        if (time > 1590494400) {
            this.timeGone = true
        }
    },
    onShow () {

    },
    onShareAppMessage (res) {

    },
    onPullDownRefresh () {
        setTimeout(() => {
            uni.stopPullDownRefresh()
            this.flag++
        }, 500)
    },
    onReachBottom () {
        if (this.page < 10) {
            this.page++
            this.getList()
        } else {
            console.log('到底了')
        }
    },
    methods: {
        // 列表
        getList () {
            this.loading = true
            uni.showLoading({
                title: '加载中'
            })
            newsList(522, this.page).then(res => {
                if (res.code === 1) {
                    if (this.page === 1) {
                        this.listData = []
                    }
                    if (res.data && res.data.length > 0) {
                        this.listData.push(...res.data)
                    }
                    this.loading = false
                }
            })
        },
        // 转时间
        timestampToTime (timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        // 随机数
        randomNumber () {
            return Math.floor(Math.random() * 99999 + 999)
        },
        // 跳转
        jumpDetail (item) {
            this.$store.dispatch('updateVideo', item).then(res => {
                if (res === 'ok') {
                    uni.navigateTo({
                        url: '/pages/video/videoDetail'
                    })
                }
            })
        }

    }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: 100%;
    position: relative;
}
.playBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100rpx;
    height: 100rpx;
    text-align: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    text {
        font-size: 70rpx;
        line-height: 100rpx;
        color: rgba(255, 255, 255, 0.7);
    }
}
.bottomText {
    color: #999999;
    font-size: 24rpx;
    line-height: 30rpx;
    text-align: center;
    padding-bottom: 32rpx;
}
</style>
