<template>
  <div class="home-container">
    <!-- 顶部搜索栏 -->
    <div class="header">
      <TopSerch />
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 左侧导航 -->
      <nav-menu />

      <!-- 中间内容区 -->
      <div class="content-area">
        <!-- 知识图谱展示区 -->
        <div class="knowledge-map">
            <TuPu />
        </div>

        <!-- 推荐题目区域 -->
        <div class="recommended-topics">
          <div class="section-title">
            推荐题目
            <el-button text>
              <el-icon><Refresh /></el-icon>
              换一批
            </el-button>
          </div>
          <el-card v-for="i in 2" :key="i" class="topic-card">
            {{ i }}.枚举：
            <div class="topic-list">
              枚举题目啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦1,
              枚举题目啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦2,
            </div>
          </el-card>
        </div>
      </div>

      <!-- 右侧热门题目 -->
      <div class="hot-topics">
        <div class="welcome-section">
          欢迎回来，weconyed
          <div class="date-info">
            <span class="month">十月</span>
            <span class="day">27</span>
            <span class="weekday">星期日</span>
          </div>
          <el-button type="warning" class="punch-btn">点击打卡</el-button>
        </div>

        <div class="hot-topics-list">
          <h3>热门题目（top5）</h3>
          <div v-for="i in 2" :key="i" class="hot-topic-item">
            {{ i }}.热门题目啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦
            <el-tag size="small" type="danger">困难</el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavMenu from '../components/NavMenu.vue'
import TopSerch from '@/components/TopSerch.vue'
import { Refresh } from '@element-plus/icons-vue'
import TuPu from '@/components/TuPu.vue';

</script>

  
  <style scoped lang="scss">
.home-container {
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

  .main-content {
    margin-top: 60px; // 为顶部搜索栏留出空间
    min-height: calc(100vh - 60px);
    display: flex;

    :deep(.nav-menu) {
      width: 200px;
      position: fixed;
      left: 0;
      top: 60px;
      bottom: 0;
      background-color: white;
      border-right: 1px solid #e6e6e6;
    }

    .content-area {
      flex: 1;
      margin-left: 220px; // 为左侧菜单留出空间
      margin-right: 320px; // 为右侧区域留出空间
      padding: 20px;

      .knowledge-map {
        background-color: #87e8de;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        position: relative;
        min-height: 200px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
      }

      .recommended-topics {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: bold;
        }

        .topic-card {
          margin-bottom: 15px;
          
          .topic-list {
            margin-top: 8px;
            color: #666;
            font-size: 14px;
          }
        }
      }
    }

    .hot-topics {
      width: 300px;
      position: fixed;
      right: 20px;
      top: 80px;

      .welcome-section {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

        .date-info {
          font-size: 24px;
          margin: 15px 0;

          .month, .day, .weekday {
            margin: 0 5px;
          }

          .day {
            font-size: 32px;
            font-weight: bold;
            color: #409EFF;
          }
        }

        .punch-btn {
          width: 100%;
          margin-top: 10px;
        }
      }

      .hot-topics-list {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

        h3 {
          margin-bottom: 15px;
          color: #333;
        }

        .hot-topic-item {
          margin: 10px 0;
          padding: 12px;
          background: #f5f7fa;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 1.4;
        }
      }
    }
  }
}

// 响应式布局
@media screen and (max-width: 1280px) {
  .home-container {
    .main-content {
      .content-area {
        margin-right: 20px;
      }

      .hot-topics {
        display: none; // 在较小屏幕上隐藏右侧区域
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .home-container {
    .main-content {
      :deep(.nav-menu) {
        width: 60px;
        
        .el-menu-item span {
          display: none;
        }
      }

      .content-area {
        margin-left: 80px;
        
        .knowledge-map {
          padding: 15px;
        }

        .recommended-topics {
          .topic-card {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>