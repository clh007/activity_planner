<template>
    <div class="my-timeline">
        <el-timeline style="max-width: 600px">
            <el-timeline-item v-for="item in scheduleList" :timestamp="item.start_time + ' To ' + item.end_time"
                placement="top">
                <el-card>
                    <h4>{{ item.name }}</h4>
                    <p>{{ item.context }}</p>
                    <el-button type="info" @click="openDia(item)">创建日程提醒</el-button>
                </el-card>
            </el-timeline-item>
        </el-timeline>

        <el-dialog title="日程提醒" v-model="sch_dia">
            <el-select v-model="schRemind_form.method" placeholder="提醒方式">
                <el-option v-for="item in sch_methonlist" :key="item.id" :label="item.label"
                    :value="item.label"></el-option>
            </el-select>
            <span>提醒时间：</span><el-input v-model="schRemind_form.time" :disabled="false" placeholder="提醒内容"></el-input>
            <el-button type="primary" @click="submitSchRemind()">提交</el-button>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { createSchRemind_API, getScheduleList_API } from '@/api/activity';
import type { Schedule } from '@/models/schedule';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';

const act_id = defineModel('act_id', { default: 0 })
const timeline_drawer = defineModel('timeline_drawer', { default: false })
const scheduleList = ref<Schedule[]>([])

watch(timeline_drawer, () => {
    if (timeline_drawer.value) {
        getScheduleList()
    }
})

const getScheduleList = () => {
    getScheduleList_API(act_id.value)
        .then(res => {
            if (res.data.code === 200) {
                scheduleList.value = res.data.data
            }
        })
        .catch(err => {
            for (let i = 0; i < 10; i++) {
                scheduleList.value.push({
                    id: i,
                    activity_id: 1,
                    name: 'title' + i,
                    context: 'content',
                    start_time: '2022-01-01 00:00:00',
                    end_time: '2022-01-01 00:00:00',
                })
            }
        })
}
onMounted(() => {
    getScheduleList()
})
const sch_dia = ref(false)
const sch_methonlist = ref([{
    label: '邮箱',
    id: 1
}, {
    label: '短信',
    id: 2
}
])

const schRemind_form = ref({
    user_id: 0,
    method: '',
    time: '2022-01-01 00:00:00',
})

const openDia = (schedule: Schedule) => {
    schRemind_form.value.method = '邮箱'
    schRemind_form.value.time = schedule.start_time
    sch_dia.value = true
}

const submitSchRemind = () => {
    createSchRemind_API(schRemind_form.value)
        .then(res => {
            if (res.data.code === 200) {
                sch_dia.value = false
            } else {
                ElMessage.error(res.data.message)
            }
        })
        .catch(err => {
        })
}
</script>