<template>
	<div class="index-page">
		<div class="header">
			<div class="left">
				<div class="logo" @click="router.push('/')">
					<img class="logo-icon" src="@/assets/image/logo.png" alt="" />
					<img class="title-icon" src="@/assets/image/quickChart.png" alt="" />
				</div>
				<div class="menu">
					<div @click="toPage('home')" :class="[active == 'home' ? 'active' : '', 'menu-item']">
						首页
					</div>
					<div
						@click="toPage('community')"
						:class="[active == 'community' ? 'active' : '', 'menu-item']">
						社区
					</div>
				</div>
			</div>
			<div class="more">
				<div v-if="!isLogin" @click="toLogin" class="more-item">
					<i class="iconfont i_login"></i>
					登录/注册
				</div>
				<el-popover v-else popper-class="menu-popover-class" placement="bottom" :hide-after="50">
					<template #reference>
						<div class="more-item">
							<img :src="info.user_pic" />
							{{ info.nickname }}
						</div>
					</template>
					<menu-list />
				</el-popover>
			</div>
		</div>
		<div class="body">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useProxy from '@/hooks/useProxy'
import { onUnmounted, reactive, ref, watch } from 'vue'
import { useLogin } from '@/hooks/useLogin'
import menuList from '@/components/menuList.vue'

const router = useRouter()
const proxy = useProxy()

const isLogin = ref(false)
const active = ref<string>('home')

interface infoInt {
	email: string
	nickname: string
}

const info: any = reactive<infoInt>({
	email: '',
	nickname: ''
})

const toLogin = () => {
	proxy.$Bus.emit('showLoginDialog')
}

let res: any = useLogin(false)
if (res) {
	for (let key in res as infoInt) {
		info[key] = res[key]
	}
	isLogin.value = true
}
proxy.$Bus.on('logined', () => {
	let _info: any = JSON.parse(localStorage.getItem('info') as string)
	for (let key in _info) {
		info[key] = _info[key]
	}
	isLogin.value = true
})

const toPage = (path: string) => {
	router.push('/index/' + path)
}

let stop = watch(
	() => router.currentRoute.value.path,
	() => {
		console.log(router.currentRoute.value)
		active.value = router.currentRoute.value.name as string
	},
	{
		immediate: true
	}
)

onUnmounted(() => {
	stop()
})
</script>

<style lang="less">
.index-page {
	width: 80%;
	min-width: 1100px;
	margin: 0 auto;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		border-bottom: 2px solid #494949;

		.left {
			display: flex;
			align-items: center;
		}

		.menu {
			display: flex;
			align-items: center;

			.menu-item {
				padding: 10px 30px 12px;
				margin-right: 20px;
				font-size: 14px;
				text-indent: 3px;
				border-radius: 10px;
				cursor: pointer;
				letter-spacing: 3px;

				&:hover {
					background-color: @grey;
				}
			}

			.active {
				color: #fff;
				background-color: @theme !important;
			}
		}

		.logo {
			display: flex;
			align-items: center;
			margin-right: 50px;

			.logo-icon {
				width: 40px;
				cursor: pointer;
			}

			.title-icon {
				width: 200px;
				padding-right: 10px;
				margin-left: 5px;
				cursor: pointer;
			}

			.user-info {
				padding-left: 15px;
				box-sizing: border-box;
				border-left: 1px solid #ccc;

				.user {
					span {
						transition: 0.2s all linear;
						border-bottom: 2px dashed rgb(135 135 135);
						cursor: pointer;

						&:hover {
							color: @theme;
						}
					}
				}
			}
		}

		.more {
			display: flex;
			align-items: center;

			.more-item {
				display: flex;
				align-items: center;
				margin-left: 20px;
				font-size: 14px;
				color: #aaa;
				transition: 0.2s all linear;
				cursor: pointer;

				.iconfont {
					margin-right: 8px;
					font-size: 25px;
				}

				&:hover {
					color: @theme;
				}

				img {
					width: 30px;
					height: 30px;
					margin-right: 8px;
					border-radius: 50%;
					object-fit: cover;
				}
			}
		}
	}
}
</style>
