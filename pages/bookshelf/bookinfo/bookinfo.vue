<template>
	<view>
		<view class='cu-load load-modal' v-if="loading">
			<view class='cuIcon-emojifill text-orange'></view>
			<view class='gray-text'>加载中...</view>
		</view>
		<cu-custom :topheight="'0px'" :style="[{'color':'#fff'}]" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{bookinfo.title}}</block>
		</cu-custom>
		<view v-if="!loading" class="detail">
			<view class="head">
			</view>
			<view class="body">
				<scroll-view scroll-y style="height:100%">
					<view class="top_view">
						<image class="top_bg" :src="bookinfo.image" mode="scaleToFill"></image>
						<view class="item_inhave"></view>
						<view class="top_item" :style="[{'top':CustomBar+'px'}]">
							<view class="top_item_img_text">
								<image class="item_img" :src="bookinfo.image" mode="aspectFill"></image>
								<view class="text-ms margin-top-xs" style="color: #fff;">{{bookinfo.author}} · 著</view>
								<!-- <view class="item_text">
									<text class="text_title">{{bookinfo.title}}</text>
									<text class="text_author">{{bookinfo.author}}</text>
									<view class="text_tags_layout">

									</view>
								</view> -->
							</view>
						</view>
					</view>
					<view class="cu-list menu shadow-lg">
						<view class="cu-item arrow" @click='chapterOpen'>
							<button class="cu-btn content">
								<text class="text-black">查看目录：共{{bookinfo.chapter.length}}章</text>
							</button>
						</view>
					</view>
					<view class="view_line_bottom"></view>

					<view class="view_line"></view>
					<view class="book_instro_view">
						<text class="book_instro">内容简介：{{bookinfo.intro}}</text>
					</view>
					<view class="view_line_bottom"></view>
				</scroll-view>
			</view>
			<view class="cu-bar bg-white tabbar border shop" style="position: fixed;bottom: 0;width: 100%;">
				<view class="submit" @click="onRead">阅读</view>
				<view :class="(hasSave?'bg-green':'bg-red')+' submit'" @click="onAddBook">{{hasSave?'已在书架':'加入书架'}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				hasSave: false,
				read: -1,
				bookinfo: {},
				CustomBar: this.CustomBar
			}
		},
		methods: {
			chapterOpen() {
				if (!this.hasSave) {
					this.onAddBook();
				}
				var read = this.read;
				uni.setStorageSync('read', read);
				uni.navigateTo({
					url: '/pages/bookshelf/bookinfo/chapter/chapter'
				})
			},
			onAddBook() {
				if(this.hasSave){
					uni.showToast({
						title: '已添加',
					});
					return;
				}
				var booklist = uni.getStorageSync('booklist');
				if (!booklist)
					booklist = [];
				this.bookinfo.chapterid = 0;
				booklist.unshift(this.bookinfo);
				uni.setStorageSync('booklist', booklist);
				uni.showToast({
					title: '已添加',
				});
				this.hasSave = true;
				this.read = 0;
			},
			onRead() {
				if (!this.hasSave) {
					this.onAddBook();
				}
				var read = this.read;
				uni.setStorageSync('read', read);
				uni.navigateTo({
					url: "/pages/bookshelf/read/read"
				})
			}
		},
		onLoad(options) {
			var booklist = uni.getStorageSync('booklist');
			uni.request({
				url: this.api_url['bookinfo'],
				data: options,
				success: (res) => {
					console.log(res);
					this.hasSave = false;
					this.read = -1;
					this.bookinfo = res.data.book;
					uni.setNavigationBarTitle({
						title: this.bookinfo.title,
					});
					for (var i = 0; i < booklist.length; i++) {
						if (booklist[i].author == this.bookinfo.author && booklist[i].title == this.bookinfo.title) {
							this.read = i;
							this.hasSave = true;
							break;
						}
					}
				},
				complete: () => {
					this.loading = false;
				}
			})
		}
	}
</script>

<style>
	.detail {
		display: flex;
		min-height: 100%;
		flex-direction: row;
		justify-content: space-between;
		background-color: #fff;
	}

	.body {
		min-width: 100%;
		display: flex;
		flex-direction: column;
	}

	.top_view {
		position: relative;

	}

	.item_inhave {
		left: 0;
		top: 0;
		right: 100%;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.3);
		width: 100%;
		height: 460rpx;
	}

	.top_bg {
		width: 100%;
		height: 450rpx;
		-webkit-filter: blur(50rpx);
		-moz-filter: blur(50rpx);
		-ms-filter: blur(50rpx);
		filter: blur(50rpx);
	}

	.top_item {
		width: 100%;
		left: 0;
		top: 0;
		position: absolute;
		display: flex;
		flex-direction: column;
	}

	.top_item_img_text {
		display: block;
		text-align: center;
	}

	.item_img {
		width: 172rpx;
		height: 220rpx;
		border: 1rpx solid rgba(225, 225, 225, 0.1);
	}

	.item_text {
		display: flex;
		flex-direction: column;
		margin-left: 24rpx;
		margin-top: 4rpx;
	}

	.text_title {
		color: #fff;
		font-size: 32rpx;
	}

	.text_author {
		margin-top: 12rpx;
		color: #eee;
		font-size: 26rpx;
	}

	.text_tags_layout {
		margin-top: 20rpx;
	}

	.text_tag {
		color: #ccc;
		font-size: 22rpx;
	}

	.top_btn {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	button:active {
		background: #fff;
		color: #262626
	}

	.btn_read {
		color: #fff;
		background-color: rgba(225, 225, 225, 0.3);
		font-size: 24rpx;
		margin-left: 24rpx;
		margin-right: 8rpx;
		justify-content: center;
		align-items: center;
		width: 100%;
		cursor: pointer;
	}

	.btn_collect {
		background-color: rgba(225, 225, 225, 0.3);
		font-size: 24rpx;
		margin-left: 8rpx;
		margin-right: 24rpx;
		justify-content: center;
		align-items: center;
		color: #fff;
		width: 100%;
	}

	.top_btn .btu_rq {
		background: #fff;
		color: #262626
	}

	.book_instro_view {
		display: flex;
		flex-direction: column;
	}

	.book_instro {
		line-height: 42rpx;
		word-break: break-all;
		padding: 40rpx 26rpx;
		font-size: 28rpx;
		color: #666;
	}

	.view_line {
		left: 60rpx;
		top: 0;
		padding-right: 60rpx;
		padding-left: 60rpx;
		height: 20rpx;
		background-color: #ddd;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
	}

	.view_data {
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.data_style {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.key {
		color: #666;
		font-size: 28rpx;
	}

	.value {
		margin-top: 20rpx;
		color: #333;
		font-size: 28rpx;

	}

	.view_line_bottom {
		left: 60rpx;
		top: 0;
		height: 1rpx;
		background-color: #ddd;
	}

	.contact_style:active {
		background: #ddd;
		color: #fff;
	}

	.contact_style {
		padding: 24rpx;
		display: flex;
		color: #333;
		flex-direction: row;
		align-items: center;
	}

	.contact_text {
		flex: 1;
		font-size: 28rpx;
	}

	.contact_icon {
		width: 24rpx;
		height: 24rpx;
		margin-right: 20rpx;
	}
</style>
