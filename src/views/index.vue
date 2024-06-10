<template>
    <div class="web-layout">
        <div class="web-bar">
            <Header></Header>
        </div>
        <RouterView />
    </div>
    <el-backtop>
    </el-backtop>
</template>
<script setup lang="ts">
import Header from "@/components/topbar.vue";
</script>
<style scoped>
.web-layout {
    width: 100%;
    overflow: hidden;
}

.web-bar {
    position: fixed;
    width: 100vw;
    height: 60px;
    z-index: 999;
    transition: all .3s ease-in-out;
}
</style>