import { request } from './request'
import axios from 'axios'
export function toFileReq(datas) {
	return axios({
		method: 'POST',
		url: "http://localhost:8081" + '/photos/upload',
		data: datas,
	})
}

