# fuzzyjs
fuzzy search in one or more column values and sort based on most matched

Get the list of all html elements with these 3 values
```
[
{image:"path to image", element:"header", "this can contain text"},
{image:"path to image", element:"label", "can contain only text"},
{image:"path to image", element:"input", "can show input text"}
]
```

Show the search like Alfred or Quick search 
put a visual here with expected results for "tex", "selec", "but" etc.

![](https://github.com/cksachdev/fuzzyjs/wiki/images/ex1.png)
![](https://github.com/cksachdev/fuzzyjs/wiki/images/ex2.png)
![](https://github.com/cksachdev/fuzzyjs/wiki/images/ex3.png)


1. Use mousetrap library to fade in/ fade out the search element
https://github.com/ccampbell/mousetrap
2. element stays always on top(z-index)
3. 30 px from top and horizontal center aligned
4. On search show image as well as the element name




## References:
1. Images taken from https://github.com/nathanielw/Bootstrap-Pencil-Stencils/releases/tag/v1.1.1
2. Creating json using
```
ls | head -100 > ../elements.json
```
3. Use multi cursor feature in sublime to form the test json
4. Choices.js https://joshuajohnson.co.uk/Choices/
   Note: Scroll to the end of this page to experience the last dom element.


### Libraries:

https://github.com/krisk/fuse

https://github.com/bevacqua/fuzzysearch

https://blog.kentcdodds.com/introducing-downshift-for-react-b1de3fca0817

https://twitter.github.io/typeahead.js/

https://redux.js.org/recipes/implementingundohistory

https://github.com/omnidan/redux-undo






