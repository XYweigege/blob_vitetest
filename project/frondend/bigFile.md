 #### 问题

<font style="color:rgb(7, 17, 27);">本人现在从事公司的管理系统开发，每天都是curd，业务单一，技术也比较单一，用的技术栈Vue全家桶（vue pinia/vuex/vue-router  element-ui组件库），或者 React全家桶,也是同理（react/hooks react-router/mobx/ antd）  
</font><font style="color:rgb(7, 17, 27);">这种中后台系统，如何能够在项目中去挖掘难点和亮点，提升团队开发效率? 我应该从哪些方面着手?</font>

<font style="color:rgb(7, 17, 27);"></font>

#### <font style="color:rgb(7, 17, 27);">从提高团队开发效率：</font>

+ <font style="color:rgb(7, 17, 27);">统一UI规范：页面的交互效果形成统一的交互文档，按钮等样式统一。</font>
+ <font style="color:rgb(7, 17, 27);">通用组件库封装：将项目中通用的组件抽离出来形成单独的组件库，这个各个页面在使用的时候直接使用封装的组件库，方便后期的维护和更新。</font>
+ <font style="color:rgb(7, 17, 27);">统一样式编写: 在样式编写中可以使用 sass，less 创建一系列变量，作为样式的基础，将这些变量放在global文件中，后期修改的时候可以进行统一修改。</font>
+ <font style="color:rgb(7, 17, 27);">统一mock数据字段：当前后端共同开发时，前后端共同定义接口字段的名称和类型，后端在还没开发完成时，前端使用定义好的自定进行mock数据，等后台开发完成进行接口联调。减少后期和后端的联调时间。</font>
+ <font style="color:rgb(7, 17, 27);">统一编码规范和风格，制定前端规范全家桶, ：</font>eslint+prettier+husky+lint-staged<font style="color:rgb(7, 17, 27);"> + </font>TypeScript <font style="color:rgb(7, 17, 27);">定义一套编码规范，保证团队代码规范统一。</font>
+ <font style="color:rgb(7, 17, 27);">代码版本和分支策略：这里以gitlab为例， husky lint-staged ，项目负责人创建项目后团队中的开发者fork项目在自己仓库中创建项目仓库，开发任务完成后提交到自己仓库中，向主项目发起合并请求同时给有合并代码权限的同事发消息。当所有代码调试完毕后创建版本分支。</font>

#### <font style="color:rgb(7, 17, 27);">从另外一个角度</font>

<font style="color:rgb(7, 17, 27);">项目特性入手分析</font>

<font style="color:rgb(7, 17, 27);">项目量级如何，有多少个页面，页面有没有什么共性等等，这些是需要你来分析和输出的 </font>

<font style="color:rgb(7, 17, 27);">通过IDE或浏览器插件，提供开发支持，还可以开发很多辅助工具，如业务组件库、脚手架等等</font>



<font style="color:rgb(38, 38, 38);">1.权限管理：后台管理系统通常需要涉及复杂的权限控制，需要对不同角色和权限进行精细化管理。</font>

<font style="color:rgb(38, 38, 38);">2.数据交互：后台管理系统需要与后端接口进行数据交互，需要处理请求和响应、数据格式等问题。</font>

<font style="color:rgb(38, 38, 38);">3.大规模组件开发：后台管理系统通常包含大量的组件，需要对组件进行合理的划分、组织和复用。</font>

<font style="color:rgb(38, 38, 38);">4.性能优化：后台管理系统通常需要处理大量的数据和复杂的业务逻辑，需要对性能进行优化，提升用户体验。</font>

<font style="color:rgb(38, 38, 38);">5.异常处理：后台管理系统需要处理各种异常情况，如网络请求失败、数据加载错误等，需要进行合理的异常处理和提示。</font>

<font style="color:rgb(38, 38, 38);"></font>

 

## <font style="color:rgb(60, 60, 67);">实际项目中的难点</font>

<font style="color:rgb(60, 60, 67);">首先要根据自己接触的项目类型做分类和总结，不同的项目类型，难点是不一样的，应该从以下几个维度去考虑：</font>

+ <font style="color:rgb(60, 60, 67);">移动项目</font>
+ <font style="color:rgb(60, 60, 67);">B 端项目，比如医药系统，后台管理系统，公司后台政府网站等</font>
+ <font style="color:rgb(60, 60, 67);">大屏数据展，可视化界面，svg</font>
+ <font style="color:rgb(60, 60, 67);">消息推送，状态实时监控</font>

### <font style="color:rgb(60, 60, 67);">移动项目需要考虑的点</font>

+ <font style="color:rgb(60, 60, 67);">rem 单位的转换</font>
+ <font style="color:rgb(60, 60, 67);">设计稿的高度还原，精确到 1px，体现出做事情的细致和高度精确度</font>
+ <font style="color:rgb(60, 60, 67);">多媒体适应不同的屏幕</font>
+ <font style="color:rgb(60, 60, 67);">不同设备的兼容性问题</font>

### <font style="color:rgb(60, 60, 67);">B 端项目需要考虑的点</font>

+ <font style="color:rgb(60, 60, 67);">上传，大文件上传，断点续传等功能</font>
+ <font style="color:rgb(60, 60, 67);">excel,pdf,导入和导出，在线 excel 编辑</font>
+ <font style="color:rgb(60, 60, 67);">富文本编辑器，二次开发编辑器</font>

### <font style="color:rgb(60, 60, 67);">大屏数据展，可视化界面，svg</font>

+ <font style="color:rgb(60, 60, 67);">echarts,g2 等图标的使用</font>
+ <font style="color:rgb(60, 60, 67);">画过其中一些比较难的图标，比如高度定制化的地图，流程图，关系图等</font>
+ <font style="color:rgb(60, 60, 67);">按照公司 UI 设计自定义一些图标的风格和样式，形成公司风格的 ui 图标</font>
+ <font style="color:rgb(60, 60, 67);">3D 可视化绘图或者 svg 的 2D 绘图以及根据可视化绘图数据生成 svg 图标渲染</font>

### <font style="color:rgb(60, 60, 67);">消息推送，状态实时监控</font>

+ <font style="color:rgb(60, 60, 67);">mqtt 的连接和实时数据的获取</font>
+ <font style="color:rgb(60, 60, 67);">原生 websoket 的连接和消息推送和获取</font>

## <font style="color:rgb(60, 60, 67);">工作中的亮点</font>

<font style="color:rgb(60, 60, 67);">站在整体观的角度去分析你在团队做的贡献以及前端做的一些贡献，从以下几个维度考虑</font>

+ <font style="color:rgb(60, 60, 67);">项目前端规范，并落实到工程化项目里面</font>
+ <font style="color:rgb(60, 60, 67);">组件库的封装和开发</font>
+ <font style="color:rgb(60, 60, 67);">代码 review 和技术文档的分享</font>

### <font style="color:rgb(60, 60, 67);">项目前端规范</font>

+ <font style="color:rgb(60, 60, 67);">git 提交规范</font>
+ <font style="color:rgb(60, 60, 67);">编辑工具代码格式规范，vscode 格式化，eslint,ts 等检测</font>
+ <font style="color:rgb(60, 60, 67);">代码的规范化，const 和 let 的合适使用等</font>
+ <font style="color:rgb(60, 60, 67);">打包工具的规范，比如自动引入等，引入模块的标准语法</font>

### <font style="color:rgb(60, 60, 67);">组件库的封装和开发</font>

+ <font style="color:rgb(60, 60, 67);">定制化属于公司的基础组件库</font>
+ <font style="color:rgb(60, 60, 67);">规范了不同系统的样式风格，交互，尺寸等统一</font>
+ <font style="color:rgb(60, 60, 67);">提升了代码的可维护性和扩展性，做到一处改处处生效。</font>

### <font style="color:rgb(60, 60, 67);">代码 review 和技术文档分享</font>

+ <font style="color:rgb(60, 60, 67);">定期的组织代码的 review 可以很好的监督规范公司的代码质量和逻辑</font>
+ <font style="color:rgb(60, 60, 67);">代码 review 还可以发散思维，不同的人有不同的逻辑思维，可以学习和运用。</font>
+ <font style="color:rgb(60, 60, 67);">技术文档的分享可以同步近期热门和更新的技术，让每个成员尽可能保证技术的热点</font>
+ <font style="color:rgb(60, 60, 67);">还可以根据技术文档的分享查漏补缺，加深知识和技术的理解，更好的运用到工作中</font>

