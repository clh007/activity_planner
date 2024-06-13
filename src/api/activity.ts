import type { Activity } from "@/models/avtivity";
import type { Schedule } from "@/models/schedule";
import request from "@/utils/request"
import qs from "qs"

// 获取活动模板数据API
export const fetchActivityTemplates_API = (params?: any) => {
    // 如果需要在请求中附带额外的查询参数，可以在这里添加
    const queryParams = params ? `?${qs.stringify(params)}` : '';

    return request.get(`/activity/templates${queryParams}`)
};


// 用户页请求活动
export const fetchUserActivity_API = (user_id: number, type: 'par' | 'pub', search_key: string | null) => {
    const queryParams = search_key !== null ? `?id=${user_id}&type=${type}&search_key=${search_key}` : `?id=${user_id}&type=${type}`;
    return request.get(`/activity/userDetail` + queryParams);
};


// 更新当前用户创建的活动
export const updateActivity_API = (activity: Activity) => {
    return request.put('/activity/update', JSON.stringify(activity), {
        headers: { 'Content-Type': 'application/json' }
    })
}


// 删除活动接口
export const deleteActivity_API = (activityid: number) => { return request.post('/activity/delete/' + activityid); };

export const getActivity_API = (id: number) => {
    return request.get(`/activity/findactivitybyid?activityid=${id}`)
}

//后台添加活动
export const addActivity_API = (activity: Activity) => {
    return request.post('/activity/add', JSON.stringify(activity))
}

//列出所有活动
export const getActivityList_API = (activity: Activity) => {
    return request.post('/activity/list', JSON.stringify(activity))
}

export const getActivityListPage_API = (curPage: number, pageSize: number) => {
    return request.post('/activity/list')
}

//关键字查询活动
export const getActivityListByKeyword_API = (type: string, keyword: string, page: number, size: number) => {
    return request.post('/activity/search', {
        type: type,
        keyword: keyword,
        page: page,
        size: size
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
}


// 获取活动日程列表
export const getScheduleList_API = (id: number) => {
    return request.get(`/activity/findschdulebyid?activityid=${id}`)
}

// 添加活动日程
export const addSchedule_API = (schedule: Schedule) => {
    return request.post('/activity/schcreating', JSON.stringify(schedule), {
        headers: { 'Content-Type': 'application/json' }
    })
}

// 参加活动
export const takePartActive_API = (id: number) => {
    return request.post(`/activity/join`, JSON.stringify({
        activity_id: id
    }), {
        headers: { 'Content-Type': 'application/json' }
    })
}

export const createActivity_API = (act: Activity) => {
    return request.post(`/activity/creating`, JSON.stringify(act), {
        headers: { 'Content-Type': 'application/json' }
    })
}

// 创建日程提醒
export const createSchRemind_API = (sch: {
    user_id: number,
    method: string,
    time: string,
}) => {
    return request.post(`/schuleremind/create`, JSON.stringify(sch), {
        headers: { 'Content-Type': 'application/json' }
    })
}
