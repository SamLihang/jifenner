module.exports = {
    devServer: {
        port: 8080,
        open: true,
        proxy: {
            '/api': {
                target: 'https://one.dydigit.com/pointshop',
                ws: true,
                https: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    },
    //打包时需要更改为./
    publicPath: './',
    outputDir: 'dist',
    //本地或线上是否生成map提示文件
    productionSourceMap: false
}
