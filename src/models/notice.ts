export interface Notice {
    id: number,
    activity_id: number,
    notice_type_id: number,
    context: string,
    send_time: string,
    state: string,
}

export interface noticeTemplateAddForm {
    notice_type: string;
    context: string;
}

export interface noticeTemplateForm {
    id: number;
    notice_type: string;
    context: string;
}