<template>
    <view class="page-wrapper">
        <image
            v-if="supportedWxSdk"
            class="content animated fadeInDown"
            src="https://hh-oss-html.miyapay.com/hhops/picture/1588224439557a5786fb3b359"
        />
        <view v-else>
            <text>当前微信客户端较低，请升级至微信最新版本 ~</text>
        </view>
    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import Config from '../../config/base.config.js'
import util from '../../lib/utils.js'
export default {
    data () {
        return {

        }
    },
    computed: {
        ...mapState(['system', 'user']),
        supportedWxSdk: function () {
            return util.versionCompare(this.system.SDKVersion, Config.supportWxSDKVersion)
        }
    },
    onLoad () {
        setTimeout(() => {
            uni._switchTab({
                url: "/pages/news/index"
            })
        }, 2000)
        // this.$store.dispatch('updateClass').then(res => {

        // })
    },
    methods: {

    }
}
</script>

<style lang="scss">
.page-wrapper {
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        display: block;
        height: 332rpx;
        width: 240rpx;
        background-size: 100%;
    }
}
</style>
