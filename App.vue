<script>
import { thirdLoginUrl } from './common/api.js';

import { urlParamsParse, refreshToken, isWeixinH5, isWeixinMiniProH5, isApp, showNavBackBtn, getLang } from './common/util.js';

import { mapMutations } from 'vuex';
// #ifdef H5
// 引入 page-animation 组件
import pageAnimation from 'components/Michael-pageAnimationPlus/index.vue';
//#endif
export default {
	// #ifdef H5
	mixins: [pageAnimation],
	//#endif
	async onLaunch(e) {
		console.log('app.vue - init');

		// console.log(uni.getSystemInfoSync());

		//设置系统语言
		let lan = getLang();
		console.log('lan=' + lan);
		this.$i18n.locale = lan;



		//设置体温默认类型 1摄氏度，2华氏度
		let tempShowType = uni.getStorageSync('tempShowType');
		console.log('getStorageSync-tempShowType=' + tempShowType);
		if (tempShowType != '' && tempShowType != null && typeof tempShowType != 'undefined') {
			console.log('tempShowType=' + tempShowType);
			this.setTempShowType(tempShowType);
		}

		//console.log("onLaunch");
		//#ifdef H5
		uni.getSystemInfoSync().platform === 'ios' && this.setFirstPage(this.$route.fullPath);

		let appLoginToken = e.query.loginToken || '';
		// console.log('loginToken=' + appLoginToken);
		if (appLoginToken != '' && appLoginToken != null && appLoginToken != 'undefined') {
			uni.setStorageSync('appLoginToken', appLoginToken);

			//如果用户信息不存在，则根据appLoginToken获取信息
			this.setAccessToken(appLoginToken);

			//根据token得到用户信息返回
			this.getCurrentLoginUserInfo();
		}

		// console.log('isWeixinH5=' + isWeixinH5());
		// console.log('isWeixinMiniProH5=' + isWeixinMiniProH5());
		// console.log('userAgent=' + navigator.userAgent.toLowerCase());

		if (isWeixinH5()) {
			let userInfo = await this.$store.dispatch('getUserInfo');
			let seachObj = userInfo || e.query;

			// console.log('seachObj.from:' + seachObj.from);
			if (seachObj.from == 'wechatCallBack') {
				!userInfo && this.setUserInfo(seachObj);
				//登录
				this.loginApi('h5', {
					unionid: seachObj.unionid,
					openid: seachObj.openid,
					did: e.query.did || 0
				});
			} else {
				var nowHerf = window.location.href;
				var needcallbackurl = encodeURIComponent(encodeURIComponent(nowHerf));
				let authUrl = window.location.origin + '/wechatapi/WechatOauth/UserAuthorizeWechatLogin/mp_id/2' + `/needcallbackurl/${needcallbackurl}`;
				// console.log('authUrl=' + authUrl);
				// location.replace(authUrl)
			}
		} else if (isApp()) {
			uni.hideTabBar();
		}

		//#endif

		// #ifdef MP
		//todo 增加微信小程序热更新代码

		//#endif
	},
	onShow(e) {
		console.log('App Show 1');

		// #ifdef H5
		
		// let reloadVersion = e.query.reloadVersion || '';
		// //如果链接里不是重新加载进来的
		// if(reloadVersion == ''){
			
		// 	//在H5获取本机应用版本号
		// 	let appVersion = this.$store.state.appVersion;
		// 	this.$request.send('vip/Config/getConfig', { v: appVersion, req_plat: 'h5' }, res => {
		// 		let h5OnlineVersion = res.data.h5VipOnlineVersion || '';
		// 		console.log('res');
		// 		if (appVersion != h5OnlineVersion) {
		// 			//如果服务器版本和当前本地版本不一样，则刷新页面
		// 			window.location.reload(true);
		// 			this.$store.state.appVersion = h5OnlineVersion;
		// 		}
		// 	});
			
		// }
		
		
		// #endif
	},
	onHide: function(e) {
		console.log('App Hide 2');
	},
	methods: {
		...mapMutations(['setFirstPage', 'setAccessToken', 'setUserInfo', 'setShareConfig', 'setParentDistributorId', 'setTempDistributorId', 'setTempShowType']),

		/**
		 * 得到当前登录的用户信息，存储到本地缓存里
		 */
		getCurrentLoginUserInfo() {
			this.$request.send('vip/User/getCurrentLoginUserInfo', {}, res => {
				res.data && this.setUserInfo(res.data);
			});
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css  */
@import './common/uni.css';
@import './common/base.scss';
@import './common/imgs-base64.css';
//引入字体图标
@import url("./common/iconfont.css");
</style>
