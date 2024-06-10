import type { addResourceFrom } from "@/models/resource"
import request from "@/utils/request"

// 添加资源接口
export const addResource_API = (data: addResourceFrom) => {
    return request.post('/resource/add', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
};

// 资源列表接口
export const getResourceList_API = (page: number, size: number) => {
    return request.post('/resource/list', {
        page: page,
        size: size
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
};

//资源查询接口
export const getResourceListByKeyword_API = (type: string, keyword: string, page: number, size: number) => {
    return request.post('/resource/search', {
        type: type,
        keyword: keyword,
        page: page,
        size: size
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
};

// 获取资源类型
export const getResourceType_API = () => {
    return request.get('/resource/type');
};

/**
 * 根据资源类型获取资源列表的API函数。
 * 
 * 该函数通过发送HTTP GET请求到指定的URL，来获取特定类型资源的列表。
 * 它使用了请求库的get方法，该方法返回一个Promise，解析为服务器响应的数据。
 * 
 * @param type 资源的类型，用于过滤资源列表。
 * @returns 返回一个Promise，解析为从服务器获取的资源列表数据。
 */
export const getResourceListByType_API = (type: string) => {
    // 使用请求库发起GET请求，获取指定类型的资源列表
    return request.get(`/resource/list?type=${type}`);
}

interface expense {
    activity_id: number,
    resource_id: number,
    number: number,
    start_time: string,
    end_time: string,
}

export const submitResourceApply_API = (data: expense) => {
    return request.post('/resource/submitApply',)
}


export const getResourceApplyList = () => {
    return request.get('/resource/getApply')
}