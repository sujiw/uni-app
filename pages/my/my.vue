<template>
	<view class="bg">
		<view class="user_info bg-red">
			<view class="head">
				<image :src="user_info?user_info.avatarUrl:'../../static/img/tabbar/me.png'" mode="widthFix"></image>
			</view>
			<view class="info">
				<view v-if="user_info">{{user_info.nickName}}</view>
				<button v-else class="bg-white" open-type="getUserInfo" @getuserinfo="doUserInfo" style="font-size: 20upx;width: 160upx;height: 60upx;line-height: 60upx;">点击登录</button>
			</view>
		</view>

		<view class="cu-list menu margin-top-xl margin-bottom-xl shadow-lg">
			<view class="cu-item arrow">
				<button class="cu-btn content" @click="doPraise">
					<text class="cuIcon-appreciatefill text-red"></text>
					<text class="text-grey">点赞支持</text>
				</button>
			</view>
			<!-- <view class="cu-item arrow">
				<button class="cu-btn content" open-type="feedback">
					<text class="cuIcon-writefill text-cyan"></text>
					<text class="text-grey">意见反馈</text>
				</button>
			</view> -->
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="feedback">
					<text class="cuIcon-creativefill text-orange"></text>
					<text class="text-grey">Bug测试</text>
				</button>
			</view>
		</view>
		<view class="cu-list menu margin-top-xl margin-bottom-xl shadow-lg">
			<view class="cu-item arrow">
				<button class="cu-btn content" @click="doAbout">
					<text class="cuIcon-question text-grey"></text>
					<text class="text-grey">关于书虫</text>
				</button>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: false
			}
		},
		methods: {
			doUserInfo(e){
				this.user_info = JSON.parse(e.detail.rawData);
				uni.setStorageSync('user_info',this.user_info);
			},
			doPraise(){
				uni.showToast({
					title:"感谢支持",
				})
			},
			doAbout(){
				uni.showModal({
					title:"关于",
					content:"小程序内所有小说为转载作品，所有章节均由网友上传，转载至小程序只是为了宣传本书让更多读者欣赏。"
				})
			},
		},
		onLoad() {
			this.user_info = uni.getStorageSync('user_info');
		}
		
	}
</script>

<style>
	.user_info {
		text-align: center;
		color: #FFFFFF;
		height: 300upx;
	}

	.user_info .head {
		width: 100%;
		padding: 20upx;
	}

	.user_info .head image {
		border-radius: 50%;
		border: 1upx solid #f5f5f5;
		height: 150upx;
		background: #FFFFFF;
		width: 150upx;
	}

	.user_info .info {
		font-size: 30upx;
		line-height: 80upx;
	}
</style>
