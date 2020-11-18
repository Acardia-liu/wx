import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import request from './common/api.js'
import {tempShowFormtter} from './common/util.js'

// 多语言
import VueI18n from 'vue-i18n'  
import messages from './common/lang.js'
Vue.use(VueI18n)

const i18n = new VueI18n({  
  locale: 'zh-cn',  // 默认选择的语言
  messages 
})
Vue.prototype._i18n = i18n;

Vue.config.productionTip = false
App.mpType = 'app'


Vue.prototype.$request = request;
Vue.prototype.tempShowFormtter = tempShowFormtter;

//#ifdef H5
import wechat from './common/wechat.js'
Vue.prototype.$wechat = wechat;
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
//#endif  
 
const app = new Vue({
	i18n,
	...App,
	store
})
app.$mount()
