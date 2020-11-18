<template>
	<view>
		<view class="big-box">
			<view class="content-box">
				<view class="one-box">我的证书</view>
				<view class="two-box">我 / 的 / 荣 / 耀 / 时 / 刻</view>
			</view>
		</view>
		<view>
			<scroll-view>
				<view v-if="CertificateList.length==0?'flag':''">
					<image src="/static/images/equipment/equipment.png" style="
			        			max-width: 120px;
			        			max-height: 120px;
			        			margin: 300rpx 250rpx 150rpx ;
			        			position: fixed;
			        			">
						<view style="
			        			position: fixed;
			        			margin:560rpx 284rpx 0; 
			        			color:#8A8A8A ;">暂无更多证书
						</view>
					</image>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CertificateList:[],
			}
		},
		onLoad() {
			this.getCertificateList()
		},
		onPullDownRefresh() {
			console.log("下拉刷新了")
			console.log(this.CertificateList.length);
			// this.CertificateList = []
			setTimeout(() => {
				this.getCertificateList(() => {
					uni.stopPullDownRefresh()
				})
			}, 500)
		},
		methods: {
			getCertificateList(){
				uni.showLoading({
					title: this.$t('loading')
				});
				this.$request.send(
					'vip/User/getCertificateList',{
						
					}, 
					data => {
						if (data.code == 1) {
							this.CertificateList = data.data;
							console.log(this.CertificateList);
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss">
	.big-box {
		width: 100%;
		height: 112px;
		background-color: #008DFF;

		.content-box {
			margin-left: 35px;
			color: #FFFFFF;
			
			.one-box {
				padding-top: 26px;
				font-size: 20px;
				font-weight:800;
			}
			.two-box{
				padding-top: 10px;
				font-size: 14px;
			}
		}
	}
</style>
