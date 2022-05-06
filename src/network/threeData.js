import { request } from './request'
//加载第一级节点
export function loadfirstnode(datas) {
    return request({
        url: '/organizationalStructure/loadfirstnode',
        params: datas,
        method: 'POST'
    });
}
//加载节点的子节点集合
export function loadchildnode(datas) {
    return request({
        url: '/organizationalStructure/loadchildnode',
        params: datas,
        method: 'POST'
    });

}
//添加子部门
export function addDepartment(datas) {
    return request({
        url: '/organizationalStructure/addDepartment',
        params: datas,
        method: 'POST'
    });

}
//删除子部门
export function delateDepartment(datas) {
    return request({
        url: '/organizationalStructure/delateDepartment',
        params: datas,
        method: 'POST'
    });
}
//更改部门名称 
export function changeDepartmentName(datas) {
    return request({
        url: '/organizationalStructure/changeDepartmentName',
        params: datas,
        method: 'POST'
    });
}
//获取部门成员  
export function getDepartmentMembers(datas) {
    return request({
        url: '/organizationalStructure/getDepartmentMembers',
        params: datas,
        method: 'POST'
    });
}
//添加部门成员 
export function addDepartmentMembers(datas) {
    return request({
        url: '/organizationalStructure/addDepartmentMembers',
        params: datas,
        method: 'POST'
    });
}
//获取公司员工 
export function getEnterpriseemployees(datas) {
    return request({
        url: '/organizationalStructure/getEnterpriseemployees',
        params: datas,
        method: 'POST'
    });
}
//删除员工数据
export function deleteEmployees(datas) {
    return request({
        url: '/organizationalStructure/deleteEmployees',
        params: datas,
        method: 'POST'
    });
}