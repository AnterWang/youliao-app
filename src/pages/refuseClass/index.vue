<template>
    <view class="page-wrapper">
        <view class="header">
            <view class="num1">垃圾分类助手</view>
            <view class="num2">垃圾分类一小步 低碳生活一大步</view>
        </view>
        <view class="searchBox">
            <input
                class="input"
                :value="searchName"
                @input="onInput"
                placeholder-class="input-placeholder"
                placeholder="输入垃圾查看对应分类"
            />
            <view class="button" @click="searchOK">查询</view>
        </view>
        <view class="bg" @click="jump">
            <view
                style="text-align: center;color: #999;font-size:24rpx;padding-top:10rpx;"
            >点击查看北京专属垃圾分类指南</view>
        </view>
        <view class="tabBox">
            <view
                class="item"
                v-for="(item, index) in imgList"
                :key="index"
                @click="tabChange(index)"
                :style="index===tabkey?'border-bottom:2rpx solid #000;':''"
            >
                <image :src="item.url" />
                <view class="text" :style="index===tabkey?'color:#000':''">{{item.name}}</view>
            </view>
        </view>
        <view class="mes" v-if="tabkey===0">
            <view
                class="text"
                style="margin: 20rpx 0;"
            >可回收物是指适宜回收和可循环再利用的废弃物。主要包括废玻璃、废金属、废塑料、废纸张、废织物等。</view>
            <view class="text" style="font-weight:500;">投放要求</view>
            <view class="text">· 轻投轻放</view>
            <view class="text">· 清洁干燥、避免污染</view>
            <view class="text">· 废纸尽量平整</view>
            <view class="text">· 立体包装请清空内容物，清洁后压扁投放</view>
            <view class="text">· 有尖锐边角的，应包裹后投放</view>
        </view>
        <view class="mes" v-if="tabkey===1">
            <view
                class="text"
                style="margin: 20rpx 0;"
            >有害垃圾是指对人体健康或者自然环境造成直接或者潜在危害的零星废弃物，单位集中产生的除外。主要包括废电池、废灯管、废药品、废油漆桶等。</view>
            <view class="text" style="font-weight:500;">投放要求</view>
            <view class="text">· 充电、纽扣、蓄电池投放请注意轻放</view>
            <view class="text">· 油漆桶、杀虫剂如有残留请密闭后投放</view>
            <view class="text">· 荧光灯、节能灯易破损请包裹后轻放</view>
            <view class="text">· 废药品及其包装连带包装一并投放</view>
        </view>
        <view class="mes" v-if="tabkey===2">
            <view
                class="text"
                style="margin: 20rpx 0;"
            >湿垃圾是指易腐的生物质废弃物。主要包括剩饭剩菜、瓜皮果核、花卉绿植、肉类碎骨、过期食品、餐厨垃圾等。</view>
            <view class="text" style="font-weight:500;">投放要求</view>
            <view class="text">· 纯流质的食物垃圾、如牛奶等，应直接倒进下水口</view>
            <view class="text">· 有包装的湿垃圾应将包装物取出后分类投放，包装物请投放到对应的可回收物容器或干垃圾容器</view>
            <view class="text">· 投放湿垃圾，鼓励将包装物(塑料袋)去除</view>
        </view>
        <view class="mes" v-if="tabkey===3">
            <view class="text" style="margin: 20rpx 0;">干垃圾是指除有害垃圾、可回收物、湿垃圾以外的生活废弃物。</view>
            <view class="text" style="font-weight:500;">投放要求</view>
            <view class="text">· 尽量沥干水分</view>
            <view class="text">· 难以辩识类别的生活垃圾投入干垃圾容器内</view>
        </view>
        <!-- 语音 -->
        <view class="fixBox">
            <view class="button" @touchstart="touchStart" @touchend="touchEnd" :style="buttonStyle">
                <image
                    src="https://hh-oss-html.miyapay.com/hhops/picture/1588231603670c7ffdad9b2c8"
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
const plugin = requirePlugin("WechatSI");
let manager = plugin.getRecordRecognitionManager();
export default {
    data () {
        return {
            searchName: '',
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
            tabkey: 0,
            buttonStyle: 'opacity:1'
        }
    },
    computed: {
        ...mapState(['system', 'user', 'news']),
    },
    onLoad () {
        this.initRecord()
    },
    onShow () {
        uni.hideHomeButton()
    },
    onShareAppMessage (res) {

    },
    methods: {
        onInput (e) { // input绑定值
            this.searchName = e.detail.value
        },
        searchOK () {
            if (!this.searchName) {
                uni.showToast({
                    title: '请输入要查询的垃圾名称哦～',
                    icon: 'none',
                })
                return
            }
            uni.navigateTo({
                url: '/pages/refuseSearch/index?searchName=' + encodeURIComponent(this.searchName)
            })
        },
        tabChange (index) {
            this.tabkey = index
        },
        jump () {
            uni.navigateTo({
                url: '/pages/refuseClass/beijing'
            })
        },
        // 语音
        touchStart () {
            manager.start({
                duration: 60000,
                lang: "zh_CN"
            });
            this.buttonStyle = 'opacity:0.6'
            uni.showLoading({
                title: '录音中...'
            })
        },
        touchEnd () {
            manager.stop()
            this.buttonStyle = 'opacity:1'
            uni.hideLoading()
        },
        /**  
         * 初始化语音识别回调  
         * 绑定语音播放开始事件  
         */
        initRecord () {
            manager.onStart = (res) => {

            }
            // 识别结束事件  
            manager.onStop = (res) => {
                this.searchName = res.result.slice(0,-1)
                uni.hideLoading()
                uni.showToast({
                    title: this.searchName,
                    duration: 1000
                })
            }
            //有新的识别内容返回，则会调用此事件  
            manager.onRecognize = (res) => {
                uni.hideLoading()
            }
            // 识别错误事件  
            manager.onError = (res) => {
                uni.hideLoading()
            }
        },

    }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
    min-height: 100%;
    position: relative;
}
.header {
    width: 100%;
    height: 320rpx;
    background-image: url('https://hh-oss-html.miyapay.com/hhops/picture/1588156761866d8ea83c98eea');
    background-size: 100%;
    .num1 {
        padding: 40rpx 0 0 30rpx;
        font-size: 42rpx;
        line-height: 50rpx;
        color: #ffffff;
        font-weight: 500;
    }
    .num2 {
        padding: 10rpx 0 0 30rpx;
        font-size: 30rpx;
        line-height: 40rpx;
        color: rgba(255, 255, 255, 0.8);
    }
}
.searchBox {
    margin: -120rpx auto 0;
    width: 690rpx;
    height: 280rpx;
    background: #ffffff;
    border-radius: 20rpx;
    box-shadow: 2rpx 2rpx 16rpx 0 rgba(0, 0, 0, 0.1);
    padding-top: 55rpx;
    .input {
        width: 580rpx;
        height: 76rpx;
        border-radius: 6rpx;
        margin: 0 auto 0;
        background: #f5f5f5;
        font-size: 32rpx;
        line-height: 76rpx;
        padding: 0 10rpx;
    }
    .input-placeholder {
        font-size: 32rpx;
        line-height: 76rpx;
    }
    .button {
        width: 600rpx;
        height: 76rpx;
        border-radius: 6rpx;
        margin: 30rpx auto 0;
        border: 2rpx solid #222222;
        color: #222222;
        font-size: 32rpx;
        line-height: 72rpx;
        text-align: center;
    }
}
.tabBox {
    width: 690rpx;
    height: 180rpx;
    background: #f5f5f5;
    border-radius: 6rpx;
    margin: 30rpx auto 0;
    display: flex;
    flex-direction: row;
    .item {
        flex: 1;
        image {
            width: 70rpx;
            height: 70rpx;
            background-size: 100%;
            margin: 35rpx auto 0;
            display: block;
            border-radius: 4rpx;
        }
        .text {
            color: #666666;
            font-size: 28rpx;
            line-height: 28rpx;
            text-align: center;
            margin-top: 20rpx;
        }
    }
}
.mes {
    padding: 20rpx 30rpx;
    .text {
        color: #555555;
        font-size: 28rpx;
        line-height: 48rpx;
    }
}
.bg {
    width: 690rpx;
    height: 286rpx;
    background: url('https://hh-oss-html.miyapay.com/hhops/picture/158822504603247763c0817ae');
    background-size: 100%;
    border-radius: 6rpx;
    margin: 30rpx auto 0;
}
.fixBox {
    position: fixed;
    right: 30rpx;
    bottom: 30rpx;
    .button {
        width: 100rpx;
        height: 100rpx;
        overflow: hidden;
        border-radius: 50%;
        background-color: rgb(58, 117, 255);
        display: flex;
        justify-content: center;
        align-items: center;
        image {
            width: 70rpx;
            height: 70rpx;
            background-size: 100%;
        }
    }
}
</style>
