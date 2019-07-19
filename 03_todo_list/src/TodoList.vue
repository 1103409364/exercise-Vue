<template>
  <!-- template 里面只能有一个根标签 -->
  <div id="app">
    <input v-model="inputValue" />
    <button @click="handleSubmit">提交</button>
    <ul>
        <todo-item
        v-for="(item, index) of todos"
        :content="item"
        :index="index"
        :key="item.length"
        @delete="handleClick"
      ></todo-item>
    </ul>
  </div>
</template>

<script>
// 逻辑 data 变成了函数, 返回值是一个对象是数据
import TodoItem from './components/TodoItem'
export default {
  components: {
    'todo-item': TodoItem
  },
  data: function () {
    return {
      inputValue: '',
      todos: [1, 2, 3]
    }
  },
  methods: {
    handleSubmit () {
      this.todos.push(this.inputValue)
      this.inputValue = ''
    },
    handleClick (index) {
      this.todos.splice(index, 1)
    }
  }
}
</script>

<style>
</style>
