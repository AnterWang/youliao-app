<template>
    <view class="page-wrapper">
        <view class="toptitle">搜索结果</view>
        <view class="list">
            <view class="item" v-for="(item, index) in listData" :key="index">
                <view class="con">
                    <view class="title">{{item.goodsName}}</view>
                    <view class="name">{{item.goodsType}}</view>
                </view>
                <image
                    v-if="item.goodsType==='可回收物'"
                    class="img"
                    src="https://hh-oss-html.miyapay.com/hhops/picture/1588159823835f72c56d31c95"
                />
                <image
                    v-if="item.goodsType==='有害垃圾'"
                    class="img"
                    src="https://hh-oss-html.miyapay.com/hhops/picture/1588159857031e286431737e3"
                />
                <image
                    v-if="item.goodsType==='湿垃圾'"
                    class="img"
                    src="https://hh-oss-html.miyapay.com/hhops/picture/1588159836184a7609d7e815a"
                />
                <image
                    v-if="item.goodsType==='干垃圾'"
                    class="img"
                    src="https://hh-oss-html.miyapay.com/hhops/picture/15881598147965eb297efbac6"
                />
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
    rubbishSearch
} from '@/api/all';
export default {
    data () {
        return {
            isOverShare: true,
            listData: [],
            imgList: [
                {
                    name: '可回收物',
                    url: 'https://hh-oss-html.miyapay.com/hhops/picture/1588159823835f72c56d31c95'
                },
                {
                    name: '有害垃圾',
                    url: 'https://hh-oss-html.miyapay.com/hhops/picture/1588159857031e286431737e3'
                },
                {
                    name: '湿垃圾',
                    url: 'https://hh-oss-html.miyapay.com/hhops/picture/1588159836184a7609d7e815a'
                },
                {
                    name: '干垃圾',
                    url: 'https://hh-oss-html.miyapay.com/hhops/picture/15881598147965eb297efbac6'
                }
            ],
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news']),
    },
    onLoad (options) {
        this.searchDetail(decodeURIComponent(options.searchName))
    },
    onShow () {

    },
    methods: {
        searchDetail (val) {
            rubbishSearch(val).then(res => {
                if (res.code === 1) {
                    if (res.data) {
                        if (res.data.recommendList) {
                            this.listData = res.data.recommendList
                        }
                    }
                }
            })
        },

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
    margin-top: 30rpx;
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
        line-height: 42rpx;
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
        width: 70rpx;
        height: 70rpx;
        background-size: 100%;
        margin-left: 20rpx;
    }
}
</style>
