<template>
	<view>
		<scroll-view>
			<view>
				<view class="last">
					<view class="lastBox">
						<image class="image" mode="aspectFill" :src="lastDetailDataList.headimg_url_show==''?defaultImage:lastDetailDataList.headimg_url_show" />
						<view clas="in-box-l">
							<view class="content-box-text-l">{{lastDetailDataList.nickname==null?defaultName:lastDetailDataList.nickname}}</view>
							<view class="content-box-text-la">{{lastDetailDataList.create_times}}</view>
						</view>
						<!-- <button v-show="is_exist!=3" @click="clickBut()" class="mini-button" type="primary" size="mini" :disabled="is_exist==false?flag:true">{{is_exist==false?onClicked:Click}}</button> -->
						<button :style="is_exist===true?'background-color:#f0f0f0;color:#a8a8a8':'background-color:#008dff;'" v-show="is_exist!=3" @click="clickBut()" hover-class='none' style="border: none;
								background-color: #008dff; max-width: 138rpx;
								height: 52rpx;
								font-size: 12px;
								margin-left: 280rpx;
								margin-top: 22px;
								color: #FFFFFF;
								border-radius: 60rpx;"
						 size="mini" :disabled="is_exist==false?flag:true" >{{is_exist==false?onClicked:Click}}</button>
					</view>
					<view class="in-text">
						{{lastDetailDataList.content}}
						<!-- {{utf16toEntities(lastDetailDataList.content)}}
						{{uncodeUtf16(utf16toEntities(lastDetailDataList.content))}} -->

					</view>
					<view v-show="lastDetailDataList.img_urls_show != 0">
						<image class="last-image" mode="aspectFill" :src="lastDetailDataList.img_urls_show" @error="setImg"></image>
					</view>

					<view class="address" v-show="lastDetailDataList.address!==null&&lastDetailDataList.address!==''">
						<image class="image-address" src="/static/images/discovery/icon-address.png" mode="aspectFill"></image>
						<view class="address-font">{{lastDetailDataList.address}}</view>
					</view>
				</view>
			</view>
			<view>
				<view class="textBar">
					<view class="textContext">评论</view>
					<view class="img-box">
						<image class="image-tubiao" src="/static/images/discovery/icon-chakan2.png" mode="aspectFill">{{lastDetailDataList.look_num}}</image>
						<image class="image-tubiao" src="/static/images/discovery/icon-dianzan.png" mode="aspectFill">{{lastDetailDataList.like_num}}</image>
					</view>
				</view>
				<view class="example-body" v-for="item in DetailDataList" :key="item.id">
					<view class="image-box">
						<image class="image" mode="aspectFill" :src="item.headimg_url_show" />
						<view class="in-box">
							<view class="content-box-text">{{item.nickname}}</view>
							<view class="content-box-texta">{{item.create_time_text}}</view>
						</view>
					</view>
					<view class="content-box">
						<view class="content-box-textb">{{item.content}}</view>
					</view>
					<view class="block"></view>
				</view>
				<view class="comment-box">
					<input v-model="inputValue" class="comment" :cursor="1000" type="text" placeholder="说点什么吧..." style="text-indent: 10rpx;"></input>
					<view class="last-box">
						<image class="image-smile" src="/static/images/discovery/icon-smile.png"></image>
						<view class="font" @click="postComment()">发送</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components: {
			uniCard,
			uniSection
		},
		data() {
			return {
				inputValue: "",
				defaultImage: '/static/images/discovery/icon-default.png',
				lastDetailDataList: [],
				DetailDataList: [],
				releaseDynamic: [],
				onClicked: "+关注",
				Click: "已关注",
				defaultName: "系统默认赋值",
				flag: false,
				current: 0,
				id_num: 0,
				id_comment: 0,
				is_exist: false,
				id: 0,
				vip_user_id: 0,
				like_num: 0,
				current_id: 0
			};
		},
		onLoad(option) {
			// this.getActivityType(),
			// 	uni.getSystemInfo({
			// 		success: function(res) {
			// 			// console.log(res.windowHeight);
			// 			this.height_Num = res.windowHeight + 100
			// 			console.log(this.height_Num)
			// 		}
			// 	});
			this.id = option.id
			this.vip_user_id = option.vip_user_id
			this.getActivityType()
			console.log(option.id + "+++++++++++++");

		},
		onPullDownRefresh() {
			console.log("下拉刷新了")
			console.log(this.DetailDataList.length);
			// this.current_id = 1
			// this.followDataListD = []
			setTimeout(() => {
				this.getActivityType(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
		},
		onShareAppMessage(e) {
			let title = '---分享成功---'
			return {
				title: title,
				path: 'pages/discovery/detail?id='+this.id
			}
		},
		// onReachBottom() {
		// 	console.log("触底了")
		// 	this.current_id++
		// 	this.getActivityType()
		// },
		// onPullDownRefresh() {
		// 	console.log("下拉刷新了")
		// 	console.log(this.DetailDataList.length);
		// 	this.current_id = 1
		// 	this.DetailDataList = []
		// 	// this.followDataListD = []
		// 	setTimeout(() => {
		// 		this.getActivityType(() => {
		// 			uni.stopPullDownRefresh()
		// 		})
		// 	}, 800)
		// },
		methods: {
			//表情转码
			//       utf16toEntities(str) {
			//             var patt=/[\ud800-\udbff][\udc00-\udfff]/g;
			//             // 检测utf16字符正则
			//             str = str.replace(patt, function(char){
			//                 var H, L, code;
			//                 if (char.length===2) {
			//                     H = char.charCodeAt(0);
			//                     // 取出高位
			//                     L = char.charCodeAt(1);
			//                     // 取出低位
			//                     code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
			//                     // 转换算法
			//                     var ss = "&#" + code + ";";
			//                     return ss;
			//                 } else {
			//                     return char;
			//                 }
			//             });
			//             return str;
			//         },

			//     //表情解码
			//      uncodeUtf16(str){
			//             var reg = /\&#.*?;/g;
			//             var result = str.replace(reg,function(char){
			//                 var H,L,code;
			//                 if(char.length == 9 ){
			//                     code = parseInt(char.match(/[0-9]+/g));
			//                     H = Math.floor((code-0x10000) / 0x400)+0xD800;
			//                     L = (code - 0x10000) % 0x400 + 0xDC00;
			//                     return unescape("%u"+H.toString(16)+"%u"+L.toString(16));
			//                 }else{
			//                     return char;
			//                 }
			//             });
			//             return result;
			//         },
			setImg() {
				this.lastDetailDataList.img_urls_show = '/static/images/discovery/icon-default.png'
			},
			clickBut() {
				let that = this;
				that.flag = true;
				let obj = that.lastDetailDataList;
				let id = obj.vip_user_id;
				console.log("++++++++");
				console.log(id);
				that.$request.send(
					'vip/User/userFollow', {
						id: id,
						type: 2
					},
					data => {
						if (data.code == 1) {
							that.onClicked = "已关注"
						}
						that.is_exist = data.exist
					}
				);
			},
			clickCard() {
				console.log("++++++++++");
			},
			getActivityType() {
				uni.showLoading({
					title: this.$t('loading')
				});
				// let id = this.id

				this.$request.send(
					'vip/Find/getDynamicDetail', {
						current: this.current_id,
						id: this.id
					},
					data => {
						if (data.code == 1) {
							this.DetailDataList = data.data.comment_list;
							this.lastDetailDataList = data.data
							this.like_num = data.data.like_num
							this.is_exist = data.data.is_exist
							this.id_comment = data.data.id
							// console.log(data)
							console.log(this.DetailDataList);
						}
					}
				);
			},
			postComment() {
				let that = this;
				let obj = that.releaseDynamic;
				let id = this.id_comment;
				uni.showLoading({
					title: that.$t('loading')
				});
				// let id = this.id
				that.$request.send(
					'vip/Find/releaseDynamic', {
						dynamic_id: id,
						content: that.inputValue
					},
					data => {
						if (data.code == 1) {
							that.releaseDynamic = data.data;
							that.getActivityType()
							console.log(that.releaseDynamic);
							that.inputValue = '';
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss">
	page {
		margin-bottom: 50px;
	}
	.example-body {
		display: block;
		padding: 2px 0;
		border-bottom: #EEE9E9 1px solid;
		background-color: #FFFFFF;
		// margin-bottom: 10px;
	}

	.last {
		background-color: #FFFFFF;
	}

	.example-box {
		margin: 12px 0;
	}

	.lastBox {
		// border-top: #EDEDED 3px solid;
		display: flex;
		background-color: #FFFFFF;
	}

	.content-box-text-l {
		margin-top: 15px;
		margin-left: 5px;
	}

	.content-box-text-la {
		margin-top: 5px;
		margin-left: 5px;
		font-size: 12px;
		margin-bottom: 20px;
		color: #8B8386;
	}

	// .mini-button {
	// 	width: 80px;
	// 	height: 100%;
	// 	font-size: 12px;
	// 	margin-left: 250rpx;
	// 	margin-top: 22px;
	// 	color: #FFFFFF;
	// 	border-radius: 18px;
	// 	// font-size: 22rpx;
	// 	// width: 126rpx;
	// 	// height: 40rpx;
	// 	// padding-top: 15rpx;
	// 	// font-weight: bold;
	// 	// text-align: center;
	// 	// border-radius: 28rpx;
	// 	// color: #a4a4a4;
	// 	// border:1px solid #f0f0f0;
	// 	// background-color: #f0f0f0;
	// 	// margin-left: 280rpx;
	// 	// margin-top: 40rpx;
	// }

	.textBar {
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-bottom: #EEE9E9 1px solid;
		margin-top: 10px;
	}

	.textContext {
		width: 100%;
		flex-direction: row;
		margin-left: 15px;
		margin-top: 10px;
		font-size: 16px;
		font-weight: bold;
	}

	.img-box {
		display: flex;
		margin-top: 8px;
		margin-right: 20px;
		margin-block-end: 10px;
		margin-block-start: 10px;
	}

	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		height: 100%;
		width: 100%;
		overflow: hidden;

	}

	.in-box {
		margin: 10px;
	}

	.in-text {
		margin-left: 15px;
		padding-bottom: 15px;
		margin-bottom: 10px;
		background-color: #FFFFFF;
	}

	.address {
		display: flex;
		color: #008DDF;
		font-size: 12px;
		margin-left: 15px;
		margin-top: 15px;
		margin-bottom: 15px;
	}

	.address-font {
		font-size: 12px;
	}

	.image-address {
		margin-bottom: 10px;
		max-width: 22px;
		max-height: 17px;
	}

	.image-tubiao {
		max-width: 22px;
		max-height: 22px;

		margin-left: 15px;
		flex: 1;
	}

	.image {
		max-width: 45px;
		max-height: 45px;
		margin-top: 10px;
		margin-left: 15px;
		flex: 1;
		border-radius: 45rpx;
		// border-radius: 100px 100px 	100px 100px;
	}

	.last-image {
		width: 120px;
		height: 120px;
		margin-top: 8px;
		margin-left: 15px;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.block {
		// margin-top: 40px;
		// padding-top: 100px;
		// margin-top: -60px;
	}

	.content-box-texta {
		font-size: 12px;
		line-height: 15px;
		padding-top: 11px;
		color: #8B8386;
	}

	.content-box-text {
		font-size: 14px;
		line-height: 100%;
	}

	.content-box-textb {
		font-size: 14px;
		line-height: 22px;
		margin-left: 70px;
		margin-bottom: 22px;
	}

	.comment-box {
		display: flex;
		background-color: #f7f8fa;
		height: 55px;
		width: 100%;
		position: fixed;
		bottom: var(--window-bottom, 0);
		box-shadow:5px 5px 10px rgba(0,0,0,0.6);
	}

	.comment {
		margin-top: 10rpx;
		margin-left: 30rpx;
		padding-left: 20rpx;
		width: 540rpx;
		height: 80rpx;
		border-radius: 36rpx;
		background-color: #FFFFFF;
		font-size: 14px;
	}

	.last-box {
		display: flex;
		margin-top: 32rpx;
		margin-left: 12rpx;
	}

	.image-smile {
		width: 26px;
		height: 26px;
		margin-right: 5px;
	}

	.font {
		margin-top: 2rpx;
		color: #323233;
	}
	.blue{
		background-color: #008dff;
	}
	.grey{
		background-color: #f0f0f0;
	}
</style>
