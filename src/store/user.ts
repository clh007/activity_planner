import type { currentUser } from "@/models/user";
import { defineStore } from "pinia";
import { ref } from "vue";



export const useUserStore = defineStore("userStore", () => {
    const currentUser = ref<currentUser>({
        id: 0,
        username: "",
        email: "",
        phone: "",
        avatar: "",
        gender: "",
        create_time: "",
        update_time: ""
    })

    const setUser = (user: any) => {
        currentUser.value = user
    }
    const clearUser = () => {
        currentUser.value = {
            id: 0,
            username: "",
            email: "",
            phone: "",
            avatar: "",
            gender: "",
            create_time: "",
            update_time: ""
        }
    }
    return { currentUser, setUser, clearUser }
})
