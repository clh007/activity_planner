<template>
    <div class="my-timeline">
        <el-timeline style="max-width: 600px">
            <el-timeline-item v-for="item in scheduleList" :timestamp="item.start_time" placement="top">
                <el-card>
                    <h4>{{ item.name }}</h4>
                    <p>{{ item.context }}</p>
                    <p>To {{ item.end_time }}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup lang="ts">
import { getScheduleList_API } from '@/api/activity';
import type { Schedule } from '@/models/schedule';
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
</script>