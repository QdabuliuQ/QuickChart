<template>
	<div class="error-page">
		<div class="error-container">
			<img src="@/assets/image/404.png" />
			找不到页面
		</div>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less">
.error-page {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	.error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 20px;
		letter-spacing: 5px;
		img {
			width: 30%;
			margin-bottom: 10px;
		}
	}
}
</style>
