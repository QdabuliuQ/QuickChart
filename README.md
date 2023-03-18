# QuickChart

### 项目简介
`QuickChart`基于`Vue3 + TypeScript + Echarts`，主要用于快速生成和编辑图表，包含了柱状图，饼图，折线图。柱状图和其他类型的图表当中还包含了多种图表模板可供选择，提供可视化图表样式和数据的编辑，以及直接导入`Excel`图表数据，下载图表数据`Excel`文件，下载图表图片，已经查看对应的`Echart`配置。

### 目录结构
<pre>
└─ src
  └─ assets 资源
    └─ icon 字体图标
    └─ image 图表
    └─ less 全局样式
  └─ chartConfig 图表配置
    └─ commonParams 抽离出来的公共配置项
    └─ config 图表配置
    └─ conveyUtils excel数据到图表数据的装换
  └─ components 公共组件
  └─ router 路由管理
  └─ types 类型限制
  └─ store 全局状态管理
  └─ utils 工具函数
  └─ views 页面
</pre>

### 项目依赖
* `Vue.js` - 渐进式 JavaScript 框架
* `TypeScript` - TypeScript 是 JavaScript的超集
* `Less` - Css预处理器
* `Echarts` - 一款基于JavaScript的数据可视化图表库
* `Vue-router` - Vue.js 官方的路由管理器
* `Pinia` - Vue.js 状态管理库
* `ElementPlus` - Vue3 UI框架
* `hljsVuePlugin` - 代码高亮插件
* `mitt` - 事务总线
* `lodash` - 一个一致性、模块化、高性能的 JavaScript 实用工具库
* `x-data-spreadsheet` - 一个基于Web(es6) canvas 构建的轻量级 Excel 开发库
* `xlsx` - 生成xlse文件的 JavaScript 插件

### 项目难点
1. 每一种图表都有对应的配置项去配置，例如饼图可以配置饼图的内外圈大小，而柱状图不需要，所以为每一个图表创建对应的配置项文件，根据切换的图表类型不同，去加载该图表的配置配置，然后生成右侧的配置选项提供给用户去调整。所以将图表的`Echart`配置和右侧的配置选项都存放到`chartConfig`文件当中，当某一种图表需要被加载的时候，则会去`import`导入该图表的配置文件`.ts`，生成图表和右侧的配置选项。
2. `Excel`数据的展示，展示使用到的是`x-data-spreadsheet`类库，通过提取图表中的`series`数据或者是`xAsis / yAsis`数据放入`Excel`当中。也可以手动编辑，监听`Excel`的数据变化，当数据变化的时候，生成新的图表配置信息，通过`mitt`事件总线进行传递，然后调用`setOption`进行图表的更新。
3. `xlsx`类库负责导入,下载`Excel`文件，通过与`x-data-spreadsheet`配合，一个负责数据的编辑，一个负责数据的导入导出。