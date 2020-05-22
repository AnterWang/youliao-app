import request from '@/lib/request'

const url = 'https://www.mxnzp.com/api'
const app_id = 'diezpll1qhni9enk'
const app_secret = 'MUJTdzRQb1hUUXZVWU5aS0g4OGxhUT09'

// 新闻分类
export function newsClass() {
    return request.get({
        url: `${url}/news/types?app_id=${app_id}&app_secret=${app_secret}`,
    })
}

// 新闻列表
export function newsList(typeId,page) {
    return request.get({
        url: `${url}/news/list?app_id=${app_id}&app_secret=${app_secret}&typeId=${typeId}&page=${page}`,
    })
}

// 新闻详情
export function newsDetail(newsId) {
    return request.get({
        url: `${url}/news/details?app_id=${app_id}&app_secret=${app_secret}&newsId=${newsId}`,
    })
}

// 垃圾查询
export function rubbishSearch(name) {
    return request.get({
        url: `${url}/rubbish/type?app_id=${app_id}&app_secret=${app_secret}&name=${name}`,
    })
}

// 历史上的今天
export function historyToday(type) {
    return request.get({
        url: `${url}/history/today?app_id=${app_id}&app_secret=${app_secret}&type=${type}`,
    })
}

// 笑话
export function jokeList(type) {
    return request.get({
        url: `${url}/jokes/list/random?app_id=${app_id}&app_secret=${app_secret}`,
    })
}

// 图片列表
export function imageList(page) {
    return request.get({
        url: `${url}/image/girl/list?app_id=${app_id}&app_secret=${app_secret}&page=${page}`,
    })
}
