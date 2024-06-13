<template>
  <div class="template-management">
    <h1 class="page-title">活动模板管理</h1>

    <el-button type="primary" @click="showTemplateAddDialog" style="margin: 15px 0;">+新增</el-button>
    <!-- 列表显示活动模板 -->
    <el-table :data="templateList" border style="width: 100%" max-height="750">
      <el-table-column prop="tem_name" label="模板名">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="info" label="简介">
      </el-table-column>
      <el-table-column prop="location" label="位置">
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template v-slot:default="{ $index }"> <!-- Use v-slot instead of slot-scope -->
          <div class="handler flex-center">
            <el-button type="warning" @click.native.prevent.stop="openUpdateTemplate($index)">
              修改
            </el-button>
            <el-button @click.native.prevent="delTemplate($index)" type="danger">
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
          <el-button type="primary" @click="addTemplate">确定</el-button>
          <el-button @click="resetTemplateAddForm">重置</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改活动模板 -->
    <el-dialog v-model="templateUpdateDialogVisible" title="修改活动模板" width="30%">
      <el-form ref="templateUpdateFormRef" :model="templateUpdateForm" :rules="rules" label-width="80px">
        <el-form-item label="模板名" prop="tem_name">
          <el-input v-model="templateUpdateForm.tem_name" autocomplete="off" placeholder="请输入模板名"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="templateUpdateForm.name" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="info">
          <el-input v-model="templateUpdateForm.info" autocomplete="off" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-input v-model="templateUpdateForm.location" autocomplete="off" placeholder="请输入位置"></el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="updateTemplate">确定</el-button>
          <el-button @click="resetTemplateUpdateForm">重置</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { addTemplate_API, getTemplateList_API, updateTemplate_API, deleteTemplate_API } from '@/api/template'; // 从api文件夹导入接口
import { reactive, ref, onMounted } from 'vue';
import { type FormInstance, type FormRules, ElMessageBox } from 'element-plus';

const templateList = ref([]);
const templateAddDialogVisible = ref(false);
const templateUpdateDialogVisible = ref(false);

const templateAddForm = ref({
  tem_name: '',
  name: '',
  info: '',
  location: ''
});

const templateUpdateForm = ref({
  id: 0, // Assuming your template has an ID
  tem_name: '',
  name: '',
  info: '',
  location: ''
});

const templateAddFormRef = ref<FormInstance>();
const templateUpdateFormRef = ref<FormInstance>();

const total = ref(0); // 总记录数
const pageSize = ref(10); // 每页显示多少条记录
const currentPage = ref(1); // 当前页码

// 当组件挂载后执行一次getTemplateList函数
onMounted(async () => {
  await getTemplateList();
});

// 获取活动模板列表
const getTemplateList = async () => {
  try {
    const response = await getTemplateList_API(currentPage.value, pageSize.value); // 调用获取活动模板列表的接口
    templateList.value = response.data.data.content; // 更新活动模板列表
    total.value = response.data.data.totalElements; // 更新总记录数
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
const resetTemplateUpdateForm = () => {
  if (templateUpdateFormRef.value) {
    templateUpdateFormRef.value.resetFields();
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
        const response = await addTemplate_API(templateAddForm.value); // 调用添加活动模板接口
        templateAddDialogVisible.value = false;
        getTemplateList();
        resetTemplateAddForm();
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// 打开更新活动模板对话框，并预填充表单
const openUpdateTemplate = (index: number) => {
  const template = templateList.value[index];
  templateUpdateDialogVisible.value = true;
  templateUpdateForm.value = { ...template }; // 复制模板对象以避免直接修改原数据
};

// 更新活动模板
const updateTemplate = async () => {
  if (templateUpdateFormRef.value) {
    try {
      const isValid = await templateUpdateFormRef.value.validate();
      if (isValid) {
        const response = await updateTemplate_API(templateUpdateForm.value); // 调用更新活动模板接口
        templateUpdateDialogVisible.value = false;
        getTemplateList();
        resetTemplateUpdateForm();
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// 删除活动模板
const delTemplate = async (index: number) => {
  const template = templateList.value[index];
  try {
    const confirm = await ElMessageBox.confirm(
      `您确定要删除活动模板 "${template.tem_name}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );

    if (confirm) {
      await deleteTemplate_API(template.id); // 假设模板对象有id属性
      templateList.value.splice(index, 1);
      getTemplateList();
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
/* Your CSS styles here */
</style>

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
</style>type FormInstancetype FormRules