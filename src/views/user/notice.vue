<template>
    <div class="main-activity">
        <div class="container">
            <h4 class="title">通知管理</h4>
            <div class="content">
                <el-table :data="noticeList" :border="true" style="width: 100%" max-height="600">
                    <el-table-column fixed prop="id" label="通知ID" style="width: 10%;">
                    </el-table-column>
                    <el-table-column prop="state" label="状态" style="width: 10%;">
                    </el-table-column>
                    <el-table-column fixed prop="activity_id" label="活动ID" style="width: 10%;">
                    </el-table-column>
                    <el-table-column prop="context" label="通知内容" style="width: 40%;">
                    </el-table-column>
                    <el-table-column prop="send_time" label="发送时间" style="width: 20%;">
                    </el-table-column>
                    <el-table-column label="操作" style="width: 20%;">
                        <template v-slot:default="{ row, $index }">
                            <el-button type="primary" @click.native.prevent.stop="readNotice($index, noticeList)">
                                已读
                            </el-button>
                            <el-button type="primary" @click="router.push({ name: 'activity', params: { id: $index } })">
                                前往该活动
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getNoticeList_API, readNotice_API } from '@/api/notice';
import type { Notice } from '@/models/notice';
import { useRouter } from 'vue-router';

const router = useRouter()
onMounted(() => {
    fetchAllNotices();
})

const noticeList = ref<Notice[]>([]);

const fetchAllNotices = () => {
    getNoticeList_API()
        .then(res => {
            if (res.data.code === 200) {
                noticeList.value = res.data.data;
            }
        })
        .catch(err => {
            for (let i = 0; i < 5; i++) {
                noticeList.value.push({
                    id: i,
                    activity_id: i * 10,
                    type_id: i * 100,
                    context: `这是第${i}个通知`,
                    send_time: new Date().toLocaleString(),
                    state: `未读`,
                });
            }
        });
};

const readNotice = async (index: number, noticelist: Array<any>) => {
    const notice = noticelist[index];
    if(notice.state == '未读'){
        await readNotice_API(notice.id);
        fetchAllNotices();
    }
    else{
        
    }
}


</script>

<style scoped>
/* ... 此处与资源管理页面的样式相似，根据需要进行调整 */
.main-activity {
    width: 100%;
    height: 100%;
}

.container {
    width: 100%;
    height: 100%;
}

.title {
    margin-bottom: 5px;
}

.content {
    height: 70vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin-right: 3px;
}

.content::-webkit-scrollbar {
    width: 8px;
    height: 1px;
}

.content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
}

.content::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #EDEDED;
}
</style>