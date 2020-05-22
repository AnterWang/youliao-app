<template>
    <view class="page-wrapper">
        <!-- <view class="header">
            <swiper
                class="swipers"
                :indicator-dots="true"
                :autoplay="true"
                :interval="3000"
                :duration="500"
            >
                <swiper-item v-for="(item, index) in swiperData" :key="index">
                    <image class="img" :src="item.img" @click="imgjump(item)" />
                </swiper-item>
            </swiper>
        </view>-->

        <scroll-view
            scroll-x
            class="bg-white nav"
            scroll-with-animation
            :scroll-left="scrollLeft"
            style="position:fixed;top:0;z-index:1;"
        >
            <view
                class="cu-item"
                :class="item.typeId==TabCur?'text-blue cur':''"
                v-for="(item,index) in news.classData"
                :key="index"
                @tap="tabSelect(item,index)"
            >{{item.typeName}}</view>
        </scroll-view>
        <view v-if="timeGone" class="toptitle">{{TabCurName}}</view>
        <view v-if="timeGone" class="list">
            <view
                class="item"
                v-for="(item, index) in listData"
                :key="index"
                @click="jumpDetail(item)"
            >
                <view class="con" :style="item.imgList&&item.imgList.length>0?'width:430rpx;':''">
                    <view class="title">{{item.title}}</view>
                    <view class="name">{{item.source}} {{item.postTime}}</view>
                </view>
                <image
                    v-if="item.imgList&&item.imgList.length>0"
                    class="img"
                    :src="item.imgList[0]"
                />
            </view>
        </view>
        <view class="bottomText" v-if="loading">加载中...</view>
        <view class="bottomText" v-if="!loading && page===10">我是有底线的～</view>

        <view v-if="!timeGone">
            <view class="header">
                <swiper
                    class="swipers"
                    :indicator-dots="true"
                    :autoplay="true"
                    :interval="3000"
                    :duration="500"
                >
                    <swiper-item v-for="(item, index) in swiperData" :key="index">
                        <image class="img" :src="item.img" @click="imgjump(item)" />
                    </swiper-item>
                </swiper>
            </view>
            <view class="header">
                <swiper
                    class="swipers"
                    :indicator-dots="true"
                    :autoplay="true"
                    :interval="3000"
                    :duration="500"
                >
                    <swiper-item v-for="(item, index) in swiperData" :key="index">
                        <image class="img" :src="item.img" @click="imgjump(item)" />
                    </swiper-item>
                </swiper>
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
    newsClass,
    newsList
} from '@/api/all';
export default {
    data () {
        return {
            listData: [],
            page: 1,
            flag: 0, // 触发器
            loading: false,
            swiperData: [
                {
                    img: 'https://hh-oss-html.miyapay.com/hhops/picture/158815589843829fee8926e26',
                    id: 1,
                    url: 'sss'
                },
                {
                    img: 'https://hh-oss-html.miyapay.com/hhops/picture/15881559171702ac447f77acb',
                    id: 2,
                    url: 'sss'
                },
                {
                    img: 'https://hh-oss-html.miyapay.com/hhops/picture/1588155938956eeb68f8f33a6',
                    id: 3,
                    url: 'sss'
                }
            ],
            // tab
            TabCur: 0,
            TabCurName: '',
            scrollLeft: 0,
            // 分享
            isOverShare: true,
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
        this.TabCur = this.news.classData[0].typeId
        this.TabCurName = this.news.classData[0].typeName
        this.getList()
        // 时间审核 显示
        let time = Math.round(new Date() / 1000)
        console.log(time)
        if (time > 1588933800) {
            this.timeGone = true
        }
    },
    onShow () {
        uni.hideHomeButton()
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
    onShareAppMessage (res) {

    },
    methods: {
        getList () {
            this.loading = true
            uni.showLoading({
                title: '加载中'
            })
            newsList(this.TabCur, this.page).then(res => {
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
        jumpDetail (item) {
            uni.navigateTo({
                url: '/pages/news/newsDetail?title=' + encodeURIComponent(item.title) + '&source=' + encodeURIComponent(item.source) + '&postTime=' + encodeURIComponent(item.postTime) + '&newsId=' + encodeURIComponent(item.newsId)
            })
        },
        tabSelect (item, index) {
            this.TabCur = item.typeId
            this.TabCurName = item.typeName
            this.scrollLeft = (index - 1) * 60
            this.page = 1
            this.getList()
            uni.pageScrollTo({
                scrollTop: 0,
                duration: 500
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
.toptitle {
    padding-left: 30rpx;
    font-size: 42rpx;
    line-height: 42rpx;
    color: #222222;
    font-weight: 500;
    margin-top: 130rpx;
    margin-bottom: 10rpx;
}
.list {
    padding: 0 30rpx 30rpx;
    width: 100%;
}
.item {
    width: 100%;
    padding: 30rpx 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1rpx solid #e6e6e6;
    .con {
        overflow: hidden;
    }
    .title {
        font-size: 34rpx;
        line-height: 46rpx;
        color: #222222;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: normal !important;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .name {
        margin-top: 10rpx;
        color: #999999;
        font-size: 20rpx;
        line-height: 22rpx;
    }
    .img {
        width: 240rpx;
        height: 120rpx;
        background-size: 100%;
        margin-left: 20rpx;
    }
}
.header {
    width: 100%;
    padding: 30rpx 30rpx 0;
}
.swipers {
    width: 100%;
    height: 320rpx;
    box-shadow: 0px 8rpx 16rpx 0px rgba(0, 0, 0, 0.1);
    border-radius: 8rpx;
    overflow: hidden;

    .img {
        width: 100%;
        height: 100%;
        background-size: 100%;
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
