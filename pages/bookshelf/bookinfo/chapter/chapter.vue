<template>
	<view class="main">
		<view class='cu-load load-modal' v-if="loadModal">
			<view class='cuIcon-emojifill text-orange'></view>
			<view class='gray-text'>加载中...</view>
		</view>
		<view class='top' v-if="!loadModal">
			<view style='padding: 0 20rpx;text-align: center;'>
				<view class='left'>共 {{book_info.chapter.length}} 章</view>
				<view class='location left' @click='location'>定位当前章节</view>
				<view class='right' @click='doSort'>
					<i class="iconfont icon-daoxu"></i>{{chapter_sort?"倒序":"正序"}}
				</view>
			</view>
		</view>
		<scroll-view :style="[{'padding-top':'100rpx'},{'height':'100%'}]" :scroll-into-view="'index-'+location_index" scroll-y scroll-with-animation enable-back-to-top>
			<view class="cu-list menu shadow-lg">
				<view class="cu-item arrow" v-for="(item,i) in book_info.chapter" v-bind:key="i" @click="toChapter" :data-id="i" :id="'index-'+i">
					<button class="cu-btn content">
						<text>{{item.name}}</text>
					</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadModal:true,
				book_info: {},
				chapter_sort: true,
				location_index:0,
			}
		},
		methods: {
			doSort() {
				this.chapter_sort = !this.chapter_sort;
				this.book_info.chapter = this.book_info.chapter.reverse();
			},
			location() {
				if (!this.chapter_sort)
					this.location_index = (this.book_info.chapter.length - 1) - this.book_info.chapterid;
				else
					this.location_index = this.book_info.chapterid;
			},
			toChapter(e) {
				var id = e.currentTarget.dataset.id;
				console.log(id);
				if (!this.chapter_sort)
					id = (this.book_info.chapter.length - 1) - id;
				uni.navigateBack();
				setTimeout(function(){
					uni.redirectTo({
						url: '/pages/bookshelf/read/read?id=' + id,
					})
				},100);
			}
		},
		onLoad() {
			var booklist = wx.getStorageSync('booklist');
			var read = wx.getStorageSync('read');
			this.book_info = booklist[read];
			if(!this.book_info.chapterid){
				this.book_info.chapterid = 0;
			}
			this.loadModal = false;
		}
	}
</script>

<style>
	.main {
		color: #262626;
		font-size: 32rpx;
		height: 100%;
	}

	.main .icon-daoxu {
		font-size: 32rpx;
		margin-right: 10rpx;
	}

	.main .top {
		background: #fff;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #ddd;
		position: fixed;
		z-index: 1000;
		width: 100%
	}

	.main .top .left {
		float: left
	}

	.main .top .right {
		float: right
	}

	.location {
		margin-left: 20rpx;
	}

	.clear {
		clear: both
	}
</style>
