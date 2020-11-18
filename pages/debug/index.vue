<template>
	<view>
		<button type="primary" @click="clearStorage">清除本地缓存</button>
		<button class="aui-btn aui-btn-blue" @click.top="showActionmenu($event)" data-title="上传图片" data-location="bottom" data-theme="1" data-cancel="取消">底部非全屏弹出菜单</button>
		<button class="aui-btn aui-btn-blue" @click.top="showActionmenu($event)" data-title="上传图片" data-location="middle" data-theme="1">页面中心非全屏弹出菜单</button>
		<button class="aui-btn aui-btn-blue" @click.top="showActionmenu($event)" data-title=" " data-location="bottom" data-theme="2" data-cancel="取消">底部全屏弹出菜单</button>
		<button class="aui-btn aui-btn-blue" @click.top="showActionmenu($event)" data-title=" " data-location="bottom" data-theme="2" data-cancel="取消" data-noicon="yes">底部全屏弹出菜单（无图标）</button>
		<aui-actionmenu
		    ref="actionmenu"
		    :title="auiActionmenu.title"
		    :mask="auiActionmenu.mask"
		    :maskTapClose="auiActionmenu.maskTapClose"
		    :items="auiActionmenu.items"
		    :location="auiActionmenu.location"
		    :theme="auiActionmenu.theme"
		    :cancel="auiActionmenu.cancel"
		    @callback="actionmenuCallback"
		></aui-actionmenu>
	</view>
</template>

<script>
	// import {aui} from '@/common/aui/js/aui.js';
	import auiActionmenu from '@/components/aui-actionmenu/aui-actionmenu.vue';
	export default {
	  components: {
	    auiActionmenu
	  },
	  data() {
	    return {
	      auiActionmenu: {
	        title: '',
	        mask: true,
	        theme: 1,
	        location: 'bottom',
	        items: [
	            {name: '微信', icon: 'iconweixin', iconColor: '#1AA034'},
	            {name: '朋友圈', icon: 'iconpengyouquan', iconColor: '#EB3C3B'},
	            {name: 'QQ', icon: 'iconqq', iconColor: '#30A5DD'},
	            {name: '微博', icon: 'iconweibo', iconColor: '#FF7C60'}
	        ],
	        cancel: '取消'
	      }
	    }
	  },
	  onLoad() {
	
	  },
	  methods: {
	       showActionmenu(e){
	        var _this = this;
	        aui.isDefine(e.currentTarget.dataset.title) ? _this.auiActionmenu.title = e.currentTarget.dataset.title : _this.auiActionmenu.title = '';
	        aui.isDefine(e.currentTarget.dataset.location) ? _this.auiActionmenu.location = e.currentTarget.dataset.location : _this.auiActionmenu.location = 'bottom';
	        aui.isDefine(e.currentTarget.dataset.theme) ? _this.auiActionmenu.theme = Number(e.currentTarget.dataset.theme) : _this.auiActionmenu.theme = 1;
	        aui.isDefine(e.currentTarget.dataset.cancel) ? _this.auiActionmenu.cancel = e.currentTarget.dataset.cancel : _this.auiActionmenu.cancel = '';
	        if(e.currentTarget.dataset.noicon == 'yes')
	        {
	            _this.auiActionmenu.items = [
	                {name: '微信'},
	                {name: '朋友圈'},
	                {name: 'QQ'},
	                {name: '微博'}
	            ];
	        }
	        else{
	            _this.auiActionmenu.items = [
	                {name: '微信', icon: 'iconweixin', iconColor: '#1AA034'},
	                {name: '朋友圈', icon: 'iconpengyouquan', iconColor: '#EB3C3B'},
	                {name: 'QQ', icon: 'iconqq', iconColor: '#30A5DD'},
	                {name: '微博', icon: 'iconweibo', iconColor: '#FF7C60'}
	            ];
	        }
	        _this.$refs.actionmenu.show();
	       },
	       actionmenuCallback(e){
	        var _this = this;
	        console.log(e);
	        _this.auiToast.msg = '您点击了' + e.msg;
	        _this.$refs.toast.show();   
	       }
	  }
	}
</script>

<style>

</style>
