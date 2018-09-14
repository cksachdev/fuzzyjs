var list = []
var options = {
  shouldSort: true,
  includeScore: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "elementname",
    "description"
  ]
};

var fuse = undefined;

// Shortcut Definition to show searchbar
Mousetrap.bind('ctrl+shift+k', function(e) {
  $(".SearchInputWrapperOwerlay").show()
  $("#searchInput")
  .val('')
  .focus();
});

// Shortcut Definition to hide searchbar
Mousetrap.bind('esc', function(e) {
  $(".SearchInputWrapperOwerlay").hide();
})

$(document).ready(function($) {

  // Hide Search Input at beginning
  $(".SearchInputWrapperOwerlay").hide();

  $.getJSON("elements.json", function(json) {
    // console.log(json)
    list = json;
    fuse = new Fuse(list, options); // "list" is the item array
  });
  
  $("#searchInput").keyup(function (event) {
    var searchText = $(event.currentTarget).val();
    var result = fuse.search(searchText);
    if(result.length == 0) {
      $("#output").removeClass("show");
      return false;
    }
    var data = {people: result };
    var tmpl = $.templates("#tmplList");
    var html = tmpl.render(data);
    // $("#output").empty().html(html).addClass("show");
    $("#output").addClass("show");

    // if(($("#output .typeahead__list li").hasClass("selected") == false)){
    //   $("#output .typeahead__list li").first().addClass("selected"); 
    // }


    if (event.keyCode == 38) { // up
      var selected = $(".selected");
      $("#output .typeahead__list li").removeClass("selected");
      if (selected.prev().length == 0) {
          selected.siblings().last().addClass("selected");
      } else {
          selected.prev().addClass("selected");
      }
  }
  if (event.keyCode == 40) { // down
    var selected = $(".selected");
      $("#output .typeahead__list li").removeClass("selected");
      if (selected.next().length == 0) {
          selected.siblings().first().addClass("selected");
      } else {
          selected.next().addClass("selected");
      }
  }

  });
});

const updateNameReducer = (state = {}, actions) => {
  let { name = '', email = '' } = actions;
  switch (actions.type) {
    case 'UPDATE_INFO':
      return Object.assign({}, state, {
        name: actions.value.name,
        email:  actions.value.email
      });
    default:
      return state
  }
}


const updateNameStore = Redux.createStore(updateNameReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

$('#btnUpdate').click(function() {
    let name = $('#txtName').val();
    let email = $('#txtEmail').val();
    updateNameStore.dispatch({
      type: 'UPDATE_INFO',
      value: {name, email}
  });
});


updateNameStore.subscribe(() => {
  let { name, email } = updateNameStore.getState();
  $('#spnResult').html('<span>The name is: <b>' + name + '</b> and email address is: <b> ' + email + '</b></span>');
});


$(document).on("mouseover","#output .typeahead__list li",function() {
  $("#output .typeahead__list li").removeClass("selected");
  $(this).addClass("selected");
});





var e = {}; //lets store references to the dom elemements
Array.prototype.slice.call(document.querySelectorAll("[id]")).
  forEach(function (el) { e[el.id] = el; });


function UndoRedo(update_callback, clear_callback) {
  console.log(update_callback);
  this.update_callback = update_callback;
  this.clear_callback = clear_callback;
  this.clear();
}

UndoRedo.prototype = {
  
  clear: function () {
    this.stack = [];
    this.stackPos = 0;  
    if (this.clear_callback) this.clear_callback();
    this.update();
  },
  
  update: function () {
    if (this.update_callback) this.update_callback();
  },
  
  canUndo: function () { 
    return this.stackPos > 0; 
  },

  canRedo: function () {
    return this.stackPos < this.stack.length;
  },

  doAction: function (doProc, undoProc) {
    this.stack.splice(this.stackPos);
    this.stack.push({
      do: doProc,
      undo: undoProc
    });
    this.stackPos ++;
    doProc(); 
    this.update();
    console.log(this.stack);
  },
  
  undo: function () {
    var p = this.stack[this.stackPos - 1];
    this.stackPos --;
    p.undo();
    this.update();
  },
  
  redo: function () {
    var p = this.stack[this.stackPos];
    this.stackPos ++;
    p.do();    
    this.update();
  }
  
};  



var names = [];
var undoRedo = new UndoRedo(
      function update() {
        e.lbNames.textContent = names.join(', ');
        e.btUndo.disabled = !this.canUndo();
        e.btRedo.disabled = !this.canRedo();
        e.lbBuffer.textContent = this.stack.length;
      },
      function cleared() {
        names = [];
      }
    );

btAdd.onclick = function () {
  if (!ipName.value) return alert("Please enter some text");
  
  undoRedo.doAction(
    
    function add(name) {
      return function () {
        e.ipName.value = '';
        e.ipName.focus();
        names.push(name);
      }
    }(ipName.value), 
    
    function undo() {
      names.pop(); 
    }
    
  );  
};

btUndo.onclick = function () {
  undoRedo.undo();
};

btRedo.onclick = function () {
  undoRedo.redo();
};

btClear.onclick = function () {
  undoRedo.clear();
}