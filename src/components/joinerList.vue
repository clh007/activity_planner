<template>
    <div>
        <ul class="infinite-list" style="overflow: auto">
            <div class="creator">创建者</div>
            <li v-for="item in creatorList" :key="item.id" class="infinite-list-item">
                <div class="avatar">
                    <el-avatar :src="item.avatar" />
                </div>
                <div class="user-name">
                    <span>{{ item.username }}</span>
                </div>
                <span @click="openDia(item.id, item.identity)" class="identify">{{ item.identity }}</span>
            </li>
            <div class="joiner-list">参与者列表</div>
            <li v-for="item in joinerList.filter(item => {
                return item.quanxian === '参与者'
            })" :key="item.id" class="infinite-list-item">
                <div class="avatar">
                    <el-avatar :src="item.avatar" />
                </div>
                <div class="user-name">
                    <span>{{ item.username }}</span>
                </div>
                <span @click="openDia(item.id, item.identity)" class="identify">{{ item.identity }}</span>
            </li>
        </ul>
        <el-dialog title="输入身份" v-model="dialogVisible">
            <el-input v-model="id_form.identity" placeholder="输入身份"></el-input>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitIden()">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { joinerList_API, updateIdentify_API } from '@/api/joiner';
import { computed, onMounted, ref, watch } from 'vue';

const acd_id = defineModel('act_id', { default: 0 })
const isCreator = defineModel('isCreator', { default: false })
const joiner_drawer = defineModel('joiner_drawer', { default: false })

const count = ref(0)

watch(joiner_drawer, (new_, old_) => {
    if (new_ === true) {
        getAlljoiner()
    }
})

const getAlljoiner = () => {
    joinerList_API(acd_id.value)
        .then(res => {
            if (res.data.code === 200) {
                joinerList.value = res.data.data
                count.value = res.data.data.length
            }
        })
        .catch(err => {
            for (let i = 0; i < 25; i++)
                joinerList.value.push({
                    id: 0,
                    username: '加载失败',
                    avatar: 'https://www.bilibili.com/favicon.ico?v=1',
                    identity: i % 3 === 0 ? '演讲者' : '后勤',
                    quanxian: i === 0 ? '创建者' : '参与者'
                })
        })
}
onMounted(() => {
    getAlljoiner()
})
const joinerList = ref<{
    id: number,
    username: string,
    avatar: string,
    identity: string,
    quanxian: string
}[]>([])

const creatorList = computed(() => {
    return joinerList.value.filter(item => {
        if (item.quanxian === '创建者') {
            return item
        }
    })
})

const dialogVisible = ref(false)
const id_form = ref({
    id: 0,
    identity: ''
})

const openDia = (id: number, role: string) => {
    if (isCreator.value) {
        dialogVisible.value = true
        id_form.value.id = id
        id_form.value.identity = role
    }

}
const submitIden = () => {
    updateIdentify_API(id_form.value)
        .then(res => {
            if (res.data.code === 200) {
                getAlljoiner()
            }
        })
        .catch(err => {
            joinerList.value[id_form.value.id].identity = id_form.value.identity
        })
    dialogVisible.value = false
}
</script>

<style scoped>
.infinite-list {
    height: 90vh;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* height: 50px; */
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item .avatar {
    margin: 0 10px;
}

.infinite-list .infinite-list-item .user-name {
    flex: 1;
}

.infinite-list .infinite-list-item .identify {
    cursor: pointer;
}
</style>