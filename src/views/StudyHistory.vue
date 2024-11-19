<template>
  <div class="history_container">
    <!-- 顶部搜索栏 -->
    <div class="header">
      <TopSerch />
    </div>

    <div class="main_content">
      <!-- 左侧菜单 -->
      <nav-menu />
      
      <!-- 主要内容区域 -->
      <div class="content">
        <h1>刷题历史</h1>

        <!-- 筛选栏 -->
        <el-form :inline="true" class="filter-form">
          <el-form-item label="筛选:">
            <el-select v-model="selectedStatus">
              <el-option label="全部题目" value="all"></el-option>
              <el-option label="已通过题目" value="passed"></el-option>
              <el-option label="未通过题目" value="failed"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="搜索:">
            <el-input v-model="searchQuery" placeholder="输入题目名称..."></el-input>
          </el-form-item>

          <el-form-item label="排序:">
            <el-select v-model="selectedSort">
              <el-option label="最近提交时间" value="recent"></el-option>
              <el-option label="题目" value="title"></el-option>
              <el-option label="题目难度" value="difficulty"></el-option>
              <el-option label="提交次数" value="submissions"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <!-- 刷过的题目列表 -->
        <el-table 
          :data="filteredAndSortedProblems" 
          style="width: 100%"
          :header-cell-style="{ background: '#f5f7fa' }"
        >
          <el-table-column prop="lastSubmitted" label="最近提交时间" min-width="150" />
          <el-table-column prop="title" label="题目名称" min-width="200" />
          <el-table-column prop="difficulty" label="题目难度" min-width="120">
            <template #default="scope">
              <el-tag
                :type="getDifficultyType(scope.row.difficulty)"
              >
                {{ scope.row.difficulty }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="submissionCount" label="提交次数" min-width="120" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavMenu from '../components/NavMenu.vue'
import TopSerch from '@/components/TopSerch.vue'

const selectedStatus = ref('all')
const searchQuery = ref('')
const selectedSort = ref('recent')

const problems = ref([
  { id: 1, lastSubmitted: '2023-10-01', title: '题目一', difficulty: '简单', submissionCount: 2, status: 'passed' },
  { id: 2, lastSubmitted: '2023-10-02', title: '题目二', difficulty: '中等', submissionCount: 3, status: 'failed' },
  { id: 3, lastSubmitted: '2023-09-30', title: '题目三', difficulty: '困难', submissionCount: 1, status: 'passed' },
])

const filteredAndSortedProblems = computed(() => {
  let filteredProblems = problems.value.filter(problem => {
    const matchesStatus = selectedStatus.value === 'all' || problem.status === selectedStatus.value
    const matchesSearch = problem.title.includes(searchQuery.value)
    return matchesStatus && matchesSearch
  })

  switch (selectedSort.value) {
    case 'recent':
      return filteredProblems.sort((a, b) => new Date(b.lastSubmitted) - new Date(a.lastSubmitted))
    case 'title':
      return filteredProblems.sort((a, b) => a.title.localeCompare(b.title))
    case 'difficulty':
      return filteredProblems.sort((a, b) => a.difficulty.localeCompare(b.difficulty))
    case 'submissions':
      return filteredProblems.sort((a, b) => b.submissionCount - a.submissionCount)
    default:
      return filteredProblems
  }
})

const getDifficultyType = (difficulty) => {
  switch (difficulty) {
    case '简单':
      return 'success'
    case '中等':
      return 'warning'
    case '困难':
      return 'danger'
    default:
      return 'info'
  }
}
</script>

<style scoped lang="scss">
.history_container {
  min-height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: white;
  }

  .main_content {
    margin-top: 60px;
    display: flex;
    min-height: calc(100vh - 60px);

    :deep(.nav-menu) {
      width: 200px;
      position: fixed;
      left: 0;
      top: 60px;
      bottom: 0;
      background-color: white;
      border-right: 1px solid #e6e6e6;
    }
    
    .content {
      flex: 1;
      margin-left: 200px;
      padding: 20px;

      h1 {
        margin-bottom: 20px;
        color: #333;
      }

      .filter-form {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;

        .el-form-item {
          margin-bottom: 0;
          margin-right: 20px;
        }
      }

      .el-table {
        background-color: #fff;
        border-radius: 8px;
      }
    }
  }
}

// 响应式布局
@media screen and (max-width: 768px) {
  .history_container {
    .main_content {
      .content {
        margin-left: 60px;
        
        .filter-form {
          .el-form-item {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>