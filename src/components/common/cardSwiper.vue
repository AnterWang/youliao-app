<template>
    <view class="swiper">
        <swiper
            class="card-swiper"
            :class="'round-dot'"
            :indicator-dots="true"
            :circular="true"
            :autoplay="true"
            interval="5000"
            duration="500"
            @change="cardSwiper"
            indicator-color="#8799a3"
            indicator-active-color="#0081ff"
        >
            <swiper-item
                v-for="(item,index) in swiperList"
                :key="index"
                :class="cardCur==index?'cur':''"
                @click="jumpDetail(item)"
            >
                <view class="swiper-item">
                    <image :src="item.url" mode="heightFix" />
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
export default {
    props: {
        swiperList: {
            type: Array,
            default: []
        },
    },

    data () {
        return {
            cardCur: 0, //
        }
    },

    methods: {
        cardSwiper (e) {
            this.cardCur = e.detail.current
        },
        jumpDetail(item){
            if(item.jumpUrl){
                uni.navigateTo({
                    url: item.jumpUrl
                })
            }
        }
    }
}
</script>

<style lang="scss">
</style>
