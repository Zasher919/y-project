import config from './config'

export default function request(method, url, data = null) {



	return new Promise((resolve, reject) => {

		let token = ''
		uni.getStorage({
			key: config.token,
			success: (res) => {

				token = 'Bearer ' + JSON.parse(res.data)
			}
		});

		uni.request({
			url: config.baseUrl + url,
			method: method,
			header: {
				'Authorization': token ? token : '', //自定义请求头信息
			},
			data: data,
			success(data) {

				if (data.statusCode == 200 || data.statusCode == 201) {
					resolve(data.data)
				} else {
					reject(data)
				}
				// console.log(_that.imgList);

				// _that.imgList = data.data.filter(v=>v.imgType==2).map(v=>({...v,url:'http://localhost:7788/'+v.imgUrl}))

				// _that.imgList.map(v=>{
				// 	v.url = v.url.split('\\').join('/')
				// })

			}
		})
	})
}
