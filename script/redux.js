let undoable =  require('redux-undo').default; 
 
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}



const undoableTodos = undoable(todos);


// const undoableTodos = undoable(todos, { filter: includeAction(['ADD_TODO', 'TOGGLE_TODO']) })


const store = Redux.createStore(undoableTodos,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
  console.log(JSON.stringify(store.getState()));
  $('#spnResult').html('<span>The name is: <b>' + JSON.stringify(store.getState()) + '</b></span>');
});


store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'Implement Undo'
});

// store.dispatch({
//   type: 'UNDO'
// });







