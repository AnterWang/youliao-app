<template>
    <view class="page-wrapper">
		<cardSwiper :swiperList="swiperList"></cardSwiper>
        <view class="nav-list">
            <navigator
                hover-class="none"
                :url="item.url"
                class="nav-li"
                navigateTo
                :class="'bg-'+item.color"
                :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
                v-for="(item,index) in elements"
                :key="index"
            >
                <view class="nav-title">{{item.title}}</view>
                <view class="nav-name">{{item.name}}</view>
                <text :class="'cuIcon-' + item.cuIcon"></text>
            </navigator>
        </view>
    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import cardSwiper from "@/components/common/cardSwiper"
export default {
	components: {
		cardSwiper
	},
    data () {
        return {
            elements: [{
                title: '热点视频',
                name: 'videos',
                color: 'cyan',
                cuIcon: 'videofill',
                url: '/pages/video/index'
            },
            {
                title: '垃圾分类',
                name: 'refuse',
                color: 'blue',
                cuIcon: 'deletefill',
                url: '/pages/refuseClass/index'
            },
            {
                title: '历史的今天',
                name: 'history on today',
                color: 'purple',
                cuIcon: 'activityfill',
                url: '/pages/activity/historyToday'
            },
            {
                title: '每日美图',
                name: 'picture',
                color: 'mauve',
                cuIcon: 'pic',
                url: '/pages/activity/image'
            },
            {
                title: '随机一笑',
                name: 'jokes',
                color: 'pink',
                cuIcon: 'emoji',
                url: '/pages/activity/joke'
            },
            {
                title: '文章',
                name: 'tag',
                color: 'brown',
                cuIcon: 'copy',
                url: '/pages/activity/wenzhang'
            },
            // {
            //     title: '头像',
            //     name: 'avatar',
            //     color: 'red',
            //     cuIcon: 'myfill'
            // },
            // {
            //     title: '进度条',
            //     name: 'progress',
            //     color: 'orange',
            //     cuIcon: 'icloading'
            // },
            // {
            //     title: '边框阴影',
            //     name: 'shadow',
            //     color: 'olive',
            //     cuIcon: 'copy'
            // },
            // {
            //     title: '加载',
            //     name: 'loading',
            //     color: 'green',
            //     cuIcon: 'loading2'
            // }
			],
			// 
			swiperList: [
				{
                    jumpUrl: '/pages/refuseClass/index',
					url: 'https://hh-oss-html.miyapay.com/hhops/picture/15894497986818176e0bd96b5'
				}, {
                    jumpUrl: '/pages/activity/historyToday',
					url: 'https://hh-oss-html.miyapay.com/hhops/picture/1590145871386d3219d80d99a',
				}, {
					jumpUrl: '/pages/video/index',
					url: 'https://hh-oss-html.miyapay.com/hhops/picture/1590145891841c7179bd06243'
				},
			]
        }
    },
    computed: {
		...mapState(['system', 'user']),
    },
    onLoad () {

    },
    onShow () {
        uni.hideHomeButton()
    },
    methods: {

    }
}
</script>

<style lang="scss">
.page-wrapper {
    min-height: 100vh;
    position: relative;
}

.nav-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0px 40upx 0px;
    justify-content: space-between;
}

.nav-li {
    padding: 30upx;
    border-radius: 12upx;
    width: 45%;
    margin: 0 2.5% 40upx;
    background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;
}

.nav-li::after {
    content: '';
    position: absolute;
    z-index: -1;
    background-color: inherit;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: -10%;
    border-radius: 10upx;
    opacity: 0.2;
    transform: scale(0.9, 0.9);
}

.nav-li.cur {
    color: #fff;
    background: rgb(94, 185, 94);
    box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
}

.nav-title {
    font-size: 32upx;
    font-weight: 300;
}

.nav-title::first-letter {
    font-size: 40upx;
    margin-right: 4upx;
}

.nav-name {
    font-size: 28upx;
    text-transform: Capitalize;
    margin-top: 20upx;
    position: relative;
}

.nav-name::before {
    content: '';
    position: absolute;
    display: block;
    width: 40upx;
    height: 6upx;
    background: #fff;
    bottom: 0;
    right: 0;
    opacity: 0.5;
}

.nav-name::after {
    content: '';
    position: absolute;
    display: block;
    width: 100upx;
    height: 1px;
    background: #fff;
    bottom: 0;
    right: 40upx;
    opacity: 0.3;
}

.nav-name::first-letter {
    font-weight: bold;
    font-size: 36upx;
    margin-right: 1px;
}

.nav-li text {
    position: absolute;
    right: 30upx;
    top: 30upx;
    font-size: 52upx;
    width: 60upx;
    height: 60upx;
    text-align: center;
    line-height: 60upx;
}

.text-light {
    font-weight: 300;
}

@keyframes show {
    0% {
        transform: translateY(-50px);
    }

    60% {
        transform: translateY(40upx);
    }

    100% {
        transform: translateY(0px);
    }
}

@-webkit-keyframes show {
    0% {
        transform: translateY(-50px);
    }

    60% {
        transform: translateY(40upx);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>
