<template>
    <h3 @click="getWelcome">
        {{ content }}
        <span>|</span>
    </h3>
</template>

<style scoped>
span {
    margin-left: 2px;
    animation: hideToShow .7s infinite;
}

@keyframes hideToShow {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>

<script setup>
import { onMounted, ref, watch } from 'vue'
const props = defineProps({
    printInfo: {
        type: String,
        default: 'Hello World'
    },
    //速度
    duration: {
        type: Number,
        default: 100
    },
    //延迟
    delay: {
        type: Number,
        default: 3000
    },
    once: {
        type: Boolean,
        default: false
    }
})
const printInfo = ref(props.printInfo)
const working = ref(true)
const cursor = ref(0)
const timer = ref(null)
const timeout = ref(null)
const content = ref("")
const getWelcome = () => {
    load_welcome("再催我，项目和我总得跑一个！")
}
const load_welcome = (data) => {
    content.value = ""
    cursor.value = 0
    clearInterval(timer.value)
    clearTimeout(timeout.value)
    printInfo.value = data
    start(work)
}
onMounted(() => {
    if (working.value) {
        start(work)
    }
    else
        content.value = ref(printInfo)
})
watch([working, printInfo], () => {
    toBegin
})
watch(cursor, (newCursor) => {
    content.value = printInfo.value.slice(0, newCursor)
})
const start = (work) => {
    timeout.value = setTimeout(() => {
        timer.value = setInterval(() => {
            work()
            if (cursor.value === 0 ||
                (cursor.value === printInfo.value.length && !props.once)) {
                clearInterval(timer.value)
                start(work)
            }
            else if (cursor.value === printInfo.value.length && props.once) {
                clearInterval(timer.value)
            }
        }, props.duration)
    }, props.delay)
}
const work = () => {
    let cursor1 = cursor.value
    cursor1 += print.value ? 1 : -1
    if (print.value) {
        if (cursor1 === printInfo.value.length + 1) {
            cursor1 -= 2
            print.value = !print.value
        }
    } else {
        if (cursor1 === -1) {
            cursor1 += 2
            print.value = !print.value
        }
    }
    cursor.value = cursor1
}

const toBegin = () => {
    cursor.value = 0
    if (timeout.value !== null) {
        clearTimeout(timeout.value)
        if (timer.value !== null)
            clearInterval(timer.value)
    }
    if (working.value) {
        start(work)
    } else {
        content.value = printInfo.value
    }
}
</script>
