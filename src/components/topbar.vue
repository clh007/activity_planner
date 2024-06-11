<script setup lang="ts">
import { useWebInfoStore } from '@/store/webInfo';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import { Search } from '@element-plus/icons-vue'
import { ref, watch } from 'vue';
const router = useRouter()
const webInfoStore = useWebInfoStore()
const { is_login, topbar } = storeToRefs(webInfoStore)
const search_key = ref('')
const logout = () => {
  webInfoStore.logout()
  router.push('/login')
}
const scrollTop = ref(0)
window.onscroll = () => {
  scrollTop.value = document.documentElement.scrollTop
}
watch(scrollTop, (newscrollTop, oldscrollTop) => {
  let enter = newscrollTop > window.innerHeight / 2
  let up = newscrollTop - oldscrollTop < 0
  webInfoStore.setTopbar({
    topbar_entry: enter,
    topbar_visible: up
  })
})

const navToSearch = () => {
  router.push({
    name: 'search',
    params: {
      key: search_key.value
    }
  })
  search_key.value = ''
}
</script>

<template>
  <transition name="el-fade-in-linear">
    <div v-show="topbar.topbar_visible" @mouseenter="topbar.topbar_hoveEntry = true"
      @mouseleave="topbar.topbar_hoveEntry = false" class="top-bar myCenter" :class="[{ entry: topbar.topbar_entry },
      {
        hoverEntry:
          (router.currentRoute.value.path == '/login'
            || topbar.topbar_hoveEntry) &&
          !topbar.topbar_entry
      }]">
      <div class="web-title" @click="router.push('/')">
        <h2>PLANNER</h2>
      </div>
      <div class="flex-grow" />
      <ul class="bar-right">
        <li @click="router.push('/')" class="bar-activity">
          <span>首页</span>
        </li>
        <li @click="router.push('/user')" class="bar-activity">
          <span>个人界面</span>
        </li>
        <li class="search-bar myCenter">
          <el-input v-model="search_key" placeholder="搜索活动" class="search-input" />
          <el-icon size="25px" @click="navToSearch()" class="search-icon">
            <Search />
          </el-icon>
        </li>
        <li class="adminEnter" @click="router.push({
          name: 'activity', params: { id: 123 }
        })">
          活动详情页
        </li>
        <li class="adminEnter" @click="router.push('/back')">
          后台
        </li>
        <li class="create" @click="router.push('/create')">
          创建活动
        </li>
        <li class="myCenter bar-user">
          <el-dropdown trigger="hover">
            <el-avatar fit="cover" class="avatar-bar" src="https://www.bilibili.com/favicon.ico?v=1"></el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="!is_login" @click="router.push('/login')">
                  <span>登录</span>
                </el-dropdown-item>
                <el-dropdown-menu v-else>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click="logout()"> 退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </transition>

</template>

<style scoped>
/* #region topbar */
.top-bar {
  width: 100vw;
  height: 60px;
  line-height: 60px;
  background: #918d90b0;
  color: white;
  user-select: none;
}

.web-title {
  height: 60px;
  margin-left: 60px;
  cursor: pointer;
}

.flex-grow {
  flex-grow: 1;
}

.bar-activity {
  cursor: pointer;
}

.bar-activity :hover {
  color: yellow;
}



.search-bar {
  height: 60px;
}

.search-icon {
  margin-left: 2px;
  cursor: pointer;
}

.adminEnter {
  cursor: pointer;
}

.adminEnter:hover {
  color: yellow;
}

.avatar-bar {
  user-select: none;
  transition: all .3s;
}

.avatar-bar:hover {
  transform: rotate(360deg);
  background: rgba(0, 0, 0, .5);
}

.bar-right {
  display: flex;
  height: 60px;
  margin-right: 60px;
}

/* 文本溢出处理  */
.bar-right li,
.bar-right span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
}

.bar-right li {
  height: 60px;
  list-style: none;
  margin: 0 10px;
}

.bar-user {
  cursor: pointer;

}

.create {
  cursor: pointer;
}

.create:hover {
  color: yellow;
}

.entry {
  background: #ecf0f3;
  color: #333;
  box-shadow: 0 1px 3px 0 rgba(0, 34, 77, .05);
}

.hoverEntry {
  background: rgba(0, 0, 0, .5);
  box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.05);
}

/* #endregion */
</style>