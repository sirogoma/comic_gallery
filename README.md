# Comic Gallery

自身の漫画作品をオンラインで公開するためのポートフォリオサイトです。

## 🌐 デプロイ先
[https://comic-gallery-skm.web.app/](https://comic-gallery-skm.web.app/)

## ✨ 特徴・こだわった点

- **Viteによる高速な開発環境の構築** 

- **GitHub ActionsによるCI/CDの自動化**  
Firebase Hostingへのデプロイを自動化

- **運用の効率化とコスト最適化**   
個人利用のためクラウド利用料を発生させないよう、データベース接続を行いませんが、  
Markdownと設定ファイルを編集するだけで展示内容を直感的に管理できるよう留意し、  
メンテナンス性とインフラコストの最小化（完全無料枠内での運用）を両立させています。

- **レスポンシブ対応**  
tailwindCSSによるレスポンシブ対応済み。PC／スマートフォン二段階対応

- **漫画ビューアオープン時(各漫画カードタップ時)の配慮**
  - ヒストリーバックにて閉じることが可能
  - 漫画オープン時にGoogle Analyticsを送信し、どの漫画が読まれているかデータ取得


## 🛠 技術スタック
- **Frontend**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting (via GitHub Actions)

### 備考
 - 漫画ビューワ本体は下記ライブラリを利用しています。  
https://github.com/toranoana/tora-viewer

## 🚀 ローカルでの起動方法

手元でプロジェクトを実行する場合は、以下の手順に従ってください。

### 1. リポジトリのクローン
```bash
git clone https://github.com/sirogoma/comic_gallery.git
cd comic_gallery
```

### 2. 必要なパッケージのインストール
```bash
npm ci
```

### 3. 開発サーバーの起動
```bash
npm run dev
```
## 📚展示漫画の定義ファイル
`src\comics`配下のファイルで定義しています。

 - dummy1.md　などのmarkdownファイル  
漫画１作品毎の定義ファイルです。
`src\components\ComicCardData.ts`で読み込まれます。  
定義項目は`interface ComicFrontmatter`を参照

 - sort-order.ts  
ソート順の定義ファイルです。