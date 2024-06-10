<template>
    <div class="user-info">
        <div class="user-info-content myCenter">
            <div class="avatar">
                <el-avatar :src="currentUser.avatar" :size="60" shape="circle" />
            </div>
            <div class="info-content">
                <div class="info">
                    <span class="title">用户名</span>
                    <span class="title">邮箱</span>
                    <span class="title">手机号</span>
                    <span class="title">性别</span>
                </div>
                <div class="info">
                    <div class="info-item">
                        {{ currentUser.username }}
                    </div>
                    <div class="info-item">
                        {{ currentUser.email === '' ? '暂无' : currentUser.email }}
                    </div>
                    <div class="info-item">
                        {{ currentUser.phone === '' ? '暂无' : currentUser.phone }}
                    </div>
                    <div class="info-item">
                        {{ currentUser.gender ? '男' : '女' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// const { currentUser } = storeToRefs(useUserStore());

const currentUser = ref({
    id: 0,
    username: "wb",
    password: "123456",
    email: "2702749893@qq.com",
    phone: "",
    avatar: "https://www.bilibili.com/favicon.ico?v=1",
    gender: "0",
    create_time: "",
    update_time: ""
})
</script>

<style scoped>
/* #region user-info*/
.user-info {
    box-sizing: border-box;
    background: hsla(221, 59%, 82%, 0.7);
    padding: 5% 30%;
}

.user-info-content {
    height: 70vh;
    width: 35vw;
    flex-direction: column;
    justify-content: flex-start;
}

/* #endregion */

/* #region item*/

.avatar {
    cursor: pointer;
}

.info-content {
    display: flex;
}

.info {
    display: flex;
    flex-direction: column;
}

.info span,
.info-item {
    margin: 20px;
}

/* #endregion */
</style>
