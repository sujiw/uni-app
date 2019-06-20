<template>
	<view>
		<view class='cu-load load-modal' v-if="loadModal">
			<view class='cuIcon-emojifill text-orange'></view>
			<view class='gray-text'>加载中...</view>
		</view>
		<view class="book_body" v-for="(item,i) in searchList" v-bind:key="i" @click="onBookInfo" :data-webid="item._id"
		 :data-url="item.url">
			<view class="book_image">
				<image :src="item['image']" mode="aspectFill"></image>
			</view>
			<view class="book_info">
				<view class="book_titie margin-bottom-sm">
					{{item.title}}
				</view>
				<view class="book_desc">
					{{item.author}} · 著
				</view>
				<view class="book_chapter">
					{{item.intro}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchList: [],
				loadModal: true,
			}
		},
		methods: {
			search(title, page) {
				this.loadModal = true;
				if (!page) page = 1;
				uni.request({
					url: this.api_url['search']+"?search=" + title + "&page=" + page,
					success: (res) => {
						if (JSON.stringify(res.data.search) == '[]') {
							return;
						}
						this.searchList = this.searchList.concat(res.data.search);
						console.log(this.searchList);
					},
					complete: () => {
						this.loadModal = false;
					}
				})
			},
			onBookInfo(e) {
				var url = e.currentTarget.dataset.url;
				var webid = e.currentTarget.dataset.webid;
				uni.navigateTo({
					url: '/pages/bookshelf/bookinfo/bookinfo?url=' + url + '&webid=' + webid,
				})
			},
		},
		onLoad(options) {
			this.page = 1;
			this.title = options.search;
			this.search(options.search);
		},
		onReachBottom() {
			this.search(this.title, ++this.page);
		},
	}
</script>

<style>

</style>
