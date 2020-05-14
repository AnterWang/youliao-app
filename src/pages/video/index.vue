<template>
    <view class="index">
        <!-- 视频组件 -->
        <!-- <cu-video class="video" :video_list="videoList" /> -->
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
// import cuVideo from '@/components/common/video.vue';
export default {
    // components: {
    //     cuVideo
    // },
    data () {
        return {
            page: 1,
            videoList: []
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news'])
    },
    watch: {

    },
    onLoad () {
        this.getVideoList();
    },
    onShow () {

    },
    onShareAppMessage (res) {

    },
    methods: {
        getVideoList (refresh) {
            // uni.request({
            //     url: 'https://api.52170.xin/video',
            //     dataType: 'json',
            //     success: res => {
            //         console.log(res.data.data.list);
            //         for (let item of res.data.data.list) {
            //             this.videoList.push({
            //                 video_id: item.video_id,
            //                 nickname: item.nickname,
            //                 video_describe: item.video_describe,
            //                 cover_url: item.cover_url,
            //                 video_url: item.video_url,
            //                 dianzan: item.dianzan,
            //                 pinglun: item.pinglun,
            //                 zhuanfa: item.zhuanfa,
            //                 is_dianzan: item.is_dianzan,
            //                 flag: false
            //             });
            //         }
            //     }
            // });
             newsList(526, this.page).then(res => {
                if (res.code === 1) {
                    this.videoList = res.data
                    this.videoList.map((item,index)=>{return index<4})
                }
            })
        },

    }
}
</script>

<style lang="scss" scoped>
.index {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    background-color: #333333;
    height: 100vh;
}
.tabbar {
    .action {
        .plus {
            image {
                width: 100upx;
                height: 60upx;
            }
        }
    }
}
</style>
