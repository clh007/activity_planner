import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyWebSocketTokenStore = defineStore("myWebSocketStore", () => {
    let client: WebSocket
    const initWebSocket = (url: string) => {
        console.info(url)
        try {
            client = new WebSocket(url)
        }
        catch (e) {
            // ElMessage.error("服务器连接失败")
        }
        client.onopen = (e) => {
            // console.log("WebSocket open")
            ElMessage.success("进入聊天室")
        }
        client.onclose = (e) => {
            // console.log("WebSocket close", e)
            ElMessage.success("退出聊天室")
        }
        client.onerror = (e) => {
            // console.error("WebSocket error", e)
            ElMessage.error("服务器连接失败")
        }
        return client
    }

    const closeWebSocket = (client: WebSocket | null) => {
        if (client !== null)
            client.close()
    }
    const sendMsg = (msg: string) => {
        client.send(msg)
    }

    return { initWebSocket, closeWebSocket, sendMsg }
})