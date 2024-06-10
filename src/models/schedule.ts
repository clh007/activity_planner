export interface Schedule {
    id?: number;
    activity_id?: number;
    name: string;
    context?: string;
    start_time: string;
    end_time: string;
}