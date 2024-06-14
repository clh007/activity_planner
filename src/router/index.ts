import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";


const routes = [
    {
        path: "/",
        component: () => import("@/views/index.vue"),
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("@/views/home/home.vue")
            },
            {
                path: "/login",
                name: "login",
                component: () => import("@/views/user/login.vue")
            },
            {
                path: "/create",
                name: "create",
                component: () => import("@/views/activity/createActivity.vue")
            },
            {
                path: "/user",
                name: "user",
                redirect: "/user/participated",
                component: () => import("@/views/user/user.vue"),
                children: [
                    {
                        path: "/user/participated",
                        name: "participated",
                        component: () => import("@/views/user/participatedActivity.vue")
                    },
                    {
                        path: "/user/published",
                        name: "published",
                        component: () => import("@/views/user/publishedActivity.vue")
                    },
                    {
                        path: "/user/expense",
                        name: "expense",
                        component: () => import("@/views/user/expense.vue")
                    },
                    {
                        path: "/user/resource",
                        name: "resource",
                        component: () => import("@/views/user/resource.vue")
                    },
                    {
                        path: "/user/userinfo",
                        name: "userinfo",
                        component: () => import("@/views/user/userinfo.vue")
                    },
                    {
                        path: "/user/notice",
                        name: "notice",
                        component: () => import("@/views/user/notice.vue")
                    },
                ]
            },
            {
                path: "/activity/:id",
                name: "activity",
                component: () => import("@/views/activity/index.vue")
            },
            {
                path: "/search/:key",
                name: "search",
                component: () => import("@/views/home/search.vue")
            },
            {
                path: "/back",
                name: "back",
                component: () => import('@/views/back/index.vue'),
                children: [
                    {
                        path: "userlist",
                        name: "userlist",
                        component: () => import('@/views/back/userlist.vue'),
                    },
                    {
                        path: "resourcelist",
                        name: "resourcelist",
                        component: () => import('@/views/back/resourcelist.vue'),
                    },
                    {
                        path: "activitylist",
                        name: "activitylist",
                        component: () => import('@/views/back/activitylist.vue'),
                    },
                    {
                        path: "activitytemplate",
                        name: "activitytemplate",
                        component: () => import('@/views/back/activitytemplate.vue'),
                    },
                    {
                        path: "noticetemplate",
                        name: "noticetemplate",
                        component: () => import('@/views/back/noticetemplate.vue'),
                    }
                ],
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name === "login") {
        next()
    } else {
        if (!Boolean(localStorage.getItem("userToken")) && to.name !== "home" && to.name !== "search") {
            next({ name: "login" })
        } else {
            next()
        }
    }
})

export default router