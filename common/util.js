import store from '../store/index.js'
import request from './api.js'

function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

function updateOrderPayStatus(order_id, callback) {
	typeof callback == 'function' && callback();
	request.send('MyOrder/updateOrderPayStatus', {
		order_id
	}, (res) => {
		console.log('修改支付状态为待支付成功')
	});
}

/*微信购票订阅消息授权*/
function showWxSubBuyMsg() {
	return new Promise((resolve, reject) => {
		uni.requestSubscribeMessage({
			tmplIds: ['6oNUfig0cpbZHOCFWf8NyA_3yQnB55XQn_HQeyTDlmw'],
			success: function(data) {
				console.log(data);
				resolve();
			}
		})
	});
}

async function goPay(order_id, callback = null) {
	
	//#ifdef H5
	location.href = store.state.payurl + `PayApi/index?psn=${order_id}&pay_id=1`;
	//#endif
	
	//#ifndef H5
	
	//#ifdef MP-ALIPAY
	let pay_id = 14;
	//#endif
	
	//#ifdef MP-WEIXIN
	let pay_id2 = 13;
	await showWxSubBuyMsg();
	//#endif
	
	request.send(store.state.payurl + 'PayApi/index', {
		psn: order_id,
		pay_id
	}, data => {
		uni.showLoading({
			title: '发起支付中'
		})
		uni.requestPayment({
			//#ifdef MP-ALIPAY
			provider: 'alipay',
			orderInfo: data.tradeNO, //微信、支付宝订单数据
			//#endif
			//#ifdef MP-WEIXIN
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: 'MD5',
			paySign: data.paySign,
			//#endif
			success: function(res) {
				console.log('success:' + JSON.stringify(res));
				//支付宝支付结果判断
				//#ifdef MP-ALIPAY
				if (res.resultCode != 9000 && res.resultCode != 8000 && res.resultCode != 6004) {
					updateOrderPayStatus(order_id, callback);
				}
				//#endif
			},
			fail: function(err) {
				updateOrderPayStatus(order_id, callback);
				console.log('fail:' + JSON.stringify(err));
			},
			complete() {
				uni.redirectTo({
					url: '/pages/myOrder/details?orderId=' + order_id,
				})
			}
		});

	}, null, false, 'GET', true);
	//#endif
}

var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html) { //控制小程序中图片大小
	let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
		match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi,
		'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
	return newContent;
}

/**
 * url参数解析函数
 * ?id=111&name=567  => {id:111,name:567}
 */
function urlParamsParse(url) {
	let obj = {};
	let reg = /[?&][^?&]+=[^?&%]+/g;
	let arr = url.match(reg);
	arr.forEach((item) => {
		let tempArr = item.substring(1).split('=');
		let key = decodeURIComponent(tempArr[0]);
		let val = decodeURIComponent(tempArr[1]);
		obj[key] = val;
	})
	return obj;
}

/**
 * 刷新token
 * @param {Object} tempdid 临时分销商id
 */
function refreshToken(tempdid) {
	return new Promise((resolve, reject) => {
		request.send('Index/refreshToken', {
			did: tempdid
		}, (data) => {
			console.log("refreshToken:" + JSON.stringify(data));
			store.commit('setAccessToken', data.token);
			store.commit('setTempDistributorId', data.did);
			store.commit('setDistributorTypeName', data.distributor_type_name);
			resolve();
		}, (fail) => {
			reject()
		});
	})
}

/**
 * 是否在微信公众号H5里
 */
function isWeixinH5() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	}
	return false;
}

/**
 * 是否在微信小程序H5
 */
function isWeixinMiniProH5() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/miniprogram/i) == "miniprogram") {
		return true;
	}
	return false;
}

/**
 * 判断是否再APP内
 */
function isApp() {
	// #ifdef H5
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/yyzdband/i) == "yyzdband") {
		return true;
	}
	return false;
	// #endif

	// #ifndef H5
	return false;
	// #endif

}

/**
 * 显示顶栏里的返回按钮
 * 一般是在APP里这样操作，因为APP里隐藏了底部菜单
 */
function showNavBackBtn() {
	setTimeout(function() {
		var clsObjs = document.getElementsByClassName("uni-page-head-btn");
		for (var i = 0; i < clsObjs.length; i++) {
			// console.log(clsObjs[i]);
			clsObjs[i].removeAttribute('style');
		}
	}, 400)
}

/**
 * 获取url中的参数
 * @param {Object} path
 * @param {Object} name
 */
function getParam(path, name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(path))
		return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
}

/**
 * 设置度转华氏度
 * @param celsiusVal
 * @return string
 */
function celsiusToFahrenheit(celsiusVal) {
	
	return accAdd(accMul(celsiusVal,1.8),32);
	// return ((((celsiusVal * 100 * 1.8) / 100) + 32) * 100) / 100;
}

/**
 * 温度显示格式化
 * 摄氏度或华氏度，根据全局变量来
 */
function tempShowFormtter(temp) {

	if (temp == '' || temp == null || typeof(temp) == 'undefined') {
		return '';
	}

	if (temp == 0 || parseFloat(temp) == 0) {
		return '-';
	}

	if (store.state.tempShowType == 1) {
		return celsiusToFahrenheit(temp) + ' ℉';
	}
	return temp + ' ℃';
}

/**
 * 获取当前语言
 */
function getLang() {

	//如果是h5里，则从链接里先获取一遍语言
	//#ifdef H5

	//如果链接里有，则优先使用链接里的参数
	let localUrl = location.href;
	let lang = getParam(localUrl, "lang");
	if (lang != '') {
		//设置到store里
		store.commit('setLang', lang);
		return lang;
	}

	//#endif

	let storeLang = store.state.lang;

	//如果是在APP浏览器里，则实时获取当前语言
	if (isApp()) {

		//根据系统来
		let sysLang = getCurrentSystemLanguage();
		if (sysLang != '' && sysLang != null && storeLang != sysLang) {
			//设置到store里
			store.commit('setLang', sysLang);
			return sysLang;
		} else {
			return sysLang;
		}
	}

	//从store里获取，如果没有则再次获取本地缓存

	if (storeLang != '' && storeLang != null) {
		return storeLang;
	} else {

		let localLang = uni.getStorageSync('lang');
		if (localLang != '' && localLang != null) {
			//设置到store里
			store.commit('setLang', localLang);
			return localLang;
		}
	}

	//本地缓存没有，则根据系统来
	let sysLang = getCurrentSystemLanguage();
	if (sysLang != '' && sysLang != null) {
		//设置到store里
		store.commit('setLang', sysLang);
		return sysLang;
	}

	return 'zh-cn';
}

/**
 * 获取当前系统语言
 */
function getCurrentSystemLanguage() {

	//如果是h5里
	//#ifdef H5

	//本地缓存没有，则根据系统来
	let ua = navigator.userAgent.toLowerCase();
	if (ua.match(/lang=zh-tw/i) == "lang=zh-tw") {
		return 'zh-tw';
	} else if (ua.match(/lang=en-us/i) == "lang=en-us") {
		return 'en-us';
	} else {
		return 'zh-cn';
	}

	//#endif

	//#ifdef MP-WEIXIN

	let sysInfo = uni.getSystemInfoSync();
	let sysLang = sysInfo.language;
	console.log('mp-sys-lang=' + sysLang);

	if (sysLang == 'zh_CN' || sysLang == '') {
		return 'zh-cn';
	} else if (sysLang == 'en_US') {
		return 'en-us';
	}

	return 'zh-cn';

	//#endif

	return 'zh-cn';

}

// 两个浮点数求和
function accAdd(num1, num2) {
	var r1, r2, m;
	try {
		r1 = num1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = num2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	// return (num1*m+num2*m)/m;
	return Math.round(num1 * m + num2 * m) / m;
}

// 两个浮点数相减
function accSub(num1, num2) {
	var r1, r2, m;
	try {
		r1 = num1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = num2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
}

// 两数相除
function accDiv(num1, num2) {
	var t1, t2, r1, r2;
	try {
		t1 = num1.toString().split('.')[1].length;
	} catch (e) {
		t1 = 0;
	}
	try {
		t2 = num2.toString().split(".")[1].length;
	} catch (e) {
		t2 = 0;
	}
	r1 = Number(num1.toString().replace(".", ""));
	r2 = Number(num2.toString().replace(".", ""));
	return (r1 / r2) * Math.pow(10, t2 - t1);
}

// 相乘
function accMul(num1, num2) {
	var m = 0,
		s1 = num1.toString(),
		s2 = num2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {};
	try {
		m += s2.split(".")[1].length
	} catch (e) {};
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	goPay,
	formatRichText,
	urlParamsParse,
	refreshToken,
	isWeixinH5,
	isWeixinMiniProH5,
	isApp,
	showNavBackBtn,
	getLang,
	tempShowFormtter
}
