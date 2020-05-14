<script>
import Vue from 'vue'
Vue.prototype.ColorList = [{
    title: '嫣红',
    name: 'red',
    color: '#e54d42'
},
{
    title: '桔橙',
    name: 'orange',
    color: '#f37b1d'
},
{
    title: '明黄',
    name: 'yellow',
    color: '#fbbd08'
},
{
    title: '橄榄',
    name: 'olive',
    color: '#8dc63f'
},
{
    title: '森绿',
    name: 'green',
    color: '#39b54a'
},
{
    title: '天青',
    name: 'cyan',
    color: '#1cbbb4'
},
{
    title: '海蓝',
    name: 'blue',
    color: '#0081ff'
},
{
    title: '姹紫',
    name: 'purple',
    color: '#6739b6'
},
{
    title: '木槿',
    name: 'mauve',
    color: '#9c26b0'
},
{
    title: '桃粉',
    name: 'pink',
    color: '#e03997'
},
{
    title: '棕褐',
    name: 'brown',
    color: '#a5673f'
},
{
    title: '玄灰',
    name: 'grey',
    color: '#8799a3'
},
{
    title: '草灰',
    name: 'gray',
    color: '#aaaaaa'
},
{
    title: '墨黑',
    name: 'black',
    color: '#333333'
},
{
    title: '雅白',
    name: 'white',
    color: '#ffffff'
},
]
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
@import './utils/colorUI/main.css';
@import './utils/colorUI/icon.css';

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

.over_three_lines {
    /* 超出三行 */
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre-line;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
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