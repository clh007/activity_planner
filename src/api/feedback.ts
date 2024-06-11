import request from "@/utils/request"
import qs from "qs"

export const getFeedBack_API = (act_id: number) => {
    return request.get('/feedback/list' + `?act_id=${act_id}`);
}

export const submitFeedBack_API = (data: {
    act_id: number,
    content: string,
}) => {
    return request.post('/feedback/add', qs.stringify(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}