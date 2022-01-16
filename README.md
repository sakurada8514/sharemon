# 共有家計簿アプリ

<!-- ![fxdiary](https://user-images.githubusercontent.com/64678118/99176009-6e83dd00-274e-11eb-87c6-cd208a93bfcc.gif) -->

## 概要

複数人で家計簿を共有できます。

## URL

### https://www.sharemon.xyz

## 使用技術

### フロントエンド

- HTML/CSS
- TailWindCSS
- TypeScript 4.1.2
- react.js 17.0.2
  - react-router 5.2.0
  - react-router-dom 5.2.1
  - react-chartjs-2 2.11.1
  - swr 1.0.1
  - axios 0.21.1
- material-ui 4.12.3

### バックエンド

- PHP 8.0
- Laravel 8.4

### 開発環境

- Docker
- Docker-compose
  - nginx
  - mysql
  - php-fpm
  - redis

### 本番環境

- AWS
  - VPC
  - EC2
    - Docker
    - Docker-compose
      - nginx
      - mysql
      - php-fpm
      - redis
  - Route53
  - ACM
  - ALB
  - S3

## 機能一覧

### 認証機能

- 新規登録、ログイン、ログアウト
- 共有招待

### 家計簿機能

- 支出 CRUD 機能
  - レシート画像投稿（AWS S3）
- 収入 CRUD 機能
- ソート機能
- カレンダー機能

### 分析機能

- カテゴリー毎合計算出
- 円グラフ描画
- 半年間の支出推移グラフ

### 家計簿共有機能

- 共有招待することで複数人で同じ家計簿を共有
- プロフィール画像変更機能（AWS S3）
- 名前変更機能

### その他

- シングルページアプリケーション
- レスポンシブ対応
