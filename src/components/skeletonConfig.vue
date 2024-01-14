<template>
	<div class="skeleton-config">
		<div class="skeleton-cover skeleton-loading"></div>
		<div class="skeleton-title skeleton-loading"></div>
		<div v-for="item in 5" :key="item" class="skeleton-config-item">
			<div class="skeleton-config-title skeleton-loading"></div>
			<div class="skeleton-config-value skeleton-loading"></div>
		</div>
		<div class="skeleton-title skeleton-loading"></div>
		<div v-for="item in 5" :key="item" class="skeleton-config-item">
			<div class="skeleton-config-title skeleton-loading"></div>
			<div class="skeleton-config-value skeleton-loading"></div>
		</div>
	</div>
</template>
<style lang="less">
.skeleton-config {
	width: 100%;
	.skeleton-loading {
		background-image: linear-gradient(
			111deg,
			#2b2b2b 25%,
			rgb(73, 73, 73) 37%,
			#2b2b2b 63%
		);
		color: transparent !important;
		background-position: 100% 50%;
		background-size: 400% 100%;
		animation: skeleton-loading 1.4s ease infinite;
	}

	@keyframes skeleton-loading {
		0% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0 50%;
		}
	}
	.skeleton-cover {
		width: 100%;
		border-radius: 10px;
		aspect-ratio: 1/0.7;
	}
	.skeleton-title {
		margin: 13px 0;
		width: 100%;
		height: 24px;
		border-radius: 5px;
	}
	.skeleton-config-item {
		margin: 12px 0;
		width: 100%;
		height: 17px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.skeleton-config-title {
			width: 30%;
			height: 100%;
			border-radius: 5px;
		}
		.skeleton-config-value {
			width: 50%;
			height: 100%;
			border-radius: 5px;
		}
	}
}
</style>