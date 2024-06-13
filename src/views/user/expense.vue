<template>
    <div class="main-activity">
        <div class="toolbar">
            <el-select v-model="expense_type">
                <el-option v-for="item in expense_list" :key="item.id" :label='item.value' :value="item.id" />
            </el-select>
        </div>
        <div class="container">
            <h4 class="title">费用管理</h4>
            <div class="content">
                <el-table :data="expenseList" :border="true" style="width: 100%" max-height="600"
                    v-if="expense_type === 0">
                    <el-table-column fixed prop="username" label="申请人" width="200">
                    </el-table-column>
                    <el-table-column prop="activity_name" label="参与活动" width="150">
                    </el-table-column>
                    <el-table-column prop="amount" label="申请金额" width="200">
                    </el-table-column>
                    <el-table-column prop="reason" label="申请理由" min-width="200">
                    </el-table-column>
                    <el-table-column label="申请状态" min-width="200">
                        <template #default="scope">{{ scope.row.state === 0 ? '待审核' : scope.row.state === 1 ? '已通过'
                            : '已拒绝'
                            }}</template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" header-align="center" min-width="200">
                        <template #default="scope">
                            <div class="handler  myCenter">
                                <el-button :disabled="scope.row.state !== 0" type="warning"
                                    @click.native.prevent.stop="agreeExpense(scope.$index)">
                                    同意
                                </el-button>
                                <el-button :disabled="scope.row.state !== 0"
                                    @click.native.prevent="disAgreeExpense(scope.$index)" type="danger">
                                    拒绝
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="expenseList" :border="true" style="width: 100%" max-height="600" v-else>
                    <el-table-column fixed prop="username" label="申请人" width="200">
                    </el-table-column>
                    <el-table-column prop="activity_name" label="参与活动" width="150">
                    </el-table-column>
                    <el-table-column prop="amount" label="申请金额" width="200">
                    </el-table-column>
                    <el-table-column prop="reason" label="申请理由" min-width="200">
                    </el-table-column>
                    <el-table-column label="申请状态" min-width="200">
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
import { onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { expense } from '@/models/charges';
import { fetchAllExpense_API, updateExpenseState_API } from '@/api/charges';


const expense_type = ref(0)

const expense_list = [{
    id: 0,
    value: '报销审核'
}, {
    id: 1,
    value: '我的申请'
}]

onMounted(() => {
    fetchAllExpense()
})

watch(expense_type, () => {
    expenseList.value = []
    fetchAllExpense()
})

const fetchAllExpense = () => {
    fetchAllExpense_API(expense_type.value)
        .then(res => {
            if (res.data.code === 200) {
                expenseList.value = res.data.data
                console.log(expenseList.value)
            } else {
                ElMessage.error("请求失败")
            }
        })
        .catch(err => {
            for (let i = 0; i < 15; i++) {
                expenseList.value.push({
                    id: i,
                    username: '服务器崩溃了' + i,
                    activity_name: '服务器崩溃了' + i,
                    amount: i,
                    reason: "服务器崩溃了",
                    state: i % 3
                })
            }
        })
}
const expenseList = ref<expense[]>([])

const agreeExpense = (index: number) => {
    updateExpenseState_API(1, expenseList.value[index].id)
        .then(res => {
            if (res.data.code === 200) {
                ElMessage.success("审核成功")
                fetchAllExpense()
            }
            else {
                ElMessage.error(res.data.message)
            }
        })
        .catch(err => {

        })
}

const disAgreeExpense = (index: number) => {
    updateExpenseState_API(2, expenseList.value[index].id)
        .then(res => {
            if (res.data.code === 200) {
                ElMessage.success("审核成功")
                fetchAllExpense()
            }
            else {
                ElMessage.error(res.data.message)
            }
        })
        .catch(err => {
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