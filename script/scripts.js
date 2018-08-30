var options = {
  shouldSort: true,
  includeScore: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "author.firstName"
]
};
var fuse = new Fuse(list, options); // "list" is the item array

$(document).ready(function($) {
  $("#searchInput").change(function(event) {
    var result = fuse.search("ange");
    
  });
});