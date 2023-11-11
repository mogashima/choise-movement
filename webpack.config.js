module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'production',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/ts/app.ts',

  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/js`,
    // 出力ファイル名
    filename: "choiseMovement.js"
  },

  module: {
    rules: [{
      // 拡張子 .ts の場合
      test: /\.ts$/,
      // TypeScript をコンパイルする
      use: 'ts-loader',
    },
    // Sassファイルの読み込みとコンパイル
    {
      test: /\.scss/, // 対象となるファイルの拡張子
      use: [
        // linkタグに出力する機能
        "style-loader",
        // CSSをバンドルするための機能
        {
          loader: "css-loader",
          options: {
            // オプションでCSS内のurl()メソッドの取り込みを禁止する
            url: false,

            // 0 => no loaders (default);
            // 1 => postcss-loader;
            // 2 => postcss-loader, sass-loader
            importLoaders: 2
          }
        },
        {
          loader: "sass-loader",
          options: {

          },
        },
      ],
    },
    ],

  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },
};