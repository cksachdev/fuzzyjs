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
Mousetrap.bind('ctrl+shift+k', function (e) {
  $(".SearchInputWrapperOwerlay").show()
  $("#searchInput")
    .val('')
    .focus();
});


// Shortcut Definition to hide searchbar
Mousetrap.bind('esc', function (e) {
  $(".SearchInputWrapperOwerlay").hide();
});

var element = document.getElementById("SearchInputWrapper");
Mousetrap(element).bind(['up','down'], function(event) { 
   event.stopPropagation();
   if(event.key == "ArrowUp") {
    var selected = $(".selected");
    $("#output .typeahead__list li").removeClass("selected");
    if (selected.prev().length == 0) {
      selected.siblings().last().addClass("selected");
    } else {
      selected.prev().addClass("selected");
    }
   }

   if(event.key == "ArrowDown") {
    var selected = $(".selected");
    $("#output .typeahead__list li").removeClass("selected");
    if (selected.next().length == 0) {
      selected.siblings().first().addClass("selected");
    } else {
      selected.next().addClass("selected");
    }
   }
});

Mousetrap(element).bind(['left','right'], function(event) { 
  $("#searchInput").focus();
});

$(document).ready(function ($) {

  // Hide Search Input at beginning
  $(".SearchInputWrapperOwerlay").hide();

  $.getJSON("elements.json", function (json) {
    // console.log(json)
    list = json;
    fuse = new Fuse(list, options); // "list" is the item array
  });

  $("#searchInput").keyup(function (event) {

    const key = event.key;

    if(event.keyCode >= 37 && event.keyCode <= 40) {
      event.stopImmediatePropagation();
      return;
  }

    var searchText = $(event.currentTarget).val();
    var result = fuse.search(searchText);
    // console.log(event);

    if (result.length == 0) {
      $("#output").removeClass("show");
      return false;
    }

    var data = {
      people: result
    };
    var tmpl = $.templates("#tmplList");
    var html = tmpl.render(data);
    $("#output").empty().html(html).addClass("show");

    if($("#output .typeahead__list li.selected").length == 0){
      $("#output .typeahead__list li").first().addClass("selected"); 
    }
  });
});

$(document).on("mouseover", "#output .typeahead__list li", function () {
  $("#output .typeahead__list li").removeClass("selected");
  $(this).addClass("selected");
});

