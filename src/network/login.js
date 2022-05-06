import { request } from './request'

export function login(datas) {
    return request({
        url: '/backstage/signMatch',
        params: datas,
        method: 'POST'
    });
}
