<template>
  <div class="activity-manage">
    <h1 class="page-title">活动管理</h1>
    <div class="activity-search">
      <el-select v-model="searchType" placeholder="请选择搜索类型">
        <el-option label="活动名称" value="name"></el-option>
        <el-option label="创建者" value="creator_id"></el-option>
      </el-select>
      <el-input v-model="searchKeyword" placeholder="请输入搜索关键词"></el-input>
      <el-button type="primary" @click="searchActivity">搜索</el-button>
      <el-button type="primary" @click="resetSearchActivityForm">重置</el-button>
    </div>

    <el-button type="primary" @click="showActivityAddDialog" style="margin: 15px 0;">+新增</el-button>
    <!-- 列表显示活动 -->
    <el-table :data="activityList" border style="width: 100%" max-height="750">
      <el-table-column prop="name" label="活动名称"></el-table-column>
      <el-table-column prop="creator_id" label="创建者"></el-table-column>
      <el-table-column prop="start_time" label="开始时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="end_time" label="结束时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="location" label="地点"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="joiner_number" label="参与者人数"></el-table-column>
      <el-table-column prop="max_num" label="人数上限"></el-table-column>
      <el-table-column label="操作" header-align="center">
        <template v-slot:default="{ row, $index }">
          <div class="handler flex-center">
            <el-button type="warning" @click.native.prevent.stop="openUpdateActivity($index, activityList)">
              修改
            </el-button>
            <el-button @click.native.prevent="delActivity($index, activityList)" type="danger">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
        layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
    <!-- 添加活动 -->
    <el-dialog v-model="activityAddDialogVisible" title="添加活动" width="30%">
      <el-form ref="activityAddFormRef" :model="activityAddForm" :rules="rules" label-width="80px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="activityAddForm.name" autocomplete="off" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="creator_id">
          <el-input v-model="activityAddForm.creator_id" autocomplete="off" placeholder="请输入创建者"></el-input>
        </el-form-item>
        <el-form-item label="活动简介" prop="info">
          <el-input v-model="activityAddForm.info" type="textarea" placeholder="请输入活动简介"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker v-model="activityAddForm.start_time" type="datetime" placeholder="请选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker v-model="activityAddForm.end_time" type="datetime" placeholder="请选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="地点" prop="location">
          <el-input v-model="activityAddForm.location" autocomplete="off" placeholder="请输入地点"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="activityAddForm.state" placeholder="请选择状态">
            <el-option label="报名中" value="报名中"></el-option>
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="已结束" value="已结束"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参与者人数" prop="joiner_number">
          <el-input v-model.number="activityAddForm.joiner_number" autocomplete="off" placeholder="请输入参与者人数"></el-input>
        </el-form-item>
        <el-form-item label="人数上限" prop="max_num">
          <el-input v-model.number="activityAddForm.max_num" autocomplete="off" placeholder="请输入人数上限"></el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addActivity()">确定</el-button>
          <el-button @click="resetActivityAddForm()">重置</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { addActivity_API, getActivityListByKeyword_API, deleteActivity_API } from '@/api/activity'; // 从api文件夹导入接口
import { reactive, ref, onMounted } from 'vue';
import { type FormInstance, type FormRules, ElMessageBox } from 'element-plus';

const activityAddDialogVisible = ref(false);
const activityAddForm = ref({
  id: 0,
  name: '',
  creator_id: 0,
  info: '',
  start_time: '',
  end_time: '',
  location: '',
  state: '报名中',
  joiner_number: 0,
  max_num: 0
});

// 当组件挂载后执行一次getActivityList函数
onMounted(async () => {
  await getActivityList();
});

// 定义 activityList 为响应式数组
const activityList = ref([]);

const activityAddFormRef = ref<FormInstance>();

const total = ref(0); // 总记录数
const pageSize = ref(10); // 每页显示多少条记录
const currentPage = ref(1); // 当前页码

const searchType = ref(''); // 搜索类型
const searchKeyword = ref(''); // 搜索关键词

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  creator_id: [{ required: true, message: '请输入创建者', trigger: 'blur' }],
  start_time: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
  end_time: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
  state: [{ required: true, message: '请选择状态', trigger: 'blur' }],
  joiner_number: [
    { required: true, message: '请输入参与者人数', trigger: 'blur' },
    { type: 'number', message: '参与者人数必须为数字', trigger: 'blur' }
  ],
  max_num: [
    { required: true, message: '请输入人数上限', trigger: 'blur' },
    { type: 'number', message: '人数上限必须为数字', trigger: 'blur' }
  ]
});

const resetActivityAddForm = () => {
  if (activityAddFormRef.value) {
    activityAddFormRef.value.resetFields();
  }
};
const resetSearchActivityForm = () => {
  searchType.value = '';   // 将搜索类型重置为空字符串
  searchKeyword.value = ''; // 将搜索关键词重置为空字符串
};

const showActivityAddDialog = () => {
  activityAddDialogVisible.value = true;
};

// 获取活动列表
const getActivityList = async () => {
  try {
    const response = await getActivityListByKeyword_API('', '', currentPage.value, pageSize.value); // 调用获取活动列表的接口
    activityList.value = response.data.data.content; // 更新活动列表
    total.value = response.data.data.totalElements; // 更新总记录数
  } catch (error) {
    console.error(error);
  }
};

// 添加活动
const addActivity = async () => {
  if (activityAddFormRef.value) {
    try {
      const isValid = await activityAddFormRef.value.validate();
      if (isValid) {
        const response = await addActivity_API(activityAddForm.value); // 调用添加活动接口
        getActivityList(); // 刷新活动列表
        resetActivityAddForm();
        activityAddDialogVisible.value = false;
        console.log(response); // 根据返回信息处理结果,例如显示成功信息或处理错误
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// 活动查询
const searchActivity = async () => {
  if (searchType.value && searchKeyword.value) {
    try {
      const response = await getActivityListByKeyword_API(searchType.value, searchKeyword.value, currentPage.value, pageSize.value);
      activityList.value = response.data.data.content; // 更新活动列表
      total.value = response.data.data.totalElements; // 更新总记录数
    } catch (error) {
      console.error(error);
    }
  } else {
    getActivityList(); // 如果搜索类型或关键词为空,则获取全部活动列表
  }
};

// 分页相关方法
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  if (searchType.value && searchKeyword.value) {
    searchActivity(); // 如果有搜索条件,则执行搜索
  } else {
    getActivityList(); // 否则获取全部活动列表
  }
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  if (searchType.value && searchKeyword.value) {
    searchActivity(); // 如果有搜索条件,则执行搜索
  } else {
    getActivityList(); // 否则获取全部活动列表
  }
};

// 删除活动
const delActivity = async (index: number, activityList: Array<any>) => {
  const activity = activityList[index];

  try {
    const confirm = await ElMessageBox.confirm(`您确定要删除活动 "${activity.name}" 吗 ?`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );


    if (confirm) {
      await deleteActivity_API(activity.id);
      activityList.splice(index, 1);
      getActivityList();
    }
  } catch (error) {
    // 捕获用户取消操作导致的异常
    if (error !== 'cancel') {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.activity-manage {
  padding: 20px;
}

.page-title {
  text-align: center;
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
}

.activity_search,
.activity_search>* {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.activity_search>*:last-child {
  margin-right: 0;
}

.activity_search .el-select,
.activity_search .el-input {
  width: 200px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>