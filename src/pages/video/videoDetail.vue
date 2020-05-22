<template>
    <view class="page-wrapper">
        <view class="cu-card case" v-if="news.video.videoList">
            <view class="cu-item shadow">
                <view class="image">
                    <video
                        :id="'myVideo'"
                        style="width:100%;height:388rpx;"
                        :src="news.video.videoList[0]"
                        :controls="true"
                        :custom-cache="false"
                    ></video>
                </view>
                <view class="cu-list menu-avatar">
                    <view class="cu-item">
                        <view class="content flex-sub" style="width:100%;left:0;">
                            <view class="text-grey">{{news.video.title}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-card case" v-else>
            <view class="cu-item shadow">
                <view class="image">
                    <image
                        src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
                        style="height:388rpx;"
                    />
                </view>
                <view class="cu-list menu-avatar">
                    <view class="cu-item">
                        <view class="content flex-sub" style="width:100%;left:0;">
                            <view class="text-grey">网络错误，请重试或切换其他视频～</view>
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
export default {
    data () {
        return {

        }
    },
    computed: {
        ...mapState(['system', 'user', 'news'])
    },
    onLoad (options) {
        console.log(this.news)
    },
    onShow () {

    },
    onShareAppMessage (res) {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: 100%;
    position: relative;
}
</style>
