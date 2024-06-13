<template>
  <div class="main-activity">
    <div class="toolbar">
      <el-input v-model="search_key" placeholder="请输入搜索关键字" class="search" />
      <el-button type="primary" class="search-btn" @click="searchActivity">搜索</el-button>
    </div>
    <div class="container">
      <h4 class="title">活动列表</h4>
      <div class="content">
        <el-table :data="activityList" :border="true" style="width: 100%" max-height="600">
          <el-table-column fixed prop="name" label="活动名" width="150">
            <template #default="scope">
              <span @click="router.push({ name: 'activity', params: { id: scope.row.id } })" style="cursor: pointer;">
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="组织者" width="150">
          </el-table-column>
          <el-table-column prop="location" label="活动地点" width="150">
          </el-table-column>
          <el-table-column prop="start_time" label="开始时间" width="200">
          </el-table-column>
          <el-table-column prop="end_time" label="结束时间" width="200">
          </el-table-column>
          <el-table-column prop="join_num" label="参与人数" width="150">
          </el-table-column>
          <el-table-column fixed="right" label="操作" header-align="center" min-width="200">
            <template #default="scope">
              <div class="handler  myCenter">
                <el-button type="info" @click.native.prevent.stop="openexpenseReim_Dia(scope.$index)">
                  申请报销
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog v-model="expenseReim_Dia" title="活动信息修改" :close="reset()">
      <div class="name">
        <span>活动名</span>
        <el-input disabled v-model="expense_name" placeholder=""></el-input>
      </div>
      <div class="start_time">
        <span>报销金额</span>
        <el-input type="number" v-model="expense_form.amount" placeholder=""></el-input>
      </div>
      <div class="end_time">
        <span>报销说明</span>
        <el-input type="textarea" v-model="expense_form.reason" placeholder=""></el-input>
      </div>
      <el-button type="primary" @click="submit_expense()">提交</el-button>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { fetchUserActivity_API } from '@/api/activity';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Activity } from "@/models/avtivity";
import { ElMessage } from 'element-plus';
import { dayjs } from 'element-plus';
import { submitExpense_API } from '@/api/charges';

const router = useRouter()
const search_key = ref('')

const activityList = ref<Activity[]>([])
const expenseReim_Dia = ref<boolean>(false)

onMounted(() => {
  fetchAllActivities()
})

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
        fetchAllActivities()
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

const fetchAllActivities = () => {
  fetchUserActivity_API(currentUser.value.id, 'par', null)
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
const openexpenseReim_Dia = (index: number) => {
  expense_form.value.activity_id = activityList.value[index].id
  expense_name.value = activityList.value[index].name
  expenseReim_Dia.value = true
}
const expense_name = ref('')
const expense_form = ref({
  activity_id: 0,
  amount: 0,
  reason: '',
})

const submit_expense = () => {
  if (expense_form.value.amount == 0) {
    ElMessage.warning('请输入报销金额')
    return
  }
  if (expense_form.value.reason == '') {
    ElMessage.warning('请输入报销说明')
    return
  }

  submitExpense_API(expense_form.value)
    .then(res => {
      if (res.data.code === 200) {
        ElMessage.success('提交成功')
        expenseReim_Dia.value = false
        reset()
      } else {
        ElMessage.error(res.data.message)
      }
    })
    .catch(err => {
    })
}
const reset = () => {
  expense_form.value.amount = 0
  expense_form.value.reason = ''
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