import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserTokenStore = defineStore("userTokenStore", () => {
    const userToken = ref("")

    const setUserToken = (newUserToken: string) => {
        userToken.value = newUserToken
    }
    const getUserToken = () => {
        return userToken.value
    }

    const removeToken = () => {
        userToken.value = ""
    }

    return { getUserToken, setUserToken, removeToken }
})