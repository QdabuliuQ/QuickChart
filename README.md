# QuickChart

#### 基于 Echarts 和 Vue3 实现，支持可视化大屏拖拽制作，提供了图表，边框，图片和图形等多种元素自由搭建。可视化编辑图表或地图样式，修改图表展示数据，支持导入/导出 excel 文件，以及 echarts 配置对象。允许导出 png/html文件。
[在线预览地址](http://106.53.176.226:8881/index/home)
#### 技术栈：
* Vue3
* TypeScript
* Echarts
* Axios
* mitt
* x-data-spreadsheet
* webworker
* vue3-moveable
* Express
* Puppeteer

### 启动项目
```
git clone https://github.com/QdabuliuQ/QuickChart.git

pnpm install

pnpm run dev
```

### 已实现功能：
- 账号登录/注册
- 修改账号密码
- 图表制作/分享/评论/点赞
  - 数据编辑/导出
- 地图制作/分享/评论/点赞
  - 数据编辑/导出
- 大屏制作/分享/评论/点赞
- 大屏预览/导出
- 图表/地图导出
- 社区分享
- 图表/地图/大屏保存

### 项目难点：
- 利用 Puppeteer 动态生成图表/大屏数据效果图。
  - `后端通过nodeJS，配合Puppeteer，根据前端传入的内容，动态生成代码模板并且写入到Puppeteer，调用snapShot方法完成截屏`
- JSON 结构化数据存储大屏数据信息，配合前端渲染器进行页面解析和渲染。
  - `通过约定的JSON配置结构，通过JSON描述大屏元素的样式信息，前端渲染器读取配置，根据不同元素加载不同的组件，在组件内部对配置初始化`
- 跨浏览器标签页通信，编辑页面修改后预览页面会自动完成更新。
  - `BroadcastChannel创建对应的消息频道，预览页面和编辑页面通过消息频道进行通信，将最新的图表配置传递给预览页面，预览页面接收到新的配置后完成视图渲染`
- 大屏制作提供多种元素组件自由搭建，调整组件样式和拖拽布局位置，实现元素复制，粘贴，剪切和锁定功能。
- 使用 webworker 进行图表数据和 excel 数据的相互转换，提高性能。
  - `由于图表Echarts数据格式和Excel返回的数据格式存在差异，所以需要一个转换的过程，如果数据量较大，容易造成页面卡顿，所以选择新开一个线程，专门负责数据转换操作`
- 利用动态加载配置组件，优化图表编辑页面的初始加载速度。
  - `import.meta.glob() 导入所有组件的执行函数，创建componentMap进行缓存，如果componentMap中没有，则调用组件执行函数进行加载，并且加入componentsMap当中，后续不再需要执行组件函数，直接从componentsMap获取即可`
