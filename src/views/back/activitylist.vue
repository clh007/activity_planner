<template>
    <div>
      <h1>活动管理</h1>
      <!-- 这里可以放置用户列表，搜索框，分页等 -->
      <ul>
        <!-- 假设你有一个用户对象的数组users -->
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [] // 这里应该是从API获取的用户列表
      };
    }
  };
  </script>