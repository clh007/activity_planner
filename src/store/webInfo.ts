import { defineStore } from "pinia";
import { ref } from "vue";

export const useWebInfoStore = defineStore("webInfoStore", () => {

    const topbar = ref({
        topbar_entry: false,
        topbar_hoveEntry: false,
        topbar_visible: true,
    });
    const is_login = ref(false);

    const login = () => {
        is_login.value = true;
    }
    const logout = () => {
        is_login.value = false;
    }
    const setTopbar = (newTopbar: {
        topbar_entry: boolean;
        topbar_visible: boolean;
    }) => {
        topbar.value.topbar_entry = newTopbar.topbar_entry
        topbar.value.topbar_visible = newTopbar.topbar_visible
    }
    return { topbar, is_login, login, logout, setTopbar }
})