import type { LoginForm, RegisterForm } from "@/models/auth"
import request from "@/utils/request"
import qs from "qs"

/**
 * 登录接口
 * 
 * 本函数封装了登录的API调用，通过发送POST请求到'/user/login' endpoint来实现用户登录。
 * 请求体中包含经过字符串化的登录表单数据。
 * 
 * @param data 登录表单数据，包含用户名和密码等登录所需信息。
 * @returns 返回一个Promise，解析后的结果是服务器返回的响应数据。
 */
export const login_API = (data: LoginForm) => {
    return request.post('/auth/login', qs.stringify(data))
}

/**
 * 注册新用户的API调用。
 * 
 * 该函数通过发送一个POST请求到/user/register端点来注册新用户。
 * 请求体包含用户注册信息的JSON字符串。
 * 使用JSON作为内容类型是因为服务器期望接收JSON格式的数据。
 * 
 * @param data 注册表单数据，包含新用户的注册信息。
 * @returns 返回一个Promise，该Promise解析为请求的响应。
 */
export const register_API = (data: RegisterForm) => {
    return request.post('/auth/register', JSON.stringify(data), {
        headers: { 'Content-Type': 'Application/json' }
    })
}

/**
 * 获取验证码的API调用。
 * 
 * 此函数支持通过邮箱或电话号码请求验证码，用于账户验证或安全操作。
 * 根据传入的标识类型（邮箱或电话号码），向相应的接口发起请求。
 * 
 * @param identifier 用户的邮箱地址或电话号码，用于接收验证码。
 * @param type 标识符类型，可选值为'email'或'phone'，指定验证码发送的目标。
 * @returns 返回一个Promise，该Promise解析为请求的响应，包含验证码发送的结果。
 */
export const getVerificationCode_API = (identifier: string, type: 'email' | 'phone') => {
    // 将type添加到查询字符串中
    const query = `identifier=${identifier}&type=${type}`;
    // 更新请求的URL以包含查询字符串
    const endpoint = `/auth/verification/code?${query}`;
    return request.get(endpoint, {
        headers: { 'Content-Type': 'application/json' }
    });
}


/**
 * 根据账户查找密码重置API
 * 
 * 本函数通过验证账户并向账户手机号或者邮箱发送用户原来的密码
 * 
 * @param account 用户账户名，可以是邮箱、手机
 * @returns 返回一个Promise，解析后的结果是请求的响应数据。
 */
export const findPD_API = (account: string) => {
    // 构造请求URL，查询指定账户的密码重置接口
    return request.get('/auth/find/password?account=' + account);
}