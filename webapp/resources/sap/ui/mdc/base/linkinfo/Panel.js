/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/XMLComposite'],function(q,X){"use strict";var P=X.extend("sap.ui.mdc.base.linkinfo.Panel",{metadata:{library:"sap.ui.mdc",defaultAggregation:"items",properties:{enablePersonalization:{type:"boolean",defaultValue:true}},aggregations:{items:{type:"sap.ui.mdc.base.linkinfo.PanelItem",multiple:true,singularName:"item"},extraContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{idSuffix:"--IDExtraContent",aggregation:"items"}}}}});P.prototype.init=function(){this.setModel(new sap.ui.model.resource.ResourceModel({bundleUrl:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").oUrlInfo.url}),"i18n");};P.prototype.formatterIsMain=function(i){return i.some(function(I){return I.getIsMain()===true;});};P.prototype.mainItemFactory=function(i,b){var I=new sap.ui.core.Icon({visible:"{=${$this>icon} ? true:false}",src:"{$this>icon}",decorative:false});return new sap.m.HBox({items:[I,new sap.m.VBox({items:[new sap.m.Link({visible:"{$this>visible}",enabled:"{=${$this>href} ? true:false}",text:"{$this>text}",href:"{$this>href}",target:"{$this>target}"}),new sap.m.Text({visible:"{=${$this>description} ? true:false}",text:"{$this>description}"})]})]});};P.prototype.itemsFactory=function(i,b){var l=new sap.m.Link({visible:"{$this>visible}",text:"{$this>text}",href:"{$this>href}",target:"{$this>target}"});var h=this.getItems().some(function(o){return o.getIsMain()!==true&&!!o.getIcon();});var I;if(h){I=new sap.ui.core.Icon({src:b.getProperty("icon")?b.getProperty("icon"):"sap-icon://camera",decorative:false});}if(!b.getProperty("description")){l.addStyleClass("linkInfoPanelAvailableLinkWithoutGroup");return new sap.m.HBox({items:[I,l]});}return new sap.m.HBox({layoutData:new sap.m.FlexItemData({styleClass:"linkInfoPanelAvailableLinkGroup"}),items:[I,new sap.m.VBox({items:[l,new sap.m.Text({visible:"{$this>visible}",text:"{$this>description}"})]})]});};return P;},true);
