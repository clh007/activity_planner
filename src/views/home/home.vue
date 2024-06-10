<template>
    <div class="home">
        <div class="welcome myCenter">
            <el-image :src="url" fit="cover" class="welcome-img" v-once>
                <div slot="error"></div>
            </el-image>
            <div class="welcome-content myCenter">
                <h1 class="welcome-title">Welcome to Planner Activity</h1>
                <div class="printer">
                    <Printer :printInfo="printInfo">
                    </Printer>
                </div>
                <div id="bannerWave1"></div>
                <div id="bannerWave2"></div>
                <i class="arrow-down" @click="navication('#main-container')">
                    <ArrowDown size="80px" />
                </i>
            </div>
        </div>
        <div class="main-container myCenter" id="main-container">
            <div class="container">
                <div class="header">
                    <div class="header-left">
                        <h3 class="hot-title">
                            热门活动
                        </h3>
                        <div class="banner">
                            <el-carousel>
                                <el-carousel-item v-for="item in hot_activities">
                                    <div class="banner-item">
                                        <h2 class="title">{{ item.title }}</h2>
                                        <p class="content">{{ item.content }}</p>
                                        <el-image :src="item.image" fit="cover" class="image"></el-image>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="header-right">
                        <h4 class="title-right">
                            系统公告
                            <el-icon class="el-icon-vertical">
                                <DArrowRight />
                            </el-icon>
                        </h4>
                        <ul class="list-right">
                            <li v-for="itme in sys_message">
                                <div class="sys_title">
                                    <el-icon class="el-icon-vertical ">
                                        <Reading />
                                    </el-icon>
                                    <span class="icon-title">
                                        {{ itme.title }}
                                    </span>
                                </div>
                                <p class="content_sys">
                                    {{ itme.content }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="main-display">
                    <h3 class="display-title">
                        活动列表
                    </h3>
                    <div class="display-container">
                        <div v-for="item in home_activities" class="card">
                            <div class="card-img">
                                <el-image :src="item.image" fit="cover" class="card-img-content"></el-image>
                            </div>
                            <div class="card-info">
                                <h3 class="activity-title">
                                    {{ item.title }}
                                </h3>
                                <p class="activity-content">
                                    {{ item.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowDown, DArrowRight, Reading } from '@element-plus/icons-vue'
import { ref } from 'vue';
const url = 'https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
const printInfo = ref("2024 05 23")

const hot_activities = [{ title: "1", content: "111111", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
{ title: "2", content: "2222", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },]

const sys_message = [{
    title: "系统公告1",
    content: "我在睡觉，别打扰我11111111111111111111111111111111111111111111111111111111111111111111111111111111",
}, {
    title: "系统公告2",
    content: "我在睡觉，别打扰我",
}, {
    title: "系统公告3",
    content: "我在睡觉，别打扰我",
}]
const home_activities =
    [{ title: "1", content: "111111", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
    { title: "2", content: "2222", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg" },
    { title: "2", content: "2222", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg" },
    { title: "2", content: "2222", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg" },
    { title: "2", content: "2222", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg" },
    { title: "2", content: "2222", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg" }]

const navication = (id: string) => {
    document.querySelector(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
    })
}
</script>

<style scoped>
/* #region li样式reset */
ul li {
    list-style: none;
}

/* #endregion */

/* #region  home*/
.home {
    width: 100vw;
}

/* #endregion */

/* #region  welcome*/
.welcome-img {
    width: 100vw;
    height: 50vh;
    position: fixed;
    z-index: -1;
}

.welcome-title {
    color: #fff;
    font-size: 40px;
}

.printer {
    cursor: pointer;
    color: white;
    margin-top: 50px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

#bannerWave1 {
    height: 84px;
    background: var(--bannerWave1);

    position: absolute;
    width: 200%;
    bottom: 0;
    z-index: 10;
    animation: gradientBG 120s linear infinite;
}

#bannerWave2 {
    height: 100px;
    background: var(--bannerWave2);
    position: absolute;
    width: 400%;
    bottom: 0;
    z-index: 5;
    animation: gradientBG 120s linear infinite;
}

.arrow-down {
    width: 40px;
    height: 40px;
    font-size: 40px;
    font-weight: bold;
    color: white;
    position: absolute;
    bottom: 60px;
    animation: my-shake 1.5s ease-out infinite;
    z-index: 15;
    cursor: pointer;
}

.welcome-content {
    flex-direction: column;
    width: 100vw;
    height: 50vh;
    position: relative;
    overflow: hidden;
}

/* #endregion*/

/* #region  container版区*/
.main-container {
    background: white;
    padding: 0 50px;
}

.container {
    width: 90%;
}

/* #endregion*/

/* #region header区域*/
.header {
    width: 100%;
    height: 360px;
    position: relative;
    overflow: hidden;
}

/* #endregion*/

/* #region header-left*/
.header-left {
    width: 59%;
    position: absolute;
}

.hot-title {
    height: 60px;
    line-height: 60px;
}

.banner {
    background: turquoise;
}

.banner-item {
    color: antiquewhite;
}

.banner-item .title {
    height: 30px;
    position: absolute;
    top: 80px;
    left: 60px;
    z-index: 1;
}

.banner-item .content {
    position: absolute;
    top: 150px;
    left: 60px;
    z-index: 1;
}

.banner-item .image {
    width: 100%;
}

/* #endregion*/

/* #region header-right*/
.header-right {
    width: 40%;
    height: 100%;
    right: 0;
    position: absolute;
}

.title-right {
    height: 60px;
    line-height: 60px;
}

.list-right {
    height: 300px;
}

.list-right li {
    margin-bottom: 10px;
}

.sys_title {
    height: 30px;
}

.icon-title {
    margin-left: 10px;
}

.el-icon-vertical {
    vertical-align: middle;
}

/* #endregion*/

/* #region main*/
.main-display {
    width: 100%;
    height: 200vh;
}

.display-title {
    margin: 20px auto 10px;
}

.display-container {
    display: flex;

    flex-wrap: wrap;
}

.card {
    flex: 33%;
    margin: 10px auto;
}

.card-img {
    width: 20vw;

}

/* #endregion*/
</style>