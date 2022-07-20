module.exports = {
    publicPath: './',
    devServer: {
        host: 'localhost',

        proxy: {
            '/api': {
                target: 'https://4h1s324364.qicp.vip',
                ws: true,
                changeOrigin: true
            },
            // '/api': {
            //     target: 'http://10.225.10.63:9542',
            //     ws: true,
            //     changeOrigin: true
            // },
            // '/api': {
            //     target: 'http://49.232.20.32:5057/'
            // },

        }
    }
}