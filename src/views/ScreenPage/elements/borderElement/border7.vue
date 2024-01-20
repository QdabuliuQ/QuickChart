<template>
	<svg :height="height" :width="width">
		<defs>
			<linearGradient :id="filterId" x1="0%" x2="100%" y1="0%" y2="100%">
				<animate
					attributeName="x1"
					begin="0s"
					dur="10s"
					repeatCount="indefinite"
					values="0%;100%;0%" />
				<animate
					attributeName="x2"
					begin="0s"
					dur="10s"
					repeatCount="indefinite"
					values="100%;0%;100%" />
				<stop :stop-color="color1" offset="0%">
					<animate
						:values="`${color1};${color2};${color1}`"
						attributeName="stop-color"
						begin="0s"
						dur="10s"
						repeatCount="indefinite" />
				</stop>
				<stop :stop-color="color2" offset="100%">
					<animate
						:values="`${color2};${color1};${color2}`"
						attributeName="stop-color"
						begin="0s"
						dur="10s"
						repeatCount="indefinite" />
				</stop>
			</linearGradient>
			<mask :id="maskId">
				<polyline
					:points="`8, ${height * 0.4} 8, 3, ${width * 0.4 + 7}, 3`"
					fill="transparent"
					stroke="#fff"
					stroke-width="3" />
				<polyline
					:points="`8, ${height * 0.15} 8, 3, ${width * 0.1 + 7}, 3
              ${width * 0.1}, 8 14, 8 14, ${height * 0.15 - 7}
            `"
					fill="#fff" />

				<polyline
					:points="`${width * 0.5}, 3 ${width - 3}, 3, ${width - 3}, ${height * 0.25}`"
					fill="transparent"
					stroke="#fff"
					stroke-width="3" />
				<polyline
					:points="`
              ${width * 0.52}, 3 ${width * 0.58}, 3
              ${width * 0.58 - 7}, 9 ${width * 0.52 + 7}, 9
            `"
					fill="#fff" />
				<polyline
					:points="`
              ${width * 0.9}, 3 ${width - 3}, 3 ${width - 3}, ${height * 0.1}
              ${width - 9}, ${height * 0.1 - 7} ${width - 9}, 9 ${width * 0.9 + 7}, 9
            `"
					fill="#fff" />

				<polyline
					:points="`8, ${height * 0.5} 8, ${height - 3} ${width * 0.3 + 7}, ${height - 3}`"
					fill="transparent"
					stroke="#fff"
					stroke-width="3" />
				<polyline
					:points="`
              8, ${height * 0.55} 8, ${height * 0.7}
              2, ${height * 0.7 - 7} 2, ${height * 0.55 + 7}
            `"
					fill="#fff" />

				<polyline
					:points="`${width * 0.35}, ${height - 3} ${width - 3}, ${height - 3} ${width - 3}, ${
						height * 0.35
					}`"
					fill="transparent"
					stroke="#fff"
					stroke-width="3" />
				<polyline
					:points="`
              ${width * 0.92}, ${height - 3} ${width - 3}, ${height - 3} ${width - 3}, ${
								height * 0.8
							}
              ${width - 9}, ${height * 0.8 + 7} ${width - 9}, ${height - 9} ${width * 0.92 + 7}, ${
								height - 9
							}
            `"
					fill="#fff" />
			</mask>
		</defs>

		<polygon
			:points="`
        15, 9 ${width * 0.1 + 1}, 9 ${width * 0.1 + 4}, 6 ${width * 0.52 + 2}, 6
        ${width * 0.52 + 6}, 10 ${width * 0.58 - 7}, 10 ${width * 0.58 - 2}, 6
        ${width * 0.9 + 2}, 6 ${width * 0.9 + 6}, 10 ${width - 10}, 10 ${width - 10}, ${
					height * 0.1 - 6
				}
        ${width - 6}, ${height * 0.1 - 1} ${width - 6}, ${height * 0.8 + 1} ${width - 10}, ${
					height * 0.8 + 6
				}
        ${width - 10}, ${height - 10} ${width * 0.92 + 7}, ${height - 10}  ${width * 0.92 + 2}, ${
					height - 6
				}
        11, ${height - 6} 11, ${height * 0.15 - 2} 15, ${height * 0.15 - 7}
      `"
			fill="transparent" />

		<rect
			:fill="`url(#${filterId})`"
			:height="height"
			:mask="`url(#${maskId})`"
			:width="width"
			x="0"
			y="0" />
	</svg>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

interface IProps {
	id: string
	width: number
	height: number
	color1: string
	color2: string
}

const { id, width, height, color1, color2 } = defineProps<IProps>()
const filterId = ref<string>('filter-' + id)
const maskId = ref<string>('mask-' + id)
</script>
