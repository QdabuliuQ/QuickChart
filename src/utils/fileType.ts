export const fileType = (fileName: string) => {
	let suffix: string = '' // 后缀获取
	let result: string | undefined = '' // 获取类型结果
	if (fileName) {
		const flieArr = fileName.split('.') // 根据.分割数组
		suffix = flieArr[flieArr.length - 1] // 取最后一个
	}
	if (!suffix) return false // fileName无后缀返回false
	suffix = suffix.toLocaleLowerCase() // 将后缀所有字母改为小写方便操作
	// 匹配图片
	const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif'] // 图片格式
	result = imgList.find((item) => item === suffix)
	if (result) return 'image'
	// 匹配txt
	const txtList = ['txt']
	result = txtList.find((item) => item === suffix)
	if (result) return 'txt'
	// 匹配excel
	const excelList = ['xls', 'xlsx']
	result = excelList.find((item) => item === suffix)
	if (result) return 'excel'
	// 匹配word
	const wordList = ['doc', 'docx']
	result = wordList.find((item) => item === suffix)
	if (result) return 'word'
	// 匹配pdf
	const pdfList = ['pdf']
	result = pdfList.find((item) => item === suffix)
	if (result) return 'pdf'
	// 匹配ppt
	const pptList = ['ppt', 'pptx']
	result = pptList.find((item) => item === suffix)
	if (result) return 'ppt'
	// 匹配zip
	const zipList = ['rar', 'zip', '7z']
	result = zipList.find((item) => item === suffix)
	if (result) return 'zip'
	// 匹配视频
	const videoList = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v']
	result = videoList.find((item) => item === suffix)
	if (result) return 'video'
	// 匹配音频
	const radioList = ['mp3', 'wav', 'wmv']
	result = radioList.find((item) => item === suffix)
	if (result) return 'radio'
	// 其他文件类型
	return 'other'
}
