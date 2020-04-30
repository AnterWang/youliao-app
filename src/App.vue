<script>
export default {
    onLaunch: function () {
        // 初始化网络监听
        uni.onNetworkStatusChange((res) => {
            if (!res.isConnected) {
                uni.showToast({
                    title: '网络断开了，请重新连接',
                    duration: 5000
                })
            }
        })
        // 调用分享
        this.share()
    },
    onShow: function () {

    },
    onHide: function () {

    },
    methods: {
        // 全局分享 重写分享方法 
        // 1、在子页面的data里设置变量：isOverShare,类型是boolean，true和false随意，反正最后都会变成true;
        // 2.在子页面的data里设置要传递参数的变量，例如title：‘转发标题’;
        share () {
            //监听路由切换
            //间接实现全局设置分享内容
            wx.onAppRoute(function (res) {
                //获取加载的页面
                let pages = getCurrentPages(),
                    //获取当前页面的对象
                    view = pages[pages.length - 1],
                    data;
                if (view) {
                    data = view.data;
                    console.log('是否重写分享方法', data.isOverShare);
                    if (!data.isOverShare) {
                        data.isOverShare = true;
                        view.onShareAppMessage = function () {
                            //分享配置
                            return {
                                title: data.title, // 子页面的title
                                path: '/pages/home/index'
                            };
                        }
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss">
/*每个页面公共css */
page {
    background: #ffffff;
}

.f7f7f7 {
    // 微信默认背景色
    background: #f7f7f7;
}

view {
    box-sizing: border-box;
}

.page-wrapper {
    width: 100%;
    height: 100%;
}

.text_overflow {
    /* 超出一行 */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.over_two_lines {
    /* 超出两行 */
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre-line;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.clearfix {
    zoom: 1;

    &:after {
        height: 0;
        overflow: hidden;
        display: block;
        content: '';
        clear: both;
    }
}

button::after {
    border: none;
}
</style>