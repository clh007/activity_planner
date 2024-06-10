<template>
    <div class="container">
        <div class="desc">
            <div class="img">
                图片
            </div>
            <div class="info">
                <div class="title">
                    <h3>title</h3>
                </div>
                <div class="owner">
                    <span>组织者:</span>
                    <span>李晓坤</span>
                </div>
                <div class="time">
                    <span>起止时间</span>
                    <p>1111111111</p>
                </div>
                <div class="joiner_number">
                    <span>参与人数</span>
                    <p>1111111111</p>
                </div>
                <div class="activity-status">
                    <span>活动状态</span>
                    <p>惊醒中</p>
                </div>
                <el-button class="baoming" type="primary" style="width: 6vw;">参与活动</el-button>
            </div>
            <el-button class="share" circle type="warning" :icon="Share">
            </el-button>
        </div>
        <div class="content">
            <div class="intro">
                <span>简介</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae libero eligendi odio eos
                    molestias optio qui nam. Quas, pariatur, nostrum et enim voluptatem molestiae dolore tempora,
                    tenetur praesentium alias doloribus.</p>
            </div>
        </div>
        <div class="activity-bar">
            <el-button @click="timeline_drawer = true">查看时间轴</el-button>
            <el-button @click="chatroom_drawer = true">进入聊天室</el-button>
            <el-button v-if="is_creator" @click="joiner_drawer = true">成员列表</el-button>
        </div>
        <div class="feedback">
            <span>反馈区</span>
            <el-input />
            <ul v-infinite-scroll="loadFeedBack()" class="feedback-list" style="overflow: auto">
                <li v-for="i in feedList" :key="i" class="infinite-list-item">{{ i }}</li>
            </ul>
        </div>
        <div class="timeline-container">
            <el-drawer v-model="timeline_drawer" title="活动日程">
                <timeline />
            </el-drawer>
        </div>
        <div class="chat-container">
            <el-drawer v-model="chatroom_drawer" :with-header="false" title="聊天室" size="50%">
                <chatroom v-model:chatroom_drawer="chatroom_drawer" />
            </el-drawer>
        </div>
        <div class="join-container">
            <el-drawer v-model="joiner_drawer" :with-header="false" title="聊天室" size="50%">
                <joinerList />
            </el-drawer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Share } from '@element-plus/icons-vue'
import chatroom from '@/components/chatroom.vue'
import timeline from '@/components/timeline.vue'
import joinerList from '@/components/joinerList.vue'
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import type { Activity } from '@/models/avtivity';
import { useRouter } from 'vue-router';
import { getActivity_API } from '@/api/activity';

const { currentUser } = storeToRefs(useUserStore())

const timeline_drawer = ref(false);
const chatroom_drawer = ref(false);
const joiner_drawer = ref(false);

const activity = ref<Activity>({
    id: 0,
    name: '',
    info: 'string',
    location: 'string',
})
const router = useRouter()
const act_id = Number(router.currentRoute.value.params.id)

const is_creator = computed(() => {
    return currentUser.value.id === activity.value.creator_id
})

const getActivity = () => {
    getActivity_API(act_id)
        .then((res) => {
            if (res.data.code === 200)
                activity.value = res.data.data
        })
        .catch((err) => {
            activity.value.creator_id = 0
        })
}

onMounted(() => {
    getActivity()
})

const feedList = ref<[]>()

const loadFeedBack = () => {

}
</script>

<style scoped>
.container {
    height: 200vh;
    padding: 60px 90px 0;
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
    display: flex;
}

.intro p {
    height: 10vh;
    overflow-y: auto;
    flex: 1;
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

/* #endregion */

/* #region content*/
.content {
    width: 100%;
    /* height: 100vh; */
    background: #9dadc8;
    display: flex;
}

.chat-container {
    /* width: 30vw; */
    background: #a87575;
}

.feedback {
    margin: 10px 0;
}

.feedback-list {
    height: 50vh;
    background: #a65353;
}

/* #endregion */

/* #region */
.timeline {
    margin: 15px 10px;
}

/* #endregion */
</style>