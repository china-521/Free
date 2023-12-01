// 引入 node 内置模块 path
const path = require('path');

const isPord = true;

module.exports = {
	// 模式
	mode: isPord ? 'production' : 'development', //  development：开发环境，production：生产环境
	// 入口
	entry: './init/init.js',
	//出口
	output: {
		// 打包文件夹
		path: path.resolve(__dirname, 'dist'),
		// 打包文件
		filename: 'Free.js',
		// 对外暴露的对象名称
		// library:'free',
		//打包生成库可以通过esm/commonjs/reqirejs的语法引入
		libraryTarget: 'umd',
	},
	resolve: {
		// 配置省略文件后缀名
		extensions: ['.js', '.css', '.html', '.json']
	}
}