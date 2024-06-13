import type { Notice } from "@/models/notice";
import request from "@/utils/request"


export const getNoticeList_API = () => {
    return request.post('/notice/list')
}



//最新通知
export const getNewNotice_API = () => {
    return request.post('/notice/new')
}



//最新通知
export const readNotice_API = (id:number) => {
    return request.get(`/notice/readnotice?noticeid=${id}`)
}
