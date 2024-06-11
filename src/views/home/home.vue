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
                    <ul class="display-container">
                        <li v-for="item in home_activities" class="card">
                            <div class="card-img" @click="router.push({ name: 'activity', params: { id: item.id } })">
                                <el-image :src="item.picture" fit="cover" class="card-img-content"></el-image>
                            </div>
                            <div class="card-info">
                                <h3 class="activity-title"
                                    @click="router.push({ name: 'activity', params: { id: item.id } })">
                                    {{ item.name }}
                                </h3>
                                <p class="activity-content">
                                    {{ item.info }}
                                </p>
                            </div>
                        </li>
                    </ul>
                    <div class="nextPage" @click="loadHomeActivities()" v-if="nextPage">
                        <span v-if="!isloading">
                            下一页
                        </span>
                        <span v-else>
                            加载中
                        </span>
                    </div>
                    <div class="no-more" v-else>
                        ~~到底了~~
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getActivityListPage_API } from '@/api/activity';
import type { Activity } from '@/models/avtivity';
import { ArrowDown, DArrowRight, Reading } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const url = 'https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
const printInfo = ref("2024 05 23")

const router = useRouter()
const hot_activities = [{ title: "1", content: "111111", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
{ title: "2", content: "2222", image: "https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },]

const sys_message = [{
    title: "系统公告1",
    content: "我在睡觉,别打扰我11111111111111111111111111111111111111111111111111111111111111111111111111111111",
}, {
    title: "系统公告2",
    content: "我在睡觉，别打扰我",
}, {
    title: "系统公告3",
    content: "我在睡觉，别打扰我",
}]

const nextPage = ref(true)

const navication = (id: string) => {
    document.querySelector(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
    })
}
const home_activities = ref<Activity[]>([]);
const curPage = ref(0)
const pageSize = ref(9)

const loadHomeActivities = () => {
    if (isloading.value === true) {
        ElMessage.warning('加载中')
        return
    }
    isloading.value = true
    curPage.value += 1
    getActivityListPage_API(curPage.value, pageSize.value)
        .then((res) => {
            if (res.data.code === 200)
                if (res.data.data.length === 0) {
                    nextPage.value === false
                } else {
                    home_activities.value.push(...res.data.data)
                }
            else {

            }
        })
        .catch((err) => {
            if (curPage.value < 3) {
                for (let i = (curPage.value - 1) * pageSize.value; i < curPage.value * pageSize.value; i++) {
                    home_activities.value.push({
                        id: i,
                        name: 'planner' + i,
                        picture: 'https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg',
                        info: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit',
                    })
                }
            }
            else {
                nextPage.value = false
            }
            isloading.value = false
        })
}
onMounted(() => {
    loadHomeActivities()
})

const isloading = ref(false)

</script>

<style scoped>
/* #region  home*/
.home {
    width: 100vw;
    overflow: auto;
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
}

.display-title {
    margin: 20px auto 10px;
}

.display-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    box-sizing: border-box;
    width: 27vw;
    padding: 10px 5px;
}

.card-img {
    width: 100%;
}

.card-img,
.activity-title {
    cursor: pointer;
}

.activity-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.nextPage,
.no-more {
    text-align: center;
}

.nextPage {
    cursor: pointer;
}

.nextPage:hover {
    color: #409eff;
}

/* #endregion*/
</style>