<template>
  <div class="resource-manage">
    <h1 class="page-title">资源管理</h1>
    <div class="resource_search">
      <el-select v-model="searchType" placeholder="请选择搜索类型">
        <el-option label="资源名称" value="name"></el-option>
      </el-select>
      <el-input v-model="searchKeyword" placeholder="请输入搜索关键词"></el-input>
      <el-button type="primary" @click="searchResource">搜索</el-button>
    </div>

    <el-button type="primary" @click="showResourceAddDialog" style="margin: 15px 0;">+新增</el-button>
    <!-- 列表显示资源 -->
    <el-table :data="resourceList" border style="width: 100%" max-height="750">
      <el-table-column prop="name" label="资源名称">
      </el-table-column>
      <el-table-column prop="total_num" label="总数量">
      </el-table-column>
      <el-table-column prop="current_num" label="当前已用数量">
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template v-slot:default="{ row, $index }">
          <div class="handler flex-center">
            <el-button @click.native.prevent="delResource($index, resourceList)" type="danger">
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

    <!-- 添加资源 -->
    <el-dialog v-model="resourceAddDialogVisible" title="添加资源" width="30%">
      <el-form ref="resourceAddFormRef" :model="resourceAddForm" :rules="rules" label-width="80px">
        <el-form-item label="资源名称" prop="name">
          <el-select v-model="resourceAddForm.name" @change="handleResourceTypeChange">
            <el-option v-for="item in resourceList" :key="item.id" :label="item.name" :value="item.name"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <!-- 动态显示输入框 -->
        <template v-if="resourceAddForm.name ===  '其他'">
          <el-form-item label="添加的资源名称" prop="newname">
            <el-input v-model="resourceAddForm.newname" autocomplete="off" placeholder="请输入添加的资源名称"></el-input>
        </el-form-item>
          <el-form-item label="总数量" prop="total_num">
            <el-input v-model.number="resourceAddForm.total_num" autocomplete="off" placeholder="请输入总数量"></el-input>
          </el-form-item>
          <el-form-item label="当前已用数量" prop="current_num">
            <el-input v-model.number="resourceAddForm.current_num" autocomplete="off"
              placeholder="请输入当前已用数量"></el-input>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item label="修改数量" prop="total_num">
            <el-input v-model.number="resourceAddForm.total_num" autocomplete="off"
              placeholder="请输入修改数量，添加输入正数，减少输入负数"></el-input>
          </el-form-item>
        </template>
      </el-form>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addResource()">确定</el-button>
          <el-button @click="resetResourceAddForm()">重置</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { addResource_API, getResourceList_API, getResourceListByKeyword_API, deleteResource_API } from '@/api/resource'; // 从api文件夹导入接口
import { reactive, ref, onMounted } from 'vue';
import { FormInstance, FormRules, ElMessageBox } from 'element-plus';

const resourceAddDialogVisible = ref(false);
const resourceAddForm = ref({
  name: '',
  newname: '',
  total_num: 0,
  current_num: 0
});

const resourceAddFormRef = ref<FormInstance>();

const total = ref(0); // 总记录数
const pageSize = ref(10); // 每页显示多少条记录
const currentPage = ref(1); // 当前页码

const searchType = ref(''); // 搜索类型
const searchKeyword = ref(''); // 搜索关键词

const resourceList = ref([{ id: 0, name: '' , total_num: 0, current_num:0}]);


onMounted(async () => {
  await getResourceList();
});

// 添加一个方法来处理资源类型变化
const handleResourceTypeChange = (value: number) => {
  if (value === 0) {
    // 如果选择了“其他”，则重置修改数目，并显示总数量和当前可用数量的输入框
    resourceAddForm.value.total_num = 0;
    resourceAddForm.value.current_num = 0;
  } else {
    // 如果选择了已有的资源类型，则重置总数量和当前可用数量，并显示修改数目的输入框
    resourceAddForm.value.name = resourceList.value[value].name;
    resourceAddForm.value.total_num = 0;
    resourceAddForm.value.current_num = 0;
  }
};


// 分页相关方法
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  getResourceList();
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  getResourceList();
};

const rules = reactive<FormRules>({
  total_num: [
    { required: true, message: '请输入总数量', trigger: 'blur' },
    { type: 'number', message: '总数量必须为数字', trigger: 'blur' }
  ],
  current_num: [
    { required: true, message: '请输入当前可用数量', trigger: 'blur' },
    { type: 'number', message: '当前可用数量必须为数字', trigger: 'blur' }
  ]
});

const resetResourceAddForm = () => {
  if (resourceAddFormRef.value) {
    resourceAddFormRef.value.resetFields();
  }
};
const showResourceAddDialog = () => {
  console.log("===============")
  console.log(resourceList.value)
  resourceAddDialogVisible.value = true;
};

// 获取资源列表
const getResourceList = async () => {
  try {
    const response = await getResourceList_API(currentPage.value, pageSize.value); // 调用获取资源列表的接口
    resourceList.value = response.data.data.content; // 更新资源列表
    total.value = response.data.data.totalElements; // 更新总记录数
  } catch (error) {
    console.error(error);
  }
};

// 添加资源
const addResource = async () => {
  if (resourceAddFormRef.value) {
    try {
      const isValid = await resourceAddFormRef.value.validate();
      if (isValid) {
        const response = await addResource_API(resourceAddForm.value); // 调用添加资源接口
        resourceAddDialogVisible.value = false;
        getResourceList();
        resetResourceAddForm();
        //接收返回信息
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// 删除资源
const delResource = async (index: number, resourceList: Array<any>) => {
  const resource = resourceList[index];
  
  try {
    const confirm = await ElMessageBox.confirm(
      `您确定要删除资源 "${resource.name}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );

    if (confirm) {
      await deleteResource_API(resource.id);
      resourceList.splice(index, 1);
      getResourceList();
    }
  } catch (error) {
    // 捕获用户取消操作导致的异常
    if (error !== 'cancel') {
      console.error(error);
    }
  }
};


//资源查询
const searchResource = async () => {
  if (searchType.value && searchKeyword.value) {
    try {
      const response = await getResourceListByKeyword_API(searchType.value, searchKeyword.value, currentPage.value, pageSize.value);
      resourceList.value = response.data.data.content; // 更新资源列表
      total.value = response.data.data.totalElements; // 更新总记录数
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.resource-management {
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
}

.resource_search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

/* 自定义搜索框样式 */
.resource_search {
  display: flex;
  align-items: center;
}

.resource_search>* {
  /* 对搜索框内的所有子元素应用样式 */
  margin-right: 20px;
}

.resource_search>*:last-child {
  /* 最后一个元素不需要右侧间距 */
  margin-right: 0;
}

.resource_search .el-select {
  /* 针对下拉菜单的样式调整 */
  width: 200px;
  margin-right: 20px;
}

.resource_search .el-input {
  /* 针对输入框的样式调整 */
  width: 250px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
