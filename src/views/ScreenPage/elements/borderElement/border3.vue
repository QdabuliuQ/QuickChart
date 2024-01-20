<template>
	<svg :width="width" :height="height">
		<defs>
			<filter height="150%" width="150%" x="-25%" y="-25%">
				<feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
				<feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
				<feFlood :flood-color="color2" result="glowColor">
					<animate
						attributeName="flood-color"
						:values="`
                ${color2};
                ${color2};
                ${color2};
              `"
						dur="3s"
						begin="0s"
						repeatCount="indefinite" />
				</feFlood>
				<feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
				<feMerge>
					<feMergeNode in="softGlowColored" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<path
			v-if="width && height"
			fill="transparent"
			stroke-width="2"
			:stroke="color1"
			:d="`
          M15 5 L ${width - 15} 5 Q ${width - 5} 5, ${width - 5} 15
          L ${width - 5} ${height - 15} Q ${width - 5} ${height - 5}, ${width - 15} ${height - 5}
          L 15, ${height - 5} Q 5 ${height - 5} 5 ${height - 15} L 5 15
          Q 5 5 15 5
        `" />

		<path
			stroke-width="2"
			fill="transparent"
			stroke-linecap="round"
			:stroke="color2"
			:d="`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`" />

		<path
			stroke-width="2"
			fill="transparent"
			stroke-linecap="round"
			:stroke="color2"
			:d="`M ${width - 20} 5 L ${width - 15} 5 Q ${width - 5} 5 ${width - 5} 15 L ${
				width - 5
			} 20`" />

		<path
			stroke-width="2"
			fill="transparent"
			stroke-linecap="round"
			:stroke="color2"
			:d="`
          M ${width - 20} ${height - 5} L ${width - 15} ${height - 5}
          Q ${width - 5} ${height - 5} ${width - 5} ${height - 15}
          L ${width - 5} ${height - 20}
        `" />

		<path
			stroke-width="2"
			fill="transparent"
			stroke-linecap="round"
			:stroke="color2"
			:d="`
          M 20 ${height - 5} L 15 ${height - 5}
          Q 5 ${height - 5} 5 ${height - 15}
          L 5 ${height - 20}
        `" />
	</svg>
</template>

<script setup lang="ts">
interface IProps {
	width: number
	height: number
	color1: string
	color2: string
}
const { width, height, color1, color2 } = defineProps<IProps>()
</script>
