<template>
    <div>
        <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
            <li v-for="item in count" :key="item" class="infinite-list-item">
                <div class="creator" v-if="item">

                </div>
                <div class="avatar">
                    <el-avatar src="https://www.bilibili.com/favicon.ico?v=1" />
                </div>
                <div class="user-name">
                    <span>llll</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const acd_id = defineModel('act_id')

const count = ref(0)
const load = () => {
    count.value += 2
}
const joinerList = ref<{
    id: number,
    name: string,
    avatar: string,
    identity: string,
    quanxain: string
}[]>([])

</script>

<style scoped>
.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>