<!-- src/views/TopSerch.vue -->
<template>
    <!-- 顶部搜索栏 -->
    <div class="topsearch">
        <el-input
          v-model="searchText"
          placeholder="搜索"
          class="search-input"
        >
          <template #suffix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <div class="user-info">
          <el-icon><Star /></el-icon>
          <el-avatar :size="30" />
          <span>用户</span>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Search, Star } from '@element-plus/icons-vue'
  
  const searchText = ref('')
  </script>
  
  <style scoped lang="scss">
    
    .topsearch {
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      
      .search-input {
        width: 300px;
      }
      
      .user-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  </style>