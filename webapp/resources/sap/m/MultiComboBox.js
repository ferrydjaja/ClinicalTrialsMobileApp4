/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./InputBase','./ComboBoxTextField','./ComboBoxBase','./Input','./ToggleButton','./List','./Popover','./library','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','sap/ui/core/library','sap/ui/Device','sap/ui/core/Item','./MultiComboBoxRenderer','jquery.sap.xml','jquery.sap.keycodes'],function(q,I,C,a,b,T,L,P,l,E,c,d,D,e,M){"use strict";var f=l.ListType;var g=l.ListMode;var V=d.ValueState;var O=d.OpenState;var h=a.extend("sap.m.MultiComboBox",{metadata:{library:"sap.m",designtime:"sap/m/designtime/MultiComboBox.designtime",properties:{selectedKeys:{type:"string[]",group:"Data",defaultValue:[]}},associations:{selectedItems:{type:"sap.ui.core.Item",multiple:true,singularName:"selectedItem"}},events:{selectionChange:{parameters:{changedItem:{type:"sap.ui.core.Item"},selected:{type:"boolean"}}},selectionFinish:{parameters:{selectedItems:{type:"sap.ui.core.Item[]"}}}}}});c.insertFontFaceStyle();E.apply(h.prototype,[true]);h.prototype.onsapend=function(o){sap.m.Tokenizer.prototype.onsapend.apply(this._oTokenizer,arguments);};h.prototype.onsaphome=function(o){sap.m.Tokenizer.prototype.onsaphome.apply(this._oTokenizer,arguments);};h.prototype.onsapdown=function(o){if(!this.getEnabled()||!this.getEditable()){return;}o.setMarked();o.preventDefault();var i=this.getSelectableItems();var j=i[0];if(j&&this.isOpen()){this.getListItem(j).focus();return;}if(this._oTokenizer.getSelectedTokens().length){return;}this._oTraversalItem=this._getNextTraversalItem();if(this._oTraversalItem){this.updateDomValue(this._oTraversalItem.getText());this.selectText(0,this.getValue().length);}};h.prototype.onsapup=function(o){if(!this.getEnabled()||!this.getEditable()){return;}o.setMarked();o.preventDefault();if(this._oTokenizer.getSelectedTokens().length){return;}this._oTraversalItem=this._getPreviousTraversalItem();if(this._oTraversalItem){this.updateDomValue(this._oTraversalItem.getText());this.selectText(0,this.getValue().length);}};h.prototype.onsapshow=function(o){var i=this.getList(),p=this.getPicker(),s=this.getSelectableItems(),S=this.getSelectedItems(),j,k=i.getItemNavigation(),m,n;n=q(document.activeElement).control()[0];if(n instanceof sap.m.Token){j=this._getItemByToken(n);}else{j=S.length?this._getItemByListItem(this.getList().getSelectedItems()[0]):s[0];}m=this.getItems().indexOf(j);if(k){k.setSelectedIndex(m);}else{this._bListItemNavigationInvalidated=true;this._iInitialItemFocus=m;}p.setInitialFocus(i);a.prototype.onsapshow.apply(this,arguments);};h.prototype.onsaphide=h.prototype.onsapshow;h.prototype._selectItemByKey=function(o){var v,p,j,i,k,m=this.isOpen();if(!this.getEnabled()||!this.getEditable()){return;}if(o){o.setMarked();}v=this._getUnselectedItems(m?"":this.getValue());for(i=0;i<v.length;i++){if(v[i].getText().toUpperCase()===this.getValue().toUpperCase()){j=v[i];k=true;break;}}if(k){p={item:j,id:j.getId(),key:j.getKey(),fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true,listItemUpdated:false};this._bPreventValueRemove=false;if(this.getValue()===""||q.sap.startsWithIgnoreCase(j.getText(),this.getValue())){if(this.getListItem(j).isSelected()){this.setValue('');}else{this.setSelection(p);}}}else{this._bPreventValueRemove=true;this._showWrongValueVisualEffect();}if(o){this.close();}};h.prototype.onsapenter=function(o){I.prototype.onsapenter.apply(this,arguments);if(this.getValue()){this._selectItemByKey(o);}};h.prototype.onsaptabnext=function(o){var i=this.getValue();if(i){var s=this._getUnselectedItemsStartingText(i);if(s.length===1){this._selectItemByKey(o);}else{this._showWrongValueVisualEffect();}}};h.prototype.onsapfocusleave=function(o){var p=this.getAggregation("picker"),t=this.isPlatformTablet(),i=sap.ui.getCore().byId(o.relatedControlId),F=i&&i.getFocusDomRef(),s=this.getValue();if(!p||!p.getFocusDomRef()||!F||!q.contains(p.getFocusDomRef(),F)){this.setValue(null);if(s){this.fireChangeEvent("",{value:s});}if(!(i instanceof sap.m.Token)){this._oTokenizer.scrollToEnd();}}if(p&&F){if(q.sap.equal(p.getFocusDomRef(),F)&&!t&&!this.isPickerDialog()){this.focus();}}};h.prototype.onfocusin=function(o){var i=this.getPickerType()==="Dropdown";if(o.target===this.getFocusDomRef()){this.getEditable()&&this.addStyleClass("sapMMultiComboBoxFocus");}if(o.target===this.getOpenArea()&&i&&!this.isPlatformTablet()){this.focus();}if(!this.isOpen()&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage();}};h.prototype._handleItemTap=function(o){if(o.target.childElementCount===0||o.target.childElementCount===2){this._bCheckBoxClicked=false;if(this.isOpen()&&!this._isListInSuggestMode()){this.close();}}};h.prototype._handleItemPress=function(o){if(this.isOpen()&&this._isListInSuggestMode()&&this.getPicker().oPopup.getOpenState()!==O.CLOSING){this.clearFilter();var i=this._getLastSelectedItem();if(i){this.getListItem(i).focus();}}};h.prototype._handleSelectionLiveChange=function(o){var i=o.getParameter("listItem");var j=o.getParameter("selected");var n=this._getItemByListItem(i);if(i.getType()==="Inactive"){return;}if(!n){return;}var p={item:n,id:n.getId(),key:n.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:true};if(j){this.fireChangeEvent(n.getText());this.setSelection(p);}else{this.fireChangeEvent(n.getText());this.removeSelection(p);}if(this._bCheckBoxClicked){this.setValue(this._sOldValue);if(this.isOpen()&&this.getPicker().oPopup.getOpenState()!==O.CLOSING){i.focus();}}else{this._bCheckBoxClicked=true;this.setValue("");this.close();}};h.prototype.onkeydown=function(o){a.prototype.onkeydown.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return;}this._bIsPasteEvent=(o.ctrlKey||o.metaKey)&&(o.which===q.sap.KeyCodes.V);if(this.getValue().length===0&&(o.ctrlKey||o.metaKey)&&(o.which===q.sap.KeyCodes.A)&&this._hasTokens()){this._oTokenizer.focus();this._oTokenizer.selectAllTokens(true);o.preventDefault();}if(this.isPickerDialog()){this._sOldValue=this.getPickerTextField().getValue();this._iOldCursorPos=q(this.getFocusDomRef()).cursorPos();}};h.prototype.oninput=function(o){a.prototype.oninput.apply(this,arguments);var i=o.srcControl;if(!this.getEnabled()||!this.getEditable()){return;}if(this._bIsPasteEvent){i.updateDomValue(this._sOldValue||"");return;}if(!this._bCompositionStart&&!this._bCompositionEnd){this._handleInputValidation(o,false);}};h.prototype.filterItems=function(i,v){i.forEach(function(o){var m=q.sap.startsWithIgnoreCase(o.getText(),v);if(v===""){m=true;if(!this.bOpenedByKeyboardOrButton){return;}}var j=this.getListItem(o);if(j){j.setVisible(m);}},this);};h.prototype.onkeyup=function(o){if(!this.getEnabled()||!this.getEditable()){return;}this._sOldValue=this.getValue();this._iOldCursorPos=q(this.getFocusDomRef()).cursorPos();};h.prototype._showWrongValueVisualEffect=function(){var o=this.getValueState();if(o===V.Error){return;}if(this.isPickerDialog()){this.getPickerTextField().setValueState(V.Error);q.sap.delayedCall(1000,this.getPickerTextField(),"setValueState",[o]);}else{this.setValueState(V.Error);q.sap.delayedCall(1000,this,"setValueState",[o]);}};h.prototype.createPicker=function(p){var o=this.getAggregation("picker");if(o){return o;}o=this["create"+p]();this.setAggregation("picker",o,true);var r=this.getRenderer(),i=r.CSS_CLASS_MULTICOMBOBOX;o.setHorizontalScrolling(false).addStyleClass(r.CSS_CLASS_COMBOBOXBASE+"Picker").addStyleClass(i+"Picker").addStyleClass(i+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.getList());return o;};h.prototype.createPickerTextField=function(){return new b();};h.prototype.onBeforeRendering=function(){a.prototype.onBeforeRendering.apply(this,arguments);var i=this.getItems();var o=this.getList();if(o){this._synchronizeSelectedItemAndKey(i);o.destroyItems();this._clearTokenizer();this._fillList(i);if(o.getItemNavigation()){this._iFocusedIndex=o.getItemNavigation().getFocusedIndex();}this.setEditable(this.getEditable());}};h.prototype.onBeforeRenderingPicker=function(){var o=this["_onBeforeRendering"+this.getPickerType()];if(o){o.call(this);}};h.prototype.onAfterRenderingPicker=function(){var o=this["_onAfterRendering"+this.getPickerType()];if(o){o.call(this);}};h.prototype.onBeforeOpen=function(){var p=this["_onBeforeOpen"+this.getPickerType()];this.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");this._resetCurrentItem();this.addContent();this._aInitiallySelectedItems=this.getSelectedItems();if(p){p.call(this);}};h.prototype.onAfterOpen=function(){if(!this.isPlatformTablet()){this.getPicker().setInitialFocus(this);}this.closeValueStateMessage();};h.prototype.onBeforeClose=function(){a.prototype.onBeforeClose.apply(this,arguments);};h.prototype.onAfterClose=function(){this.removeStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");this.clearFilter();!this._bPreventValueRemove&&this.setValue("");this._sOldValue="";if(this.isPickerDialog()){this.getPickerTextField().setValue("");this._getFilterSelectedButton().setPressed(false);}this.fireSelectionFinish({selectedItems:this.getSelectedItems()});};h.prototype._onBeforeOpenDialog=function(){};h.prototype._onBeforeOpenDropdown=function(){var p=this.getPicker(),o=this.getDomRef(),w;if(o&&p){w=(o.offsetWidth/parseFloat(l.BaseFontSize))+"rem";p.setContentMinWidth(w);}};h.prototype._decoratePopover=function(p){var t=this;p.open=function(){return this.openBy(t);};};h.prototype.createDropdown=function(){var o=new P(this.getDropdownSettings());o.setInitialFocus(this);this._decoratePopover(o);return o;};h.prototype.createDialog=function(){var o=a.prototype.createDialog.apply(this,arguments),s=this._createFilterSelectedButton();o.getSubHeader().addContent(s);return o;};h.prototype._createFilterSelectedButton=function(){var i=c.getIconURI("multiselect-all"),r=this.getRenderer(),t=this;return new T({icon:i,press:t._filterSelectedItems.bind(this)}).addStyleClass(r.CSS_CLASS_MULTICOMBOBOX+"ToggleButton");};h.prototype._getFilterSelectedButton=function(){return this.getPicker().getSubHeader().getContent()[1];};h.prototype._filterSelectedItems=function(o){var B=o.oSource,i,m,v=this.getPickerTextField().getValue(),p=B.getPressed(),j=this.getVisibleItems(),k=this.getItems(),s=this.getSelectedItems();if(p){j.forEach(function(n){m=s.indexOf(n)>-1?true:false;i=this.getListItem(n);if(i){i.setVisible(m);}},this);}else{this.filterItems(k,v);}};h.prototype.revertSelection=function(){this.setSelectedItems(this._aInitiallySelectedItems);};h.prototype.createList=function(){var r=this.getRenderer();this._oList=new L({width:"100%",mode:g.MultiSelect,includeItemInSelection:true,rememberSelections:false}).addStyleClass(r.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(r.CSS_CLASS_MULTICOMBOBOX+"List").attachBrowserEvent("tap",this._handleItemTap,this).attachSelectionChange(this._handleSelectionLiveChange,this).attachItemPress(this._handleItemPress,this);this._oList.addEventDelegate({onAfterRendering:this.onAfterRenderingList,onfocusin:this.onFocusinList},this);};h.prototype.setSelection=function(o){if(o.item&&this.isItemSelected(o.item)){return;}if(!o.item){return;}if(!o.listItemUpdated&&this.getListItem(o.item)){this.getList().setSelectedItem(this.getListItem(o.item),true);}var t=new sap.m.Token({key:o.key});t.setText(o.item.getText());t.setTooltip(o.item.getText());o.item.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Token",t);this._oTokenizer.addToken(t);this.$().toggleClass("sapMMultiComboBoxHasToken",this._hasTokens());this.setValue('');this.addAssociation("selectedItems",o.item,o.suppressInvalidate);var s=this.getKeys(this.getSelectedItems());this.setProperty("selectedKeys",s,o.suppressInvalidate);if(o.fireChangeEvent){this.fireSelectionChange({changedItem:o.item,selected:true});}if(o.fireFinishEvent){if(!this.isOpen()){this.fireSelectionFinish({selectedItems:this.getSelectedItems()});}}};h.prototype.removeSelection=function(o){if(o.item&&!this.isItemSelected(o.item)){return;}if(!o.item){return;}this.removeAssociation("selectedItems",o.item,o.suppressInvalidate);var s=this.getKeys(this.getSelectedItems());this.setProperty("selectedKeys",s,o.suppressInvalidate);if(!o.listItemUpdated&&this.getListItem(o.item)){this.getList().setSelectedItem(this.getListItem(o.item),false);}if(!o.tokenUpdated){var t=this._getTokenByItem(o.item);o.item.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Token",null);this._oTokenizer.removeToken(t);}this.$().toggleClass("sapMMultiComboBoxHasToken",this._hasTokens());if(o.fireChangeEvent){this.fireSelectionChange({changedItem:o.item,selected:false});}if(o.fireFinishEvent){if(!this.isOpen()){this.fireSelectionFinish({selectedItems:this.getSelectedItems()});}}};h.prototype._synchronizeSelectedItemAndKey=function(j){if(!j.length){q.sap.log.info("Info: _synchronizeSelectedItemAndKey() the MultiComboBox control does not contain any item on ",this);return;}var s=this.getSelectedKeys()||this._aCustomerKeys;var k=this.getKeys(this.getSelectedItems());if(s.length){for(var i=0,K=null,o=null,m=null,n=s.length;i<n;i++){K=s[i];if(k.indexOf(K)>-1){if(this._aCustomerKeys.length&&(m=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(m,1);}continue;}o=this.getItemByKey(""+K);if(o){if(this._aCustomerKeys.length&&(m=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(m,1);}this.setSelection({item:o,id:o.getId(),key:o.getKey(),fireChangeEvent:false,suppressInvalidate:true,listItemUpdated:false});}}return;}};h.prototype._getTokenByItem=function(i){return i?i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Token"):null;};h.prototype.updateItems=function(r){var k,i,K=this.getSelectedKeys();var u=a.prototype.updateItems.apply(this,arguments);i=this.getSelectedItems();k=(i.length===K.length)&&i.every(function(o){return o&&o.getKey&&K.indexOf(o.getKey())>-1;});if(!k){i=K.map(this.getItemByKey,this);this.setSelectedItems(i);}return u;};h.prototype._getSelectedItemsOf=function(j){for(var i=0,k=j.length,s=[];i<k;i++){if(this.getListItem(j[i]).isSelected()){s.push(j[i]);}}return s;};h.prototype._getLastSelectedItem=function(){var t=this._oTokenizer.getTokens();var o=t.length?t[t.length-1]:null;if(!o){return null;}return this._getItemByToken(o);};h.prototype._getOrderedSelectedItems=function(){var j=[];for(var i=0,t=this._oTokenizer.getTokens(),k=t.length;i<k;i++){j[i]=this._getItemByToken(t[i]);}return j;};h.prototype._getFocusedListItem=function(){if(!document.activeElement){return null;}var F=sap.ui.getCore().byId(document.activeElement.id);if(this.getList()&&q.sap.containsOrEquals(this.getList().getFocusDomRef(),F.getFocusDomRef())){return F;}return null;};h.prototype._getFocusedItem=function(){var o=this._getFocusedListItem();return this._getItemByListItem(o);};h.prototype._isRangeSelectionSet=function(o){var $=o.getDomRef();return $.indexOf(this.getRenderer().CSS_CLASS_MULTICOMBOBOX+"ItemRangeSelection")>-1?true:false;};h.prototype._hasTokens=function(){return this._oTokenizer.getTokens().length>0;};h.prototype._getCurrentItem=function(){if(!this._oCurrentItem){return this._getFocusedItem();}return this._oCurrentItem;};h.prototype._setCurrentItem=function(i){this._oCurrentItem=i;};h.prototype._resetCurrentItem=function(){this._oCurrentItem=null;};h.prototype._decorateListItem=function(o){o.addDelegate({onkeyup:function(i){var j=null;if(i.which==q.sap.KeyCodes.SPACE&&this.isOpen()&&this._isListInSuggestMode()){this.open();j=this._getLastSelectedItem();if(j){this.getListItem(j).focus();}return;}},onkeydown:function(i){var j=null,k=null;if(i.shiftKey&&i.which==q.sap.KeyCodes.ARROW_DOWN){k=this._getCurrentItem();j=this._getNextVisibleItemOf(k);}if(i.shiftKey&&i.which==q.sap.KeyCodes.ARROW_UP){k=this._getCurrentItem();j=this._getPreviousVisibleItemOf(k);}if(i.shiftKey&&i.which===q.sap.KeyCodes.SPACE){k=this._getCurrentItem();this._selectPreviousItemsOf(k);}if(j&&j!==k){if(this.getListItem(k).isSelected()){this.setSelection({item:j,id:j.getId(),key:j.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._setCurrentItem(j);}else{this.removeSelection({item:j,id:j.getId(),key:j.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._setCurrentItem(j);}return;}this._resetCurrentItem();if((i.ctrlKey||i.metaKey)&&i.which==q.sap.KeyCodes.A){i.setMarked();i.preventDefault();var v=this.getSelectableItems();var s=this._getSelectedItemsOf(v);if(s.length!==v.length){v.forEach(function(j){this.setSelection({item:j,id:j.getId(),key:j.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:false});},this);}else{v.forEach(function(j){this.removeSelection({item:j,id:j.getId(),key:j.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:false});},this);}}}},true,this);o.addEventDelegate({onsapbackspace:function(i){i.preventDefault();},onsapshow:function(i){i.setMarked();if(i.keyCode===q.sap.KeyCodes.F4){i.preventDefault();}if(this.isOpen()){this.close();return;}if(this.hasContent()){this.open();}},onsaphide:function(i){this.onsapshow(i);},onsapenter:function(i){i.setMarked();this.close();},onsaphome:function(i){i.setMarked();i.preventDefault();var v=this.getSelectableItems();var j=v[0];this.getListItem(j).focus();},onsapend:function(i){i.setMarked();i.preventDefault();var v=this.getSelectableItems();var j=v[v.length-1];this.getListItem(j).focus();},onsapup:function(i){i.setMarked();i.preventDefault();var v=this.getSelectableItems();var j=v[0];var k=q(document.activeElement).control()[0];if(k===this.getListItem(j)){this.focus();i.stopPropagation(true);}},onfocusin:function(i){this.addStyleClass(this.getRenderer().CSS_CLASS_MULTICOMBOBOX+"Focused");},onfocusout:function(i){this.removeStyleClass(this.getRenderer().CSS_CLASS_MULTICOMBOBOX+"Focused");},onsapfocusleave:function(i){var p=this.getAggregation("picker");var j=sap.ui.getCore().byId(i.relatedControlId);if(p&&j&&q.sap.equal(p.getFocusDomRef(),j.getFocusDomRef())){if(i.srcControl){i.srcControl.focus();}}}},this);if(D.support.touch){o.addEventDelegate({ontouchstart:function(i){i.setMark("cancelAutoClose");}});}};h.prototype._createTokenizer=function(){var t=new sap.m.Tokenizer({tokens:[]}).attachTokenChange(this._handleTokenChange,this);t.setParent(this);t.addEventDelegate({onAfterRendering:this._onAfterRenderingTokenizer},this);return t;};h.prototype._onAfterRenderingTokenizer=function(){this._oTokenizer.scrollToEnd();};h.prototype._handleTokenChange=function(o){var t=o.getParameter("type");var i=o.getParameter("token");var j=null;if(t!==sap.m.Tokenizer.TokenChangeType.Removed&&t!==sap.m.Tokenizer.TokenChangeType.Added){return;}if(t===sap.m.Tokenizer.TokenChangeType.Removed){j=(i&&this._getItemByToken(i));if(j&&this.isItemSelected(j)){this.removeSelection({item:j,id:j.getId(),key:j.getKey(),tokenUpdated:true,fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true});!this.isPickerDialog()&&this.focus();this.fireChangeEvent("");}}};h.prototype.onAfterRenderingList=function(){var o=this.getList();if(this._iFocusedIndex!=null&&o.getItems().length>this._iFocusedIndex){o.getItems()[this._iFocusedIndex].focus();this._iFocusedIndex=null;}};h.prototype.onFocusinList=function(){if(this._bListItemNavigationInvalidated){this.getList().getItemNavigation().setSelectedIndex(this._iInitialItemFocus);this._bListItemNavigationInvalidated=false;}};h.prototype.onAfterRendering=function(){a.prototype.onAfterRendering.apply(this,arguments);var p=this.getPicker();var o=q(this.getDomRef());var B=o.find(this.getRenderer().DOT_CSS_CLASS_MULTICOMBOBOX+"Border");p._oOpenBy=B[0];};h.prototype.onfocusout=function(o){this.removeStyleClass("sapMMultiComboBoxFocus");a.prototype.onfocusout.apply(this,arguments);};h.prototype.onpaste=function(o){var s;if(window.clipboardData){s=window.clipboardData.getData("Text");}else{s=o.originalEvent.clipboardData.getData('text/plain');}var S=this._oTokenizer._parseString(s);if(S&&S.length>0){this.getSelectableItems().forEach(function(i){if(q.inArray(i.getText(),S)>-1){this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true,listItemUpdated:false});}},this);}};h.prototype.onsapbackspace=function(o){if(!this.getEnabled()||!this.getEditable()){o.preventDefault();return;}if(this.getCursorPosition()>0||this.getValue().length>0){return;}sap.m.Tokenizer.prototype.onsapbackspace.apply(this._oTokenizer,arguments);o.preventDefault();};h.prototype.onsapdelete=function(o){if(!this.getEnabled()||!this.getEditable()){return;}if(this.getValue()&&!this._isCompleteTextSelected()){return;}sap.m.Tokenizer.prototype.onsapdelete.apply(this._oTokenizer,arguments);};h.prototype.onsapnext=function(o){if(o.isMarked()){return;}var F=q(document.activeElement).control()[0];if(!F){return;}if(F===this._oTokenizer||this._oTokenizer.$().find(F.$()).length>0&&this.getEditable()){this.focus();}};h.prototype.onsapprevious=function(o){if(this.getCursorPosition()===0&&!this._isCompleteTextSelected()){if(o.srcControl===this){sap.m.Tokenizer.prototype.onsapprevious.apply(this._oTokenizer,arguments);}}};h.prototype.getOpenArea=function(){if(this.isPickerDialog()){return this.getDomRef();}else{return a.prototype.getOpenArea.apply(this,arguments);}};h.prototype._getItemsStartingText=function(t,i){var j=[],s=i?this.getEnabledItems():this.getSelectableItems();s.forEach(function(o){if(q.sap.startsWithIgnoreCase(o.getText(),t)){j.push(o);}},this);return j;};h.prototype._getUnselectedItemsStartingText=function(t){var i=[];this._getUnselectedItems().forEach(function(o){if(q.sap.startsWithIgnoreCase(o.getText(),t)){i.push(o);}},this);return i;};h.prototype.getCursorPosition=function(){return this._$input.cursorPos();};h.prototype._isCompleteTextSelected=function(){if(!this.getValue().length){return false;}var i=this._$input[0];if(i.selectionStart!==0||i.selectionEnd!==this.getValue().length){return false;}return true;};h.prototype._selectPreviousItemsOf=function(i){var j;do{j=true;var p=this._getPreviousVisibleItemOf(i);if(p){var o=this.getListItem(p);if(o){j=this.getListItem(p).getSelected();}}this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});i=p;}while(!j);};h.prototype._getNextVisibleItemOf=function(i){var j=this.getSelectableItems();var k=j.indexOf(i)+1;if(k<=0||k>j.length-1){return null;}return j[k];};h.prototype._getPreviousVisibleItemOf=function(i){var j=this.getSelectableItems();var k=j.indexOf(i)-1;if(k<0){return null;}return j[k];};h.prototype._getNextUnselectedItemOf=function(i){var j=this._getUnselectedItems();var k=j.indexOf(i)+1;if(k<=0||k>j.length-1){return null;}return j[k];};h.prototype._getPreviousUnselectedItemOf=function(i){var j=this._getUnselectedItems();var k=j.indexOf(i)-1;if(k<0){return null;}return j[k];};h.prototype._getNextTraversalItem=function(){var i=this._getItemsStartingText(this.getValue());var s=this._getUnselectedItems();if(i.indexOf(this._oTraversalItem)>-1&&this._oTraversalItem.getText()===this.getValue()){return this._getNextUnselectedItemOf(this._oTraversalItem);}if(i.length&&i[0].getText()===this.getValue()){return this._getNextUnselectedItemOf(i[0]);}return i.length?i[0]:s[0];};h.prototype._getPreviousTraversalItem=function(){var i=this._getItemsStartingText(this.getValue());if(i.indexOf(this._oTraversalItem)>-1&&this._oTraversalItem.getText()===this.getValue()){return this._getPreviousUnselectedItemOf(this._oTraversalItem);}if(i.length&&i[i.length-1].getText()===this.getValue()){return this._getPreviousUnselectedItemOf(i[i.length-1]);}if(i.length){return i[i.length-1];}else{var s=this._getUnselectedItems();if(s.length>0){return s[s.length-1];}else{return null;}}};h.prototype.findFirstEnabledItem=function(j){j=j||this.getItems();for(var i=0;i<j.length;i++){if(j[i].getEnabled()){return j[i];}}return null;};h.prototype.getVisibleItems=function(){for(var i=0,o,j=this.getItems(),v=[];i<j.length;i++){o=this.getListItem(j[i]);if(o&&o.getVisible()){v.push(j[i]);}}return v;};h.prototype.findLastEnabledItem=function(i){i=i||this.getItems();return this.findFirstEnabledItem(i.reverse());};h.prototype.setSelectedItems=function(i){this.removeAllSelectedItems();if(!i||!i.length){return this;}if(!q.isArray(i)){q.sap.log.warning("Warning: setSelectedItems() has to be an array of sap.ui.core.Item instances or of valid sap.ui.core.Item IDs",this);return this;}i.forEach(function(o){if(!(o instanceof e)&&(typeof o!=="string")){q.sap.log.warning("Warning: setSelectedItems() has to be an array of sap.ui.core.Item instances or of valid sap.ui.core.Item IDs",this);return;}if(typeof o==="string"){o=sap.ui.getCore().byId(o);}this.setSelection({item:o?o:null,id:o?o.getId():"",key:o?o.getKey():"",suppressInvalidate:true});},this);return this;};h.prototype.addSelectedItem=function(i){if(!i){return this;}if(typeof i==="string"){i=sap.ui.getCore().byId(i);}this.setSelection({item:i?i:null,id:i?i.getId():"",key:i?i.getKey():"",fireChangeEvent:false,suppressInvalidate:true});return this;};h.prototype.removeSelectedItem=function(i){if(!i){return null;}if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(!this.isItemSelected(i)){return null;}this.removeSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:false,suppressInvalidate:true});return i;};h.prototype.removeAllSelectedItems=function(){var i=[];var j=this.getAssociation("selectedItems",[]);j.forEach(function(o){var k=this.removeSelectedItem(o);if(k){i.push(k.getId());}},this);return i;};h.prototype.removeSelectedKeys=function(k){var i=[],j;if(!k||!k.length||!q.isArray(k)){return i;}var o;k.forEach(function(K){o=this.getItemByKey(K);if(o){this.removeSelection({item:o?o:null,id:o?o.getId():"",key:o?o.getKey():"",fireChangeEvent:false,suppressInvalidate:true});i.push(o);}if(this._aCustomerKeys.length&&(j=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(j,1);}},this);return i;};h.prototype.setSelectedKeys=function(k){this.removeAllSelectedItems();this._aCustomerKeys=[];this.addSelectedKeys(k);return this;};h.prototype.addSelectedKeys=function(k){k=this.validateProperty("selectedKeys",k);k.forEach(function(K){var i=this.getItemByKey(K);if(i){this.addSelectedItem(i);}else if(K!=null){this._aCustomerKeys.push(K);}},this);return this;};h.prototype.getSelectedKeys=function(){var i=this.getSelectedItems()||[],k=[];i.forEach(function(o){k.push(o.getKey());},this);if(this._aCustomerKeys.length){k=k.concat(this._aCustomerKeys);}return k;};h.prototype._getUnselectedItems=function(){return q(this.getSelectableItems()).not(this.getSelectedItems()).get();};h.prototype.getSelectedItems=function(){var i=[],j=this.getAssociation("selectedItems")||[];j.forEach(function(s){var o=sap.ui.getCore().byId(s);if(o){i.push(o);}},this);return i;};h.prototype.getSelectableItems=function(){return this.getEnabledItems(this.getVisibleItems());};h.prototype.getWidth=function(){return this.getProperty("width")||"100%";};h.prototype.setEditable=function(i){a.prototype.setEditable.apply(this,arguments);this._oTokenizer.setEditable(i);return this;};h.prototype.clearFilter=function(){this.getItems().forEach(function(i){this.getListItem(i).setVisible(i.getEnabled()&&this.getSelectable(i));},this);};h.prototype._isListInSuggestMode=function(){return this.getList().getItems().some(function(o){return!o.getVisible()&&this._getItemByListItem(o).getEnabled();},this);};h.prototype._mapItemToListItem=function(i){if(!i){return null;}var s=this.getRenderer().CSS_CLASS_MULTICOMBOBOX+"Item";var j=(this.isItemSelected(i))?s+"Selected":"";var o=new sap.m.StandardListItem({type:f.Active,visible:i.getEnabled()}).addStyleClass(s+" "+j);o.setTooltip(i.getTooltip());i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"ListItem",o);o.setTitle(i.getText());if(j){var t=new sap.m.Token({key:i.getKey()});t.setText(i.getText());t.setTooltip(i.getText());i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Token",t);this._oTokenizer.addToken(t);}this.setSelectable(i,i.getEnabled());this._decorateListItem(o);return o;};h.prototype._findMappedItem=function(o,j){for(var i=0,j=j||this.getItems(),k=j.length;i<k;i++){if(this.getListItem(j[i])===o){return j[i];}}return null;};h.prototype.setSelectable=function(i,s){if(this.indexOfItem(i)<0){return;}i._bSelectable=s;var o=this.getListItem(i);if(o){o.setVisible(s);}var t=this._getTokenByItem(i);if(t){t.setVisible(s);}};h.prototype.getSelectable=function(i){return i._bSelectable;};h.prototype._fillList=function(j){if(!j){return null;}if(!this._oListItemEnterEventDelegate){this._oListItemEnterEventDelegate={onsapenter:function(m){if(m.srcControl.isSelected()){m.setMarked();}}};}for(var i=0,o,k=j.length;i<k;i++){o=this._mapItemToListItem(j[i]);o.removeEventDelegate(this._oListItemEnterEventDelegate);o.addDelegate(this._oListItemEnterEventDelegate,true,this,true);this.getList().addAggregation("items",o,true);if(this.isItemSelected(j[i])){this.getList().setSelectedItem(o,true);}}};h.prototype._handleInputValidation=function(o,i){var v=o.target.value,j,k,m,r,u,s;var n=i?q(o.target).control(0):o.srcControl;j=this._getItemsStartingText(v,true);k=!!j.length;if(!k&&v!==""){u=i?this._sComposition:(this._sOldValue||"");n.updateDomValue(u);if(this._iOldCursorPos){q(n.getFocusDomRef()).cursorPos(this._iOldCursorPos);}this._showWrongValueVisualEffect();return;}m=this.getEnabledItems();r=this._sOldInput&&this._sOldInput.length>v.length;if(this.isPickerDialog()){s=this._getFilterSelectedButton();if(s!=null&&s.getPressed()){s.setPressed(false);}}if(r){m=this.getItems();}this.filterItems(m,v);if((!this.getValue()||!k)&&!this.bOpenedByKeyboardOrButton&&!this.isPickerDialog()){this.close();}else{this.open();}this._sOldInput=v;};h.prototype.init=function(){C.prototype.init.apply(this,arguments);this.createList();this.bItemsUpdated=false;this._bListItemNavigationInvalidated=false;this._iInitialItemFocus=-1;this._bCheckBoxClicked=true;this._bPreventValueRemove=false;this.setPickerType(D.system.phone?"Dialog":"Dropdown");this._oTokenizer=this._createTokenizer();this._aCustomerKeys=[];this._aInitiallySelectedItems=[];this._bCompositionStart=false;this._bCompositionEnd=false;this._sComposition="";this.attachBrowserEvent("compositionstart",function(){this._bCompositionStart=true;this._bCompositionEnd=false;},this);this.attachBrowserEvent("compositionend",function(o){this._bCompositionStart=false;this._bCompositionEnd=true;this._handleInputValidation(o,true);this._bCompositionEnd=false;this._sComposition=o.target.value;},this);};h.prototype.clearSelection=function(){this.removeAllSelectedItems();};h.prototype.addItem=function(i){this.addAggregation("items",i);if(i){i.attachEvent("_change",this.onItemChange,this);}if(this.getList()){this.getList().addItem(this._mapItemToListItem(i));}return this;};h.prototype.insertItem=function(i,j){this.insertAggregation("items",i,j,true);if(i){i.attachEvent("_change",this.onItemChange,this);}if(this.getList()){this.getList().insertItem(this._mapItemToListItem(i),j);}return this;};h.prototype.getEnabledItems=function(i){i=i||this.getItems();return i.filter(function(o){return o.getEnabled();});};h.prototype.getItemByKey=function(k){return this.findItem("key",k);};h.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(this.getList()){this.getList().removeItem(i&&this.getListItem(i));}this.removeSelection({item:i,id:i?i.getId():"",key:i?i.getKey():"",fireChangeEvent:false,suppressInvalidate:true,listItemUpdated:true});return i;};h.prototype.isItemSelected=function(i){return this.getSelectedItems().indexOf(i)>-1;};h.prototype.findItem=function(p,v){var m="get"+p.charAt(0).toUpperCase()+p.slice(1);for(var i=0,j=this.getItems();i<j.length;i++){if(j[i][m]()===v){return j[i];}}return null;};h.prototype._clearTokenizer=function(){this._oTokenizer.destroyAggregation("tokens",true);};h.prototype.getList=function(){return this._oList;};h.prototype.exit=function(){a.prototype.exit.apply(this,arguments);if(this.getList()){this.getList().destroy();this._oList=null;}if(this._oTokenizer){this._oTokenizer.destroy();this._oTokenizer=null;}};h.prototype.destroyItems=function(){this.destroyAggregation("items");if(this.getList()){this.getList().destroyItems();}this._oTokenizer.destroyTokens();return this;};h.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this.removeAllSelectedItems();if(this.getList()){this.getList().removeAllItems();}return i;};h.prototype._getItemByListItem=function(o){return this._getItemBy(o,"ListItem");};h.prototype._getItemByToken=function(t){return this._getItemBy(t,"Token");};h.prototype._getItemBy=function(o,s){s=this.getRenderer().CSS_CLASS_COMBOBOXBASE+s;for(var i=0,j=this.getItems(),k=j.length;i<k;i++){if(j[i].data(s)===o){return j[i];}}return null;};h.prototype.getListItem=function(i){return i?i.data(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"ListItem"):null;};h.prototype.getAccessibilityInfo=function(){var t=this.getSelectedItems().map(function(o){return o.getText();}).join(" ");var i=a.prototype.getAccessibilityInfo.apply(this,arguments);i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_MULTICOMBO");i.description=((i.description||"")+" "+t).trim();return i;};return h;});
