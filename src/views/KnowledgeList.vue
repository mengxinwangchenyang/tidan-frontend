<template>
    <div class="knowledge_container">
      <div class="header">
        <TopSerch />
      </div>
  
      <div class="main_content">
        <nav-menu />
        <div class="knowledge-list">
          <h1 class="page-title" align="left">知识点列表</h1>
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{ background: '#f5f7fa' }"
            @row-click="handleRowClick"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="id"
              label="编号"
              width="80"
              align="center"
            />
            <el-table-column
              prop="name"
              label="名称"
              min-width="200"
              align="left"
            />
            <el-table-column
              prop="status"
              label="状态"
              min-width="120"
              align="center"
            >
              <template #default="scope">
                <el-tag
                  :type="scope.row.status === '已掌握' ? 'success' : 'info'"
                >
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="progress"
              label="完成度"
              min-width="200"
              align="center"
            >
              <template #default="scope">
                <el-progress
                  :percentage="scope.row.progress"
                  :format="format"
                  :stroke-width="20"
                  :status="getProgressStatus(scope.row.progress)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="problemCount"
              label="题目数"
              min-width="100"
              align="center"
            />
          </el-table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import NavMenu from '../components/NavMenu.vue'
  import TopSerch from '@/components/TopSerch.vue'
  
  const router = useRouter()
  const format = (percentage) => percentage + '%'
  
  // 扩充的示例数据
  const tableData = ref([
    {
      id: 1,
      name: '枚举',
      status: '已掌握',
      progress: 80,
      problemCount: 20,
      routePath: '/knowledge/1' // 添加路由路径
    },
    {
      id: 2,
      name: '递归',
      status: '学习中',
      progress: 45,
      problemCount: 15,
      routePath: '/knowledge/2'
    },
    {
      id: 3,
      name: '动态规划',
      status: '未开始',
      progress: 0,
      problemCount: 30,
      routePath: '/knowledge/3'
    },
    {
      id: 4,
      name: '贪心算法',
      status: '学习中',
      progress: 60,
      problemCount: 25,
      routePath: '/knowledge/4'
    }
  ])

  // 根据进度返回不同的状态
  const getProgressStatus = (progress) => {
    if (progress >= 80) return 'success'
    if (progress >= 50) return 'warning'
    return 'exception'
  }

  // 行点击事件处理
  const handleRowClick = (row) => {
    router.push({
      path: row.routePath,
      query: {
        id: row.id,
        name: row.name,
        status: row.status,
        progress: row.progress
      }
    })
  }

  // 设置行的 class
  const tableRowClassName = () => {
    return 'clickable-row'
  }
  </script>
  
  <style scoped lang="scss">
  .clickable-row {
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f5f7fa !important;
    }
  }

  :deep(.el-table__row) {
    td {
      transition: background-color 0.3s;
    }
  }
.knowledge_container {
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .main_content {
    margin-top: 60px; // 为顶部搜索栏留出空间
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

    .knowledge-list {
      flex: 1;
      margin-left: 200px; // 为左侧菜单留出空间
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      margin: 20px 20px 20px 220px;
      
      .page-title {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: 500;
        color: #333;
      }

      :deep(.el-table) {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
        
        th {
          font-weight: bold;
          background-color: #f5f7fa !important;
          padding: 12px 0;
        }
        
        td {
          padding: 12px 0;
        }

        // 新增：设置表头和单元格的对齐方式
        th.el-table__cell,
        td.el-table__cell {
          text-align: center !important;
          .cell {
            padding: 0 12px;
            white-space: nowrap;
          }
        }

        // 特定列的样式调整
        .el-table__cell:nth-child(2) { // 名称列
          .cell {
            text-align: left;
          }
        }

        // 进度条列的样式调整
        .el-progress {
          margin: 0 12px;
        }
        
        .el-progress-bar__outer {
          border-radius: 4px;
          background-color: #ebeef5;
        }

        .el-progress-bar__inner {
          border-radius: 4px;
        }

        // tag的样式调整
        .el-tag {
          margin: 0 auto;
        }
    }
    }
  }
}

// 响应式布局
@media screen and (max-width: 768px) {
  .knowledge_container {
    .main_content {
      margin-top: 50px;
      
      :deep(.nav-menu) {
        width: 60px;
        
        .el-menu-item span {
          display: none;
        }
      }

      .knowledge-list {
        margin-left: 80px;
      }
    }
  }
}
</style>


