<template>
  <div class="knowledge_container">
    <div class="header">
      <TopSerch />
    </div>

    <div class="main_content">
      <div class="menu-wrapper">
        <nav-menu />
      </div>
      <div class="content-wrapper">
        <!-- 标题区域 -->
        <div class="title-section">
          <h1 class="knowledge-title">枚举<span class="status">学习中</span></h1>
          <div class="actions">
            <el-button type="text" class="action-btn">
              <i class="el-icon-star-off"></i>
              收藏
            </el-button>
            <el-button type="text" class="action-btn">
              <i class="el-icon-thumb"></i>
              掌握
            </el-button>
            <el-button type="primary" class="forget-btn">一键遗忘</el-button>
          </div>
        </div>

        <!-- 导航标签 -->
        <div class="nav-tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'intro' }"
            @click="activeTab = 'intro'"
          >
            知识点简介
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'problems' }"
            @click="activeTab = 'problems'"
          >
            知识点题单
          </div>
        </div>

        <!-- 主要内容区 -->
        <div class="main-section" v-if="activeTab === 'intro'">
          <h2 class="section-title">枚举的详细介绍</h2>
          
          <div class="content-grid">
            <div class="example-section">
              <h3>算法示例：</h3>
              <div class="code-block">
                <!-- 代码示例 -->
              </div>
            </div>

            <div class="animation-section">
              <h3>动画或视频演示：</h3>
              <div class="animation-block">
                <p class="placeholder-text">(后面可能做)</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 题单内容区 -->
        <div class="problems-section" v-if="activeTab === 'problems'">
      <div class="problem-table">
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>名称</th>
              <th>难度</th>
              <th>标签</th>
              <th>通过率</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="problem in problems" 
              :key="problem.id" 
              @click="navigateToProblem(problem)"
              class="problem-row"
            >
              <td>{{ problem.id }}</td>
              <td>{{ problem.name }}</td>
              <td>
                <span :class="['difficulty', problem.difficulty]">
                  {{ problem.difficulty }}
                </span>
              </td>
              <td>
                <span class="tag" :class="problem.status">
                  {{ problem.status }}
                </span>
              </td>
              <td>
                <div class="progress-bar">
                  <div class="progress" :style="{ width: problem.progress + '%' }"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavMenu from '../components/NavMenu.vue'
import TopSerch from '@/components/TopSerch.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('intro')

const problems = ref([
  {
    id: 1,
    name: '枚举题目1',
    difficulty: '困难',
    status: '已通过',
    progress: 75,
    description: '这是题目1的详细描述...',
    examples: [
      {
        input: 'input1',
        output: 'output1',
        explanation: '解释1'
      }
    ],
    constraints: ['限制条件1', '限制条件2'],
    testCases: ['测试用例1', '测试用例2']
  },
  // 可以添加更多题目
])

const navigateToProblem = (problem) => {
  router.push({
    name: 'CodeEditor',
    params: { id: problem.id },
    // 通过 query 传递题目信息
    query: {
      title: problem.name,
      difficulty: problem.difficulty,
      description: problem.description,
      examples: JSON.stringify(problem.examples),
      constraints: JSON.stringify(problem.constraints),
      testCases: JSON.stringify(problem.testCases)
    }
  })
}
</script>

<style scoped lang="scss">
.problem-row {
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
}

.problems-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 0 0 8px 8px;

  .problem-table {
    width: 100%;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid #f0f0f0;
      }

      th {
        background-color: #fafafa;
        font-weight: 500;
        color: #333;
      }

      .difficulty {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;

        &.困难 {
          background-color: #fff1f0;
          color: #ff4d4f;
        }
      }

      .tag {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;

        &.已通过 {
          background-color: #f6ffed;
          color: #52c41a;
        }
      }

      .progress-bar {
        width: 100px;
        height: 8px;
        background-color: #f0f0f0;
        border-radius: 4px;
        overflow: hidden;

        .progress {
          height: 100%;
          background-color: #1890ff;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
      }
    }
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
  }

  .main_content {
    margin-top: 60px;
    display: flex;
    min-height: calc(100vh - 60px);

    .menu-wrapper {
      position: fixed;
      left: 0;
      top: 60px;
      bottom: 0;
      width: 200px;
      background-color: #fff;
      z-index: 99;
    }

    .content-wrapper {
      flex: 1;
      margin-left: 200px;
      padding: 20px;

      .title-section {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .knowledge-title {
          font-size: 24px;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;

          .status {
            font-size: 14px;
            background-color: #e6f7ff;
            color: #1890ff;
            padding: 4px 12px;
            border-radius: 4px;
          }
        }

        .actions {
          display: flex;
          gap: 16px;
          align-items: center;

          .action-btn {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .forget-btn {
            border-radius: 20px;
          }
        }
      }

      .nav-tabs {
        display: flex;
        gap: 20px;
        background-color: #fff;
        padding: 0 20px;
        border-radius: 8px 8px 0 0;

        .tab {
          padding: 12px 0;
          cursor: pointer;
          position: relative;

          &.active {
            color: #1890ff;
            font-weight: 500;

            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 2px;
              background-color: #1890ff;
            }
          }
        }
      }

      .main-section {
        background-color: #fff;
        padding: 20px;
        border-radius: 0 0 8px 8px;

        .section-title {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;

          .example-section,
          .animation-section {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;

            h3 {
              margin-top: 0;
              margin-bottom: 16px;
              color: #333;
            }

            .code-block,
            .animation-block {
              min-height: 300px;
              background-color: #fff;
              border-radius: 4px;
              padding: 16px;
            }

            .placeholder-text {
              color: #999;
              text-align: center;
              margin-top: 140px;
            }
          }
        }
      }
    }
  }
}

// 响应式布局
@media screen and (max-width: 768px) {
  .knowledge_container {
    .main_content {
      .menu-wrapper {
        width: 60px;
      }
      
      .content-wrapper {
        margin-left: 60px;
        
        .content-grid {
          grid-template-columns: 1fr;
        }

        .title-section {
          flex-direction: column;
          gap: 16px;

          .actions {
            width: 100%;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>