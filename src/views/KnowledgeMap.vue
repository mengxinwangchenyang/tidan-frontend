<template>
    <div class="knowledge-container">
      <!-- 顶部搜索栏 -->
      <div class="header">
        <TopSearch />
      </div>
  
      <!-- 主要内容区 -->
      <div class="main-content">
        <!-- 左侧导航 -->
        <nav-menu />
  
        <!-- 知识图谱区域 -->
        <div class="graph-container">
          <div v-loading="g_loading" class="graph-wrapper">
            <RelationGraph ref="graphRef" :options="graphOptions">
              <template #graph-plug>
                <div class="c-my-panel">
                  <el-tabs v-model="activeTabName" @tabChange="onTabAciveChange">
                    <el-tab-pane label="按水平/垂直范围设置" name="case1">
                      <div>
                        <div class="description">
                          该知识图表将根据当前可见范围自动调整水平和垂直距离，并且该知识图表将尝试使图表看起来被拉伸，而不会超出可见范围。
                        </div>
                        <div class="c-option-name">节点之间的水平距离 [最小值] - [最大值]：</div>
                        <el-slider v-model="range_horizontal" range :max="500" @change="onChangeOptionByCase1"/>
                      </div>
                      <div>
                        <div class="c-option-name">节点之间的垂直距离 [最小值] - [最大值]：</div>
                        <el-slider v-model="range_vertical" range :max="500" @change="onChangeOptionByCase1"/>
                      </div>
                    </el-tab-pane>
  
                    <el-tab-pane label="按固定水平距离设置" name="case2">
                      <div class="level-distance-settings">
                        <div class="description">
                          您可以设置每个级别的距离，例如：400,200,300,500
                        </div>
                        <div class="warning">
                          注： 在下图从左到右的树状布局中，第一级的标高距离为 200。
                        </div>
                        <span class="c-label">设置每个级别的距离：</span>
                        <el-input v-model="levelDistance" placeholder="Please enter content" @change="onChangeOptionByCase2"/>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </template>
            </RelationGraph>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import RelationGraph from 'relation-graph-vue3';
  import NavMenu from '../components/NavMenu.vue'
  import TopSearch from '@/components/TopSerch.vue'
  
  // 保持原有的代码逻辑不变
  const graphRef = ref();
  const g_loading = ref(true);
  const activeTabName = ref('case1');
  const range_horizontal = ref([100, 300]);
  const range_vertical = ref([20, 100]);
  const levelDistance = ref('200, 300, 400, 500, 500, 500, 500');
  
  const graphOptions = {
    debug: false,
    layout: {
        label: 'Tree',
        layoutName: 'tree',
        layoutClassName: 'seeks-layout-center',
        from: 'left',
        min_per_width: undefined,
        max_per_width: 300,
        min_per_height: 40,
        max_per_height: undefined,
        levelDistance: ''
    },
    defaultExpandHolderPosition: 'right',
    defaultNodeShape: 1,
    defaultNodeWidth: 40,
    defaultNodeHeight: 40,
    defaultLineShape: 4,
    defaultNodeBorderWidth: 0,
    defaultPolyLineRadius: 15,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)'
};
const graphOptions2222 = {
    debug: false,
    layout: {
        label: 'Tree',
        layoutName: 'tree',
        layoutClassName: 'seeks-layout-center',
        from: 'left',
        min_per_width: undefined,
        max_per_width: 300,
        min_per_height: 40,
        max_per_height: undefined,
        levelDistance: ''
    },
    defaultExpandHolderPosition: 'right',
    defaultNodeShape: 1,
    defaultNodeWidth: 40,
    defaultNodeHeight: 40,
    defaultPolyLineRadius: 15,
    defaultLineShape: 4,
    defaultNodeBorderWidth: 0,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)'
};

const setGraphData = async () => {
    const __graph_json_data = {
        rootId: 'a',
        nodes: [
            { id: 'a', text: 'a' },
            { id: 'b', text: 'b' },
            { id: 'b1', text: 'b1' },
            { id: 'b1-1', text: 'b1-1' },
            { id: 'b1-2', text: 'b1-2' },
            { id: 'b2', text: 'b2' },
            { id: 'b2-1', text: 'b2-1' },
            { id: 'b2-2', text: 'b2-2' },
            { id: 'b2-2-1', text: 'b2-2-1' },
            { id: 'b2-2-2', text: 'b2-2-2' },
            { id: 'c', text: 'c' },
            { id: 'c1', text: 'c1' },
            { id: 'c2', text: 'c2' },
            { id: 'c2-1', text: 'c2-1' },
            { id: 'c2-2', text: 'c2-2' },
            { id: 'c2-2-1', text: 'c2-2-1' },
            { id: 'c2-2-2', text: 'c2-2-2' },
            { id: 'c3', text: 'c3' }
        ],
        lines: [
            { from: 'a', to: 'b' },
            { from: 'b', to: 'b1' },
            { from: 'b1', to: 'b1-1' },
            { from: 'b1', to: 'b1-2' },
            { from: 'b', to: 'b2' },
            { from: 'b2', to: 'b2-1' },
            { from: 'b2', to: 'b2-2' },
            { from: 'b2-2', to: 'b2-2-1' },
            { from: 'b2-2', to: 'b2-2-2' },
            { from: 'a', to: 'c' },
            { from: 'c', to: 'c1' },
            { from: 'c', to: 'c2' },
            { from: 'c2', to: 'c2-1' },
            { from: 'c2', to: 'c2-2' },
            { from: 'c2-2', to: 'c2-2-1' },
            { from: 'c2-2', to: 'c2-2-2' },
            { from: 'c', to: 'c3' }
        ]
    };

    console.log(JSON.stringify(__graph_json_data));
    g_loading.value = false;
    const graphInstance = graphRef.value.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};

const onChangeOptionByCase1 = async () => {
    graphOptions.layout.min_per_width = range_horizontal.value[0];
    graphOptions.layout.max_per_width = range_horizontal.value[1];
    graphOptions.layout.min_per_height = range_vertical.value[0];
    graphOptions.layout.max_per_height = range_vertical.value[1];
    const graphInstance = graphRef.value.getInstance();
    await graphInstance.setOptions(graphOptions);
    await graphInstance.refresh();
};

const onChangeOptionByCase2 = async () => {
    let arr = [];
    try {
        arr = levelDistance.value.split(',');
    } catch (e) {
        return;
    }
    graphOptions2222.layout.levelDistance = levelDistance.value;
    const graphInstance = graphRef.value.getInstance();
    await graphInstance.setOptions(graphOptions2222);
    await graphInstance.refresh();
};

const onTabAciveChange = () => {
    console.log('activeTabName:', activeTabName.value);
    if (activeTabName.value === 'case2') {
        onChangeOptionByCase2();
    } else {
        onChangeOptionByCase1();
    }
};

onMounted(() => {
    setGraphData();
});
  </script>
  
  <style lang="scss" scoped>
  .knowledge-container {
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
      height: 60px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .main-content {
      margin-top: 60px;
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
  
      .graph-container {
        flex: 1;
        margin-left: 200px;
        position: relative;
        
        .graph-wrapper {
          height: calc(100vh - 60px);
          width: 100%;
        }
      }
    }
  }
  
  // 知识图谱相关样式
  ::v-deep(.relation-graph) {
    .c-node-text {
      padding: 0px;
      place-items: center;
      justify-content: center;
    }
  }
  
  .c-my-panel {
    width: 600px;
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 10px;
    z-index: 800;
    background-color: #efefef;
    border: #eeeeee solid 1px;
    padding: 10px;
  
    .description {
      padding-bottom: 10px;
      color: #333333;
      font-size: 14px;
    }
  
    .warning {
      padding-bottom: 10px;
      color: #ff0000;
      font-size: 14px;
    }
  
    .c-option-name {
      color: #666666;
      font-size: 14px;
      line-height: 30px;
    }
  
    .level-distance-settings {
      font-size: 14px;
    }
  }
  
  // 响应式布局
  @media screen and (max-width: 768px) {
    .knowledge-container {
      .main-content {
        :deep(.nav-menu) {
          width: 60px;
          
          .el-menu-item span {
            display: none;
          }
        }
  
        .graph-container {
          margin-left: 60px;
        }
      }
    }
  }
  </style>