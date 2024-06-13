import type { Notice, noticeTemplateAddForm, noticeTemplateForm } from "@/models/notice";
import request from "@/utils/request"


export const getNoticeList_API = () => {
    return request.post('/notice/list')
}



//最新通知
export const getNewNotice_API = () => {
    return request.post('/notice/new')
}



//通知已读
export const readNotice_API = (id: number) => {
    return request.get(`/notice/readnotice?noticeid=${id}`)
}


// 模板列表接口
export const getNoticeTemplateList_API = (page: number, size: number) => {
    return request.post('/notice/temlatelist', {
        page: page,
        size: size
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
};

// 添加通知模板接口
export const addNoticeTemplate_API = (data: noticeTemplateAddForm) => {
    return request.post('/notice/templateadd', JSON.stringify(data), {
        headers: { 'Content-Type': 'Application/json' }
    })
}


// 修改通知模板接口
export const updateNoticeTemplate_API = (data: noticeTemplateForm) => {
    return request.post('/notice/tamplateupdate', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
};

// 删除通知模板接口
export const deleteNoticeTemplate_API = (template_id: number) => { return request.post('/notice/templatedelete/' + template_id); };


// 请求所有通知模板
export const fetchAllNoticeTemplates_API = () => {
    return request.get('/notice/templates');
};

// 请求所有通知模板
export const addNotice_API = (data: Notice) => {
    return request.post('/notice/createnotice', JSON.stringify(data),
        {
            headers: { 'Content-Type': 'application/json' }
        });
};
