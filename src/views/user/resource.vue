<template>
    <div class="main-activity">
        <div class="container">
            <h4 class="title">资源申请状态</h4>
            <div class="content">
                <el-table :data="expenseApplyList" :border="true" style="width: 100%" max-height="600">
                    <el-table-column fixed prop="resource_name" label="资源名" style="width: 25%;">
                    </el-table-column>
                    <el-table-column prop="activity_name" label="活动名" style="width: 25%;">
                    </el-table-column>
                    <el-table-column prop="number" label="申请数量" style="width: 25%;">
                    </el-table-column>
                    <el-table-column label="申请状态" style="min-width: 25%;">
                        <template #default="scope">{{ scope.row.state === 0 ? '待审核' : scope.row.state === 1 ? '已通过'
                            : '已拒绝'
                            }}</template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getResourceApplyList } from '@/api/resource';
import type { resourceApplyList } from '@/models/resource';

onMounted(() => {
    fetchAllResourceApply()
})
const expenseApplyList = ref<resourceApplyList[]>([])
const fetchAllResourceApply = () => {
    getResourceApplyList()
        .then(res => {
            if (res.data.code === 200) {
                expenseApplyList.value = res.data.data
            }
        })
        .catch(err => {
            for (let i = 0; i < 5; i++) {
                expenseApplyList.value.push({
                    resource_name: '资源' + i,
                    activity_name: '活动' + i,
                    number: i,
                    state: i % 3
                })
            }
        })
}
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