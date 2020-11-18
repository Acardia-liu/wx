import request from '../api.js'
import store from '../../store/index.js'

//获取服务商信息
const getProvider = () => {
	const promise = new Promise((resolve, reject) => {
		uni.getProvider({
			service: 'oauth', //服务类型  登录授权
			success: function(res) {
				resolve(res.provider)
			},
			fail(res) {
				reject(res)
			}
		});
	}).catch(res => {
		uni.showToast({
			icon: 'none',
			title: res.errMsg || '获取服务商信息失败1',
			duration: 2000
		});
	})

	return promise
}

//获取code
const getCode = provider => {
	if (!provider) {
		uni.showToast({
			icon: 'none',
			title: '获取服务商信息失败2',
			duration: 2000
		});
		return
	}

	const promise = new Promise((resolve, reject) => {
		uni.login({
			provider: provider,
			success: function(loginRes) {
				if (loginRes && loginRes.code) {
					resolve(loginRes.code)
				} else {
					reject(loginRes)
				}
			}
		});
	}).catch(res => {
		uni.showToast({
			icon: 'none',
			title: res.errMsg || '获取code失败',
			duration: 2000
		});
	})

	return promise
}

/**
 * 根据code获取微信用户信息
 * @param {Object} e
 * @param {Object} func
 */
const getWechatUserInfoByCode = async function(e, func) {
	//获取服务商信息
	// let provider = await getProvider();

	//获取code
	// let code = await getCode(provider[0])
	
	//请求微信系统
	let appid = uni.getAccountInfoSync().miniProgram.appId;
	
	//小程序授权微信
	let param = {
		code: e.code,
		encryptedData: e.encryptedData,
		iv: e.iv,
		appid: appid,
	}
	
	
	request.send('index/MiniproHandler/getSessionInfo',param, res => {
		
		func && func(res)
		
	},null, true)
	
}


//登陆
const userLogin = async function(e, func) {
	 
	//小程序授权微信
	let param = {
		unionid: e.unionid || '',
		openid: e.openid || '',
		username: e.username || '',
		password: e.password || '',
		loginMode: e.loginMode || ''
	}
	
	//请求接口
	request.send(
		'vip/Account/login',
		{
			...param
		},
		res => {
			if (res.code == 1) {
				let resData = res.data;
				// console.log("resData=");
				// console.log(resData);
				// console.log(resData.access_token);
				//登录
				store.commit('setAccessToken', resData.access_token)
				store.commit('setUserInfo', resData)
	
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
	
				//延迟跳转页面
				setTimeout(function() {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}, 600);
				
			} 
			
			func && func(res) 
			
		},
		res => {
			
			
			func && func(res) 
		}
	);
	
	
}

export {
	userLogin, //用户登录
	getWechatUserInfoByCode, //登录授权
	getCode, //获取code
	getProvider //获取服务商信息
}
