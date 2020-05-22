<template>
    <view class="page-wrapper">
        <view class="list">
            <image
                v-for="(item,index) in listData"
                :key="index"
                class="img"
                mode="widthFix"
                :src="item.imageUrl"
            />
        </view>
        <view class="bottomText" v-if="loading">加载中...</view>
        <view class="bottomText" v-if="!loading && page===10">我是有底线的～</view>
    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import {
    imageList
} from '@/api/all';
export default {
    data () {
        return {
            listData: [],
            page: 1,
            flag: 0, // 触发器
            loading: false,
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news']),
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
    },
    onShow () {

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
            imageList(this.page).then(res => {
                if (res.code === 1) {
                    if (this.page === 1) {
                        this.listData = []
                    }
                    if (res.data.list && res.data.list.length > 0) {
                        this.listData.push(...res.data.list)
                    }
                    this.loading = false
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: 100vh;
    position: relative;
    background-color: #ffffff;
}
.list {
    padding: 30rpx;
    image {
        width: 100%ƒ;
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
