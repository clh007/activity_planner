import { useUserStore } from "@/store/user";
import { useWebInfoStore } from "@/store/webInfo";
import axios from "axios";
import { ElMessage } from "element-plus";

const instance = axios.create({
    // baseURL: "http://localhost:8080/api",
    baseURL: "https://93f02i3484.goho.co/api",
    // baseURL: import.meta.env.VITE_BASE_URL + '/api',
    // timeout: 5000,
})
/**
 * 使用axios拦截器来拦截HTTP请求。
 * 在每个请求发送前，此函数将检查并添加用户令牌到请求头中。
 * 这确保了所有请求都带有认证信息，除非令牌获取失败或配置过程中出现错误。
 * 
 * @param {object} config - Axios请求配置对象。在这个函数中，我们修改了它的headers属性来包含用户令牌。
 * @returns {object|Promise} - 返回修改后的请求配置对象或一个拒绝的Promise，如果出现错误。
 */
instance.interceptors.request.use(
    config => {
        // 尝试从用户令牌存储中获取当前用户的令牌。
        const token = localStorage.getItem('userToken')
        // 如果令牌获取成功，将其添加到请求头中。
        config.headers.set('userToken', `${token}`)
        // 返回修改后的请求配置对象。
        // 打印请求配置到控制台，用于调试目的。
        console.log("请求配置", config)
        return config
    },
    err => {
        // 如果在请求配置过程中发生错误，返回一个拒绝的Promise。
        console.log("请求错误", err)
        return Promise.reject(err)
    })

// 响应拦截器
instance.interceptors.response.use(
    res => {
        console.log("响应结果", res)
        if (!(res.config.url?.match('^/auth/'))) {
            let currentUser = localStorage.getItem('currentUser')
            if (currentUser !== null) {
                useUserStore().setUser(JSON.parse(currentUser))
                useWebInfoStore().login()
            }
        }
        return res
    },
    err => {
        console.log("响应错误", err)
        if (err.response.status === 401) {
            ElMessage.error("请登录")
            useWebInfoStore().logout()
            useUserStore().clearUser()
            localStorage.removeItem("userToken")
            localStorage.removeItem("currentUser")
        }
        else {
            ElMessage.error("服务器错误")
        }
        return Promise.reject(err)
    })

export default instance
