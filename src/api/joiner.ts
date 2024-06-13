import request from "@/utils/request"
import qs from "qs"


export const joinerList_API = (id: number) => {
    return request.get('/activity/findmyjoiner?' + `activity_id=${id}`)
}

export const updateIdentify_API = (data: {
    id: number,
    identity: string,
}) => {
    return request.put('/activity/updateJoiner', qs.stringify(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
}