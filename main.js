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
      <input v-bind:id="checkboxId" type="checkbox" v-model="todo.done" class="todo-list-item-checkbox" />
      <label v-bind:for="checkboxId" v-bind:class="{ done: todo.done}">{{ todo.message }}</label>
      <button v-on:click="handleRemove(index)" type="button" class="todo-list-item-remove">X</button>
    </li>`,
  props: ["index", "todo"],
  methods: {
    handleRemove: function (index) {
      this.$emit("remove", index);
    },
    getCheckboxId: function (index) {
      return `check-itemzz-${index}`;
    },
  },
  computed: {
    checkboxId: function() {
      return `item-checkbox-${this.index}`;
    }
  }
});

/* eslint-disable-next-line no-unused-vars */
var vm = new Vue({
  el: "#app",
  data: {
    todos: loadList(),
    form: {
      itemName: "",
    },
  },
  methods: {
    addItem: function (event) {
      event.preventDefault();
      const itemName = this.form.itemName;
      if (itemName) {
        this.todos = [
          ...this.todos,
          { message: this.form.itemName, done: false },
        ];
        this.form.itemName = "";
      }
    },
    removeItem: function (index) {
      const tempTodos = [...this.todos];
      tempTodos.splice(index, 1);
      this.todos = tempTodos;
    },
  },
  watch: {
    todos: {
      handler: function (todoList) {
        saveList(todoList);
      },
      deep: true,
    },
  },
});
