import request from './api.js'
import jweixin from 'jweixin-module'
import qs from 'qs';
import store from '../store/index.js'
export default {
	//获取配置
	getSdkConfig() {
		let url = uni.getSystemInfoSync().platform === 'ios' ? location.origin + store.state.firstPage : window.location.href;
		return new Promise((resolve, reject) => {
			//已经签名过的页面就不再请求签名
			if (store.state.signPages[url]) {
				resolve(store.state.signPages[url]);
			} else {
				request.send('WechatJSSDK/getConfig', {
					url: url,
					mp_id:1
				}, (data) => {
					store.commit('setSignPages', { ...store.state.signPages,
						[url]: data.data
					})
					resolve(data.data);
				}, null, true);
			}
		})
	},
	//初始化
	async initJsSdk() {
		let config = await this.getSdkConfig();
		//jssdk初始化
		jweixin.config(config);

		jweixin.error(function(res) {
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			// uni.showToast({
			// 	title: 'jssdk 遇到错误:' + res.errMsg,
			// 	icon: 'none'
			// })
		});
		jweixin.hideMenuItems({
			menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});
	},
	//分享
	async share(sharedData = {}) {

		return;

		await this.initJsSdk();
		let defaultShare = {
			title: store.state.shareConfig.title, // 分享标题
			desc: store.state.shareConfig.desc, // 分享描述
			link: this.filterQuery(), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: store.state.shareConfig.image, // 分享图标
			success() {}
		}
		sharedData = Object.assign({}, defaultShare, sharedData)
		jweixin.ready(function() {
			//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
			jweixin.updateAppMessageShareData(sharedData)
			//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
			jweixin.updateTimelineShareData(sharedData)
		});
	},
	//过滤参数
	filterQuery() {
		let seachUrl = location.href.split('?');
		let seachObj = qs.parse(seachUrl[1] || {});
		let deleteKey = ['diyfrom', 'unionid', 'headimgurl', 'nickname', 'sex', 'openid', 'distributor_id'];
		for (let i in seachObj) {
			if (deleteKey.includes(i)) {
				delete seachObj[i]
			}
		}
		//如果distributor_id大于0 增加到分享参数里
		if (store.state.distributor_id) {
			seachObj.did = store.state.distributor_id;
		}
		// 分享链接！这里是关键 因为微信会把我们分享的链接截取掉 我在这里手动拼接上
		return location.origin + '?' + qs.stringify(seachObj);
	},
	//打开位置
	async openLocation(data) {
		await this.initJsSdk();
		//data内容
		// {
		//   latitude: 0, // 纬度，浮点数，范围为90 ~ -90
		//   longitude: 0, // 经度，浮点数，范围为180 ~ -180。
		//   name: '', // 位置名
		//   address: '', // 地址详情说明
		//   scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
		//   infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
		// }
		jweixin.openLocation(data);
	},
	//分享
	async scanQRCode(config = {}, success = null) {

		await this.initJsSdk();

		jweixin.ready(function() {

			console.log('jweixin.ready');

			jweixin.scanQRCode({
				needResult: config.needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: config.scanType, // 可以指定扫二维码还是一维码，默认二者都有
				success: function(res) {
					success(res)
				}
			});

		});
	},

}
