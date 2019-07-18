import Vue from 'vue';

var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue123!'
	}
});

var app2 = new Vue({
	el: '#app-2',
	data: {
		message: '页面加载于 ' + new Date().toLocaleString()
	}
});

var app3 = new Vue({
	el: '#app-3',
	data: {
		seen: true
	}
});

var app4 = new Vue({
	el: '#app-4',
	data: {
		todos: [
			{ text: '学习 JavaScript' },
			{ text: '学习 Vue' },
			{ text: '整个牛项目' }
		]
	}
});
app4.todos.push({ text: '新项目' });

var app5 = new Vue({
	el: '#app-5',
	data: {
		message: 'hello Vue.js'
	},
	methods: {
		reverseMessage: function () {
			this.message = this.message.split('').reverse().join('')
		}
	}
});

var app6 = new Vue({
	el: '#app-6',
	data: {
		message: 'Hello Vue!'
	},
	// 生命周期钩子函数,不要在选项属性或回调上使用箭头函数
	created: function () {
		// `this` 指向创建的实例
		console.log('message is: ' + this.message);
	}
});

// message 属性被添加到实例对象 app6 中
console.log(app6.message); //输出 'Hello Vue!'

// 使用$watch 监听 message 变化
app6.$watch('message', () => console.log('message change'));

Vue.component('todo-item', {
	// todo-item 组件现在接受一个
	// "prop"，类似于一个自定义特性。
	// 这个 prop 名为 todo。
	props: ['todo'],
	template: '<li>{{ todo.text }}</li>'
});

var app7 = new Vue({
	el: '#app-7',
	data: {
		groceryList: [
			{ id: 0, text: '蔬菜' },
			{ id: 1, text: '奶酪' },
			{ id: 2, text: '随便其它什么人吃的东西' }
		]
	}
});

console.log(app7.$data.groceryList[0].text);

// 计算属性和侦听器
var vm = new Vue({
	el: '#example',
	data: {
		message: 'Hello'
	},
	computed: {
		// 计算属性的 getter
		reversedMessage: function () {
			// `this` 指向 vm 实例
			return this.message.split('').reverse().join('')
		}
	}
})

vm.message = '123456789';

var example2 = new Vue({
	el: '#example-2',
	data: {
	  name: 'Vue.js'
	},
	// 在 `methods` 对象中定义方法
	methods: {
	  greet: function (event) {
		// `this` 在方法里指向当前 Vue 实例
		alert('Hello ' + this.name + '!')
		// `event` 是原生 DOM 事件
		if (event) {
		  console.log(event);
		}
	  }
	}
  })
  
  // 也可以用 JavaScript 直接调用方法
//   example2.greet() // => 'Hello Vue.js!'