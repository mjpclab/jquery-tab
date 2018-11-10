# Changed Options
Options in 2.x | Changed in 3.x
----------------|----------------------
`fnShowPanelItem` | Removed. Use CSS to control panel item visibility.
`fnHidePanelItem` | Removed. Use CSS to control panel item visibility.
`fnSaveIndex(index)` | Removed. Use `fnSavePosition(name\|index)` instead.
`fnLoadIndex` | Removed. Use `fnLoadPosition` instead.
`activeIndex` | Removed. Use `activePosition` instead.

# Changed Controller Methods
Controller Methods in 2.x | Changed in 3.x
----------------|----------------------
`addTabItem(title, content)` | `addTabItem({title, content, name?, disabled?, hidden?})`
`insertTabItem(title, content, index)` | `insertTabItem(before-name\|before-index, {title, content, name?, disabled?, hidden?})`
`remove(index)` | extended parameter as `remove(name\|index, ...)`

# New Individual Tab Item property
Individual tab item property can be specified on title element:
```html
<div class="region">
	<h1 data-tab-item-name="first-item">title 1</h1>
	<p>tab 1 content</p>

	<h1 data-tab-item-disabled="true">title 2</h1>
	<p>tab 2 content</p>
</div>
```
Supported properties:
- tabItemName
- tabItemDisabled
- tabItemHidden

If you want to customize the logic of getting tab item properties, some new options are available:
- fnGetTabItemName
- fnIsTabItemDisabled
- fnIsTabItemHidden

# New Controller Methods
- getIndexByName(name)
- getName(index)
- setName(name|index, newName)
- getCurrentName()
- isDisabled(name|index)
- isEnabled(name|index)
- setDisabled(name|index, isDisabled=true)
- setEnabled(name|index, isEnabled=true)
- isHidden(name|index)
- isVisible(name|index)
- setHidden(name|index, isHidden=true)
- setVisible(name|index, isVisible=true)
- getCurrentHeaderLabel()
- getCurrentFooterLabel()
- getCurrentHeaderFooterLabels()
- getCurrentPanel()
- switchPrevious({includeDisabled?, includeHidden?, loop?}?)
- switchNext({includeDisabled?, includeHidden?, loop?}?)
