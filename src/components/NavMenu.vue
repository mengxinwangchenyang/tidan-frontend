<!-- src/components/NavMenu.vue -->
<template>
  <el-menu
    class="nav-menu"
    :default-active="activeIndex"
    @select="handleSelect"
    router
  >
    <el-menu-item index="/">
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/knowledge-map">
      <span>知识图谱</span>
    </el-menu-item>
    <el-menu-item index="/knowledge">
      <span>知识点</span>
    </el-menu-item>
    <el-menu-item index="/history">
      <span>历史</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeIndex = ref('/')

onMounted(() => {
  // 根据当前路由路径设置激活的菜单项
  activeIndex.value = route.path
})

const handleSelect = (key) => {
  router.push(key)
}
</script>

<style scoped>
.nav-menu {
  height: 100%;
  border-right: none;
}
</style>