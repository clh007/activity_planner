<template>
    <div class="main-activity">
        <div class="toolbar">
            <el-input v-model="search_key" placeholder="请输入搜索关键字" class="search" />
            <el-button type="primary" class="search-btn" @click="searchActivity">搜索</el-button>
            <el-button type="primary" class="create-btn" @click="router.push({ name: 'create' })">创建活动</el-button>
        </div>
        <div class="container">
            <h4 class="title">活动列表</h4>
            <div class="content">
                <el-table :data="activityList" :border="true" style="width: 100%" max-height="600">
                    <el-table-column fixed prop="name" label="活动名" width="150">
                        <template #default="scope">
                            <span @click="router.push({ name: 'activity', params: { id: scope.row.id } })"
                                style="cursor: pointer;">
                                {{ scope.row.name }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="location" label="活动地点" width="150">
                    </el-table-column>
                    <el-table-column prop="state" label="活动状态" width="150">
                    </el-table-column>
                    <el-table-column prop="start_time" label="开始时间" width="200">
                    </el-table-column>
                    <el-table-column prop="end_time" label="结束时间" width="200">
                    </el-table-column>
                    <el-table-column prop="join_num" label="参与人数" width="150">
                    </el-table-column>
                    <el-table-column prop="max_num" label="最大参与者数量" width="150">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" header-align="center" min-width="450">
                        <template #default="scope">
                            <div class="handler  myCenter">
                                <el-button type="info" @click="openFeeListDia(scope.$index)">查看支出</el-button>
                                <el-button type="info" @click="openNoticeDia(scope.$index)">发送通知</el-button>
                                <el-button @click.native.prevent="openResource(scope.$index)" type="info">
                                    资源申请
                                </el-button>
                                <el-button type="warning" @click.native.prevent.stop="openUpdateAct_dia(scope.$index)">
                                    修改
                                </el-button>
                                <el-button @click.native.prevent="deleteActivity(scope.$index)" type="danger">
                                    删除
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog v-model="updateAct_dia" title="活动信息修改">
            <div class="name">
                <span>活动名</span>
                <el-input v-model="activity_form.name" placeholder=""></el-input>
            </div>
            <div class="start_time">
                <span>活动开始时间</span>
                <el-date-picker v-model="activity_form.start_time" type="datetime"
                    value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
            </div>
            <div class="end_time">
                <span>活动结束时间</span>
                <el-date-picker v-model="activity_form.end_time" type="datetime"
                    value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
            </div>
            <div class="name">
                <span>活动信息</span>
                <el-input v-model="activity_form.info" placeholder="" type="textarea"></el-input>
            </div>
            <div class="name">
                <span>活动状态</span>
                <el-select v-model="activity_form.state">
                    <el-option v-for="item in act_state" :label="item" :value="item"></el-option>
                </el-select>
            </div>
            <div class="location">
                <span>活动地点</span>
                <el-input v-model="activity_form.location"></el-input>
            </div>
            <div class="max_num">
                <span>最大参与人数</span>
                <el-input v-model="activity_form.max_num" placeholder=""></el-input>
            </div>
            <el-button type="primary" @click="updateActivity()">确认修改</el-button>
        </el-dialog>

        <el-dialog title="资源申请" v-model="resource_dia">
            <resource-apply v-model="act_id" />
        </el-dialog>

        <el-dialog title="发起通知" v-model="notice_dia">
            <div class="notice-template">
                <span>
                    选择通知模板
                </span>
                <el-select v-model="notice_form.notice_type_id" placeholder="选择通知模板"
                    :change="noticetemChange(notice_form.notice_type_id)">
                    <el-option v-for="item in notice_temlist" :key="item.id" :label="item.notice_type" :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <el-input v-model="notice_form.context" placeholder="请输入通知内容"></el-input>

            <el-button type="info" @click="addNotice()">提交</el-button>
        </el-dialog>

        <el-dialog v-model="feelist_dia" title="支出清单">
            <el-table :data="feelist" max-height="500">
                <el-table-column prop="fee" label="金额" width="180" />
                <el-table-column prop="context" label="金额" width="180" />
            </el-table>
            <div class="actu-char">
                <span>实际支出</span>
                <el-input v-model="act_actual_charge" disabled placeholder="输入实际支出"></el-input>
            </div>
            <div class="charge">
                <span>活动预算</span>
                <el-input v-model="chargeFrm.booking_fee" placeholder="输入活动预算"></el-input>
                <el-button type="info" @click="updateCharge()">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { deleteActivity_API, updateActivity_API, fetchUserActivity_API } from '@/api/activity';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import type { Activity } from "@/models/avtivity";
import { ElMessage, ElMessageBox } from 'element-plus';
import { dayjs } from 'element-plus';
import resourceApply from '@/components/resourceApply.vue';
import type { Notice, noticeTemplateForm } from '@/models/notice';
import { addNotice_API, fetchAllNoticeTemplates_API } from '@/api/notice';
import { loadFeelist_API, updateCharge_API } from '@/api/charges';

const router = useRouter()
const search_key = ref('')
const act_state = ref([
    "报名中",
    "进行中",
    "已结束",
])
const activityList = ref<Activity[]>([])


onMounted(() => {
    fetchAllActivities()
})

const updateAct_dia = ref(false)

const { currentUser } = storeToRefs(useUserStore())

const searchActivity = () => {
    if (search_key.value == '') {
        fetchAllActivities()
        return
    }
    fetchUserActivity_API(currentUser.value.id, 'pub', search_key.value)
        .then(res => {
            if (res.data.code === 200) {
                activityList.value = res.data.data
            } else {
                ElMessage.error("请求失败")
            }
        })
        .catch(err => {
            activityList.value = [
                {
                    id: 0,
                    name: '服务器崩溃了',
                    creator: '服务器崩溃了',
                    start_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    end_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    location: '服务器崩溃了',
                    info: "服务器崩溃了",
                    max_num: 1,
                    joiner_number: 1,
                }
            ]
        })
}
const activity_form = ref<Activity>({
    id: 0,
    name: "string",
    info: "string",
    start_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    end_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    location: "string",
    state: '',
    joiner_number: 1,
    max_num: 1,
})

const fetchAllActivities = () => {
    fetchUserActivity_API(currentUser.value.id, 'pub', null)
        .then(res => {
            if (res.data.code === 200) {
                activityList.value = res.data.data
            } else {
                ElMessage.error("请求失败")
            }
        })
        .catch(err => {
            for (let i = 0; i < 10; i++) {
                activityList.value.push({
                    id: i,
                    name: '服务器崩溃了' + i,
                    creator: '服务器崩溃了',
                    start_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    end_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    location: '服务器崩溃了',
                    info: "服务器崩溃了",
                    max_num: 1,
                    joiner_number: 1,
                })
            }
        })
}
const openUpdateAct_dia = (id: number) => {
    updateAct_dia.value = true
    activity_form.value = JSON.parse(JSON.stringify(activityList.value[id]));
}
const updateActivity = () => {
    // console.log(activity_form.value)
    updateActivity_API(activity_form.value)
        .then(res => {
            if (res.data.code === 200) {
                ElMessage.success("修改成功")
                updateAct_dia.value = false
                fetchAllActivities()
            } else {
                ElMessage.error("修改失败")
            }
        })
        .catch(err => {
        })
}

const deleteActivity = async (id: number) => {
    console.log(activityList.value[id])
    try {
        const confirm = await ElMessageBox.confirm(`您确定要删除活动 "${activityList.value[id].name}" 吗 ?`,
            '确认删除',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        );
        if (confirm) {
            deleteActivity_API(activityList.value[id].id)
                .then(res => {
                    if (res.data.code === 200) {
                        activityList.value.splice(id, 1)
                        ElMessage.success("删除成功")
                    } else
                        ElMessage.error(res.data.message)
                })
        }
    }
    catch (err) {
        // 捕获用户取消操作导致的异常
        if (err !== 'cancel') {
            console.error(err);
        }
    }

}

const resource_dia = ref(false)
const act_id = ref(0)
const openResource = (index: number) => {
    resource_dia.value = true
    act_id.value = activityList.value[index].id
}

const notice_dia = ref(false)
const notice_form = ref<Notice>({
    id: -1,
    activity_id: -1,
    notice_type_id: -1,
    context: '',
    send_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    state: ''
})

const notice_temlist = ref<noticeTemplateForm[]>([{
    id: -1,
    notice_type: '自定义',
    context: ''
}])

const openNoticeDia = (index: number) => {
    notice_dia.value = true
    notice_form.value.activity_id = activityList.value[index].id
    fetchAllNoticeTemplates_API()
        .then(res => {
            if (res.data.code === 200) {
                notice_temlist.value = res.data.data
            } else {
                ElMessage.error("请求模板失败", res.data.message)
            }
        })
}


const addNotice = () => {
    if (notice_form.value.context === '') {
        ElMessage.warning("请输入通知内容")
        return
    }

    addNotice_API(notice_form.value)
        .then(res => {
            if (res.data.code === 200) {
                ElMessage.success("添加成功")
            } else {
                ElMessage.error("添加失败", res.data.message)
            }
        })
        .catch(err => { })
}

const noticetemChange = (index: number) => {
    notice_temlist.value.forEach((item, i) => {
        if (item.id === index) {
            notice_form.value.context = item.context
            return
        }
    })
}

const feelist_dia = ref(false)
const feelist = ref<{
    fee: number,
    context: string
}[]>([])
const openFeeListDia = (index: number) => {
    feelist_dia.value = true
    act_id.value = activityList.value[index].id
    loadFeelist_API(activityList.value[index].id)
        .then(res => {
            if (res.data.code === 200)
                feelist.value = res.data.data
            else {
                ElMessage.error(res.data.message)
            }
        })
        .catch(err => {
        })
}

const chargeFrm = ref({
    activity_id: 0,
    booking_fee: 0,
    actual_fee: 0,
})

const updateCharge = () => {
    chargeFrm.value.actual_fee = act_actual_charge.value
    chargeFrm.value.activity_id = act_id.value
    updateCharge_API(chargeFrm.value)
        .then(res => {
            if (res.data.code == 200)
                ElMessage.success(res.data.message)
            else {
                ElMessage.error(res.data.message)
            }
        })
        .catch(err => {
        })
}

const act_actual_charge = computed(() => {
    let sum = 0
    feelist.value.forEach(item => {
        sum += item.fee
    })
    return sum
})
</script>

<style scoped>
.main-activity {
    width: 100%;
    height: 100%;
}

.toolbar {
    display: flex;
    margin: 0 0 10PX;
}

.search {
    width: 30%;
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

.item {
    display: flex;
    margin: 10px 0;
}

.image {
    width: 20%;
}

.info {
    display: flex;
    flex-direction: column;
}
</style>