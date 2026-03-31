# Vue Component Generator

## 名称
vue-component-generator

## 描述
一个用于快速生成 Vue 3 单文件组件（SFC）的 Node CLI 工具。支持选项式 API 和组合式 API（`<script setup>`），支持 TypeScript，自动创建文件并写入标准模板代码。旨在减少重复劳动，统一团队组件风格。

## 触发关键词
- 创建 Vue 组件
- 生成 Vue 模板
- new vue component
- vue 组件生成器
- 新建组件

## 使用前提
- 项目基于 Vue 3（Vue 2 也可用，但模板会略有差异）
- 已安装 Node.js（≥14）
- （可选）项目中已存在 `src/components` 目录，如不存在会自动创建

## 操作流程
1. **解析用户输入**  
   - 提取组件名称（必填）  
   - 识别是否使用 TypeScript（关键词：`ts`、`typescript`、`--ts`）  
   - 识别是否使用组合式 API（关键词：`composition`、`setup`、`--comp`）

2. **执行 CLI 命令**  
   在项目根目录下运行以下形式的命令：
   ```bash
   node generate-vue-component.js <ComponentName> [--ts] [--composition]