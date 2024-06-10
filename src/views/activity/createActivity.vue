<template>
    <div class="main">
        <h3 class="title">创建活动</h3>
        <div class="template-select">
            <span>模板选择:</span>
            <el-select v-model="temp_select" placeholder="请选择活动模板">
                <el-option v-for="item in options" :value="item.tem_name">
                </el-option>
            </el-select>
        </div>
        <div class="container">
            <div class="activity-title">
                <span>活动标题</span>
                <el-input v-model="activity.name" placeholder="请输入活动标题"></el-input>
            </div>
            <div class="activity-content">
                <span>活动介绍</span>
                <el-input type="textarea" v-model="activity.info" placeholder="请输入活动简介"></el-input>
            </div>
            <div class="activity-time">
                <span>活动起止时间</span>
                <el-date-picker v-model="start_end" type="datetimerange" range-separator="To" start-placeholder="开始日期"
                    end-placeholder="结束日期" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
            </div>
            <div class="location">
                <span>活动地点</span>
                <el-input v-model="activity.location" placeholder="请输入活动地点"></el-input>
            </div>
            <div class="content">
                <span>活动日程</span>
                <el-button @click="drawer = true">添加日程</el-button>
                <el-table :data="scheduleList" style="width: 100%">
                    <el-table-column prop="name" label="日程名" width="180" />
                    <el-table-column prop="start_time" label="开始时间" width="180" />
                    <el-table-column prop="end_time" label="结束时间" width="180" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="warning" @click.prevent="deleteSchedule(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="activity-button">
                <el-button type="primary" @click="createActivity">创建活动</el-button>
            </div>
        </div>
        <el-drawer size="40%" v-model="drawer" title="添加一个日程" :direction="direction" :before-close="handleClose">
            <addSchedule v-model:drawer="drawer" />
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import type { Activity_template, Activity } from '@/models/avtivity';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue'
import addSchedule from "@/components/addSchedule.vue"
const temp_select = ref('自定义')

watch(
    temp_select,
    () => {
        if (temp_select.value == '自定义') {
            activity.value.name = ''
            activity.value.info = ''
            activity.value.location = ''
        } else {
            options.value.forEach(element => {
                if (element.tem_name == temp_select.value) {
                    activity.value.name = element.name
                    activity.value.info = element.info
                    activity.value.location = element.location
                }
            });
        }
    }
)

const activity = ref<Activity>({
    id: 0,
    name: '',
    info: '',
    start_time: Date.now().toString(),
    end_time: Date.now().toString(),
    location: '',
})
const start_end = ref<[string, string]>(['', ''])

const options = ref<Activity_template[]>([
    {
        id: 0,
        tem_name: '自定义',
        info: '',
        name: '',
        location: '',
    },
    {
        id: 1,
        tem_name: '会议',
        name: '我的会议',
        info: '我的会议很好',
        location: '线上',
    },
    {
        id: 2,
        tem_name: '展览',
        name: '我的展览',
        info: '我的展览很好',
        location: '线下',
    },
]);

// 请求数据的逻辑
const fetchActivityTemplates = () => {
    // fetchActivityTemplates_API()
    //     .then(res => {
    //         console.log(res.data.data)

    //     }).catch(error => {
    //         console.error('请求模板数据失败:', error);
    //     });
};
onMounted(() => {
    fetchActivityTemplates()
})

const createActivity = () => {
    if (activity.value.name == '') {
        ElMessage.error('请输入活动标题')
        return
    }
    if (start_end.value[0] === '' || start_end.value[1] === '') {
        ElMessage.error('请选择活动起止时间')
        return
    }
    activity.value.start_time = start_end.value![0].toString()
    activity.value.end_time = start_end.value![1].toString()

    ElMessage.success('创建活动成功')
}

const drawer = ref(false)
const direction = ref('rtl')
const handleClose = (done: () => void) => {
    done();
};

import { useScheduleStore } from '@/store/schedule';
import { storeToRefs } from 'pinia';

const { scheduleList } = storeToRefs(useScheduleStore())

const deleteSchedule = (index: number) => {
    useScheduleStore().deleteSchedule(index)
}
</script>

<style scoped>
.main {
    margin: 60px 80px 0px;
}

.template-select {
    margin-top: 20px;
    width: 30%;
    display: flex;
}

.template-select span {
    width: 100px;
}
</style>