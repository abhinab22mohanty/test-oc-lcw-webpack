import path from "path";
import { Configuration } from "webpack";
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';

const fileLoader = {
    test: /\.(jpe?g|png|gif|svg|mp3)$/i,
    loader: "file-loader",
    options: {
        name: "public/assets/[name].[ext]"
    }
};

const disableFullyQualifiedNameResolutions = {
    test: /\.m?js/,
    resolve: {
        fullySpecified: false,
    },
};

const babelLoaderConfiguration = {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
            ],
        },
    }
};

const config: Configuration = {
    entry: "./src/index.tsx",
    mode: "development",
    module: {
        rules: [
            babelLoaderConfiguration,
            fileLoader,
            disableFullyQualifiedNameResolutions
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        globalObject: "this",
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        }
    },
};

export default config;