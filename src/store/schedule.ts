import type { Schedule } from "@/models/schedule";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useScheduleStore = defineStore("scheduleStore", () => {
    const scheduleList = ref<Schedule[]>([])

    function stringToDate(strTime: string): Date {
        // 分割日期和时间
        const [datePart, timePart] = strTime.split(' ');
        // 分别处理日期部分
        const [year, month, day] = datePart.split('-');
        // 处理时间部分
        const [hour, minute, second] = timePart.split(':');

        // 注意JavaScript的Date月份是从0开始的，所以需要减1
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
    }

    /**
     * 添加日程，确保无时间冲突
     * 
     * @param schedule 要添加的日程对象
     * @returns 添加成功与否的布尔值
     */
    const addSchedule = (schedule: Schedule) => {
        // 检查是否有时间冲突
        const isConflict = scheduleList.value.some(existingSchedule => {
            let old_s = stringToDate(existingSchedule.start_time)
                , old_e = stringToDate(existingSchedule.end_time)
                , new_s = stringToDate(schedule.start_time)
                , new_e = stringToDate(schedule.end_time);
            return (new_s < old_e && new_e > old_s) ||
                (new_e > old_s && new_s < old_e);
        });
        if (!isConflict) {
            // 如果没有冲突，则添加日程
            scheduleList.value.push(schedule);
            console.log(scheduleList.value);
            return true
        } else {
            return false
        }
    };
    const addScheduleList = (schedule: Schedule[]) => {

    }
    const deleteSchedule = (index: number) => {
        scheduleList.value.splice(index, 1)
    }
    return { scheduleList, addSchedule, deleteSchedule }
})