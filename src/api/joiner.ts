import request from "@/utils/request"
import qs from "qs"


export const joinerList_API = (id: number) => {
    return request.get('/joiner?' + `activity_id=${id}`)
}

export const updateIdentify_API = (data: {
    id: number,
    identity: string,
}) => {
    return request.post('/joiner', qs.stringify(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}