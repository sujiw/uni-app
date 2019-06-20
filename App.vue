<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.api_domain = "https://book.mdaogo.cn/";
					Vue.prototype.api_url = {
						'search':Vue.prototype.api_domain+'newsearch',
						'recommendList':Vue.prototype.api_domain+'qidianRecommend',
						'rankingList':Vue.prototype.api_domain+'qidianRankingList',
						'finishList':Vue.prototype.api_domain+'qidianfinish',
						'bookinfo':Vue.prototype.api_domain+'newbook',
						'content':Vue.prototype.api_domain+'newcontent',
						'bookupdate':Vue.prototype.api_domain+'bookupdate',
					},
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		getUrl: function() {
			return "https://book.mdaogo.cn/";
		},
	};
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/css/app.css";
</style>
