<template>
	<view :style="[{'background-color':'#'+backgroundGroup[backgroundId][1]},{'background-image':'url(https://book.mdaogo.cn/public/images/'+backgroundGroup[backgroundId][1]+'.png) repeat'},{'color':'#'+backgroundGroup[backgroundId][0]},{'height':'100%'}]">
		<view class='cu-load load-modal' v-if="loading">
			<view class='cuIcon-emojifill text-orange'></view>
			<view class='gray-text'>加载中...</view>
		</view>
		<cu-custom :topheight="'0px'" :style="{'color':'#'+backgroundGroup[backgroundId][0]}" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{chapter_title}}</block>
		</cu-custom>
		<scroll-view v-if="!loading" :scroll-top="scrollTop" scroll-y="true" :style="[{'padding-top':CustomBar+'px'},{'height':'100%'}]"
		 @scroll="doScroll">
		 <view class="cu-bar tabbar border margin">
		 	<view class="submit" @click="upperChapter">上一章</view>
		 	<view class="submit" @click="chapterOpen">目录</view>
		 	<view class="submit" @click="nextChapter">下一章</view>
		 </view>
			<view class='content' :style="'font-size:'+fontSize+'rpx'" @click="doSet">
				<text v-for="(text,i) in content" v-bind:key="i">{{text}}</text>
			</view>
			<view class="cu-bar tabbar border margin">
				<view class="submit" @click="upperChapter">上一章</view>
				<view class="submit" @click="chapterOpen">目录</view>
				<view class="submit" @click="nextChapter">下一章</view>
			</view>
		</scroll-view>
		<view class="bottom_view" v-if="isSet">
			<view class="text_control">
				<view @click='setfontSize' :data-value='-1'>Aa-</view>
				<view class="pro_bar">
					<slider :value="fontSize" @change="setFontSize" @changing="setFontSize" :min="20" :max="60" show-value />
				</view>
				<view @click='setfontSize' :data-value='1'>Aa+</view>
			</view>
			<view class="line"></view>
			<view class="img_control">
				<view @click="chapterOpen">
					<text class="cuIcon-sort lg img_1"></text>
				</view>
				<view class="bgcolor" :style="'background-color: #'+item[1]" v-for="(item,index) in backgroundGroup" :data-color="index"
				 v-bind:key="index" @click="setBackground"></view>
				<!-- <image src="/image/ic_menu_mode_night_manual.png" class="img_1" mode="aspectFit"></image> -->
				<view @click="nextChapter">下一章</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				saveScrollTop: 0,
				CustomBar: this.CustomBar,
				isSet: false,
				loading: true,
				fontSize: 40,
				backgroundId: 3,
				backgroundGroup: [
					['262626', 'ede7da', '000000'],
					['262626', 'e0ce9e', '000000'],
					['262626', 'cddfcd', '000000'],
					['262626', 'cfdde1', '000000'],
					['262626', 'd0d0d0', '000000'],
					['262626', 'ebcece', '000000'],
					['666666', '0f1112', 'ffffff'],
				],
				book_info: {},
				chapter_title: '',
				scrollTop: 0,
				content: [],
				read: 0,
			}
		},
		methods: {
			upperChapter() {
				if (this.book_info.chapterid == 0) {
					wx.showToast({
						title: '无章节',
					})
					return;
				}
				this.HandleContent(this.book_info.chapterid - 1)
			},
			nextChapter() {
				if (this.book_info.chapterid == this.book_info.chapter.length - 1) {
					wx.showToast({
						title: '无章节',
					})
					return;
				}
				this.HandleContent(this.book_info.chapterid + 1)
			},
			chapterOpen() {
				uni.navigateTo({
					url: '/pages/bookshelf/bookinfo/chapter/chapter'
				})
			},
			doSet() {
				this.isSet = !this.isSet;
			},
			doScroll(e) {
				this.saveScrollTop = e.detail.scrollTop;
			},
			setFontSize(e) {
				var fontSize = e.detail.value;
				if (!fontSize) {
					fontSize = parseInt(e.currentTarget.dataset.value);
					fontSize += this.fontSize;
				}
				if (fontSize != this.fontSize) {
					wx.setStorageSync('fontSize', fontSize);
					this.fontSize = fontSize;
				}
				uni.setStorageSync('fontSize', fontSize);
			},
			setBackground(e) {
				this.backgroundId = e.currentTarget.dataset.color;
				uni.setStorageSync('backgroundId', this.backgroundId);
			},
			HandleContent(chapterid) {
				this.loading = true;
				var book_info = this.book_info;
				var scrollTop = 0;
				if (!chapterid || parseInt(chapterid)==NaN) {
					book_info.chapterid = book_info.chapterid ? book_info.chapterid : 0;
					scrollTop = book_info.chapter[book_info.chapterid].scrollTop;
					if (!scrollTop)
						scrollTop = 0;
				} else {
					book_info.chapterid = parseInt(chapterid);
				}
				this.chapter_title = book_info.chapter[book_info.chapterid].name;
				uni.request({
					url: this.api_url['content'],
					data: {
						webid: book_info._id,
						url: book_info.chapter[book_info.chapterid].url
					},
					success: (res) => {
						if (res.data.state) {
							var body = res.data.body.split("\n");
							body.unshift(this.chapter_title);
							this.content = body;
							this.scrollTop = scrollTop;
							this.saveScrollTop = scrollTop;
						} else {
							wx.showToast({
								title: res.data.msg,
							})
						}
					},
					complete: () => {
						this.loading = false;
					}
				})
			}
		},
		onLoad(options) {
			console.log(options);
			var backgroundId = uni.getStorageSync('backgroundId');
			var fontSize = uni.getStorageSync('fontSize');
			var booklist = uni.getStorageSync('booklist');
			var read = uni.getStorageSync('read');
			if (!backgroundId)
				backgroundId = 0;
			if (!fontSize)
				fontSize = 40;
			this.backgroundId = backgroundId;
			this.fontSize = fontSize;
			this.book_info = booklist[read];
			this.read = read;
			if (JSON.stringify(options) != '{}')
				this.HandleContent(options.id);
			else
				this.HandleContent()
		},
		onUnload() {
			var booklist = uni.getStorageSync('booklist');
			var read = this.read;
			delete booklist[read].update;
			booklist[read].chapter[this.book_info.chapterid].scrollTop = this.saveScrollTop;
			booklist[read].chapterid = this.book_info.chapterid;
			uni.setStorageSync('booklist', booklist);
		},
		onBackPress() {

		}
	}
</script>

<style>
	.border{border: 1px solid #ddd;border-radius: 5px;}
	scroll-view .content {
		text-align: left;
		padding: 0 50rpx;
		font-family: "Microsoft YaHei", PingFangSC-Regular, HelveticaNeue-Light, "Helvetica Neue Light", sans-serif;
		line-height: 2;
		overflow: hidden;
		font-size: 40rpx;
	}

	scroll-view .content text {
		display: block;
		text-indent: 50rpx;
		margin-bottom: 30rpx;
	}

	.bottom_view {
		border-top: 1rpx solid #ddd;
		color: #eeeeee;
		flex-direction: column;
		display: flex;
		height: 200rpx;
		width: 100%;
		margin-top: -200rpx;
		background-color: rgba(0, 0, 0, 0.8);
		position: fixed;
		bottom: 0;
	}

	.text_control {
		flex-direction: row;
		display: flex;
		padding: 18rpx 28rpx;
		align-items: center;
	}

	.pro_bar {
		flex: 1;
		text-align: center;
	}

	.line {
		width: 100%;
		height: 1rpx;
		background-color: #666;
	}

	.img_control {
		justify-content: space-between;
		flex-direction: row;
		display: flex;
		padding: 28rpx;
	}

	.img_1 {
		width: 48rpx;
		height: 48rpx;
		line-height: 48rpx;
		font-size: 40rpx;
	}

	.bgcolor {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		background-color: red;
	}
</style>
