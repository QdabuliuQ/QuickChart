<template>
	<svg :width="width" :height="height">
		<defs>
			<filter :id="id" height="150%" width="150%" x="-25%" y="-25%">
				<feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
				<feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
				<feFlood :flood-color="color2" result="glowColor" />
				<feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
				<feMerge>
					<feMergeNode in="softGlowColored" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<polygon
			fill="transparent"
			:points="`
        20, 32 ${width * 0.5 - borderTitleWidth / 2}, 32 ${
					width * 0.5 - borderTitleWidth / 2 + 20
				}, 53
        ${width * 0.5 + borderTitleWidth / 2 - 20}, 53 ${width * 0.5 + borderTitleWidth / 2}, 32
        ${width - 20}, 32 ${width - 8}, 48 ${width - 8}, ${height - 25} ${width - 20}, ${height - 8}
        20, ${height - 8} 8, ${height - 25} 8, 50
      `" />

		<polyline
			fill="transparent"
			:stroke="color1"
			:filter="`url(#${id})`"
			:points="`
          ${(width - borderTitleWidth) / 2}, 30
          20, 30 7, 50 7, ${50 + (height - 167) / 2}
          13, ${55 + (height - 167) / 2} 13, ${135 + (height - 167) / 2}
          7, ${140 + (height - 167) / 2} 7, ${height - 27}
          20, ${height - 7} ${width - 20}, ${height - 7} ${width - 7}, ${height - 27}
          ${width - 7}, ${140 + (height - 167) / 2} ${width - 13}, ${135 + (height - 167) / 2}
          ${width - 13}, ${55 + (height - 167) / 2} ${width - 7}, ${50 + (height - 167) / 2}
          ${width - 7}, 50 ${width - 20}, 30 ${(width + borderTitleWidth) / 2}, 30
          ${(width + borderTitleWidth) / 2 - 20}, 7 ${(width - borderTitleWidth) / 2 + 20}, 7
          ${(width - borderTitleWidth) / 2}, 30 ${(width - borderTitleWidth) / 2 + 20}, 52
          ${(width + borderTitleWidth) / 2 - 20}, 52 ${(width + borderTitleWidth) / 2}, 30
        `" />

		<polygon
			:stroke="color1"
			fill="transparent"
			:points="`
          ${(width + borderTitleWidth) / 2 - 5}, 30 ${(width + borderTitleWidth) / 2 - 21}, 11
          ${(width + borderTitleWidth) / 2 - 27}, 11 ${(width + borderTitleWidth) / 2 - 8}, 34
        `" />

		<polygon
			:stroke="color1"
			fill="transparent"
			:points="`
          ${(width - borderTitleWidth) / 2 + 5}, 30 ${(width - borderTitleWidth) / 2 + 22}, 49
          ${(width - borderTitleWidth) / 2 + 28}, 49 ${(width - borderTitleWidth) / 2 + 8}, 26
        `" />

		<polygon
			:stroke="color1"
			:fill="color2"
			:filter="`url(#${id})`"
			:points="`
          ${(width + borderTitleWidth) / 2 - 11}, 37 ${(width + borderTitleWidth) / 2 - 32}, 11
          ${(width - borderTitleWidth) / 2 + 23}, 11 ${(width - borderTitleWidth) / 2 + 11}, 23
          ${(width - borderTitleWidth) / 2 + 33}, 49 ${(width + borderTitleWidth) / 2 - 22}, 49
        `" />

		<polygon
			:filter="`url(#${id})`"
			:fill="color1"
			opacity="1"
			:points="`
          ${(width - borderTitleWidth) / 2 - 10}, 37 ${(width - borderTitleWidth) / 2 - 31}, 37
          ${(width - borderTitleWidth) / 2 - 25}, 46 ${(width - borderTitleWidth) / 2 - 4}, 46
        `">
			<animate
				attributeName="opacity"
				values="1;0.7;1"
				dur="2s"
				begin="0s"
				repeatCount="indefinite" />
		</polygon>

		<polygon
			:filter="`url(#${id})`"
			:fill="color1"
			opacity="0.7"
			:points="`
          ${(width - borderTitleWidth) / 2 - 40}, 37 ${(width - borderTitleWidth) / 2 - 61}, 37
          ${(width - borderTitleWidth) / 2 - 55}, 46 ${(width - borderTitleWidth) / 2 - 34}, 46
        `">
			<animate
				attributeName="opacity"
				values="0.7;0.4;0.7"
				dur="2s"
				begin="0s"
				repeatCount="indefinite" />
		</polygon>

		<polygon
			:filter="`url(#${id})`"
			:fill="color1"
			opacity="0.5"
			:points="`
          ${(width - borderTitleWidth) / 2 - 70}, 37 ${(width - borderTitleWidth) / 2 - 91}, 37
          ${(width - borderTitleWidth) / 2 - 85}, 46 ${(width - borderTitleWidth) / 2 - 64}, 46
        `">
			<animate
				attributeName="opacity"
				values="0.5;0.2;0.5"
				dur="2s"
				begin="0s"
				repeatCount="indefinite" />
		</polygon>

		<polygon
			:filter="`url(#${id})`"
			:fill="color1"
			opacity="1"
			:points="`
          ${(width + borderTitleWidth) / 2 + 30}, 37 ${(width + borderTitleWidth) / 2 + 9}, 37
          ${(width + borderTitleWidth) / 2 + 3}, 46 ${(width + borderTitleWidth) / 2 + 24}, 46
        `">
			<animate
				attributeName="opacity"
				values="1;0.7;1"
				dur="2s"
				begin="0s"
				repeatCount="indefinite" />
		</polygon>

		<polygon
			:filter="`url(#${id})`"
			:fill="color1"
			opacity="0.7"
			:points="`
          ${(width + borderTitleWidth) / 2 + 60}, 37 ${(width + borderTitleWidth) / 2 + 39}, 37
          ${(width + borderTitleWidth) / 2 + 33}, 46 ${(width + borderTitleWidth) / 2 + 54}, 46
        `">
			<animate
				attributeName="opacity"
				values="0.7;0.4;0.7"
				dur="2s"
				begin="0s"
				repeatCount="indefinite" />
		</polygon>

		<polygon
			:filter="`url(#${id})`"
			:fill="color1"
			opacity="0.5"
			:points="`
          ${(width + borderTitleWidth) / 2 + 90}, 37 ${(width + borderTitleWidth) / 2 + 69}, 37
          ${(width + borderTitleWidth) / 2 + 63}, 46 ${(width + borderTitleWidth) / 2 + 84}, 46
        `">
			<animate
				attributeName="opacity"
				values="0.5;0.2;0.5"
				dur="2s"
				begin="0s"
				repeatCount="indefinite" />
		</polygon>

		<text
			:x="`${width / 2}`"
			:y="borderTitleHeight"
			:fill="borderTitleColor"
			:font-size="borderTitleSize"
			text-anchor="middle"
			dominant-baseline="middle">
			{{ borderTitle }}
		</text>

		<polygon
			:fill="color1"
			:filter="`url(#${id})`"
			:points="`7, ${53 + (height - 167) / 2} 11, ${57 + (height - 167) / 2}
	11, ${133 + (height - 167) / 2} 7, ${137 + (height - 167) / 2}
 `" />

		<polygon
			:fill="color1"
			:filter="`url(#${id})`"
			:points="`
          ${width - 7}, ${53 + (height - 167) / 2} ${width - 11}, ${57 + (height - 167) / 2}
          ${width - 11}, ${133 + (height - 167) / 2} ${width - 7}, ${137 + (height - 167) / 2}
        `" />
	</svg>
</template>

<script setup lang="ts">
interface IProps {
	id: string
	width: number
	height: number
	color1: string
	color2: string
	borderTitleWidth: number
	borderTitleHeight: number
	borderTitleColor: string
	borderTitleSize: number
	borderTitle: string
}
const {
	id,
	width,
	height,
	color1,
	color2,
	borderTitleWidth,
	borderTitleColor,
	borderTitleHeight,
	borderTitleSize,
	borderTitle
} = defineProps<IProps>()
</script>
