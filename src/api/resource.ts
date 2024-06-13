import type { addResourceFrom } from "@/models/resource"
import request from "@/utils/request"
import qs from "qs"
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

export const getResourceListAll_API = () => {
    return request.get('/resource/all');
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


interface resource_apply {
    activity_id: number,
    resource_id: number,
    num: number,
    start_time: string,
    end_time: string,
}

export const submitResourceApply_API = (data: resource_apply) => {
    return request.post('/resource/applyresource', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    })
}


export const getResourceApplyList = () => {
    return request.post('/resource/myresourceapply')
}



// 删除资源接口
export const deleteResource_API = (userid: number) => { return request.post('/resource/delete/' + userid); };