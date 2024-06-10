import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
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
                ]
            },
            {
                path: "/activity/:id",
                name: "activity",
                component: () => import("@/views/activity/index.vue")
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
                ],
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router