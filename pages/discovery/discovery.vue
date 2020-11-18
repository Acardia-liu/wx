<template>
	<view>
		<view class="contentA">
			<mSearch @search="search($event,1)"></mSearch>
			<!-- 搜索的值：{{val0}} -->
			<view>
				<uni-segmented-control :current="currentA" :values="itemsA" @clickItem="onClickItemA" style-type="text"
				 active-color="#008DFF">
				</uni-segmented-control>
				<view class="contentA">
					<view v-if="currentA === 0">
						<scroll-view>
							<view v-if="followList.length==0?'flag':''">
								<image src="/static/images/equipment/equipment.png" style="
				                			max-width: 120px;
				                			max-height: 120px;
				                			margin: 300rpx 250rpx 150rpx ;
				                			position: fixed;
				                			">
									<view style="
				                			position: fixed;
				                			margin:560rpx 284rpx 0; 
				                			color:#8A8A8A ;">暂无更多数据
									</view>
								</image>
							</view>
							<!-- </uni-section> -->
							<view class="example-body" v-for="(item,index) in followList" :key="index">
								<uni-card :isShadow="true" :title="item.nickname==null?defaultName:item.nickname" :subTitle="item.create_times"
								 mode="title" :thumbnail="item.headimg_url_show==''?defaultImage:item.headimg_url_show" extra="图片" note="true" @click="clickCardA(index)">
									<view>
										<view class="image-box" v-show="item.img_urls_show.length != 0">
											<view class="content-box-text">{{item.address}}</view>
											<image class="image" mode="aspectFill" :src="item.img_urls_show[id]" />
										</view>
										<view class="content-box">
											<view class="content-box">
												<view class="content-box-texta">{{item.content}}</view>
											</view>
										</view>
									</view>
									<template slot="footer">
										<view class="footer-box">
											<view @click.stop="footerClickA(index)" class="dibulan">
												<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-dianzan.png"
												 mode="aspectFill"></image>
												<view class="footer-box__item">
													{{item.like_num}}
												</view>
											</view>
											<view @click.stop="footerClickB(item.id)" class="dibulan">
												<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-pinglun.png"
												 mode="aspectFill"></image>
												<view class="footer-box__item">
													{{item.comments_num}}
												</view>
											</view>
											<view @click.stop="footerClickB(item.id)" class="dibulan">
												<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-chakan2.png"
												 mode="aspectFill"></image>
												<view class="footer-box__item">
													{{item.look_num}}
												</view>
											</view>
										</view>
									</template>
								</uni-card>
							</view>
						</scroll-view>
					</view>
					<view v-if="currentA === 1">
						<scroll-view>
							<view>
								<view class="perch" style="margin-top: 15px;"></view>
								<view style="width: 92%;margin: auto;">
									<uni-segmented-control class="uni-segmented-style" :current="current" :values="items" @clickItem="onClickItem" style-type="button"
									 active-color="#008dff">
									</uni-segmented-control>
								</view>
								<view class="content">
									<view v-if="current === 0">
										<view v-if="followDataList.length==0?'flag':''">
											<image src="/static/images/equipment/equipment.png" style="
														max-width: 120px;
														max-height: 120px;
														margin: 300rpx 250rpx 150rpx ;
														position: fixed;
														">
												<view style="
														position: fixed;
														margin:560rpx 284rpx 0; 
														color:#8A8A8A ;">暂无更多数据
												</view>
											</image>
										</view>
										<view class="example-body" v-for="(item,index) in followDataList" :key="index">
											<uni-card :isShadow="true" :title="item.nickname==null?defaultName:item.nickname" :subTitle="item.create_times"
											 mode="title" :thumbnail="item.headimg_url_show==''?defaultImage:item.headimg_url_show" :extra="(item.is_exist!=3)?(item.is_exist==false?'+关注':'已关注'):null" note="true" @click="clickCardA(index)">
												<view>
													<view class="content-box-texta">{{item.content}}</view>
													<view class="image-box" v-show="item.img_urls_show.length != 0">
														<image class="image" mode="aspectFill" :src="item.img_urls_show[id]" />
													</view>
													<view class="content-box">
														<!-- <view>用户id为+++++++{{item.id}}+++</view> -->
														<view class="content-box-text" v-show="item.address!==null">{{item.address}}</view>
													</view>
												</view>
												<template slot="footer">
													<view class="footer-box">
														<view @click.stop="footerClickA(index)" class="dibulan">
															<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-dianzan.png"
															 mode="aspectFill"></image>
															<view class="footer-box__item">
																{{item.like_num}}
															</view>
														</view>
														<view @click.stop="footerClickB(item.id)" class="dibulan">
															<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-pinglun.png"
															 mode="aspectFill"></image>
															<view class="footer-box__item">
																{{item.comments_num}}
															</view>
														</view>
														<view @click.stop="footerClickB(item.id)" class="dibulan">
															<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-chakan2.png"
															 mode="aspectFill"></image>
															<view class="footer-box__item">
																{{item.look_num}}
															</view>
														</view>
													</view>
												</template>
											</uni-card>
										</view>
									</view>
									<view v-if="current === 1">
										<scroll-view>
											<view v-if="followDataListC.length==0?'flag':''">
												<image src="/static/images/equipment/equipment.png" style="
				                							max-width: 120px;
				                							max-height: 120px;
				                							margin: 300rpx 250rpx 150rpx ;
				                							position: fixed;
				                							">
													<view style="
				                							position: fixed;
				                							margin:560rpx 284rpx 0; 
				                							color:#8A8A8A ;">暂无更多数据
													</view>
												</image>
											</view>
											</uni-section>
											<view class="example-body" v-for="(item,index) in followDataListC" :key="index">
												<uni-card :isShadow="true" :title="item.nickname==null?defaultName:item.nickname" :subTitle="item.create_times"
												 mode="title" :thumbnail="item.headimg_url_show==''?defaultImage:item.headimg_url_show" extra="已关注" note="true" @click="clickCardC(index)">
													<view>
														<view class="content-box-texta">{{item.content}}</view>
														<view class="image-box" v-show="item.img_urls_show.length != 0">
															<image class="image" mode="aspectFill" :src="item.img_urls_show[id]" />
														</view>
														<view class="content-box">
															<view class="content-box">
																<!-- <view>用户id为+++++++{{item.id}}+++</view> -->
																<view class="content-box-text">{{item.address}}</view>
															</view>
														</view>
													</view>
													<template slot="footer">
														<view class="footer-box">
															<view @click.stop="footerClickC(index)" class="dibulan">
																<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-dianzan.png"
																 mode="aspectFill"></image>
																<view class="footer-box__item">
																	{{item.like_num}}
																</view>
															</view>
															<view @click.stop="footerClickB(item.id)" class="dibulan">
																<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-pinglun.png"
																 mode="aspectFill"></image>
																<view class="footer-box__item">
																	{{item.comments_num}}
																</view>
															</view>
															<view @click.stop="footerClickB(item.id)" class="dibulan">
																<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-chakan2.png"
																 mode="aspectFill"></image>
																<view class="footer-box__item">
																	{{item.look_num}}
																</view>
															</view>
														</view>
													</template>
												</uni-card>
											</view>
										</scroll-view>
									</view>
									<view v-if="current === 2">
										<view v-if="followDataListD.length==0?'flag':''">
											<image src="/static/images/equipment/equipment.png" style="
														max-width: 120px;
														max-height: 120px;
														margin: 300rpx 250rpx 150rpx ;
														position: fixed;
														">
												<view style="
														position: fixed;
														margin:560rpx 284rpx 0; 
														color:#8A8A8A ;">暂无更多数据
												</view>
											</image>
										</view>
										<view class="example-body" v-for="(item,index) in followDataListD" :key="index">
											<uni-card :isShadow="true" :title="item.nickname==null?defaultName:item.nickname" :subTitle="item.create_times"
											 mode="title" :thumbnail="item.headimg_url_show==''?defaultImage:item.headimg_url_show" note="true" @click="clickCardD(index)">
												<view>
													<view class="content-box-texta">{{item.content}}</view>
													<view class="image-box" v-show="item.img_urls_show.length != 0">
														<image class="image" mode="aspectFill" :src="item.img_urls_show[id]" />
													</view>
													<view class="content-box">
														<!-- <view>用户id为+++++++{{item.id}}+++</view> -->
														<view class="content-box-text">{{item.address}}</view>
													</view>
												</view>
												<template slot="footer">
													<view class="footer-box">
														<view @click.stop="footerClickD(index)" class="dibulan">
															<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-dianzan.png"
															 mode="aspectFill"></image>
															<view class="footer-box__item">
																{{item.like_num}}
															</view>
														</view>
														<view @click.stop="footerClickB(item.id)" class="dibulan">
															<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-pinglun.png"
															 mode="aspectFill"></image>
															<view class="footer-box__item">
																{{item.comments_num}}
															</view>
														</view>
														<view @click.stop="footerClickB(item.id)" class="dibulan">
															<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-chakan2.png"
															 mode="aspectFill"></image>
															<view class="footer-box__item">
																{{item.look_num}}
															</view>
														</view>
													</view>
												</template>
											</uni-card>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<button class="buttonB" @click="toggleMask('show')">
						<!-- <button class="buttonB" @click="confirm()"> -->
							<view class="button-box">
								<image class="button-image" mode="aspectFill" src="/static/images/discovery/icon-fabu.png"></image>
								<view class="button-font">发布</view>
							</view>
						</button>
						<ygc-comment ref="ygcComment" :placeholder="'分享新鲜事'" @pubComment="topubComment"></ygc-comment>
						<!-- <text>{{commentContent}}</text> -->
					</view>
					<view class="isOver" v-if="flag2">没有更多数据了</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import ygcComment from '@/components/ygc-comment/ygc-comment.vue';
	export default {
		components: {
			mSearch,
			uniCard,
			uniSection,
			uniSegmentedControl,
			uniTag,
			ygcComment
		},
		data() {
			return {
				idA: 1,
				val0: '',
				placeholder: '动态占位内容',
				index: 0,
				id: 0,
				currA: 0,
				currB: 0,
				current_id: 1,
				currentA: 0,
				current: 0,
				page: 0,
				type: 1,
				pageB: 0,
				flag2: false,
				flag: false,
				total1:1,
				total:1,
				total3:1,
				total4:1,
				pageC: 0,
				count: 0,
				pageD: 0,
				height_Num: 0,
				defaultName: "系统默认赋值",
				defaultImage: '/static/images/discovery/icon-default.png',
				// pageindex:1,
				items: ['全部', '关注', '我的'],
				itemsA: ['资讯', '动态'],
				current: 0,
				followDataList: [],
				followDataListC: [],
				followDataListD: [],
				followList: [],
				Tips: ['点赞', '评论', '分享']
			};
		},
		onLoad() {
			this.getActivityType(),
				this.getActivityTypeB(),
				this.getActivityTypeC(),
				this.getActivityTypeD()
			// this.footerClickA(),
			// this.footerClickC(),
			// this.footerClickD()
			// uni.getSystemInfo({
			// 	success: function(res) {
			// 		// console.log(res.windowHeight);
			// 		this.height_Num = res.windowHeight + 100
			// 		console.log(this.height_Num)
			// 	}
			// });
		},
		
		onReachBottom() {
			console.log(this.followDataList.length);
			console.log(this.total);
			if(this.followList.length==this.total){
				return this.flag2 = true
			}
			if(this.followDataList.length==this.total){
				return this.flag2 = true
			}
			if(this.followDataListC.length==this.total){
				return this.flag2 = true
			}
			if(this.followDataListD.length==this.total){
				return this.flag2 = true
			}
			this.current_id++
			this.getActivityType()
			this.getActivityTypeB()
			this.getActivityTypeC()
			this.getActivityTypeD()
			console.log("触底了");
		},
		onPullDownRefresh() {
			console.log("下拉刷新了")
			console.log(this.followList.length);
			console.log(this.followDataList.length);
			console.log(this.followDataListC.length);
			console.log(this.followDataListD.length);
			this.current_id = 1
			setTimeout(() => {
				this.getActivityType(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
			setTimeout(() => {
				this.getActivityTypeB(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
			setTimeout(() => {
				this.getActivityTypeC(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
			setTimeout(() => {
				this.getActivityTypeD(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
		},
		methods: {
			// confirm(index) {
			// 	let that=this;
			// 	uni.showModal({
			// 	    title: '提示',
			// 	    content: '确定取消关注',
			// 	    success: function (res) {
			// 	        if (res.confirm) {
			// 			   let obj = that.ContainerUser[index];
			// 			   let id = obj.follow_vip_user_id;
			// 			   console.log("++++++++");
			// 			   console.log(index);
			// 			   console.log(id);
			// 			   that.$request.send(
			// 			   	'vip/User/userFollow', {
			// 			   		id: id,
			// 			   		type: 2
			// 			   	},
			// 			   	data => {
			// 			   		if (data.code == 1) {
			// 			   			that.ContainerUser.splice(index, 1)
			// 			   		}
			// 			   	}
			// 			   );   
			// 	        } else if (res.cancel) {
			// 	            console.log('用户点击取消');
			// 	        }
			// 	    }
			// 	});
			// },
			toggleMask(type) {
				this.$refs.ygcComment.toggleMask(type);
			},
			pubComment(commentContent1) {
				this.$refs.ygcComment.toggleMask();
				console.log(commentContent1);
				this.commentContent = commentContent1;
				this.$refs.ygcComment.content = '';
				
			},
			topubComment(){
				let that = this;
				let obj = that.publishDynamic;
				that.$request.send(
					'vip/Find/publishDynamic', {
						address: "雨湖区",
						message: "测试2",
						content: "测试2",
						activity_id: 0
					},
					data => {
						if (data.code == 1) {
							that.publishDynamic = data.data;
							console.log(that.publishDynamic);
						}
					}
				);
			},
			search(e, val) {
				console.log(e, val);
				this['val' + val] = e;
				let that = this;
				that.$request.send(
					'vip/Find/getDynamicList', {
						size: 6,
						type: 1,
						current: 1,
						keyword: e
					},
					data => {
						that.followDataList = []
						if (data.code == 1) {
							that.followDataList = data.data.list
						}
					}
				);
				that.$request.send(
					'vip/Find/getDynamicList', {
						size: 6,
						type: 4,
						current: 1,
						keyword: e
					},
					data => {
						that.followDataListC = []
						if (data.code == 1) {
							that.followDataListC = data.data.list
						}
					}
				);
				that.$request.send(
					'vip/Find/getDynamicList', {
						size: 6,
						type: 5,
						current: 1,
						keyword: e
					},
					data => {
						that.followDataListD = []
						if (data.code == 1) {
							that.followDataListD = data.data.list
						}
					}
				);
			},
			clickCardA(index) {
				let obj = this.followDataList[index];
				let id = obj.id;
				let vip_user_id = obj.vip_user_id;
				let time = obj.create_times;
				let is_exist = obj.is_exist;
				uni.navigateTo({
					// url: "/pages/discovery/detail?id=" + id
					// url: "/pages/discovery/detail",
					url: "/pages/discovery/detail?id=" + id + "&vip_user_id=" + vip_user_id + "&is_exist=" + is_exist
					// url: "/pages/discovery/focus"
					// url: "/pages/login/login"
				})
			},
			clickCardC(index) {
				let obj = this.followDataListC[index];
				let id = obj.id;
				let time = obj.create_times;
				uni.navigateTo({
					// url: "/pages/discovery/detail?id=" + id
					// url: "/pages/discovery/detail",
					url: "/pages/discovery/detail?id=" + id
					// url: "/pages/discovery/focus"
					// url: "/pages/login/login"
				})
			},
			clickCardD(index) {
				let obj = this.followDataListD[index];
				let id = obj.id;
				let time = obj.create_times;
				uni.navigateTo({
					// url: "/pages/discovery/detail?id=" + id
					// url: "/pages/discovery/detail",
					url: "/pages/discovery/detail?id=" + id
					// url: "/pages/discovery/focus"
					// url: "/pages/login/login"
				})
			},
			footerClickA(index) {
				let that = this;
				let obj = that.followDataList[index];
				let id = obj.id;
				that.$request.send(
					'vip/User/userFollow', {
						id: id,
						type: 3
					},
					data => {
						if (data.code == 1) {

							if (data.data.exist == true) {
								that.followDataList[index].like_num += 1;
							} else {
								that.followDataList[index].like_num -= 1;
							}

							// this.followDataList = [...this.followDataList, ...data.data.list];
							//this.count = data.data
							// console.log(data)
							// console.log(this.followDataList)
						}
					}
				);

			},
			footerClickC(index) {
				let id = this.followDataListC[index].id;
				this.$request.send(
					'vip/User/userFollow', {
						id: id,
						type: 3
					},
					data => {
						if (data.code == 1) {

							if (data.data.exist == true) {
								this.followDataListC[index].like_num += 1;
							} else {
								this.followDataListC[index].like_num -= 1;
							}

							// this.followDataList = [...this.followDataList, ...data.data.list];
							//this.count = data.data
							// console.log(data)
							// console.log(this.followDataList)
						}
					}
				);

			},
			footerClickD(index) {
				let id = this.followDataListD[index].id;
				this.$request.send(
					'vip/User/userFollow', {
						id: id,
						type: 3
					},
					data => {
						if (data.code == 1) {
							if (data.data.exist == true) {
								this.followDataListD[index].like_num += 1;

							} else {
								this.followDataListD[index].like_num -= 1;
							}

							// this.followDataList = [...this.followDataList, ...data.data.list];
							//this.count = data.data
							// console.log(data)
							// console.log(this.followDataList)
						}
					}
				);

			},
			footerClickB(id) {
				uni.navigateTo({
					url: "/pages/discovery/detail?id=" + id
				})
			},
			// clickCard(id) {
			// 	uni.navigateTo({
			// 		// url: "/pages/discovery/detail?id=" + id
			// 		// url: "/pages/discovery/detail",
			// 		url: "/pages/discovery/detail?id=" + id 
			// 		// url: "/pages/discovery/focus"
			// 		// url: "/pages/login/login"
			// 	})
			// },
			//获取ActivtityType
			getActivityType() {
				uni.showLoading({
					title: this.$t('loading')
				});

				this.$request.send(
					'vip/Find/getList', {
						current: this.current_id,
						page: 6
					},
					data => {
						if (data.code == 1) {
							if (this.current_id == 1) {
								this.followList = []
							}
							this.followList = data.data.list;
							this.total1 = data.data.page.total
							// console.log(data)
							// console.log(this.followDataList);
						}
					}
				);
			},
			getActivityTypeB() {
				uni.showLoading({
					title: this.$t('loading')
				});

				this.$request.send(
					'vip/Find/getDynamicList', {
						current: this.current_id,
						type: 1
					},
					data => {
						if (data.code == 1) {
							if (this.current_id == 1) {
								this.followDataList = []
							}
							// if(this.current_id == data.data.page.total){
							// 	this.flag2 = true
							// }
							this.followDataList = [...this.followDataList, ...data.data.list];
							this.count = data.data
							this.total = data.data.page.total
							// console.log(data)
							// console.log(this.followDataList)
						}
					}
				);

			},
			getActivityTypeC() {
				uni.showLoading({
					title: this.$t('loading')
				});

				this.$request.send(
					'vip/Find/getDynamicList', {
						current: this.current_id,
						type: 4
					},
					data => {
						if (data.code == 1) {
							if (this.current_id == 1) {
								this.followDataListC = []
							}
							this.followDataListC = [...this.followDataListC, ...data.data.list];
							this.total3 = data.data.page.total
						}
					}
				);

			},
			getActivityTypeD() {
				uni.showLoading({
					title: this.$t('loading')
				});

				this.$request.send(
					'vip/Find/getDynamicList', {
						current: this.current_id,
						type: 5
					},
					data => {
						if (data.code == 1) {
							if (this.current_id == 1) {
								this.followDataListD = []
							}
							this.followDataListD = [...this.followDataListD, ...data.data.list];
							this.total4 = data.data.page.total
							console.log("+++++++++++++++++++++++");
							console.log(this.followDataListD);
						}
					}
				);

			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				console.log(e);
			},
			onClickItemA(e) {
				if (this.currentA !== e.currentIndex) {
					this.currentA = e.currentIndex;
				}
				console.log(e);
			}
		}

	};
</script>

<style lang="scss">
	@import '@/common/uni-nvue.scss';
	.contentA {

		.tradeA {
			display: flex;
			justify-content: space-around;
			font-size: 14px;
			background-color: #FFFFFF;
			line-height: 38px;

			.textsA {
				text-align: center;
				width: 24%;
			}

			.active {
				border-bottom: 4upx solid #008DFF;
			}


		}
	}

	.example-body {
		uni-card {
			display: flex;
		}
	}

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #efeff4;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 1px 0;
	}

	.example-box {
		margin: 12px 0;
	}

	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 350rpx;
		overflow: hidden;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.content-box-texta {
		font-size: 14px;
		line-height: 15px;
		padding-bottom: 20rpx;
		color: #1D2023;
	}

	.content-box-text {
		font-size: 12px;
		line-height: 22px;
		color: #30C58D;
	}

	.footer-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;


	}

	.dibulan {
		display: flex;
		margin-left: 10px;
		margin-right: 40px;
	}

	.footer-box__item {
		align-items: center;
		font-size: 13px;
		color: #666;
	}

	.image-tupian {
		max-width: 40rpx;
		max-height: 40rpx;
	}
	.buttonB {
			position: fixed;
			background-color: #FFFFFF;
			bottom: var(--window-bottom, 0);
			margin-left: 630rpx;
			margin-bottom: 50rpx;
			height: 90rpx;
			width: 90rpx;
			z-index: 2;
			box-shadow:5px 5px 10px rgba(0,0,0,0.3);
		}
		.button-box{
			display: flex;
			flex-direction: column;
			margin-left: -8rpx;
			.button-image{
				width: 50rpx;
				height: 50rpx;
				margin-bottom: -14rpx;
			}
			.button-font{
				width: 55rpx;
				height: 50rpx;
				font-size: 12px;
				
			}
			
		}
		.isOver {
			width: 100%;
			height: 45px;
			margin-top: 46rpx;
			background-color: #efeff4;
			line-height: 45px;
			text-align: center;
			font-size: 14px;
			color: #606c71;
		}
</style>
