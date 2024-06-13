<template>
  <div class="backuser">
    <div class="aside">
      <el-menu class="menu" default-active="1-1" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>资源管理</span>
          </template>
          <el-menu-item @click="router.push({ name: 'resourcelist' })" index="1-1">所有资源</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <document />
            </el-icon>
            <span>活动管理</span>
          </template>
          <el-menu-item @click="router.push({ name: 'activitytemplate' })" index="2-1">活动模板</el-menu-item>
          <el-menu-item @click="router.push({ name: 'activitylist' })" index="2-2">所有活动</el-menu-item>
          <el-menu-item @click="router.push({ name: 'noticetemplate' })" index="2-3">通知模板</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
          <el-icon>
            <setting />
          </el-icon>
          <span @click="router.push({ name: 'userlist' })">用户管理</span>
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
        <span></span>
      </div>
      <RouterView />
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
.backuser {
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
}
</style>