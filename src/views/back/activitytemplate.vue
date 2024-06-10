<template>
  <div class="template-management">
    <h1 class="page-title">活动模板管理</h1>

    <el-button type="primary" @click="showTemplateAddDialog" style="margin: 15px 0;">+新增</el-button>
    <!-- 列表显示活动模板 -->
    <el-table :data="templateList" border style="width: 100%" max-height="250">
      <el-table-column prop="tem_name" label="模板名">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="info" label="简介">
      </el-table-column>
      <el-table-column prop="location" label="位置">
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <div class="handler flex-center">
            <el-button type="warning" @click.native.prevent.stop="openUpdateTemplate(scope.$index, templateList)">
              修改
            </el-button>
            <el-button @click.native.prevent="delTemplate(scope.$index, templateList)" type="danger">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
        layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>

    <!-- 添加活动模板 -->
    <el-dialog v-model="templateAddDialogVisible" title="添加活动模板" width="30%">
      <el-form ref="templateAddFormRef" :model="templateAddForm" :rules="rules" label-width="80px">
        <el-form-item label="模板名" prop="tem_name">
          <el-input v-model="templateAddForm.tem_name" autocomplete="off" placeholder="请输入模板名"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="templateAddForm.name" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="info">
          <el-input v-model="templateAddForm.info" autocomplete="off" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-input v-model="templateAddForm.location" autocomplete="off" placeholder="请输入位置"></el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addTemplate()">确定</el-button>
          <el-button @click="resetTemplateAddForm()">重置</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { addTemplate_API, getTemplateList_API } from '@/api/template'; // 从api文件夹导入接口
import { reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';

const templateAddDialogVisible = ref(false);
const templateAddForm = ref({
  tem_name: '',
  name: '',
  info: '',
  location: ''
});

const templateAddFormRef = ref<FormInstance>();

const total = ref(0); // 总记录数
const pageSize = ref(10); // 每页显示多少条记录
const currentPage = ref(1); // 当前页码

// 获取活动模板列表
const getTemplateList = async () => {
  try {
    const response = await getTemplateList_API(currentPage.value, pageSize.value); // 调用获取活动模板列表的接口
    templateList.value = response.data; // 更新活动模板列表
    total.value = response.total; // 更新总记录数
  } catch (error) {
    console.error(error);
  }
};

// 分页相关方法
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  getTemplateList();
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  getTemplateList();
};

const rules = reactive<FormRules>({
  tem_name: [
    { required: true, message: '请输入模板名', trigger: 'blur' },
    { min: 3, max: 20, message: '模板名长度应在 3 到 20 个字符', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' }
  ],
  info: [
    { required: true, message: '请输入简介', trigger: 'blur' }
  ],
  location: [
    { required: true, message: '请输入位置', trigger: 'blur' }
  ]
});

const resetTemplateAddForm = () => {
  if (templateAddFormRef.value) {
    templateAddFormRef.value.resetFields();
  }
};

const showTemplateAddDialog = () => {
  templateAddDialogVisible.value = true;
};

const addTemplate = async () => {
  if (templateAddFormRef.value) {
    try {
      const isValid = await templateAddFormRef.value.validate();
      if (isValid) {
        console.log(templateAddForm.value)
        const response = await addTemplate_API(templateAddForm.value); // 调用添加活动模板接口
        //接收返回信息
        console.log(response)
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.template-management {
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>