import type { LoginForm, RegisterForm, AddUserForm } from "@/models/auth"
import request from "@/utils/request"
import qs from "qs"

export const login_API = (data: LoginForm) => {
  return request.post('/user/login', qs.stringify(data))
}

export const register_API = (data: RegisterForm) => {
  return request.post('/user/register', JSON.stringify(data), {
    headers: { 'Content-Type': 'Application/json' }
  })
}

// 添加用户接口
export const addUser_API = (data: AddUserForm) => {
  return request.post('/user/add', JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};

// 用户列表接口
export const getUserList_API = (page: number, size: number) => {
  return request.post('/user/list', {
    page: page,
    size: size
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};
