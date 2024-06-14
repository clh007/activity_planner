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

            <div class="activity-button">
                <el-button type="primary" @click="createActivity">创建活动</el-button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { createActivity_API } from '@/api/activity';
import { fetchAllTemplates_API } from '@/api/template';
import type { Activity_template, Activity } from '@/models/avtivity';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
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

const options = ref<Activity_template[]>([{
    id: 0,
    tem_name: '自定义',
    name: '',
    info: '',
    location: '',
}]);

// 请求数据的逻辑
const fetchActivityTemplates = () => {
    fetchAllTemplates_API()
        .then(res => {
            console.log(res.data.data)
            options.value.push(...res.data.data)
        }).catch(error => {
            console.error('请求模板数据失败:', error);
        });
};
onMounted(() => {
    fetchActivityTemplates()
})


const { currentUser } = storeToRefs(useUserStore())
const createActivity = async () => {

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
    activity.value.creator_id = currentUser.value.id

    await createActivity_API(activity.value)
        .then(res => {
            if (res.data.code === 200) {
                console.log(res.data.data)
                ElMessage.success('创建成功')
                window.location.replace(`/activity/${res.data.data}`)
            }
            else {
                ElMessage.error('创建失败')
            }
        })
        .catch(err => {
        })

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