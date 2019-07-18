import Vue from 'vue';
// 全局组件
// Vue.component('todo-item', {
// 	template: '<li>item</li>'
// });

// 局部组件, 每个组件都是 Vue 实例, 和 new 出来的一样, 可以有 methods 属性等等
// 父子组件传值: 父 → 子 通过 props, 子 → 父 通过子组件发布一个事件, 父组件监听(订阅)这个事件, 来传值
var TodoItem = {
	// 往这个组件里传值，需要使用下面的属性接收
	props: ['content', 'index'],
	template: '<li>{{content}}-{{index}}<button @click="handleClick">移除</button></li>',
	methods: {
		handleClick: function () {
			// $emit 触发一个自定义事件, 传递一个参数 发布订阅模式
			this.$emit('delete', this.index);
		}
	}
}

new Vue({ //根实例, 如果不定义模板, 会把挂载点内的内容当作模板
	el: '#app',
	// 局部组件要在这个实例的属性中注册
	components: {
		'todo-item': TodoItem
	},
	data: {
		inputValue: 'todo',
		todos: [1, 'a', 2, 3]
	},
	methods: {
		handleSubmit: function () {
			this.todos.push(this.inputValue);
			this.inputValue = '';
		},
		// 子组件传过来的参数 index
		handleDelete: function (index) {
			console.log(index);
			this.todos.splice(index, 1);
		}
	}
});
