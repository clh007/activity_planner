<template>
    <div class="user">
        <div class="aside">
            <el-menu class="menu" default-active="1-1" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>活动管理</span>
                    </template>
                    <el-menu-item @click="router.push({ name: 'participated' })" index="1-1">参加的活动</el-menu-item>
                    <el-menu-item @click="router.push({ name: 'published' })" index="1-2">发布的活动</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>消息管理</span>
                    </template>
                    <el-menu-item index="2-1" @click="router.push({ name: 'expense' })">费用管理</el-menu-item>
                    <el-menu-item index="2-2" @click="router.push({ name: 'resource' })">资源管理</el-menu-item>
                    <el-menu-item index="2-3" @click="router.push({ name: 'notice' })">通知管理</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3" @click="router.push({ name: 'userinfo' })">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>个人信息</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main">
            <div class="navbar">
                <el-icon class="fold" size="25" @click="isCollapse = !isCollapse">
                    <Fold v-if="!isCollapse" />
                    <Expand v-else />
                </el-icon>
            </div>
            <div class="container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Fold,
    Expand,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {

}
const handleClose = (key: string, keyPath: string[]) => {

}
</script>

<style scoped>
.user {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    padding-top: 65px;
    background: #d5d7d9;
    display: flex;
}

.aside {
    height: 100%;
}

.main {
    flex: 1;
    margin-left: 5px;
}

.fold {
    color: #5490cd;
    cursor: pointer;
}

.fold:hover {
    background: #afd4e882;
}

.container {
    margin-top: 5px;
    width: 85vw;
}
</style>