"use strict";
// const { defineConfig } = require("@vue/cli-service"); // 提示函数
const path = require("path"); // 路径
const defaultSettings = require("./src/settings.js"); // 配置文件

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "后台管理系统"; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
// const port = process.env.port || process.env.npm_config_port || 3002 // dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  //  部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  //  可以通过三元运算去配置dev和prod环境, publicPath: process.env.NODE_ENV === 'production' ? '/prod/' : './'
  publicPath: "./",
  outputDir: "dist", // 打包后输出目录
  assetsDir: "static", // 静态文件目录
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false, // 生产环境是否要生成sourceMap
  // 代理配置
  devServer: {
    // host: http://localhsot // 项目运行时域名
    // port: defaultSettings.port, // 手动设置端口
    // https:true, // 是否启用https
    // open: true, // 编译完成后自动打开到浏览器
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api/admin": {
        target: "http://localhost:8000/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api/admin": "/admin"
        }
      },
      "/api": {
        target: process.env.VUE_APP_BASE_HOST,
        ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   // '^/api': '/'
        // }
      },

      "/api": {
        target: "https://4h1s324364.qicp.vip/",
        ws: true,
        changeOrigin: true
      }

      // '/api': {
      //   target: 'http://49.232.20.32:5057/',
      //   pathRewrite: {
      //     // '^/api': '/'
      //   },
      // },
    }
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name
    // resolve: {
    //   alias: {
    //     "@": resolve("src"),
    //     api: resolve("src/apis"),
    //     common: resolve("src/common")
    //   }
    // }
  },
  chainWebpack(config) {
    config.resolve.alias.set("@", resolve("src")).set("api", resolve("src/apis")).set("common", resolve("src/common"));

    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/) // 匹配svg文件
      .include.add(resolve("src/icons")) // 主要匹配src/icons
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader") // 使用的loader，主要要npm该插件
      .options({
        symbolId: "icon-[name]"
      }) // 参数配置
      .end();

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      // 针对已经存在的 rule , 如果需要修改它的参数, 可以使用 tap 方法
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    // 生产环境需要用到的插件
    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization
        .minimize(true)
        .minimizer("terser")
        .tap(args => {
          let { terserOptions } = args[0];
          // 生产关闭console and debugger
          terserOptions.compress.drop_console = true;
          terserOptions.compress.drop_debugger = true;
          return args;
        });
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  }
};
