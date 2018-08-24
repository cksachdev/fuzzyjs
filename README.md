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


1. Use mousetrap library to fade in/ fade out the search element
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





