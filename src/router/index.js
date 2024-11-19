// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import KnowledgeList from '../views/KnowledgeList.vue'
import CodeEditor from '../views/CodeEditor.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: KnowledgeList
  },
  {
    path: '/knowledge/:id',
    name: 'KnowledgeDetail',
    component: () => import('@/views/KnowledgeDetail.vue')
  },
  {
    path: '/knowledge-map',
    name: 'KnowledgeMap',
    component: () => import('../views/KnowledgeMap.vue') // 懒加载
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/StudyHistory.vue') // 懒加载
  },
  {
    path: '/problem/:id',
    name: 'CodeEditor',
    component: CodeEditor,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router