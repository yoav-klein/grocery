# Line Heights
---

## Background
In a category card, we have a list of items. Each item is a row with a few items, and each column is a field: item name, quantity, quantity-type. The columns in each page is a bit different - in products we have a kebab menu button, in fixed-list we have a stepper, etc.

## Problem
Some fields in a row has a different font-size - item-name is 1rem, item-quantity and item-quantity-type is a bit smaller.
That creates a problem, since we want the text to be aligned consistently along the row. But if you change the font-size, then the line-height is also changed, so that the smaller text appears a bit higher than the bigger text.

## Mental model 
There are several factors to consider here. It's a grid container, so each row track has its height. In this case, the height of the tracks are `auto`, so they're determined by the content, which is fine.
Inside the grid areas the <p> elements are arranged. Now, the text inside the p element is called the _content box_. For text, there's the `line-height`, and the text is inside the line-height. By default, line-height is usually 1.2, which is a multiplying factor to the font size. The recommendation is 1.5.
The text is in the middle of the line height (roughly).

Now, we could use `align-items: center`, but then, when the item-name is long and it wraps to another line, the item-quantity will be in the middle of the box, which is not what we want. We want it to be aligned with the first line of text.

## Solution
The best solution I found is to have the `line-height` of all the grid items the same. Then, all the text, nevermind its size, is pretty much aligned.



## Context
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model
- https://en.wikipedia.org/wiki/Baseline_(typography)

