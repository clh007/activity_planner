import request from "@/utils/request"
import qs from "qs"

export const getFeedBack_API = (act_id: number) => {
    return request.get('/feedback/findallfeedbackbyid' + `?activityid=${act_id}`);
}

export const submitFeedBack_API = (data: {
    activity_id: number,
    context: string,
}) => {
    return request.post('/feedback/createfeedback', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    })
}