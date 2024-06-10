import request from "@/utils/request"
import qs from "qs"

/**
 * 上传文件的API封装。
 * 
 * 该函数通过POST请求向服务器发送文件上传请求。使用了FormData来包装文件数据，
 * 并通过配置请求头指定了'Content-Type'为'multipart/form-data'，这是上传文件时的常用格式。
 * 
 * @param data FormData 对象，包含待上传的文件和其他可能的数据。
 * @returns 返回一个Promise，解析后的结果是服务器返回的数据。
 */
export const UploadFile_API = (data: FormData) => {
    // 发送文件上传请求
    return request.post('/file/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}