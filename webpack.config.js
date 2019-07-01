//var webpack = require("webpack");
//var path = require("path");
//
//var DIST_DIR = path.resolve(_dirname, "dist");
//var SRC_DIR = path.resolve(_dirname, "src");
//var config = {
//    entry: SRC_DIR + "/app/index.js",
//    output: {
//        path: DIST_DIR + "/app",
//        filename: "bundle.js",
//        publicPath: "/app/"
//    },
//    modules: {
//        loaders : [
//        {
//            test : /\.js?/,
//            include: SRC_DIR,
//            loader: "babel-loader",
//            query: {
//                presets: [       
//                    "es2015",
//                    "react",
//                     "stage-2"]
//            }
//        }
//    ]
//    }
//};
//
//module.exports = config;