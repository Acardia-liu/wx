import store from '../store/index.js';
import md5 from '../common/md5.js';
import {
	getLang
} from '../common/util.js';

//#ifdef H5
//如果是h5里

const apiUrl = '/api/';
const thirdLoginUrl = '/wechatapi/';
//#endif

//#ifndef H5
//如果不是h5里

// const apiUrl = 'http://192.168.31.40:8000/api/fxvip/';
//测试
const apiUrl = 'https://api.itriper.com/';
const thirdLoginUrl = 'https://wechat.itriper.com/';
//#endif

const appSecret = 'OOKX87[h5]AtUwojxdK&d@d*}o2L05';

const request = {
	/**
	 * thirdLogin 是否为第三方登录
	 * diyUrl 指定请求url
	 */
	send(url, data = {}, success = null, fail = null, thirdLogin = false, method = 'POST', diyUrl = false) {
		// console.log('api-url-1='+url);
		//解决未获取到token就开始请求需要登录验证的接口
		// if ('vip/Account/login' !== url && !store.state.accessToken && !thirdLogin && !diyUrl) {
		// 	setTimeout(() => {
		// 		this.send(url, data, success, fail, thirdLogin, method, diyUrl);
		// 	}, 10);
		// 	return;
		// }
		uni.showNavigationBarLoading();

		let accessToken = store.state.accessToken;
		console.log("store.state.accessToken=" + accessToken);
		if (accessToken == '' || accessToken == null || typeof(accessToken) == 'undefined') {
			accessToken = uni.getStorageSync('accessToken');
			//赋值给state
			store.state.accessToken = accessToken;
		}
		
		//追加语言字段
		data['lang'] = getLang();

		if (!thirdLogin) {
			url = apiUrl + url;
			url = this.createSignParamsUrl(url, data, method);

		} else {
			url = thirdLoginUrl + url;
			url = this.createSignParamsUrl(url, data, method);
		}

		// console.log("createSignParamsUrl="+url);
		// console.log('【api-url-2】='+url);
		// console.log('【getStorageSync.getAccessToken()】='+uni.getStorageSync('accessToken'));
		// console.log('【accessToken】='+accessToken);
		uni.request({
			url: url,
			data,
			method,
			//自定义请求头信息
			header: {
				'Authorization': accessToken,
				'AppTId': 1,
				'AppId': 1,
				'MpId': 1,
				'appV': store.state.appVersion,
				'appIV': store.state.appInnerVersion,
				'appType': store.state.appType,
			},
			success(res) {
				console.info(res);
				if (res.statusCode == 200) {

					if (res.data.code == 0) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						typeof fail == 'function' && fail(res.data);

					} else if (res.data.code == 40001) {
						uni.redirectTo({
							url: '/pages/login/login'
						});
					} else {
						typeof success == 'function' && success(res.data);
					}
				} else {
					uni.showToast({
						title: '出现错误' + res.statusCode,
						icon: 'none'
					})
				}
			},
			fail(res) {
				uni.hideLoading();
				uni.showToast({
					title: '网络出现问题',
					icon: 'none'
				})
			},
			complete() {
				uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh();
				uni.hideLoading();
			}
		});
	},
	/**
	 * 创建已签名的请求链接
	 * @param {string} url 接口链接
	 * @param {Array/Object} data 参数对象
	 * @param {string} request_type 请求类别(GET/POST)
	 * @return {String} sign_url 已签名URL
	 */
	createSignParamsUrl(url, data = {}, request_type) {
		if (url == '') {
			return '';
		}
		var currTimeSpan = Date.parse(new Date()) / 1000; //当前时间时间戳值
		if (data) {
			data = Object.assign({}, data);
		}
		data._timespan = currTimeSpan; //参数里增加当前时间参数
		// var paraStr = request_type == 'POST' ? '_timespan=' + currTimeSpan + '&' : ''; //接口请求参数
		var paraStr =  '_timespan=' + currTimeSpan + '&' ; //接口请求参数
		var signStr = ''; //待签名参数字符串
		var sortData = this.objKeySort(data);
		for (var item in sortData) {
			var itemVal = sortData[item];
			var valType = typeof(itemVal);
			itemVal = (itemVal || itemVal == 0 || typeof(itemVal) == 'boolean') ? itemVal.toString() : '';
			
			itemVal = itemVal.trim();
			
			//POST请求只需要签名参数值不为空并且长度少于50的参数
			if (itemVal && itemVal != '0' && valType !== 'object' && this.getSignStrLen(itemVal) < 50) {
				signStr += item + itemVal;
			}
			
			// if (request_type == 'GET') {
			// 	//GET请求需要把所有参数全部签名
			// 	signStr += item + itemVal;
			// 	paraStr += item + '=' + this.urlEncode(itemVal) + '&';
			// } else {
			// 	//POST请求只需要签名参数值不为空并且长度少于50的参数
			// 	if (itemVal && itemVal != '0' && valType !== 'object' && this.getSignStrLen(itemVal) < 50) {
			// 		signStr += item + itemVal;
			// 	}
			// }
		}
		signStr += appSecret; //追加api secret
		// console.log('signStr='+signStr);
		var signVal = md5(signStr).toLowerCase(); //将参数MD5加密
		paraStr += 'sign=' + signVal; //将加密字符加入参数列表
		url += (url.indexOf('?') == -1 ? '?' : '') + paraStr;
		return url;
	},
	/**
	 * 对象排序函数
	 * @param {Array/Object} obj 待排序对象
	 * @return {Array/Object} newObj 已排序对象
	 */
	objKeySort(obj) {
		//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
		var newkey = Object.keys(obj).sort();
		//创建一个新的对象，用于存放排好序的键值对　　
		var newObj = {};
		//遍历newkey数组
		for (var i = 0; i < newkey.length; i++) {
			//向新创建的对象中按照排好的顺序依次增加键值对
			newObj[newkey[i]] = obj[newkey[i]];
		}
		//返回排好序的新对象
		return newObj;
	},
	/**
	 * 获取签名字符串长度
	 * @returns {int}
	 */
	getSignStrLen(str) {
		var strLen = 0;
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
				strLen++;
			} else {
				strLen += 2;
			}
		}
		return strLen;
	},
	/**
	 * 字符串URL编码函数
	 * @param {String} clearString 待编码字符串
	 * @return {String} output 已编码字符串
	 */
	urlEncode(clearString) {
		var output = '';
		var x = 0;
		clearString = clearString.toString();
		var regex = /(^[a-zA-Z0-9-_.]*)/;
		while (x < clearString.length) {
			var match = regex.exec(clearString.substr(x));
			if (match != null && match.length > 1 && match[1] != '') {
				output += match[1];
				x += match[1].length;
			} else {
				if (clearString.substr(x, 1) == ' ') {
					//原文在此用 clearString[x] == ' ' 做判断, 但ie不支持把字符串当作数组来访问, 
					//修改后两种浏览器都可兼容 
					output += '+';
				} else {
					var charCode = clearString.charCodeAt(x);
					var hexVal = charCode.toString(16);
					output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
				}
				x++;
			}
		}
		return output;
	},
	apiUrl,
	thirdLoginUrl
}

export default request
