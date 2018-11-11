This document is a guide for whom want to make tab style from scratch.

# HTML structure
Main tab container html structure when using default CSS class options:
```
.region > .tab-container
	> .label-container
		> .label-item
		> .label-item
		> .label-item
		> .label-item
		> ...
	> .panel-container
		> .panel-item
		> .panel-item
		> .panel-item
		> .panel-item
		> ...
```

# Options for CSS class names
Class names can be customized by several options:
- `tabContainerClass`
	- `tabContainerClass`-horizontal
	- `tabContainerClass`-vertical
- `labelContainerClass`
	- `labelContainerClass`-header
	- `labelContainerClass`-footer
	- `labelContainerClass`-horizontal
	- `labelContainerClass`-vertical
	- `labelContainerClass`-header-horizontal
	- `labelContainerClass`-header-vertical
- `labelItemClass`
	- `labelItemClass`-active
	- `labelItemClass`-inactive
	- `labelItemClass`-disabled
	- `labelItemClass`-hidden
- `panelContainerClass`
	- `panelContainerClass`-horizontal
	- `panelContainerClass`-vertical
- `panelItemClass`
	- `panelItemClass`-active
	- `panelItemClass`-inactive
	- `panelItemClass`-disabled
	- `panelItemClass`-hidden

# Options for templates
Template options can be specified to change one item's element type, or add extra inner wrappers.
- `tabContainerTemplate`
- `labelContainerTemplate`
- `labelItemTemplate`
- `panelContainerTemplate`
- `panelItemTemplate`

# Description
Current active tab item label and panel should be visible.
Apply visibility styles on class "`labelItemClass`-active" and "`panelItemClass`-active".
Non active label and panel will have class "`labelItemClass`-inactive" and "`panelItemClass`-inactive".

Disabled label item which has class "`labelItemClass`-disabled" could have gray background depends your requirement.
However, disabled tab item's panel does not have to be applied for special style, normally.
An disabled tab item can still be switched by controller methods.

Hidden tab item has a similar situation compares to disabled one, except label item should be hidden.
