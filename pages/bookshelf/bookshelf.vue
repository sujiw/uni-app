<template>
	<view>
		<!-- <view class="book_body" v-if="book_list.length > 0" v-for="(item,i) in book_list" v-bind:key="i">
			<view class="book_image">
				<image :src="item['image']" mode="aspectFill"></image>
			</view>
			<view class="book_info">
				<view class="book_titie margin-bottom-sm">
					{{item.title}}
				</view>
				<view class="book_desc">
					{{item.author}} · {{item.chapter.length - (item.chapterid?item.chapterid:0)}}章未读
				</view>
				<view class="book_chapter">
					最新章节 · {{item.chapter[item.chapter.length-1].name}}
				</view>
			</view>
		</view> -->
		<view class="cu-list menu-avatar">
			<view :class="'cu-item ' + ((modalName=='move-box-'+ index)?'move-cur':'')" v-for="(item,index) in book_list"
			 v-bind:key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-'+index">
				<view class="book_body" @click="doRead" :data-index="index" @longpress="doDelete">
					<view class="book_image">
						<image :src="item['image']" mode="aspectFill"></image>
					</view>
					<view class="book_info">
						<view class="book_titie margin-bottom-sm" style="position: relative;">
							{{item.title}}
							<view class="cu-tag badge" style="z-index: 99999;" v-if="item.update">{{item.update}}</view>
						</view>
						<view class="book_desc">
							{{item.author}} · {{(item.chapter.length-1) - (item.chapterid?item.chapterid:0)}}章未读
						</view>
						<view class="book_chapter">
							最新章节 · {{item.chapter[item.chapter.length-1].name}}
						</view>
					</view>
				</view>
				<view class="move">
					<view class="bg-green" @click="doBookInfo" :data-webid="item._id"
		 :data-url="item.url">详情</view>
					<view class="bg-red" :data-index="index" @click="doDelete">删除</view>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<view style="margin-top: 160upx;"></view>
			<!-- #endif -->
		</view>
		<view class="bg" v-if="!book_list || book_list.length == 0">
			<image src="../../static/img/bookshelf/shujia.png" mode="aspectFit"></image>
			<text @click="toSelected()">查找更多精彩</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"book_list": [],
				"modalName": null,
			}
		},
		methods: {
			doBookInfo(e){
				var url = e.currentTarget.dataset.url;
				var webid = e.currentTarget.dataset.webid;
				uni.navigateTo({
					url: '/pages/bookshelf/bookinfo/bookinfo?url=' + url + '&webid=' + webid,
				})
			},
			doRead(e) {
				var index = e.currentTarget.dataset.index;
				uni.setStorageSync('read', index);
				uni.navigateTo({
					url: '/pages/bookshelf/read/read'
				})
			},
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target;
				} else {
					this.modalName = null;
				}
				this.listTouchDirection = null;
			},
			toSelected() {
				uni.switchTab({
					url: '/pages/selected/selected'
				});
			},
			doDelete(e) {
				uni.showActionSheet({
					itemList: ['删除本书'],
					itemColor: "#e54d42",
					success: () => {
						this.book_list.splice(e.currentTarget.dataset.index, 1);
						uni.setStorageSync('booklist', this.book_list);
					},
				});
			},
			updateBook(){
				if (this.book_list.length == 0) uni.stopPullDownRefresh();
				uni.showNavigationBarLoading();
				var booklist = this.book_list
				var newBooklist = [];
				for (var i = 0; i < booklist.length; i++) {
					// for (var j = 0; j < booklist[i].chapter.length;j++)
					//   if (booklist[i].chapter[j].body)
					//     delete booklist[i].chapter[j].body;
					var newBook = {};
					newBook.chapterlength = booklist[i].chapter.length;
					newBook.webid = booklist[i]._id;
					newBook.url = booklist[i].url;
					newBooklist.push(newBook);
				}
				var _this = this;
				uni.request({
					url: this.api_url['bookupdate'],
					method: 'POST',
					header: {
					  'content-type': 'application/x-www-form-urlencoded'
					},
					data: JSON.stringify(newBooklist),
					success: (res) => {
						var array = res.data;
						for (var i = 0; i < array.length; i++) {
							if (array[i].update > 0) {
								booklist[i].update = array[i].update + (booklist[i].update ? booklist[i].update : 0);
								for (var s = 0; s < array[i].chapter.length; s++)
									booklist[i].chapter.push(array[i].chapter[s]);
							}
						}
						this.book_list = booklist;
						uni.setStorageSync('booklist', booklist);
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
					}
				})
			}
		},
		onShow() {
			this.book_list = uni.getStorageSync('booklist');
		},
		onLoad() {
			this.book_list = uni.getStorageSync('booklist');
			//this.updateBook();
		},
		onPullDownRefresh() {
			this.updateBook();
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item {
		height: auto;
		padding-right: 20rpx;
	}

	.cu-list.menu-avatar>.cu-item:last-child .book_body .book_info {
		border-bottom: 0;
	}

	.cu-list.menu-avatar>.cu-item:active {
		background-color: #eeeeee;
	}

	.book_body:active {
		background-color: transparent;
	}

	.cu-list.menu-avatar>.cu-item:after,
	.cu-list.menu>.cu-item:after {
		border-bottom: 0;
	}

	.bg {
		width: 100%;
		text-align: center;
	}

	.bg image {
		height: 240px;
	}

	.bg text {
		border: 1upx solid #f7595a;
		padding: 10upx 40upx;
		border-radius: 40upx;
		color: #F7595A;
	}

	.bg text:active {
		opacity: 0.8;
	}

	.cu-list>.cu-item {
		-webkit-transition: all .3s ease-in-out 0s;
		-o-transition: all .3s ease-in-out 0s;
		transition: all .3s ease-in-out 0s;
		-webkit-transform: translateX(0rpx);
		-ms-transform: translateX(0rpx);
		transform: translateX(0rpx);

	}
</style>
