module.exports = {
  devServer: {
    before: require('./mock/index.js'), // 引入mock/index.js
    // https://www.webpackjs.com/configuration/dev-server/#devserver-public
    // 当使用内联模式(inline mode)并代理 dev-server 时，内联的客户端脚本并不总是
    // 知道要连接到什么地方。它会尝试根据 window.location 来猜测服务器的 URL，
    // 但是如果失败，你需要这样，可能编辑器权限问题
    public: '192.168.100.93:8080' // 不加public会显示 Network: unavailable
  },
  lintOnSave: false
}
