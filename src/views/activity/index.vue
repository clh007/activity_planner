<template>
    <div class="container">
        <div class="desc">
            <div class="img">
                <el-image src="https://www.bilibili.com/favicon.ico?v=1" style="width: 100%;height: 100%;" />
            </div>
            <div class="info">
                <div class="title">
                    <h3>{{ activity.name }}</h3>
                </div>
                <div class="owner">
                    <span>组织者:</span>
                    <span>{{ activity.creator }}</span>
                </div>
                <div class="time">
                    <span>起止时间</span>
                    <p>{{ activity.start_time }} - {{ activity.end_time }}</p>
                </div>
                <div class="joiner_number">
                    <span>参与人数</span>
                    <p>{{ activity.joiner_number }}</p>
                </div>
                <div class="activity-status">
                    <span>活动状态</span>
                    <p>{{ activity.state }}</p>
                </div>
                <div class="button">
                    <el-button class="take-part" type="primary" @click="takePartAct()"
                        :disabled="activity.is_join">参与活动</el-button>
                    <el-button class="to-word" type="primary" @click="toWord()" v-if="isCreator">生成活动报告</el-button>
                </div>
            </div>
            <el-button class="share" circle type="warning" :icon="Share" @click="shareAct()">
            </el-button>
        </div>
        <div class="content">
            <div class="intro">
                <span>简介</span>
                <p>{{ activity.info }}</p>
            </div>
            <div class="activity-bar">
                <el-button @click="timeline_drawer = true">查看时间轴</el-button>
                <el-button @click="enterChat()">进入聊天室</el-button>
                <el-button @click="joiner_drawer = true">成员列表</el-button>
            </div>
        </div>
        <div class="feedback-container">
            <feedback v-model:act_id="act_id" v-model:feedBackList="feedBackList" />
        </div>
        <div class="timeline-container">
            <el-drawer v-model="timeline_drawer" title="活动日程" size="40%">
                <template #header>
                    <div class="timeline-header">
                        <div class="timeline-title">
                            <span>活动日程</span>
                        </div>
                        <el-button type="info" @click="addSchedule_drawer = true" v-if="isCreator">添加日程</el-button>
                    </div>
                </template>
                <timeline v-model:act_id="act_id" v-model:timeline_drawer="timeline_drawer" />
            </el-drawer>
        </div>
        <div class="chat-container">
            <el-drawer v-model="chatroom_drawer" :with-header="false" title="聊天室" size="40%">
                <chatroom v-model:chatroom_drawer="chatroom_drawer" v-model:act_id="act_id" />
            </el-drawer>
        </div>
        <div class="join-container">
            <el-drawer v-model="joiner_drawer" :with-header="false" title="聊天室" size="40%">
                <joinerList v-model:act_id="act_id" v-model:isCreator="isCreator"
                    v-model:joiner_drawer="joiner_drawer" />
            </el-drawer>
        </div>
        <el-drawer size="40%" v-model="addSchedule_drawer" title="添加一个日程" direction="ltr">
            <addSchedule v-model:act_id="act_id" v-model:drawer="addSchedule_drawer" />
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { Share } from '@element-plus/icons-vue'
import chatroom from '@/components/chatroom.vue'
import timeline from '@/components/timeline.vue'
import joinerList from '@/components/joinerList.vue'
import addSchedule from '@/components/addSchedule.vue'
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import type { Activity } from '@/models/avtivity';
import { useRouter } from 'vue-router';
import { getActivity_API, takePartActive_API } from '@/api/activity';
import { ElMessage, dayjs } from 'element-plus'

const { currentUser } = storeToRefs(useUserStore())
const timeline_drawer = ref(false);
const chatroom_drawer = ref(false);
const joiner_drawer = ref(false);
const addSchedule_drawer = ref(false)
const activity = ref<Activity>({
    id: 0,
    name: '',
    info: '',
    location: '',
})
const isCreator = computed(() => {
    return currentUser.value.id === activity.value.creator_id
})
const router = useRouter()
const act_id = ref(Number(router.currentRoute.value.params.id))

const getActivity = () => {
    getActivity_API(act_id.value)
        .then((res) => {
            if (res.data.code === 200)
                activity.value = res.data.data
        })
        .catch((err) => {
            activity.value = {
                id: 0,
                name: 'planner',
                info: '你在干嘛哎呦',
                location: '教室1',
                start_time: '2022-05-01 00:00:00',
                end_time: '2022-05-01 00:00:00',
                creator: '李晓坤',
                joiner_number: 666,
                state: '进行中',
                creator_id: currentUser.value.id
            }
        })
}

onMounted(() => {
    getActivity()
})

const takePartAct = () => {
    takePartActive_API(act_id.value)
        .then((res) => {
            if (res.data.code === 200) {
                ElMessage.success('参与成功')
            } else {
                ElMessage.error(res.data.message)
            }
        })
        .catch((err) => {
            ElMessage.error('参与失败')
        })
}

const shareAct = () => {
    let currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl)
        .then(() => {
            ElMessage.success('已复制到剪贴板')
        })
        .catch((err) => {
            ElMessage.error('分享失败')
        })
}

const is_join = ref(false)

const enterChat = () => {
    if (currentUser.value.id === -1) {
        ElMessage.error('请先登录')
        return
    }
    // 还要判断是否已经参与活动
    if (!activity.value.is_join) {
        ElMessage.warning('请先参加活动')
        return
    }
    chatroom_drawer.value = true
}

import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

const feedBackList = ref<{
    id: number,
    avatar: string,
    username: string,
    context: string
}[]>([])

const toWord = async () => {
    if (activity.value.state !== '已结束') {
        ElMessage.warning('活动还未结束')
        return
    }

    ElMessage.success('正在生成word文件')
    const activityReport = {
        title: '活动报告' + activity.value.name,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        content: [
            {
                type: 'Heading2',
                text: `活动名称：${activity.value.name}`,
            },
            {
                type: 'Heading2',
                text: `活动地点：${activity.value.location}`,
            },
            {
                type: 'Heading2',
                text: `活动时间：${activity.value.start_time} - ${activity.value.end_time}`,
            },
            {
                type: 'Heading2',
                text: `活动简介：${activity.value.info}`,
            },
            {
                type: 'Heading2',
                text: `参与人数：${activity.value.joiner_number === undefined ? 0 : activity.value.joiner_number}`,
            },
            {
                type: 'Heading2',
                text: `活动反馈：`,
            },
            feedBackList.value.map((item) => {
                return {
                    type: 'paragraph',
                    text: `${item.username} : ${item.context}`,
                }
            })
        ],
    };
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        text: `${activityReport.title}`,
                        alignment: 'center',
                        heading: 'Heading1',
                    }),
                    new Paragraph({
                        text: `生成报告日期：${activityReport.date}`,
                        heading: 'Heading2',
                    }),
                ]
            }
        ]
    })

    const blob = await Packer.toBlob(doc)

    saveAs(blob, 'activityReport.docx')
    ElMessage.success('成功生成word文件 ' + 'activityReport.docx')
}
</script>

<style scoped>
.container {
    margin: 60px 20vw 0;
    display: flex;
    flex-direction: column;
    background: #e9e7e7;
}

/* #region 头部*/
.desc {
    width: 100%;
    height: 30vh;
    margin: 10px 0 10px;
    display: flex;
}



.title {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
}

.img {
    width: 30vw;
    height: 100%;
    background: #605555;
}

.info {
    width: 65vw;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
}

.share {
    float: right;
}

.owner {
    display: flex;
    margin: 20px 0 0;
}

.info span {
    width: 7vw;
}

.intro {
    margin-top: 12px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.intro p {
    max-height: 10vh;
    overflow: auto;
    word-wrap: break-word;
    flex: 1;
    margin-left: 30px;
    background: #b2e2ed;
}

.intro p::-webkit-scrollbar {
    width: 8px;
    height: 1px;
}

.intro p::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
}

.intro p::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #EDEDED;
}

.time {
    margin-top: 12px;
    display: flex;
}

.joiner_number {
    margin-top: 12px;
    display: flex;
}

.activity-status {
    margin-top: 12px;
    display: flex;
}

.take-part {
    width: 6vw;
    margin-top: 12px;
}

.to-word {
    width: 7vw;
    margin-top: 12px;
}

/* #endregion */

/* #region content*/
.content {
    width: 100%;
    display: flex;
    flex-direction: column;
}


.chat-container {
    /* width: 30vw; */
    background: #a87575;
}

.feedback-container {
    margin: 10px 0;
}

/* #endregion */

/* #region */
.timeline {
    margin: 15px 10px;
}

.timeline-header {
    display: flex;
}

.timeline-title {
    margin: 5px 20px 5px 5px;
}

/* #endregion */
</style>