import type { Activity } from "@/models/avtivity";
import request from "@/utils/request"
import qs from "qs"

// 获取活动模板数据API
export const fetchActivityTemplates_API = (params?: any) => {
    // 如果需要在请求中附带额外的查询参数，可以在这里添加
    const queryParams = params ? `?${qs.stringify(params)}` : '';

    return request.get(`/activity/templates${queryParams}`)
};

/**
 * 根据用户ID获取所有活动
 * 
 * 本函数通过调用请求模块的get方法，向服务器发送GET请求，以获取指定用户创建的所有活动信息。
 * 主要用于活动列表页面，展示特定用户创建的活动，为用户活动的查询提供接口。
 * 
 * @param creator_id 用户ID，作为查询参数，指定活动的创建者。
 * @returns 返回一个Promise，包含服务器响应的数据，通常是JSON格式。
 */
export const fetchAllActivitiesPub_API = () => {
    return request.get(`/activity/pubByUser`);
};
export const fetchAllActivitiesPar_API = () => {
    return request.get(`/activity/parByUser`);
};

export const fetchActivitiesByKeyPub_API = (key: string) => {
    const queryParams = `?search_key=${key}`
    return request.get('/activity/userSearchPub' + queryParams)
}
export const fetchActivitiesByKeyPar_API = (key: string) => {
    const queryParams = `?search_key=${key}`
    return request.get('/activity/userSearchPar' + queryParams)
}

export const updateActivity_API = (activity: Activity) => {
    return request.post('/activity/update', JSON.stringify(activity))
}

//删除活动
export const deleteActivity_API = (id: number) => {
    const queryParams = `?id=${id}`
    return request.delete('/activity/delete' + queryParams)
}

export const getActivity_API = (id: number) => {
    return request.get(`/activity/get?id=${id}`)
}

//后台添加活动
export const addActivity_API = (activity: Activity) => {
    return request.post('/activity/add', JSON.stringify(activity))
}

//列出所有活动
export const getActivityList_API = (activity: Activity) => {
    return request.post('/activity/list', JSON.stringify(activity))
}

//关键字查询活动
export const getActivityListByKeyword_API = (type: string, keyword: string, page: number, size: number) => {
    return request.post('/resource/search', {
        type: type,
        keyword: keyword,
        page: page,
        size: size
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
}
