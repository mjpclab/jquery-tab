# Quick Overview
## Changed Options
Options in 1.x | Changed in 2.x
----------------|----------------------
`fnShowPageItem` | Renamed to `fnShowPanelItem`.
`fnHidePageItem` | Renamed to `fnHidePanelItem`.
`titleContentFilter` | Renamed to `fnGetTitleContent`.
`showTopLabelContainer` | Renamed to `showHeaderLabelContainer`.
`showBottomLabelContainer` | Renamed to `showFooterLabelContainer`.
`showTopLabelContainer` | Renamed to `showHeaderLabelContainer`.
`showBottomLabelContainer` | Renamed to `showFooterLabelContainer`.
`topLabelContainerClass` | Removed. Now uses "`labelContainerClass`-header".
`bottomLabelContainerClass` | Removed. Now uses "`labelContainerClass`-footer".
`pageContainerTemplate` | Renamed to `panelContainerTemplate`.
`pageContainerClass` | Renamed to `panelContainerClass`.
`pageItemTemplate` | Renamed to `panelItemTemplate`.
`pageItemClass` | Renamed to `panelItemClass`.
`pageItemActiveClass` | Removed. Now uses "`panelItemClass`-active".
`pageItemInactiveClass` | Removed. Now uses "`panelItemClass`-inactive".

## Get Controller
In 1.x:
```javascript
var controller = $('.tab-container').data('jquery-tab-controller');
```

In 2.x, controller is from jquery element data `tab-controller`, without the prefix "jquery-":
```javascript
var controller = $('.tab-container').data('tab-controller');
```

## Changed controller Methods
Controller Methods in 1.x | Changed in 2.x
----------------|----------------------
`getTopLabel` | Renamed to `getHeaderLabel`.
`getBottomLabel` | Renamed to `getFooterLabel`.
`getTopBottomLabels` | Renamed to `getHeaderFooterLabels`.
`getPage` | Renamed to `getPanel`.
`addTabPage` | Renamed to `addTabItem`.
`insertTabPage` | Renamed to `insertTabItem`.

# Changed Concept
All tab "page"s are now "panel"s. This rename helps to:
* Preventing mix with html "page"
* Align with the "tabpanel" role in ARIA standard

# Use default theme
In 1.x, there are 2 ways to use default theme:
* importing module `jquery-tab/with-css` instead of `jquery-tab`
* manually import CSS files from `src/css/`

In 2.x, there are 2 ways to use default theme:
* importing module `jquery-tab/src/built/theme/gray` which contains CSS only
* manually import single CSS theme file from `dist/theme/`

# New Features
## vertical labels by `mode` option
Specifying `mode` option to "vertical" will add vertical class to tab container.
Default theme has implemented the vertical label container UI correctly.
Notice that vertical style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.

## nested tab works with default theme
Now nested tab container works. See demo at `demo/simple-vert-tabs.html`.

## `data-` attribute options
Options can now be specified on "region" container(the wrapper of tab content source), by html attribute with prefix "data-" and words are in lower case, separated by "-":
```html
<div class="region" data-active-index="1">
	......
</div>
```

## auto enable
Region containers that has class `tab-region` will apply jquery-tab plugin automatically.

That would be convenient if using this class name with attribute options. Then no javascript code is needed in most cases:
```html
<div class="tab-region" data-active-index="1">
	......
</div>
```

## save load callback
Specifying option `fnSaveIndex` and `fnLoadIndex` to customize the save/load current active tab index logic.

## ARIA integrated
ARIA support is now integrated into jquery-tab.
