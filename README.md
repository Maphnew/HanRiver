# HanStream

## 개요

## 설계

### 컴포넌트 구조

### Element 구조

#### App & Header, Container

-   전체 화면에서 위 아래를 구분

```html
<div id="root">
    <div class="App">
        <section class="ant-layout">
            <header class="ant-layout-header app-header"></header>
            <section
                class="ant-layout ant-layout-has-sider app-container"
            ></section>
        </section>
    </div>
</div>
```

#### Header

-   메인 로고와 유틸성 버튼 등이 들어갈 부분(nav)을 구분
-   nav를 좌우로 나누어 레이아웃을 잡음

```html
<header class="ant-layout-header app-header dark">
    <div class="app-header-wrapper">
        <div class="logo"></div>
        <div class="nav">
            <div class="nav-left"></div>
            <div class="nav-right"></div>
        </div>
    </div>
</header>
```

#### Container & Sider, Content

-   Header 아래에 Side Nav와 Container 구분

```html
<section class="ant-layout ant-layout-has-sider app-container">
    <aside class="ant-layout-sider side-nav"></aside>
    <section class="ant-layout app-layout">
        <div class="app-content"></div>
    </section>
</section>
```
