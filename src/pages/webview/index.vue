<template>
    <view class="web-view">
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
import {
    mapState
} from 'vuex';

export default {
    data () {
        return {
            url: '',
        }
    },

    computed: {
        ...mapState(['user'])
    },

    onLoad (options) {
        this.url = decodeURIComponent(options.url)
    },

    onShow () {
        
    },

    methods: {
        
    }
}
</script>

<style scoped>
.web-view {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
}
</style>