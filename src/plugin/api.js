// 对小程序一些API进行改进
import store from '@/store/index.js'

/**
 * 增强的tab切换方法
 * @param url 打开的页面路径
 * @param success 成功回调方法
 */
export function switchTab({url, success}) {
    const pages = getCurrentPages() || [], delta = pages.length-1, { pagelayout } = store.state;
    let params = url.replace(/[^\?]+\??/,'').split('&').map(item=>{
            let arr = item.split('=')
            return {
                key: arr[0],
                value: arr[1]
            }
        }),
        tab = params.find(item=>item.key === 'url'),
        regex = new RegExp(tab.value),
        exists = !!(pagelayout.menus||[]).find(item=>regex.test(item.url))

    //存在目标tab页面
    if(exists){
        let menus = pagelayout.menus || [], activeTab = 0

        for(let i=0; i<menus.length; i++){
            if(regex.test(menus[i].url)){
                activeTab = i
                break
            }
        }

        if(delta>0){
            uni.navigateBack({
                delta: delta
            })
        }

        store.commit('getPagelayout', {
            activeTab: activeTab
        })

        success && success()
    }
    else{
        if(delta>0){
            let page = pages[delta-1], url = page.options.url || ''
            //当前页面的上一个页面是隐藏了tab的目标页面
            if(page.route === 'pages/hidetabIndex/index' && url.replace(/^\//, '') === tab.value){
                uni.navigateBack({
                    delta: 1
                })

                success && success()
            }
            else{
                uni.redirectTo({
                    url: '/pages/hidetabIndex/index'+url.replace(/[^\?]+/,''),
                    success: ()=>{
                        success && success()
                    }
                })
            }
        }
        else{
            uni.navigateTo({
                url: '/pages/hidetabIndex/index'+url.replace(/[^\?]+/,''),
                success: ()=>{
                    success && success()
                }
            })
        }
    }
}

/**
 * 获取当前环境(把mp-去掉)
 */
export function getEnv() {
    return (process.env.VUE_APP_PLATFORM || '').replace(/mp-/g, '');
}

/**
 * 生成分享链接
 * @param type 调整类型：1 先打开首页，后打开目标页面， 2 直接打开目标页面  【默认值：2】
 * @param page 需要打开的目标页面
 * @returns {string}
 */
export function genSharePath({type=2, page}){
    let pages = getCurrentPages(), size = pages.length
    if(page){
        return `pages/home/index?channel=share&channel_sign=${pages[size-1].route}&type=${type}&page=${encodeURIComponent(page)}`
    }
    else{
        return `pages/home/index?channel=share&channel_sign=${pages[size-1].route}`
    }
}

// 初始化api
export function initApi() {
    // 定义自己的tab方法
    uni.getEnv = getEnv;

    //switchTab方法
    uni._switchTab = uni.switchTab //默认的switchTab方法【该项目使用不到】
    uni.switchTab = switchTab;

    uni.genSharePath = genSharePath;
}
