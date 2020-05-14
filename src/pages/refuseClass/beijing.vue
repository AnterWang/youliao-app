<template>
    <view class="page-wrapper">
        <view class="imgBox">
            <image class="img" src="https://hh-oss-html.miyapay.com/hhops/picture/15882254081680d6b930b6ce3" mode="widthFix" />
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
            isOverShare: true,
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news']),
    },
    onLoad () {

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
.imgBox {
    width: 100%;
    // padding: 30rpx;
    .img {
        width: 100%;
        height: auto;
        background-size: 100%;
    }
}
</style>
