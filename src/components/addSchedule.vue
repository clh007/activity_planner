<template>
    <div class="add-schedule">
        <div class="schedule-name">
            <span>日程名</span>
            <el-input v-model="schedule.name"></el-input>
        </div>
        <div class="schedule-time">
            <span>时间</span>
            <el-date-picker v-model="start_end" type="datetimerange" range-separator="To" start-placeholder="开始日期"
                end-placeholder="结束日期" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
        </div>
        <div class="context">
            <span>内容</span>
            <el-input v-model="context" type="textarea" :rows="2" />
        </div>
        <el-button type="info" @click="addSchedule">添加</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Schedule } from "@/models/schedule"
import { useScheduleStore } from '@/store/schedule';
import { ElMessage } from 'element-plus';
import { addSchedule_API } from '@/api/activity';

const drawer = defineModel('drawer')
const act_id = defineModel('act_id', { default: 0 })

const schedule = ref<Schedule>({
    context: '',
    name: '',
    start_time: '',
    end_time: '',
})
const context = ref('')
const start_end = ref(['', ''])
const addSchedule = () => {
    if (schedule.value.name === "") {
        ElMessage.error("请输入日程名")
        return
    }
    if (start_end.value[0] === '' || start_end.value[1] === '') {
        ElMessage.error("请选择日程时间")
        return
    }
    schedule.value.activity_id = act_id.value
    schedule.value.start_time = start_end.value[0]
    schedule.value.end_time = start_end.value[1]
    schedule.value.context = context.value
    addSchedule_API(schedule.value)
        .then(res => {
            if (res.data.code === 200) {
                ElMessage.success("添加成功")
            }
        })
        .catch(err => {
        })
    context.value = ''
    start_end.value = ['', '']
    schedule.value = {
        context: '',
        name: '',
        start_time: '',
        end_time: '',
    }
    drawer.value = false
}
</script>