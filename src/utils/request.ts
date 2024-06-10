import { useUserTokenStore } from "@/store/token";
import axios from "axios";
import { ElMessage } from "element-plus";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
})
/**
 * 使用axios拦截器来拦截HTTP请求。
 * 在每个请求发送前，此函数将检查并添加用户令牌到请求头中。
 * 这确保了所有请求都带有认证信息，除非令牌获取失败或配置过程中出现错误。
 * 
 * @param {object} config - Axios请求配置对象。在这个函数中，我们修改了它的headers属性来包含用户令牌。
 * @returns {object|Promise} - 返回修改后的请求配置对象或一个拒绝的Promise，如果出现错误。
 */
instance.interceptors.request.use(config => {
    // 打印请求配置到控制台，用于调试目的。
    console.log(config)
    // 尝试从用户令牌存储中获取当前用户的令牌。
    const token = useUserTokenStore().getUserToken()
    // 如果令牌获取成功，将其添加到请求头中。
    config.headers.set('userToken', `${token}`)
    // 返回修改后的请求配置对象。
    return config
}, err => {
    // 如果在请求配置过程中发生错误，返回一个拒绝的Promise。
    console.log(err)
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
    console.log(res)
    return res
}, err => {
    console.log(err)
    ElMessage.error("服务器错误")
    return Promise.reject(err)
})

export default instance
