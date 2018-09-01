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
})

// Shortcut Definition to hide searchbar
Mousetrap.bind('esc', function(e) {
  $(".SearchInputWrapperOwerlay").hide()
})

$(document).ready(function($) {

  // Hide Search Input at beginning
  $(".SearchInputWrapperOwerlay").hide()

  $.getJSON("elements.json", function(json) {
    // console.log(json)
    list = json;
    fuse = new Fuse(list, options); // "list" is the item array
  });
  
  $("#searchInput").change(function(event) {
    var searchText = $(event.currentTarget).val()
    var result = fuse.search(searchText);
    console.log(result)
  });
});