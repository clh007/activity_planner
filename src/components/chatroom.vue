<template>
    <div class="chatroom">
        <div class="chatroom-header">
            <div class="room-title">
                聊天室
            </div>
            <div class="people-num">
                <span>在线人数:</span>
                <p>{{ peopleNumber }}</p>
            </div>
        </div>
        <div class="room-main" ref="room_main">
            <div v-for="item in chatMessages" :class="['msg', item.id === currentUser.id ? 'msg-right' : 'msg-left']">
                <div class="room-avatar">
                    <el-avatar shape="square" :size="40" :src="item.avatar" />
                </div>
                <div class="msg-info">
                    <div class="msg-header">
                        <div class="msg-name">{{ item.name }}</div>
                        <div class="msg-time">{{ getDateDiff(item.time) }}</div>
                    </div>
                    <div v-if="item.type === 'text'" class="msg-content" :style="{ 'background-color': msgBgColor }">
                        {{ item.content }}
                    </div>
                    <div v-if="item.type === 'img'" class="msg-content" :style="{ 'background-color': msgBgColor }">
                        <el-image :src="item.content"></el-image>
                    </div>
                    <div v-if="item.type === 'file'" class="msg-content msg-file"
                        :style="{ 'background-color': msgBgColor }" @click="downloadFile(item.content)">
                        <el-icon>
                            <Folder />
                        </el-icon>
                        <span>[点击下载]</span>
                        <div>{{ item.content.substring(item.content.indexOf('-') + 1) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class=" room-footer">
            <div class="inbar">
                <el-popover placement="top" title="我的表情包">
                    <template #reference>
                        <div class="myEmoji">
                            <svg viewBox="0 0 1024 1024" width="25" height="25">
                                <path d="M523.9 511.98m-419.5 0a419.5 419.5 0 1 0 839 0 419.5 419.5 0 1 0-839 0Z"
                                    fill="#FFD629"></path>
                                <path
                                    d="M885.2 298.58c-1.6-0.6 37.1 68.4 49.5 128.9 46.4 227-99.9 448.6-326.9 495.1-37.9 7.8-75.7 10.1-112.5 7.7-63.2-4.2-123.6-22.8-177.3-53 0 0 348.9-269.7 567.2-578.7z"
                                    fill="#FF9A2C" opacity=".1"></path>
                                <path
                                    d="M922.4 383.38c73.9 216.8-52.8 456-264 525.8-36.7 12.1-108.5 28.3-184.9 19.4 0-0.5 166.62-15.7 313.54-190.74C942.88 552.16 920.2 376.98 922.4 383.38z"
                                    fill="#FF9A2C" opacity=".2"></path>
                                <path
                                    d="M790 184.48c-40.9-34.6-93.6-59.3-155.8-77.3-95.5-27.6-199.4-17.7-300.6 31.5-139.3 67.7-240.1 245.9-227.6 400.2 4.2 52 10.1 101.8 30 145.5 0.5 1 1.6 1.5 2.7 1.2 21.1-6.8 218.8-73.6 375.8-190.3 213.3-158.5 292.3-296.6 275.5-310.8z"
                                    fill="#FCE99A" opacity=".24"></path>
                                <path
                                    d="M188.008782 408.574552a136 234.3 54.429 1 0 381.157036-272.589938 136 234.3 54.429 1 0-381.157036 272.589938Z"
                                    fill="#F9F2D7" opacity=".2"></path>
                                <path d="M616.9 326.38m-52.7 0a52.7 52.7 0 1 0 105.4 0 52.7 52.7 0 1 0-105.4 0Z"
                                    fill="#211715">
                                </path>
                                <path
                                    d="M381.7 438.38l-77.6 125.3-15.5-8c-16-8.2-22.3-27.9-14.1-43.9l26.2-47.3-45.6-19.6c-15.7-8.1-21.9-27.4-13.8-43.1l8.2-16 132.2 52.6z"
                                    fill="#211715"></path>
                                <path
                                    d="M603 479.68c27.4 56.5 14.1 119.5-29.7 140.8s-101.6-7.2-129-63.7l30.6-8c37.4-9.7 72.1-26.6 102.9-50l25.2-19.1z"
                                    fill="#F94616"></path>
                                <path
                                    d="M514.5 567.38l8.8 6c3.6 2.5 8.3 2.8 12.2 0.7l26.9-14c3.4-1.8 5.7-5.1 6.3-8.9l1.5-10.5c1.4-10-9.4-17.1-18-11.9-9.1 5.5-20.9 11.8-35.4 17.7-8.8 3.6-10.1 15.5-2.3 20.9z"
                                    fill="#E53600" opacity=".68"></path>
                                <path
                                    d="M922.4 383.38c73.9 216.8-52.8 456-264 525.8-36.7 12.1-108.5 28.3-184.9 19.4 0-0.5 122.92-45.83 275.21-216.29C910.21 531.51 920.2 376.98 922.4 383.38z"
                                    fill="#FF9A2C" opacity=".19"></path>
                                <path
                                    d="M922.4 383.38c73.9 216.8-52.8 456-264 525.8-36.7 12.1-108.5 28.3-184.9 19.4 0-0.5 89.92-84.69 242.21-255.15C877.21 492.65 920.2 376.98 922.4 383.38z"
                                    fill="#FF9A2C" opacity=".15"></path>
                            </svg>
                        </div>
                    </template>
                    <span>还没做，嘿嘿</span>
                </el-popover>
                <el-upload :file-list="file_list" action="#" :before-upload="beforeFileUpload" list-type="text"
                    :http-request="handleFileRequest" :on-error="handleFileError" :on-success="handleFileSuccess"
                    multiple :limit="3" :on-exceed="handleExceed" :show-file-list="false" ref="uploadFileInstance">
                    <el-popover placement="top" title="点击上传文件">
                        <template #reference>
                            <div class="myEmoji" @click="">
                                <el-icon size="25" color="#E0995E">
                                    <UploadFilled />
                                </el-icon>
                            </div>
                        </template>
                        <span>支持所有文件类型,一次最多3个,每个限制5M以内</span>
                    </el-popover>
                </el-upload>
            </div>
            <textarea @keydown="kDown" v-model="message" maxlength="1000" class="msg-in"></textarea>
            <div class="send-message">
                <span>Ctrl+Enter: 换行 | Enter: 发送</span>
                <el-button type="primary" @click="sendMsg">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { UploadFilled, Folder } from '@element-plus/icons-vue'
import { ElMessage, type UploadInstance, type UploadProps, type UploadRequestOptions } from 'element-plus';
const message = ref("")
const currentUser = ref({
    id: 1,
    name: '张三',
    avatar: 'https://www.bilibili.com/favicon.ico?v=1'
})
const chatMessages = ref([
    {
        id: 2,
        name: '李四',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 3,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 4,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 5,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 6,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 7,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 8,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 9,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 12,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: '你好啊',
        type: "text",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 21,
        name: '王五',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: 'https://www.bilibili.com/favicon.ico?v=1',
        type: "img",
        time: '2021-01-01 12:00:00'
    },
    {
        id: 1,
        name: '张三',
        avatar: 'https://www.bilibili.com/favicon.ico?v=1',
        content: 'https://www.bilibili.com/favicon.ico?v=1',
        type: "file",
        time: '2024-05-25 12:00:00'
    },
])

const msgBgColor = computed(() => {
    return '#' + Math.floor(0xfafafa).toString(16);
})

const getDateDiff = (date: string) => {
    let publishTime = Date.parse(date.replace(/-/gi, "/")) / 1000;
    let d_seconds: number,
        d_minutes: number,
        d_hours: number,
        d_days: number,
        timeNow = Math.floor(new Date().getTime() / 1000),
        d: number,
        publishTime_ = new Date(publishTime * 1000),
        Y = publishTime_.getFullYear(),
        M = publishTime_.getMonth() + 1,
        D = publishTime_.getDate(),
        H = publishTime_.getHours(),
        m = publishTime_.getMinutes(),
        s = publishTime_.getSeconds(),
        Y_, M_, D_, H_, m_, s_;

    if (M < 10) {
        M_ = "0" + M.toString();
    }
    else {
        M_ = M.toString();
    }
    if (D < 10) {
        D_ = "0" + D.toString();
    }
    else {
        D_ = D.toString();
    }
    if (H < 10) {
        H_ = "0" + H.toString();
    } else {
        H_ = H.toString();
    }
    if (m < 10) {
        m_ = "0" + m.toString();
    } else {
        m_ = m.toString();
    }
    if (s < 10) {
        s_ = "0" + s.toString();
    } else {
        s_ = s.toString();
    }

    d = timeNow - publishTime;
    d_days = Math.floor(d / 86400);
    d_hours = Math.floor(d / 3600);
    d_minutes = Math.floor(d / 60);
    d_seconds = Math.floor(d);

    if (d_days > 0 && d_days < 3) {
        return d_days + "天前";
    } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + "小时前";
    } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + "分钟前";
    } else if (d_seconds < 60) {
        if (d_seconds <= 0) {
            return "刚刚发表";
        } else {
            return d_seconds + "秒前";
        }
    } else if (d_days >= 3 && d_days < 30) {
        return M_ + "-" + D_ + " " + H_ + ":" + m_;
    } else if (d_days >= 30) {
        return Y + "-" + M_ + "-" + D_ + " " + H_ + ":" + m_;
    }
}

const kDown = (payload: KeyboardEvent) => {
    if ((payload.ctrlKey || payload.shiftKey) && payload.code === 'Enter') {
        payload.preventDefault();
        message.value = message.value + '\n';
    } else if (payload.code === 'Enter') {
        payload.preventDefault();
        sendMsg();
    }
}
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    console.log(uploadFiles)
    ElMessage.warning(
        `一次最多3个哦, 你选择${files.length}个, 上传了${files.length + uploadFiles.length
        } 个`
    )
}
const FormateNowDate = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = ('0' + (now.getMonth() + 1)).slice(-2);
    let day = ('0' + now.getDate()).slice(-2);
    let hours = ('0' + now.getHours()).slice(-2);
    let minutes = ('0' + now.getMinutes()).slice(-2);
    let seconds = ('0' + now.getSeconds()).slice(-2);
    let formattedTime = year + "-" + month + "-" + day + " "
        + hours + ":" + minutes + ":" + seconds;
    return formattedTime
}
const uploadFileInstance = ref<UploadInstance>()
const room_main = ref<HTMLElement | null>()
const file_list = ref([])
const handleFileSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile,
    uploadFiles
) => {
    // console.log(response)
    // console.log(uploadFiles)
    // console.log(FormateNowDate())
    ElMessage.success("上传成功")
    uploadFiles.forEach(item => {
        let msg = getOneMessage(response.data.data.replace('/file/', '/api/file/'), '')
        let extName = item.name.substring(item.name.indexOf('.') + 1)
        if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'svg', 'webp'].includes(extName)) {
            msg.type = 'img'
        } else {
            msg.type = 'file'
        }
        useMyWebSocketTokenStore().sendMsg(JSON.stringify(msg))
    })
    uploadFileInstance.value?.clearFiles()
}

const handleFileError: UploadProps['onError'] = (
    error,
    uploadFiles
) => {
    // console.log(error)
    // console.log(uploadFiles)
    ElMessage.error("上传失败")
}
const beforeFileUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // console.log(rawFile)
    if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('最大5MB!')
        return false
    }
    return true
}
import { UploadFile_API } from "@/api/file"
const handleFileRequest = (option: UploadRequestOptions) => {
    const formData = new FormData
    console.log(option)
    formData.append(option.filename, option.file, option.file.name)
    return UploadFile_API(formData)
}
const ScrollToBottom = () => {
    nextTick(() => {
        room_main.value?.scrollTo({ top: room_main.value.scrollHeight, behavior: "smooth" })
    })
}
const downloadFile = (url: string) => {
    window.open(url)
}
let username = window.btoa(encodeURI(currentUser.value.name))
const peopleNumber = ref<number>(0)
const chatroom_drawer = defineModel('chatroom_drawer',
    { default: false })

import { useMyWebSocketTokenStore } from '@/store/chatroom';
let client: WebSocket | null = null
watch(chatroom_drawer, (new_c, old_c) => {
    // console.log(new_c, old_c)
    if (new_c === true) {
        client = useMyWebSocketTokenStore().initWebSocket(`ws://localhost:8080/chatroom/${username}`)
        client.onmessage = (msg_) => {
            if (msg_.data) {
                console.log("服务端来消息：" + msg_.data)
                let json = JSON.parse(msg_.data)
                if (json.msg) {
                    console.log(json.msg)
                    // console.log("开始push")
                    chatMessages.value.push(JSON.parse(json.msg))
                    // console.log("结束push")
                    ScrollToBottom()
                }
                if (json.users) {
                    peopleNumber.value = json.users
                }
            }
        }
    }
    if (new_c === false && client)
        useMyWebSocketTokenStore().closeWebSocket(client)
}
)

onMounted(() => {
    client = useMyWebSocketTokenStore().initWebSocket(`ws://localhost:8080/chatroom/${username}`)
    client.onmessage = (msg_) => {
        if (msg_.data) {
            console.log("服务端来消息：" + msg_.data)
            let json = JSON.parse(msg_.data)
            if (json.msg) {
                // console.log("开始push")
                chatMessages.value.push(JSON.parse(json.msg))
                // console.log("结束push")
                ScrollToBottom()
            }
            if (json.users) {
                peopleNumber.value = json.users
            }
        }
    }
})

const sendMsg = () => {
    useMyWebSocketTokenStore().sendMsg(JSON.stringify(getOneMessage(message.value, 'text')))
    message.value = ""
}

const getOneMessage = (msg: string, type: string) => {
    return {
        id: currentUser.value.id,
        name: currentUser.value.name,
        avatar: currentUser.value.avatar,
        content: msg,
        type: type,
        time: FormateNowDate(),
    }
}
</script>

<style scoped>
.chatroom {
    height: 80vh;
    padding: 10px;
    background: #894444;
    display: flex;
    flex-direction: column;
}

.chatroom ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.chatroom ::-webkit-scrollbar-thumb {
    background: #cacacb;
    border-radius: 5px;
}

/* #region room-header*/
.chatroom-header {
    width: 100%;
    height: 50px;
    position: relative;
}

.room-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
}

.people-num {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    margin-right: 10px;
}

.people-num span {
    font-size: 14px;
    margin-right: 5px;
}

/* #endregion */

/* #region main*/
.room-main {
    width: 100%;
    height: calc(100% - 210px);
    overflow-y: auto;
    background: #f3f3f3;
}

.msg {
    margin: 15px 20px;
    display: flex;
}

.room-avatar {
    cursor: pointer;
}

.msg-info {
    width: 100%;
    max-width: 60%;
    margin: 0 12px;
}

.msg-header {
    display: flex;
    margin-bottom: 5px;
}

.msg-right .msg-content {
    float: right;
}

.msg-content {
    padding: 5px 10px;
    line-height: 25px;
    word-break: break-all;
    color: black;
    float: left;
}

.msg-file {
    cursor: pointer;
}

.msg-time {
    margin: 0 12px;
}

.msg-right,
.msg-right .msg-header {
    flex-direction: row-reverse;
}

/* #endregion */

/* #region footer*/
.room-footer {
    width: 100%;
    height: 180px;
    background: white;
}

.inbar {
    height: 25px;
    padding: 10px 15px;
    display: flex;
}

.myEmoji {
    cursor: pointer;
    margin-right: 15px;
    transition: all .5s;
}

.myEmoji:hover {
    transform: scale(1.2);
}

.msg-in {
    width: calc(100% - 30px);
    margin: 0 15px;
    box-sizing: border-box;
    height: calc(100% - 100px);
    display: block;
    border: none;
    outline: none;
    resize: none;
    font-size: 18px;
}

.send-message {
    float: right;
    padding: 10px 30px 15px;
}

.send-message span {
    color: #797979;
    margin-right: 15px;
    font-size: 12px;
}

/* #endregion */
</style>