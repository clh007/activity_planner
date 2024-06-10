<template>
  <div class="user_management">
    <h1 class="page-title">用户管理</h1>

    <el-button type="primary" @click="showUserAddDialog" style="margin: 15px 0;">+新增</el-button>
    <!-- 列表显示用户 -->
    <el-table :data="userlist" border style="width: 100%" max-height="750">
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="gender" label="性别">
      </el-table-column>
      <el-table-column prop="phone" label="手机">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="activityCount" label="活动数量">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="update_time" label="修改时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template v-slot:default="{ row, $index }">
          <div class="handler flex-center">
            <el-button type="warning" @click.native.prevent.stop="openUpdateUser($index, userlist)">
              修改
            </el-button>
            <el-button @click.native.prevent="delUser($index, userlist)" type="danger">
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

    <!-- 添加用户 -->
    <el-dialog v-model="userAddDialogVisible" title="添加用户" width="30%">
      <el-form ref="userAddFormRef" :model="userAddForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userAddForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userAddForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="userpwdagain">
          <el-input type="password" v-model="userAddForm.userpwdagain" autocomplete="off"
            placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userAddForm.phone" autocomplete="off" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userAddForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="userAddForm.gender" class="ml-4">
            <el-radio label=0>男</el-radio>
            <el-radio label=1>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="管理员" prop="is_admin">
          <el-radio-group v-model="userAddForm.is_admin" class="ml-4">
            <el-radio label=0>是</el-radio>
            <el-radio label=1>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addUser()">确定</el-button>
          <el-button @click="resetUserAddForm()">重置</el-button>
        </span>
      </template>
    </el-dialog>

  <!-- 修改密码对话框 -->
  <el-dialog v-model="userUpdateDialogVisible" title="修改密码" width="30%">
    <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-width="100px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="passwordForm.new_password" autocomplete="off" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="passwordForm.confirmPassword" autocomplete="off" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="userUpdateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updatePassword">确定</el-button>
      </span>
    </template>
  </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { addUser_API, getUserList_API, updatePassword_API, deleteUser_API } from '@/api/user'; // 从api文件夹导入接口
import { reactive, ref, onMounted } from 'vue';
import { FormInstance, FormRules } from 'element-plus';

const userAddDialogVisible = ref(false);
const userAddForm = ref({
  username: '',
  password: '',
  userpwdagain: '',
  phone: '',
  email: '',
  gender: 0,
  is_admin: 0,
});


// 当组件挂载后执行一次getUserList函数
onMounted(async () => {
  await getUserList();
});

// 定义 userlist 为响应式数组
const userlist = ref([]);

const userAddFormRef = ref<FormInstance>();

const total = ref(0); // 总记录数
const pageSize = ref(10); // 每页显示多少条记录
const currentPage = ref(1); // 当前页码

// 获取用户列表
const getUserList = async () => {
  try {
    const response = await getUserList_API(currentPage.value, pageSize.value); // 调用获取用户列表的接口

    userlist.value = response.data.data.content; // 更新用户列表
    total.value = response.data.data.totalElements; // 更新总记录数

  } catch (error) {
    console.error(error);
  }
};

// 分页相关方法
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  getUserList();
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  getUserList();
};

const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value !== userAddForm.value.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, message: '密码应为8-16位,包含大小写字母、数字和特殊符号', trigger: 'blur' }
  ],
  userpwdagain: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  is_admin: [
    { required: true, message: '请选择是否是管理员', trigger: 'change' }
  ]
});

// 修改密码的表单验证规则
const passwordRules = {
  new_password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value !== passwordForm.new_password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ],
};

const resetUserAddForm = () => {
  if (userAddFormRef.value) {
    userAddFormRef.value.resetFields();
  }
};

const resetPasswordForm = () => {
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields();
  }
};

const showUserAddDialog = () => {
  userAddDialogVisible.value = true;
};

const addUser = async () => {
  if (userAddFormRef.value) {
    try {
      const isValid = await userAddFormRef.value.validate();
      if (isValid) {
        console.log(userAddForm.value)
        const response = await addUser_API(userAddForm.value); // 调用添加用户接口
        userAddDialogVisible.value = false
        getUserList()
        resetUserAddForm()
        //接收返回信息
        console.log(response)
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// 更新用户对话框的可见性和表单
const userUpdateDialogVisible = ref(false);

// 修改密码表单的引用
const passwordFormRef = ref();

// 修改密码表单的数据
const passwordForm = reactive({
  userid: 0,
  new_password: '',
  confirmPassword: '',
});

// 打开更新用户对话框，并预填充表单
const openUpdateUser = (index: number, userlist: Array<any>) => {

  userUpdateDialogVisible.value = true;
  passwordForm.userid = userlist[index].id;
};


// 更新密码的方法
const updatePassword = async () => {
  if (passwordFormRef.value) {
    try {
      const isValid = await passwordFormRef.value.validate();
      if (isValid) {


        // 调用修改密码的 API，传入新密码
        const response = await updatePassword_API(passwordForm);
        userUpdateDialogVisible.value = false;
        // 清空表单
        resetPasswordForm();
        // 根据返回信息处理结果，例如显示成功信息或处理错误
        console.log(response);
        
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// 删除用户
const delUser = async (index: number, userlist: Array<any>) => {
  const user = userlist[index];
  try {
    // 调用删除用户的 API，传入用户的唯一标识，例如用户ID
    console.log(user.id)
    await deleteUser_API(user.id);
    // 删除成功后，更新用户列表
    userlist.splice(index, 1);
    getUserList();
  } catch (error) {
    console.error(error);
    // 处理删除失败的情况，例如显示错误消息
  }
};

</script>

<style scoped>
.user-management {
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