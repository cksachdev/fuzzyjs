let undoable =  require('redux-undo').default;
let nextNodeId = 1;


const ADD_NAME = 'ADD_NAME';

const UNDO_NAME = 'UNDO_NAME'
const REDO_NAME = 'REDO_NAME'

function add(text) {
  return {
    type: ADD_NAME,text
  }
}

function undo() {
  return {
    type: UNDO_NAME
  }
}

function redo() {
  return {
    type: REDO_NAME
  }
}

function nameReducer(state = { name: '' }, action) {
  switch (action.type) {
    case ADD_NAME:
      return { ...state, name: action.text}
    default:
      return state
  }
}

const rootReducer = Redux.combineReducers({
  name: undoable(nameReducer, {
    limit: 10,
    debug: true,
    undoType: UNDO_NAME,
    redoType: REDO_NAME
  })
})

const store = Redux.createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
  var {canRedo,canUndo} = mapStateToProps(store);
  document.getElementById("undo").disabled = !canUndo;
  document.getElementById("redo").disabled = !canRedo;
  // console.log(JSON.stringify(store.getState()));
  $("#codeJson").html(JSON.stringify(store.getState(), null, 2));
  $('#name').val(store.getState().name.present.name.toString());
});


const mapStateToProps = (store) => {
  return {
    canUndo: store.getState().name.past.length > 0,
    canRedo: store.getState().name.future.length > 0
  }
}

const addName = (text) => store.dispatch(add(text));
const redoName = () => store.dispatch(redo());
const undoName = () => store.dispatch(undo());

$("#add").click(function(e){
  var val = $("#name").val();

  if(!val && val==''){
    alert("Please enter name");
    return false;
  }

  addName(val);
  $("#name").val('');
});


$("#redo").click(function(){
  redoName();
});

$("#undo").click(function(){
  undoName();
});




