import {
	baseUrl
} from "./config.js"
import qs from './qs'
// import { getRefresh } from "@/api/api.js" 
const request = {};
/**
 * 接口请求
 * @param url 接口地址
 * @param method 请求方法 [get,post,put]  
 * @param data 参数  
 */
const httprequest = (url, options = {}) => {
	let header = {
		...options.header
	};
	header = handleHeader(header);
	let data = options.data
	console.log(data)
	if (options.method == 'post') {
		data.mchid = 'blindbox'
	}
	// let url = options.url
	url = baseUrl + url
	if (options.showLoad) {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: options.method,
			data: data,
			header,
			success: (res) => {
				if (res.statusCode !== 200) {
					const data = res.data
					if (res.statusCode == '400' || res.statusCode == '500') {
						uni.hideLoading()
						uni.showModal({
							title: '提示',
							content: '网络繁忙,请稍后重试',
							success(res) {}
						})
					}
					if (res.statusCode == '401' || res.data.code == 1001) {
						uni.removeStorageSync('token')
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
					reject(res)
				} else {
					const result = res.data
					const code = result.code

					if (!code) {
						const result = res.data
						resolve(res.data);
						uni.hideLoading()
					}

					if (code == 1001) {
						uni.removeStorageSync('token')
						uni.showModal({
							title: '提示',
							content: '登录异常,请重新登录',
							success(res) {
								uni.navigateTo({
									url: '/pages/authorization/authorization'
								})
							}
						})
					} else if (code != 0) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						})
						// reject(res)
						uni.hideLoading()
					} else {
						console.log('66666');
						const result = res.data
						resolve(res.data);
						uni.hideLoading()
					}

				}
			},
		})
	})
}

function handleHeader(header) {
	let usertoken = uni.getStorageSync('token')
	if (usertoken) {
		header.Authorization = 'Bearer ' + usertoken
	}
	return header
}

function handleData(props) {
	let data = props;
	return data
}
export default httprequest;
