import { request } from './request'

export function createWorkFlow(datas) {
    return request({
        url: '/backstage/createWorkFlow',
        params: datas,
        method: 'POST'
    });
}
//分页查询流程
export function searchWorkFlow(datas) {
    return request({
        url: '/backstage/searchWorkFlow',
        params: datas,
        method: 'POST'
    });
}
//查询一条流程
export function searchFlowOneData(datas) {
    return request({
        url: '/backstage/searchFlowOneData',
        params: datas,
        method: 'POST'
    });
}
//删除流程
export function delateFlow(datas) {
    return request({
        url: '/backstage/delateFlow',
        params: datas,
        method: 'POST'
    });
}
//更新流程
export function updataWorkFlow(datas) {
    return request({
        url: '/backstage/updataWorkFlow',
        params: datas,
        method: 'POST'
    });
}
//获取企业员工人员
export function getEmployee(datas) {
    return request({
        url: '/backstage/getEmployees',
        params: datas,
        method: 'POST'
    });
}
//查询流程数量
export function searchWorkFlowCount(datas) {
    return request({
        url: '/backstage/searchWorkFlowCount',
        params: datas,
        method: 'POST'
    });
}