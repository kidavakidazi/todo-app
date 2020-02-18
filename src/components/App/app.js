import React, {Component} from "react";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css'

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      important: false,
      id: this.maxId++
    }
  };

    addItem = (text) => {
      const newItem = this.createTodoItem(text);

      this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];
      return {
        todoData: newArray
      };
    })
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
     const idx = todoData.findIndex(el => el.id === id);
     const newArray = [
       ...todoData.slice(0, idx),
       ...todoData.slice(idx+1)
     ];

     return {
       todoData: newArray
     };
    })
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) =>{
      const idx = todoData.findIndex(el => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {...oldItem, done: !oldItem.done};

      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx+1)
      ];
      return {
        todoData: newArray
      };
    });
  };

  onToggleImportant = (id) => {
    console.log('imp',id)
  };

  render() {

    const doneCount = this.state.todoData
                      .filter(el => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className='top-panel d-flex'>
          <SearchPanel/>
          <ItemStatusFilter/>
        </div>
        <TodoList todos={this.state.todoData}
                  onDeleted={this.deleteItem}
                  onToggleDone={this.onToggleDone}
                  onToggleImportant={this.onToggleImportant}/>
        <ItemAddForm addItem={this.addItem}/>
      </div>
    )
  }
};
