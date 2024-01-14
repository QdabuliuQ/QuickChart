module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-essential',
		'plugin:prettier/recommended'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'vue', 'simple-import-sort'],
	rules: {
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					[`^vue$`, `^vue-router$`, `^echarts$`], // 你可以根据需要添加更多的内置模块
					[`.*\\.vue$`], // .vue 文件
					[`.*/assets/.*`, `^@/assets$`],
					[`.*/config/.*`, `^@/config$`],
					[`.*/hooks/.*`, `^@/hooks$`],
					[`.*/router/.*`, `^@/router$`],
					[`.*/store/.*`, `^@/store$`],
					[`.*/utils/.*`, `^@/utils$`],
					[`.*/views/.*`, `^@/views$`],
					[`^`],
					[`^type `]
				]
			}
		],
		'no-async-promise-executor': 0,
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				tabWidth: 2
			}
		],

		// eslint（https://eslint.bootcss.com/docs/rules/）
		'no-var': 'error', // 要求使用 let 或 const 而不是 var
		'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unexpected-multiline': 'error', // 禁止空余的多行
		'no-useless-escape': 'off', // 禁止不必要的转义字符

		// typeScript (https://typescript-eslint.io/rules)
		'@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
		'@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
		'@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
		'@typescript-eslint/semi': 'off',

		// eslint-plugin-vue (https://eslint.vuejs.org/rules/)
		'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
		'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
		'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
		'vue/attribute-hyphenation': 'off' // 对模板中的自定义组件强制执行属性命名样式
	}
}
