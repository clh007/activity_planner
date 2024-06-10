import type { expense, submitExpense_form } from "@/models/charges"
import request from "@/utils/request"
import qs from "qs"

export const submitExpense_API = (form: submitExpense_form) => {
    return request.post('/expense/submit', qs.stringify(form))
}

//  0 当前用户收到的 1 当前用户发出的
export const fetchAllExpense_API = (type: number) => {
    return request.get(`/expense/list?type=${type}`)
}

export const updateExpenseState_API = (state: number, id: number) => {
    return request.put('/expense/state', qs.stringify({ 'state': state, 'id': id }))
}