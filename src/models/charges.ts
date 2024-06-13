export interface submitExpense_form {
    activity_id: number,
    amount: number,
    reason: string,
}

export interface expense {
    id: number,
    username: string,
    activity_name: string,
    amount: number,
    reason: string
    state: number
}

