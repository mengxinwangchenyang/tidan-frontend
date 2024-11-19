<template>
  <div class="editor-container">
    <!-- 顶部搜索栏 -->
    <div class="header">
      <TopSerch />
    </div>

    <div class="main-content">
      <el-row :gutter="20">
        <!-- 左边区域 -->
        <el-col :span="8">
          <div class="left-panel">
            <div class="problem-card">
              <h2>{{ title }}</h2>
              <div class="problem-info">
                <div class="difficulty-badge" :class="difficulty.toLowerCase()">
                  {{ difficulty }}
                </div>
                <div class="description">
                  {{ description }}
                </div>
                
                <h3>示例:</h3>
                <div v-for="(example, index) in parsedExamples" :key="index" class="example">
                  <div>输入: {{ example.input }}</div>
                  <div>输出: {{ example.output }}</div>
                  <div v-if="example.explanation">解释: {{ example.explanation }}</div>
                </div>

                <h3>约束条件:</h3>
                <ul>
                  <li v-for="(constraint, index) in parsedConstraints" :key="index">
                    {{ constraint }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        
        <!-- 右边区域 -->
        <el-col :span="16">
          <div class="right-panel">
            <div class="control-bar">
              <el-button type="primary" @click="submitCode">提交</el-button>
              <el-select v-model="selectedLanguage" placeholder="选择语言" class="language-select">
                <el-option label="C++" value="cpp"></el-option>
                <el-option label="Java" value="java"></el-option>
                <el-option label="Python" value="python"></el-option>
                <el-option label="C" value="c"></el-option>
                <el-option label="C#" value="csharp"></el-option>
                <el-option label="JavaScript" value="javascript"></el-option>
                <el-option label="TypeScript" value="typescript"></el-option>
              </el-select>
            </div>
            <div class="code-editor">
              <el-input
                type="textarea"
                :rows="20"
                placeholder="请输入代码"
                v-model="code"
                resize="none"
              ></el-input>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import TopSerch from '@/components/TopSerch.vue'

const route = useRoute()
const selectedLanguage = ref('')
const code = ref('')

// 从路由参数中获取题目信息
const title = ref(route.query.title || '')
const difficulty = ref(route.query.difficulty || '')
const description = ref(route.query.description || '')

// 解析JSON字符串
const parsedExamples = computed(() => {
  try {
    return JSON.parse(route.query.examples || '[]')
  } catch {
    return []
  }
})

const parsedConstraints = computed(() => {
  try {
    return JSON.parse(route.query.constraints || '[]')
  } catch {
    return []
  }
})

const parsedTestCases = computed(() => {
  try {
    return JSON.parse(route.query.testCases || '[]')
  } catch {
    return []
  }
})

const submitCode = () => {
  if (!code.value) {
    ElMessage.error('代码不能为空')
    return
  }
  if (!selectedLanguage.value) {
    ElMessage.error('请选择编程语言')
    return
  }
  ElMessage.success('代码提交成功')
  console.log('提交的语言:', selectedLanguage.value)
  console.log('提交的代码:', code.value)
}
</script>

<style scoped lang="scss">
.problem-card {
  .difficulty-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-bottom: 16px;

    &.困难 {
      background-color: #fff1f0;
      color: #ff4d4f;
    }
  }

  .example {
    background-color: #f8f9fa;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  ul {
    padding-left: 20px;
  }
}
.editor-container {
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

  .main-content {
    margin-top: 60px;
    padding: 20px;
    flex: 1;

    .el-row {
      height: calc(100vh - 100px);
    }

    .left-panel {
      height: 100%;
      
      .problem-card {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        height: 100%;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

        h2 {
          margin-bottom: 20px;
          color: #333;
          font-size: 18px;
        }

        .problem-info {
          color: #666;
          line-height: 1.6;
        }
      }
    }

    .right-panel {
      height: 100%;
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

      .control-bar {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;

        .el-button {
          width: 120px;
        }

        .language-select {
          width: 120px;
        }
      }

      .code-editor {
        flex: 1;
        
        .el-input {
          height: 100%;

          :deep(.el-textarea__inner) {
            height: 100%;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            line-height: 1.5;
            background-color: #f8f9fa;
          }
        }
      }
    }
  }
}

// 响应式布局
@media screen and (max-width: 768px) {
  .editor-container {
    .main-content {
      padding: 10px;

      .control-bar {
        flex-direction: column;
        
        .el-button,
        .language-select {
          width: 100%;
        }
      }
    }
  }
}
</style>