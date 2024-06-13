<template>
    <div class="main-display">
        <h3 class="display-title">
            搜索列表
        </h3>
        <ul class="display-container">
            <li v-for="item in search_activities" class="card">
                <div class="card-img" @click="router.push({ name: 'activity', params: { id: item.id } })">
                    <el-image :src="item.picture" fit="cover" class="card-img-content"></el-image>
                </div>
                <div class="card-info">
                    <h3 class="activity-title" @click="router.push({ name: 'activity', params: { id: item.id } })">
                        {{ item.name }}
                    </h3>
                    <p class="activity-content">
                        {{ item.info }}
                    </p>
                </div>
            </li>
        </ul>
        <div class="nextPage" @click="getActivityByKey()" v-if="nextPage">
            <span v-if="!isloading">
                下一页
            </span>
            <span v-else>
                加载中
            </span>
        </div>
        <div class="no-more" v-else>
            ~~到底了~~
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { Activity } from '@/models/avtivity';
import { getActivityListByKeyword_API } from '@/api/activity';
import { ElMessage } from 'element-plus';
const router = useRouter()
const search_activities = ref<Activity[]>([])
const isloading = ref(false)
const nextPage = ref(true)
const curPage = ref(0)
const pageSize = ref(9)

const getActivityByKey = () => {
    const search_key = ref(router.currentRoute.value.params.key as string)
    if (isloading.value === true) {
        ElMessage.warning('加载中')
        return
    }
    curPage.value += 1
    isloading.value = true
    getActivityListByKeyword_API('name', search_key.value, curPage.value, pageSize.value)
        .then((res) => {
            if (res.data.code === 200)
                if (res.data.data.totalElements === 0) {
                    nextPage.value === false
                } else {
                    search_activities.value.push(...res.data.data.content)
                }
            else {

            }
            isloading.value = false

        })
        .catch((err) => {
            if (curPage.value < 3) {
                for (let i = (curPage.value - 1) * pageSize.value; i < curPage.value * pageSize.value; i++) {
                    search_activities.value.push({
                        id: i,
                        name: 'planner' + search_key.value,
                        picture: 'https://images.pexels.com/photos/23540856/pexels-photo-23540856.jpeg',
                        info: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit',
                    })
                }
            }
            else {
                nextPage.value = false
            }
            isloading.value = false
        })
}


onMounted(() => {
    getActivityByKey()
})

watch(() => router.currentRoute.value.params.key, () => {
    curPage.value = 0
    search_activities.value = []
    nextPage.value = true
    isloading.value = false
    getActivityByKey()
})
</script>

<style scoped>
/* #region main*/
.main-display {
    padding: 60px 15vw 0;
}

.display-title {
    margin: 20px auto 10px;
}

.display-container {
    width: calc(100vw - 30vw);
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 33.333%;
    box-sizing: border-box;
    padding: 10px 5px;
}

.card-img {
    width: 100%;
}

.card-img,
.activity-title {
    cursor: pointer;
}

.activity-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.nextPage,
.no-more {
    text-align: center;
}

.nextPage {
    cursor: pointer;
}

.nextPage:hover {
    color: #409eff;
}

/* #endregion*/
</style>