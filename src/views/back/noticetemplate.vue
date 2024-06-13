<template>
    <div class="template-management">
        <h1 class="page-title">通知模板管理</h1>

        <el-button type="primary" @click="showTemplateAddDialog" style="margin: 15px 0;">+新增</el-button>

        <el-table v-loading="loading" :data="templateList" border style="width: 100%" max-height="750">
            <el-table-column prop="notice_type" label="通知类型">
            </el-table-column>
            <el-table-column prop="context" label="内容">
            </el-table-column>
            <el-table-column label="操作" header-align="center">
                <template v-slot:default="{ row, $index }">
                    <div class="handler flex-center">
                        <el-button type="warning" @click.native.prevent.stop="openUpdateTemplate(row, $index)">
                            修改
                        </el-button>
                        <el-button @click.native.prevent="delTemplate(row.id, $index)" type="danger">
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

        <!-- 添加通知模板 -->
        <el-dialog v-model="templateAddDialogVisible" title="添加通知模板" width="30%">
            <el-form ref="templateAddFormRef" :model="templateAddForm" :rules="rules" label-width="80px">
                <el-form-item label="通知类型" prop="notice_type">
                    <el-input v-model="templateAddForm.notice_type" autocomplete="off" placeholder="请输入通知类型"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="context">
                    <el-input v-model="templateAddForm.context" autocomplete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="addTemplate">确定</el-button>
                    <el-button @click="resetTemplateAddForm">重置</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 修改通知模板 -->
        <el-dialog v-model="templateUpdateDialogVisible" title="修改通知模板" width="30%">
            <el-form ref="templateUpdateFormRef" :model="templateUpdateForm" :rules="rules" label-width="80px">
                <el-form-item label="通知类型" prop="notice_type">
                    <el-input v-model="templateUpdateForm.notice_type" autocomplete="off"
                        placeholder="请输入通知类型"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="context">
                    <el-input v-model="templateUpdateForm.context" autocomplete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>

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
import { ref, onMounted, reactive } from 'vue';
import { type FormInstance, type FormRules, ElMessageBox, ElMessage } from 'element-plus';
// 从api文件夹导入接口 (假设您已经定义了这些接口)
import {
    addNoticeTemplate_API,
    getNoticeTemplateList_API,
    updateNoticeTemplate_API,
    deleteNoticeTemplate_API
} from '@/api/notice';

const loading = ref(false);
const templateList = ref([]);
const templateAddDialogVisible = ref(false);
const templateUpdateDialogVisible = ref(false);

const templateAddForm = ref({
    notice_type: '',
    context: '',
});

const templateUpdateForm = ref({
    id: 0,
    notice_type: '',
    context: '',
});

const templateAddFormRef = ref<FormInstance>();
const templateUpdateFormRef = ref<FormInstance>();

const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);

onMounted(async () => {
    await getTemplateList();
});

const getTemplateList = async () => {
    loading.value = true;
    try {
        const response = await getNoticeTemplateList_API(currentPage.value, pageSize.value);
        templateList.value = response.data.data.content;
        total.value = response.data.data.totalElements;
    } catch (error) {
        console.error('获取通知模板列表失败:', error);
        ElMessage.error('获取通知模板列表失败，请稍后再试。');
    } finally {
        loading.value = false;
    }
};

const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    getTemplateList();
};

const handleSizeChange = (size: number) => {
    pageSize.value = size;
    getTemplateList();
};

const rules = reactive<FormRules>({
    notice_type: [
        { required: true, message: '请输入通知类型', trigger: 'blur' },
    ],
    context: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
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
                await addNoticeTemplate_API(templateAddForm.value);
                templateAddDialogVisible.value = false;
                await getTemplateList();
                resetTemplateAddForm();
                ElMessage.success('添加通知模板成功！');
            }
        } catch (error) {
            console.error('添加通知模板失败:', error);
            ElMessage.error('添加通知模板失败，请稍后再试。');
        }
    }
};

const openUpdateTemplate = (row: any, index: number) => {
    templateUpdateDialogVisible.value = true;
    // 使用 Object.assign 或者展开运算符来避免直接修改原数据
    templateUpdateForm.value = { ...row };
};

const updateTemplate = async () => {
    if (templateUpdateFormRef.value) {
        try {
            const isValid = await templateUpdateFormRef.value.validate();
            if (isValid) {
                await updateNoticeTemplate_API(templateUpdateForm.value);
                templateUpdateDialogVisible.value = false;
                await getTemplateList();
                resetTemplateUpdateForm();
                ElMessage.success('修改通知模板成功！');
            }
        } catch (error) {
            console.error('修改通知模板失败:', error);
            ElMessage.error('修改通知模板失败，请稍后再试。');
        }
    }
};

const delTemplate = async (id: number, index: number) => {
    try {
        await ElMessageBox.confirm(
            '您确定要删除该通知模板吗？',
            '确认删除',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        );
        await deleteNoticeTemplate_API(id);
        templateList.value.splice(index, 1);
        await getTemplateList();
        ElMessage.success('删除通知模板成功！');
    } catch (error) {
        if (error !== 'cancel') {
            console.error('删除通知模板失败:', error);
            ElMessage.error('删除通知模板失败，请稍后再试。');
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
</style>