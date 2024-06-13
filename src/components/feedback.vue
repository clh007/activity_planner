<template>
    <h3>反馈区</h3>
    <div class="feedback-bar">
        <el-input type="textarea" placeholder="输入反馈内容" v-model="fd_form.context" />
        <el-button type="info" @click="submitFeedBack()">提交</el-button>
    </div>
    <ul class="feedback-list">
        <li v-for="i in feedBackList" :key="i.id" class="list-item">
            <div class="user">
                <el-image class="avatar" :src="i.avatar">
                </el-image>
                <div class="user-name">
                    <span>{{ i.username }}</span>
                </div>
            </div>
            <div class="content">
                <span>{{ i.context }}</span>
            </div>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { getFeedBack_API, submitFeedBack_API } from '@/api/feedback';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue'

const feedBackList = ref<{
    id: number,
    avatar: string,
    username: string,
    context: string
}[]>([])

const act_id = defineModel('act_id', { default: 0 })

const loadFeedBack = () => {
    getFeedBack_API(act_id.value)
        .then((res) => {
            if (res.data.code === 200)
                feedBackList.value = res.data.data
        })
        .catch((err) => {
            for (let i = 0; i < 10; i++) {
                feedBackList.value.push({
                    id: i,
                    avatar: 'https://www.bilibili.com/favicon.ico?v=1',
                    username: '匿名用户',
                    context: 'hhh'
                })
            }
        })
}

onMounted(() => {
    loadFeedBack()
})

const fd_form = ref({
    activity_id: act_id.value,
    context: ''
})

const submitFeedBack = () => {
    submitFeedBack_API(fd_form.value)
        .then((res) => {
            if (res.data.code === 200) {
                fd_form.value.context = ''
                loadFeedBack()
            }
            else {
                ElMessage.error(res.data.message)
            }
        })
        .catch((err) => {
        })
}
</script>

<style scoped>
.feedback-list {
    /* background: #d7eadbb6; */
    box-sizing: border-box;
}

.list-item {
    margin-top: 5px;
    padding: 5px;
    background: #d7c4c4;
    display: flex;
    flex-direction: column;
}

.feedback-bar {
    display: flex;
}

.list-item .user {
    display: flex;
    background: #87c3de;
}
</style>