import request from '@/utils/request';
/**
 * 根据活动ID加载聊天室消息。
 * 
 * @param id 活动的唯一标识符。这个ID用于定位和筛选相关的聊天室消息。
 * @returns 返回一个Promise，解析为请求的响应数据，包含聊天室消息。
 */
export const loadMessages_API = (id: number) => {
    // 构造请求URL，通过活动ID查询聊天室消息
    return request.get('/chatroom/selectchatroom' + `?activityid=${id}`);
}
