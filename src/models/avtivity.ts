export interface Activity {
    id: number,
    name: string,
    creator?: string,
    creator_id?: number,
    info: string,
    picture?: string
    start_time?: string,
    end_time?: string,
    location?: string,
    state?: string,
    joiner_number?: number,
    is_join?: boolean,
    max_num?: number,
}

export interface Activity_template extends Activity {
    id: number,
    tem_name: string,
}