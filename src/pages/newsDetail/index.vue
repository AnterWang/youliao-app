<template>
    <view class="page-wrapper">
        <view class="headertop">
            <view class="title">{{optionsData.title}}</view>
            <view class="name">{{optionsData.source}} {{optionsData.postTime}}</view>
            <image v-if="cover" class="img" :src="cover" mode="widthFix" />
        </view>
        <view class="detail" v-html="htmlData"></view>
        <view class="bottom">
            <view class="read">阅读：{{readnum}}</view>
            <view>
                <button open-type="share" class="button">
                    分享
                    <image class="icon" src="https://hh-oss-html.miyapay.com/hhops/picture/15882291575085e242ad0c50c" />
                </button>
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
    newsDetail,
} from '@/api/all';
export default {
    data () {
        return {
            isOverShare: true,
            optionsData: {

            },
            detailData: {},
            htmlData: '',
            cover: '', // 封面图
            readnum: 0, // 阅读数
        }
    },
    computed: {
        ...mapState(['system', 'user']),
    },
    onLoad (options) {
        this.optionsData = {
            title: decodeURIComponent(options.title),
            source: decodeURIComponent(options.source),
            postTime: decodeURIComponent(options.postTime)
        }
        this.getDetail(decodeURIComponent(options.newsId))
        // 阅读数随机
        let num = Math.floor(Math.random() * 99999 + 999)
        this.readnum = num
    },
    onShow () {

    },
    onShareAppMessage (res) {

    },
    methods: {
        getDetail (id) {
            newsDetail(id).then(res => {
                if (res.code === 1) {
                    this.htmlData = this.doingHtml(res.data)
                    this.cover = res.data.cover
                }
            })
        },
        // 处理html
        doingHtml (data) {
            let content
            if (data.content && data.content.length > 0) {
                content = data.content.replace(/<p>/ig, '<p class="p_class">').replace(/<strong>/ig, '<strong class="strong_class">')
            }
            if (data.images && data.images.length > 0) {
                data.images.map(item => {
                    let num1 = item.position
                    let imgSrc = item.imgSrc
                    content = content.replace(new RegExp(num1, 'g'), '<img class="img_class" src="' + imgSrc + '">')
                })
            }
            return content;
        }

    }
}
</script>

<style lang="scss">
.page-wrapper {
    min-height: 100vh;
    position: relative;
}
.headertop {
    padding: 30rpx 30rpx 10rpx;
    .title {
        font-size: 44rpx;
        line-height: 60rpx;
        color: #262626;
        font-weight: 500;
    }
    .name {
        margin-top: 20rpx;
        color: #999999;
        font-size: 24rpx;
        line-height: 30rpx;
    }
    .img {
        width: 100%;
        height: auto;
        background-size: 100%;
        margin-top: 40rpx;
    }
}
// html样式
.detail {
    width: 100%;
    padding: 30rpx;
    .p_class {
        font-size: 28rpx;
        line-height: 60rpx;
        color: #262626;
        // text-indent: 1em;
        text-align: justify;
        text-align-last: left;
    }
    .strong_class {
        font-size: 30rpx;
    }
    .img_class {
        width: 100%;
        height: auto;
        background-size: 100%;
    }
}
.bottom {
    padding: 0 30rpx 30rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .read {
        font-size: 34rpx;
        color: #666666;
        line-height: 44rpx;
    }
    .button {
        font-size: 32rpx;
        color: #666666;
        line-height: 44rpx;
        background: #ffffff;
        padding: 0;
        .icon{
            width: 40rpx;
            height: 40rpx;
            background-size: 100%;
            vertical-align: -6rpx;
        }
    }
}
</style>
