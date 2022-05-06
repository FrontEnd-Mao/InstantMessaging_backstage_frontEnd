import { request } from './request'

export function creatForm(datas) {
    return request({
        url: '/backstage/createForm',
        params: datas,
        method: 'POST'
    });
}
//分页搜索表单数据
export function searchFormData(datas) {
    return request({
        url: '/backstage/searchFormData',
        params: datas,
        method: 'POST'
    });
}
//搜索一条表单数据
export function searchFormOneData(datas) {
    return request({
        url: '/backstage/searchFormOneData',
        params: datas,
        method: 'POST'
    });
}
//删除表单数据
export function delateForm(datas) {
    return request({
        url: '/backstage/delateForm',
        params: datas,
        method: 'POST'
    });
}
//更新表单
export function updataForm(datas) {
    return request({
        url: '/backstage/updataForm',
        params: datas,
        method: 'POST'
    });
}
