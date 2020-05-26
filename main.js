/* global Vue */

/* Naive global function */
function saveList(todoList) {
  const strList = JSON.stringify(todoList);
  localStorage.setItem("todoList", strList);
}

/* Naive global function */
function loadList() {
  const strList = localStorage.todoList;
  if (strList) {
    return JSON.parse(strList);
  }
  return [];
}

Vue.component("todo-item", {
  template: `
    <li class="todo-list-item">
      <input type="checkbox" v-model="todo.checked" class="todo-list-item-checkbox" />
      {{ todo.message }}
      <button v-on:click="handleRemove(index)" class="todo-list-item-remove">X</button>
    </li>`,
  props: ["index", "todo"],
  methods: {
    handleRemove: function (index) {
      console.log("removing item!", index);
      this.$emit("remove", index);
    },
  },
});

/* eslint-disable-next-line no-unused-vars */
var vm = new Vue({
  el: "#app",
  data: {
    message: "yarhar",
    seen: true,
    todos: loadList(),
    form: {
      itemName: "test",
    },
  },
  methods: {
    testFunction: function () {
      this.todos = [
        ...this.todos,
        { message: this.form.itemName, checked: false },
      ];
      this.form.itemName = "";
    },
    removeItem: function (index) {
      console.log("removing in parent!", index);
      const tempTodos = [...this.todos];
      tempTodos.splice(index, 1);
      this.todos = tempTodos;
    },
  },
  watch: {
    todos: {
      handler: function (todoList) {
        console.log("change in todoList!", todoList);
        saveList(todoList);
      },
      deep: true,
    },
  },
});
