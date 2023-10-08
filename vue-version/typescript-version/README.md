# Rexo-UI 后台管理模板 Vue 3 TypeScript 版本

### 推荐的 IDE

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/)

### TS 中对“.vue”导入的类型支持

因为 TypeScript 无法处理`.js`的类型信息，默认情况下`.vue`文件的导入被设置为通用的 vue 组件类型。在绝大多数情况下模板之外组件的 prop 不会有兼容性问题。
如果需要在`.properties`中获取实际的`.vue`文件导入的 prop 类型（例如在使用手动`h(…)`调用时获取 prop 验证），可以使用`Volar`并运行`Volar: Switch TS Plugin onoff`。

### 自定义配置

请参阅 [Vite 配置参考](https://vitejs.dev/config/)

### 安装

```sh
npm install
```

### 开发运行（编译和热重载）

```sh
npm run dev
```

### 生产环境（进行类型检查、编译和压缩）

```sh
npm run build
```
