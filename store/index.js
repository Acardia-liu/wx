import Vue from 'vue'
import Vuex from 'vuex'
import request from '../common/api.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: null,
		accessToken: '',
		kfPhoneNum: '',
		isAuth: false,
		distributor_id: 0,
		h5url: '',
		payurl: '',
		shareConfig: null,
		firstPage: '',
		signPages: {},
		stockNumAmple: 0,
		parent_distributor_id: 0,
		temp_distributor_id: 0,
		identity_required: 0,
		distributor_type_name: '',
		memberList: [],
		lang: '',
		tempShowType: 0, //体温显示值类别，0摄氏度，1华氏度
		needReloadPageData: 0, //是否需要重新加载页面数据
		appVersion: '1.1.2', //当前外部版本
		appInnerVersion: '1', //当前内部部版本，纯数字

		//#ifdef H5
		appType: 'h5',
		//#endif
		//#ifdef MP-WEIXIN
		appType: 'wechat_mini',
		//#endif
		// #ifdef MP-ALIPAY
		appType: 'alipay_mini',
		//#endif
	},
	mutations: {
		setAccessToken(state, newToken) {
			// console.info('newToken='+newToken);
			state.accessToken = newToken;
			uni.setStorageSync('accessToken', newToken)
		},
		setLang(state, newLang) {
			// console.info('newLang='+newLang);
			state.lang = newLang;
			uni.setStorageSync('lang', newLang);
		},
		setTempShowType(state, newData) {
			// console.info('Store-setTempShowType='+newData);
			state.tempShowType = newData;
			uni.setStorageSync('tempShowType', newData);
		},
		setkfPhoneNum(state, newPhone) {
			state.kfPhoneNum = newPhone;
		},
		setIsAuth(state, newFlag) {
			state.isAuth = newFlag;
		},
		setDistributorId(state, newId) {
			state.distributor_id = newId;
		},
		setH5url(state, newVal) {
			state.h5url = newVal;
		},
		setUserInfo(state, newUserInfo) {
			state.userInfo = newUserInfo;
			uni.setStorageSync('userInfo', newUserInfo)
		},
		setShareConfig(state, newConfig) {
			state.shareConfig = newConfig;
		},
		setFirstPage(state, newPage) {
			state.firstPage = newPage;
		},
		setSignPages(state, newPages) {
			state.signPages = newPages;
		},
		setStockNumAmple(state, newNum) {
			state.stockNumAmple = newNum;
		},
		setPayUrl(state, newurl) {
			state.payurl = newurl;
		},
		setParentDistributorId(state, newid) {
			state.parent_distributor_id = newid;
		},
		setTempDistributorId(state, newid) {
			state.temp_distributor_id = newid;
		},
		setIdentityRequired(state, newstatus) {
			state.identity_required = newstatus;
		},
		setDistributorTypeName(state, name) {
			state.distributor_type_name = name;
		},
		setMemberList(state, list) {
			state.memberList = list;
		},
	},
	getters: {
		//是否分销
		getIsDistributionPrice(state) {
			if (state.distributor_id || state.temp_distributor_id) {
				return true;
			} else {
				return false;
			}
		}
	},
	actions: {
		//获取手机号
		getPhoneNum({
			commit
		}) {
			return new Promise((resolve, reject) => {
				request.send('Index/getKfPhoneNum', {}, (data) => {
					commit('setkfPhoneNum', data.KF_CONCAT_PHONE)
					resolve(data)
				})
			})
		},
		getUserInfo() {
			let that = this;
			return new Promise((resolve, reject) => {
				if (that.state.userInfo != null) {
					resolve(that.state.userInfo);
				} else {
					let userInfo = uni.getStorageSync('userInfo');
					that.state.userInfo = userInfo;
					resolve(userInfo);
				}
			})
		},
		getAccessToken() {
			return new Promise((resolve, reject) => {
				resolve(uni.getStorageSync('accessToken'));
			})
		}
	}
})

export default store
