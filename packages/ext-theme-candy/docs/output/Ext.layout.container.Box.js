Ext.data.JsonP.Ext_layout_container_Box({"tagname":"class","name":"Ext.layout.container.Box","alternateClassNames":[],"members":[{"name":"","tagname":"method","owner":"Ext.layout.container.Box","id":"method-","meta":{"private":true}}],"aliases":{},"files":[{"filename":"","href":""}],"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.layout.container.Box'>Ext.layout.container.Box</span><br/><a href='source/ext-theme-candy-all-debug_01.css.html#Ext-layout-container-Box-method-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.layout.container.Box-method-' class='name expandable'></a>( <span class='pre'>$ui, $type, [$horizontal-width], [$horizontal-height], [$vertical-width], [$vertical-height], [$top-margin], [$right-margin], [$bottom-margin], [$left-margin], $top-background-image, $right-background-image, $bottom-background-image, $left-background-image, [$border-color], [$horizontal-border-width], [$vertical-border-width], [$container-padding], [$cursor], [$cursor-disabled], [$align], [$opacity], [$opacity-over], [$opacity-pressed], [$opacity-disabled], [$classic]</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Creates a visual theme for a Box Scroller ...</div><div class='long'><p>Creates a visual theme for a Box Scroller</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>$ui</span> : string<div class='sub-desc'><p>The name of the UI being created. Can not included spaces or special punctuation\n(used in CSS class names).</p>\n</div></li><li><span class='pre'>$type</span> : string<div class='sub-desc'><p>The type of component that this box scroller will be used with.  For example 'toolbar'\nor 'tab-bar'</p>\n</div></li><li><span class='pre'>$horizontal-width</span> : number (optional)<div class='sub-desc'><p>The width of horizontal scroller buttons</p>\n<p>Defaults to: <code>16px</code></p></div></li><li><span class='pre'>$horizontal-height</span> : Number (optional)<div class='sub-desc'><p>The height of horizontal scroller buttons</p>\n<p>Defaults to: <code>16px</code></p></div></li><li><span class='pre'>$vertical-width</span> : number (optional)<div class='sub-desc'><p>The width of vertical scroller buttons</p>\n<p>Defaults to: <code>16px</code></p></div></li><li><span class='pre'>$vertical-height</span> : Number (optional)<div class='sub-desc'><p>The height of vertical scroller buttons</p>\n<p>Defaults to: <code>16px</code></p></div></li><li><span class='pre'>$top-margin</span> : number/list (optional)<div class='sub-desc'><p>The margin of the \"top\" scroller button</p>\n<p>Defaults to: <code>0</code></p></div></li><li><span class='pre'>$right-margin</span> : number/list (optional)<div class='sub-desc'><p>The margin of the \"right\" scroller button</p>\n<p>Defaults to: <code>0</code></p></div></li><li><span class='pre'>$bottom-margin</span> : number/list (optional)<div class='sub-desc'><p>The margin of the \"bottom\" scroller button</p>\n<p>Defaults to: <code>0</code></p></div></li><li><span class='pre'>$left-margin</span> : number/list (optional)<div class='sub-desc'><p>The margin of the \"left\" scroller button</p>\n<p>Defaults to: <code>0</code></p></div></li><li><span class='pre'>$top-background-image</span> : number/list<div class='sub-desc'><p>The background-image of the \"top\" scroller button</p>\n</div></li><li><span class='pre'>$right-background-image</span> : number/list<div class='sub-desc'><p>The background-image of the \"right\" scroller button</p>\n</div></li><li><span class='pre'>$bottom-background-image</span> : number/list<div class='sub-desc'><p>The background-image of the \"bottom\" scroller button</p>\n</div></li><li><span class='pre'>$left-background-image</span> : number/list<div class='sub-desc'><p>The background-image of the \"left\" scroller button</p>\n</div></li><li><span class='pre'>$border-color</span> : color (optional)<div class='sub-desc'><p>The border-color of the scroller buttons</p>\n<p>Defaults to: <code>$base-color</code></p></div></li><li><span class='pre'>$horizontal-border-width</span> : number (optional)<div class='sub-desc'><p>The border-width of the scroller buttons</p>\n<p>Defaults to: <code>0</code></p></div></li><li><span class='pre'>$vertical-border-width</span> : number (optional)<div class='sub-desc'><p>The border-width of the scroller buttons</p>\n<p>Defaults to: <code>0</code></p></div></li><li><span class='pre'>$container-padding</span> : number/list (optional)<div class='sub-desc'><p>The padding of the container that these scroller buttons will be used in.  Used for\nsetting margin offsets of the inner layout element to reserve space for the scrollers.</p>\n<p>Defaults to: <code>0</code></p></div></li><li><span class='pre'>$cursor</span> : string (optional)<div class='sub-desc'><p>The type of cursor to display when the mouse is over a scroller button</p>\n<p>Defaults to: <code>pointer</code></p></div></li><li><span class='pre'>$cursor-disabled</span> : string (optional)<div class='sub-desc'><p>The type of cursor to display when the mouse is over a disabled scroller button</p>\n<p>Defaults to: <code>default</code></p></div></li><li><span class='pre'>$align</span> : string (optional)<div class='sub-desc'><p>Vertical alignment of the scroller buttons, or horizontal align of vertically oriented\nscroller buttons. Can be one of the following values:</p>\n\n<ul>\n<li><code>begin</code></li>\n<li><code>middle</code></li>\n<li><code>end</code></li>\n<li><code>stretch</code></li>\n</ul>\n\n<p>Defaults to: <code>middle</code></p></div></li><li><span class='pre'>$opacity</span> : number (optional)<div class='sub-desc'><p>The opacity of the scroller buttons. Only applicable when <code>$classic</code> is <code>false</code>.</p>\n<p>Defaults to: <code>0.6</code></p></div></li><li><span class='pre'>$opacity-over</span> : number (optional)<div class='sub-desc'><p>The opacity of hovered scroller buttons. Only applicable when <code>$classic</code> is <code>false</code>.</p>\n<p>Defaults to: <code>0.8</code></p></div></li><li><span class='pre'>$opacity-pressed</span> : number (optional)<div class='sub-desc'><p>The opacity of pressed scroller buttons. Only applicable when <code>$classic</code> is <code>false</code>.</p>\n<p>Defaults to: <code>1</code></p></div></li><li><span class='pre'>$opacity-disabled</span> : number (optional)<div class='sub-desc'><p>The opacity of disabled scroller buttons. Only applicable when <code>$classic</code> is <code>false</code>.</p>\n<p>Defaults to: <code>0.25</code></p></div></li><li><span class='pre'>$classic</span> : boolean (optional)<div class='sub-desc'><p><code>true</code> to use classic-style scroller buttons.  When <code>true</code> scroller buttons are given\ntheir hover state by changing their background-position,  When <code>false</code> scroller buttons\nare given their hover state by applying opacity.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul></div></div></div></div></div></div></div>","meta":{}});