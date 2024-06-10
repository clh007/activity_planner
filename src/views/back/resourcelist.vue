<template>
  <div class="resource-manage">
    <h1 class="page-title">资源管理</h1>
    <div class="resource_search">
      <el-select v-model="searchType" placeholder="请选择搜索类型">
        <el-option label="资源类型" value="type"></el-option>
        <el-option label="资源名称" value="name"></el-option>
      </el-select>
      <el-input v-model="searchKeyword" placeholder="请输入搜索关键词"></el-input>
      <el-button type="primary" @click="searchResource">搜索</el-button>
    </div>

    <el-button type="primary" @click="showResourceAddDialog" style="margin: 15px 0;">+新增</el-button>
    <!-- 列表显示资源 -->
    <el-table :data="resourceList" border style="width: 100%" max-height="250">
      <el-table-column prop="name" label="资源名称">
      </el-table-column>
      <el-table-column prop="type" label="资源类型">
      </el-table-column>
      <el-table-column prop="total_num" label="总数量">
      </el-table-column>
      <el-table-column prop="current_num" label="当前可用数量">
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <div class="handler flex-center">
            <el-button type="warning" @click.native.prevent.stop="openUpdateResource(scope.$index, resourceList)">
              修改
            </el-button>
            <el-button @click.native.prevent="delResource(scope.$index, resourceList)" type="danger">
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
          <el-input v-model="resourceAddForm.name" autocomplete="off" placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="type_id">
          <el-input v-model="resourceAddForm.type_id" autocomplete="off" placeholder="请输入资源类型"></el-input>
        </el-form-item>
        <el-form-item label="总数量" prop="total_num">
          <el-input v-model="resourceAddForm.total_num" autocomplete="off" placeholder="请输入总数量"></el-input>
        </el-form-item>
        <el-form-item label="当前可用数量" prop="current_num">
          <el-input v-model="resourceAddForm.current_num" autocomplete="off" placeholder="请输入当前可用数量"></el-input>
        </el-form-item>
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
import { addResource_API, getResourceList_API, getResourceListByKeyword_API } from '@/api/resource'; // 从api文件夹导入接口
import { reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';

const resourceAddDialogVisible = ref(false);
const resourceAddForm = ref({
  name: '',
  type_id: 1,
  total_num: 0,
  current_num: 0
});
const updateForm = ref({
  id: null,
  name: '',
  type: '',
  total_num: null,
  current_num: null
});

const resourceAddFormRef = ref<FormInstance>();

const total = ref(0); // 总记录数
const pageSize = ref(10); // 每页显示多少条记录
const currentPage = ref(1); // 当前页码

const searchType = ref(''); // 搜索类型
const searchKeyword = ref(''); // 搜索关键词



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
  name: [
    { required: true, message: '请输入资源名称', trigger: 'blur' },
    { min: 3, max: 20, message: '资源名称长度应在 3 到 20 个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请输入资源类型', trigger: 'blur' },
    { type: 'number', message: '资源类型长度应在 3 到 20 个字符', trigger: 'blur' }
  ],
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
  resourceAddDialogVisible.value = true;
};

// 获取资源列表
const getResourceList = async () => {
  try {
    const response = await getResourceList_API(currentPage.value, pageSize.value); // 调用获取用户列表的接口
    resourceList.value = response.data; // 更新用户列表
    //total.value = response.total; // 更新总记录数
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
        //接收返回信息
        console.log(response)
      }
    } catch (error) {
      console.error(error);
    }
  }
};

//资源查询
const searchResource = async () => {
  if (searchType.value && searchKeyword.value) {
    try {
      const response = await getResourceListByKeyword_API(searchType.value, searchKeyword.value, currentPage.value, pageSize.value);
      resourceList.value = response.data; // 更新资源列表
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