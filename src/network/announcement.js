import { request } from './request'
//发布公告文章
export function uploadArticle(datas) {
    return request({
        url: '/announcement/uploadArticle',
        params: datas,
        method: 'POST'
    });
}
//获取全部文章
export function getAllArticles(datas) {
    return request({
        url: '/announcement/getArticleInformationBackstage',
        params: datas,
        method: 'POST'
    });
}
//删除文章
export function deleteArticle(datas) {
    return request({
        url: '/announcement/deleteArticle',
        params: datas,
        method: 'POST'
    });
}
//获取文章内容 
export function getArticalContent(datas) {
    return request({
        url: '/announcement/getArticalContent',
        params: datas,
        method: 'POST'
    });
}
//更新文章内容
export function updataArticalContent(datas) {
    return request({
        url: '/announcement/updataArticalContent',
        params: datas,
        method: 'POST'
    });
}