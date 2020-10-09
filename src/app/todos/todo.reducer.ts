import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';
import { state } from '@angular/animations';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Salvar a Redux'),
  new Todo('Hola Luis'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(actions.crear, (state, { texto }) => [...state, new Todo(texto)]),

  on(actions.borrar, (state, { id }) => state.filter(
    todo => todo.id !== id)),

  on(actions.limpiarTodos, state =>state.filter(todo=>!todo.completado)),

  on(actions.toggle, (state, { id }) => {

    return state.map(todo => {

      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      }//termina if
      else {
        return todo;
      }

    });
  }),
  on(actions.toggleAll, (state, { completado }) => state.map(todo => {
    return {
      ...todo,
      completado: completado
    }
  })),

  on(actions.editar, (state, { id, texto }) => {

    return state.map(todo => {

      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        }
      }//termina if
      else {
        return todo;
      }

    });
  }),


);



export function todoReducer(state, action) {
  return _todoReducer(state, action);
}