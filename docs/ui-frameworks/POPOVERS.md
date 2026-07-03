# Popovers
---

## Overview
A common UI element is popovers - a button that you click and it opens a small menu next to the button. This can be the menu of the user avatar in the top of the page or kebab menus. What I want is a framework that will allow me to easily create popovers.

The desired functionality is this:
* Each popover has a button that triggers it. The button opens and closes the popovers.
* Clicking outside the popover closes the popover.
* Clicking inside the popover doesn't close the popover. However, we want to enable the developer to easily define certain buttons inside the popover that once clicked, will close the popover.

## Styles
Although we strive to separate styles from behavior, there are some common styles that are applied to the popover elements in 99% of the cases, such as borders, background-color, stuff like that. So we have those styles in the `popovers.css`, and they will be applied automatically to every popover that you put in your HTML.

However, there are styles that should be applied specifically to each popover, such as the location of the menu (top, right, left, etc.). For this, give each specific popover a special class name (like `member-popover`), and apply styles to the `ui-popover-` elements inside that class selector (e.g. `.member-popover .ui-popover-menu`).