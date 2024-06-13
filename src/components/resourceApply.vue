<template>
    <div class="my-resource">
        <div class="name">
            <span>资源名称</span>
            <el-select v-model="resource_name" @change="idChange">
                <el-option v-for="item in resource_list" :key="item.id" :value="item.name"></el-option>
            </el-select>
        </div>
        <div class="number">
            <span>申请数量</span>
            <el-input v-model="resource_form.num" placeholder="请输入申请数量"></el-input>
        </div>
        <div class="resource-time">
            <span>申请时间</span>
            <el-date-picker v-model="start_end" type="datetimerange" range-separator="To" start-placeholder="开始日期"
                end-placeholder="结束日期" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
        </div>
        <el-button type="primary" @click="submit_resourceApply()">提交</el-button>
    </div>
</template>


<script setup lang="ts">
import { getResourceListAll_API, submitResourceApply_API } from '@/api/resource';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';

onMounted(() => {
    fetchResourceList()
})

const resource_list = ref<{
    id: number,
    name: string,
    total_num: number,
    current_num: number
}[]>([])
const resourceTotal = computed(() => {
    if (resource_name.value === '') {
        return '请选择一个资源'
    }
    return resource_list.value.find(item => item.name === resource_name.value)?.current_num
})

const fetchResourceList = () => {
    getResourceListAll_API()
        .then(res => {
            if (res.data.code === 200)
                resource_list.value = res.data.data
        })
        .catch(err => {
            for (let i = 0; i < 2; i++) {
                resource_list.value.push({
                    id: i + 1,
                    name: i % 2 === 0 ? '教室' + i : '实验室' + i,
                    total_num: 20,
                    current_num: i
                })
            }
        })
}
const resource_name = ref('')
const resource_form = ref({
    activity_id: 0,
    resource_id: 0,
    applyer_id: 0,
    num: 0,
    start_time: '',
    end_time: ''
})
const start_end = ref(['', ''])
const act_id = defineModel({ default: 0 })

const idChange = (value: any) => {
    resource_list.value.every(item => {
        if (item.name === value) {
            resource_form.value.resource_id = item.id
        }
    })
}


const submit_resourceApply = () => {
    if (resource_name.value === '') {
        ElMessage.warning("请选择申请资源")
        return
    }
    if (start_end.value[0] === '' && start_end.value[1] === '') {
        ElMessage.warning("请选择申请时间")
        return
    }
    if (resource_form.value.num === 0) {
        ElMessage.warning("请输入申请数量")
        return
    }
    resource_form.value.start_time = start_end.value[0]
    resource_form.value.end_time = start_end.value[1]
    resource_form.value.activity_id = act_id.value
    resource_form.value.applyer_id = useUserStore().currentUser.id
    // console.log(resource_form)
    submitResourceApply_API(resource_form.value)
        .then(res => {
            if (res.data.code === 200)
                ElMessage.success("提交成功")
            else {
                if (res.data.data.current_num) {
                    ElMessage.error('资源不足，等待管理员审核')
                }
                else {
                    ElMessage.error("提交失败")
                }
            }
        })
        .catch(err => {
        })
}
</script>