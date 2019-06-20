<template>
	<view style="height: 100%;">
		<view class='cu-load load-modal' v-if="loadModal">
			<view class='cuIcon-emojifill text-orange'></view>
			<view class='gray-text'>加载中...</view>
		</view>
		<view class="bg-red" style="position: relative;width: 100%;height: 150rpx;">
			<view class="cu-bar search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="搜索小说" confirm-type="search" @confirm="toSearch"></input>
				</view>
			</view>
			<image class="gif-wave gif-wave" mode="scaleToFill" src="https://image.weilanwl.com/gif/wave.gif"></image>
		</view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center text-xl">
				<view :class="'cu-item flex-sub '+(0==TabCur?'text-red cur':'')" @click="tabSelect" :data-id="0">
					<!-- <text class="cuIcon-camerafill"></text> -->推荐
				</view>
				<view :class="'cu-item flex-sub '+(1==TabCur?'text-red cur':'')" @click="tabSelect" :data-id="1">
					<!-- <text class="cuIcon-upstagefill"></text> -->排行榜
				</view>
				<view :class="'cu-item flex-sub '+(2==TabCur?'text-red cur':'')" @click="tabSelect" :data-id="2">
					<!-- <text class="cuIcon-clothesfill"></text> -->完本
				</view>
			</view>
		</scroll-view>
		<swiper :current="TabCur" @change="setTab" style="height: 100%;">
			<swiper-item>
				<scroll-view scroll-y style="height:100%">
					<view class="box">
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-red"></text>
								<text class="text-xl text-bold">男频</text>
							</view>
						</view>
						<view class="book_body" v-for="(item,i) in recommendList.male" v-bind:key="i" @click="toSearch" :data-value="item.title">
							<view class="book_image">
								<image :src="item['image']" mode="aspectFill"></image>
							</view>
							<view class="book_info">
								<view class="book_titie margin-bottom-sm">
									{{item.title}}
								</view>
								<view class="book_desc">
									{{item.author}} · {{item.class}} · {{item.state}}
								</view>
								<view class="book_chapter">
									{{item.intro}}
								</view>
							</view>
						</view>
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-red"></text>
								<text class="text-xl text-bold">女频</text>
							</view>
						</view>
						<view class="book_body" v-for="(item,i) in recommendList.female" v-bind:key="i" @click="toSearch" :data-value="item.title">
							<view class="book_image">
								<image :src="item['image']" mode="aspectFill"></image>
							</view>
							<view class="book_info">
								<view class="book_titie margin-bottom-sm">
									{{item.title}}
								</view>
								<view class="book_desc">
									{{item.author}} · {{item.class}} · {{item.state}}
								</view>
								<view class="book_chapter">
									{{item.intro}}
								</view>
							</view>
						</view>
					</view>

				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y style="height:100%">
					<view class="box">
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-red"></text>
								<text class="text-xl text-bold">男频</text>
							</view>
						</view>
						<view v-for="(item,i) in rankingList.male" v-bind:key="i">
							<view class="test-ml padding">{{item.name}}</view>
							<view class="cu-list menu shadow-lg">
								<view class="cu-item arrow" v-for="(title,index) in item.book" v-bind:key="index" @click="toSearch" :data-value="title">
									<button class="cu-btn content">
										<text class="num">{{index+1}}</text>
										<text class="text-grey">{{title}}</text>
									</button>
								</view>
							</view>
						</view>

						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-red"></text>
								<text class="text-xl text-bold">女频</text>
							</view>
						</view>
						<view v-for="(item,i) in rankingList.female" v-bind:key="i">
							<view class="test-ml padding">{{item.name}}</view>
							<view class="cu-list menu shadow-lg">
								<view class="cu-item arrow" v-for="(title,index) in item.book" v-bind:key="index" @click="toSearch" :data-value="title">
									<button class="cu-btn content">
										<text class="num">{{index+1}}</text>
										<text class="text-grey">{{title}}</text>
									</button>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y style="height:100%">
					<view class="box">
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-red"></text>
								<text class="text-xl text-bold">男频</text>
							</view>
						</view>
						<view class="cu-list menu margin-top-xl margin-bottom-xl shadow-lg">
							<view class="cu-item arrow" v-for="(item,i) in finishList.male" v-bind:key="i" @click="toSearch" :data-value="item.title">
								<button class="cu-btn content">
									<text class="title">{{item.class}}</text>
									<text class="text-grey">{{item.title}}</text>
								</button>
							</view>
						</view>

						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-titles text-red"></text>
								<text class="text-xl text-bold">女频</text>
							</view>
						</view>
						<view class="cu-list menu margin-top-xl margin-bottom-xl shadow-lg">
							<view class="cu-item arrow" v-for="(item,i) in finishList.female" v-bind:key="i" @click="toSearch" :data-value="item.title">
								<button class="cu-btn content">
									<text class="title">{{item.class}}</text>
									<text class="text-grey">{{item.title}}</text>
								</button>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- <view class="tower-swiper" @touchmove="towerMove" @touchstart="towerStart" @touchend="towerEnd">
			<view :class="item.zIndex==1?'tower-item none':'tower-item'" v-for="(item,i) in swiperList" v-bind:key="i" :style="'--index:'+item.zIndex+';--left:'+item.mLeft"
			 @click="selection" :id="item.id">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				</view>
				<view class="swiper-title" :style="item.mLeft==0?'color: #F7595A':'color: #808080'" v-if="item.title != undefined">{{item.title}}</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadModal: true,
				TabCur: 0,
				VerticalNavTop: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: "https://bookcover.yuewen.com/qdbimg/349573/1011471481/180",
					title: '这个明星来自地球',
				}],
				recommendList: false,
				rankingList: false,
				finishList: false,
			}
		},
		methods: {
			toSearch(e){
				console.log(e);
				var search = e.detail.value;
				if(!search)
				  search = e.currentTarget.dataset.value;
				uni.navigateTo({
					url: '/pages/selected/search/search?search=' + search,
				});
			},
			setTab(e) {
				this.TabCur = e.detail.current;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				switch (parseInt(this.TabCur)) {
					case 0:
						if (!this.recommendList) this.getRecommendList();
						break;
					case 1:
						if (!this.rankingList) this.getRankingList();
						break;
					case 2:
						if (!this.finishList) this.getFinishList();;
						break;
				}
			},
			towerSwiper() {
				let list = this.swiperList;
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list;
			},
			towerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < list.length; i++) {
						list[i - 1].mLeft = list[i].mLeft
						list[i - 1].zIndex = list[i].zIndex
					}
					list[list.length - 1].mLeft = mLeft;
					list[list.length - 1].zIndex = zIndex;
					this.swiperList = list;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = list.length - 1; i > 0; i--) {
						list[i].mLeft = list[i - 1].mLeft
						list[i].zIndex = list[i - 1].zIndex
					}
					list[0].mLeft = mLeft;
					list[0].zIndex = zIndex;
					this.swiperList = list;
				}
			},
			towerMove(e) {
				this.direction = e.touches[0].pageX - this.towerstart > 0 ? 'right' : 'left'
			},
			towerStart(e) {
				this.towerstart = e.touches[0].pageX;
			},
			getRecommendList() {
				this.loadModal = true;
				uni.request({
					url: this.api_url['recommendList'],
					success: (res) => {
						this.recommendList = res.data;
						this.loadModal = false;
					}
				})
			},
			getRankingList() {
				this.loadModal = true;
				uni.request({
					url: this.api_url['rankingList'],
					success: (res) => {
						this.rankingList = res.data;
						this.loadModal = false;
						console.log(this.rankingList);

					}
				})
			},
			getFinishList() {
				this.loadModal = true;
				uni.request({
					url: this.api_url['finishList'],
					success: (res) => {
						this.finishList = res.data;
						this.loadModal = false;
					}
				})
			}
		},
		onLoad() {
			this.getRecommendList();
		}

	}
</script>

<style>
	.gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 70rpx;
	}

	.tower-swiper .swiper-title {
		text-align: center;
		white-space: nowrap;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100rpx - 100rpx);
		z-index: var(--index);
		width: 200rpx;
		height: 260rpx;
	}

	.box {
		margin: 20rpx 0;
	}

	.box view.cu-bar {
		margin-top: 20rpx;
	}

	.cu-list .cu-item:nth-child(1) .cu-btn .num {
		color: #fff;
		background-color: #bf2c24;
		border: 1px solid currentColor;
	}

	.cu-list .cu-item:nth-child(2) .cu-btn .num {
		color: #fff;
		background-color: #e67225;
		border: 1px solid currentColor;
	}

	.cu-list .cu-item:nth-child(3) .cu-btn .num {
		color: #fff;
		background-color: #e6bf25;
		border: 1px solid currentColor;
	}
	.cu-list .cu-item .cu-btn .title{margin-right: 20rpx;}
	.cu-list .cu-item .cu-btn .num {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		line-height: 40rpx;
		margin-right: 20rpx;
		font-size: 24rpx;
		position: relative;
		overflow: hidden;
	}
</style>
