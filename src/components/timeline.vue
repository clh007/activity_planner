<template>
    <div class="my-timeline">
        <el-timeline style="max-width: 600px">
            <el-timeline-item timestamp="2018/4/12" placement="top" icon="el-icon-more">
                <el-card>
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/12 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/3 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>Update Github template</h4>
                    <p>Tom committed 2018/4/2 20:46</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup lang="ts">
import { getScheduleList_API } from '@/api/activity';
import type { Schedule } from '@/models/schedule';
import { ref } from 'vue';

const act_id = defineModel('act_id', { default: 0 })
const scheduleList = ref<Schedule[]>([])
const getScheduleList = () => {
    getScheduleList_API(act_id.value)
        .then(res => {

        })
        .catch(err => {

        })
}
</script>