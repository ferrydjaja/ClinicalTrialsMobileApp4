/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/comp/library','sap/ui/core/Element','sap/ui/layout/form/FormContainer'],function(q,l,E,F){"use strict";var R;var G=F.extend("sap.ui.comp.smartform.Group",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartform/Group.designtime",properties:{useHorizontalLayout:{type:"boolean",group:"Misc",defaultValue:null},horizontalLayoutGroupElementMinWidth:{type:"int",group:"Misc",defaultValue:null},label:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"groupElements",aggregations:{groupElements:{type:"sap.ui.comp.smartform.GroupElement",multiple:true,singularName:"groupElement"},layout:{type:"sap.ui.layout.GridData",multiple:false}},_bVisibleElements:false}});G.prototype.setUseHorizontalLayout=function(v){var o=this.getUseHorizontalLayout();this.setProperty("useHorizontalLayout",v);if(o==v){return this;}var g=this.getGroupElements();for(var i=0;i<g.length;i++){if(g[i].getUseHorizontalLayout()!=v){g[i].setUseHorizontalLayout(v);}}this._updateLayoutData();return this;};G.prototype._updateLayoutData=function(){if(this.getUseHorizontalLayout()){var s=this.getParent();while(s&&!s.addGroup&&s.getParent){s=s.getParent();}if(s){var L=s.getLayout();if(!L||!L.getGridDataSpan()){if(!this.getLayoutData()){if(!R&&!this._bResponsiveFlowLayoutDataRequested){R=sap.ui.require("sap/ui/layout/ResponsiveFlowLayoutData");if(!R){sap.ui.require(["sap/ui/layout/ResponsiveFlowLayoutData"],_.bind(this));this._bResponsiveFlowLayoutDataRequested=true;}}if(R&&!this._bResponsiveFlowLayoutDataRequested){var r=new R({"linebreak":true,"linebreakable":true});r._bCreatedByGroup=true;this.setLayoutData(r);}}}else{this._updateLineBreaks();}}}else{var o=this.getLayoutData();if(o&&o._bCreatedByGroup){this.destroyLayoutData();}}};function _(r){R=r;this._bResponsiveFlowLayoutDataRequested=false;if(!this._bIsBeingDestroyed){this._updateLayoutData();}}G.prototype.setHorizontalLayoutGroupElementMinWidth=function(n){var f=this.getHorizontalLayoutGroupElementMinWidth();if(f==n){return this;}q.sap.log.error("HorizontalLayoutGroupElementMinWidth is deprecated",this);this.setProperty("horizontalLayoutGroupElementMinWidth",n);var g=this.getGroupElements();for(var i=0;i<g.length;i++){g[i].setHorizontalLayoutGroupElementMinWidth(n);}return this;};G.prototype.setEditMode=function(f){var g=this.getGroupElements();for(var i=0;i<g.length;i++){g[i].setEditMode(f);}return this;};G.prototype._delegateEditModeFromParent=function(g){var p=null;var f=false;if(g){p=this.getParent();if(p&&p.getEditable){f=p.getEditable();g.setEditMode(f);}}};G.prototype._updateLineBreaks=function(){if(!this.getUseHorizontalLayout()){return;}var s=this.getParent();if(!s){return;}while(s&&!s._getGridDataSpanNumbers&&s.getParent){s=s.getParent();}if(!s._getGridDataSpanNumbers){return;}var S=s._getGridDataSpanNumbers();if(!S){return;}var f=this.getGroupElements();f=f.filter(function(o){return o.isVisible();});var C=0;var g=0;var h=0;var j=0;var L=false;var k=false;var m=false;var n=false;for(var i=0;i<f.length;i++){var o=f[i];C++;g++;h++;j++;if(S.XL*C>12){L=true;C=1;}else{L=false;}if(S.L*g>12){k=true;g=1;}else{k=false;}if(S.M*h>12){m=true;h=1;}else{m=false;}if(S.S*j>12){n=true;j=1;}else{n=false;}o._setLinebreak(L,k,m,n);}};G.prototype._updateGridDataSpan=function(){if(!this.getUseHorizontalLayout()){return;}var g=this.getGroupElements();for(var i=0;i<g.length;i++){g[i]._updateGridDataSpan();}};G.prototype._updateFormContainerVisibility=function(){var g=this.getGroupElements();var v=false;v=g.some(function(o){return o.isVisible();});if(this._bVisibleElements!==v){this._bVisibleElements=v;if(this.isPropertyInitial("visible")){this.fireEvent("_visibleChanged");}}};G.prototype.setLabel=function(L){this.setProperty("label",L);var t=this.getTitle();if(t&&(typeof t!=="string")){q.sap.log.error("Title already set, Label can not be set",this);}else{this.setTitle(L);}return this;};G.prototype.setVisible=function(v){var o=this.getVisible();F.prototype.setVisible.apply(this,arguments);if(v!=o||v!=this._bVisibleElements){this.fireEvent("_visibleChanged");}return this;};G.prototype.isVisible=function(){if(this.isPropertyInitial("visible")){return this._bVisibleElements;}else{return this.getVisible();}};G.prototype.addGroupElement=function(g){return this.addFormElement(g);};G.prototype.insertGroupElement=function(g,i){return this.insertFormElement(g,i);};G.prototype.getGroupElements=function(){return this.getFormElements();};G.prototype.indexOfGroupElement=function(g){return this.indexOfFormElement(g);};G.prototype.removeGroupElement=function(g){return this.removeFormElement(g);};G.prototype.removeAllGroupElements=function(){return this.removeAllFormElements();};G.prototype.destroyGroupElements=function(){return this.destroyFormElements();};G.prototype.addFormElement=function(g){if(!g){return this;}g=this.validateAggregation("groupElements",g,true);a.call(this,g);F.prototype.addFormElement.apply(this,arguments);b.call(this,g);return this;};G.prototype.insertFormElement=function(g,i){if(!g){return this;}g=this.validateAggregation("groupElements",g,true);a.call(this,g);F.prototype.insertFormElement.apply(this,arguments);b.call(this,g);return this;};G.prototype.removeFormElement=function(g){var o=F.prototype.removeFormElement.apply(this,arguments);if(o){o.detachVisibleChanged(this._updateFormContainerVisibility,this);e.call(this,o);this._updateFormContainerVisibility();this._updateLineBreaks();}return o;};G.prototype.removeAllFormElements=function(){var g=F.prototype.removeAllFormElements.apply(this,arguments);for(var i=0;i<g.length;i++){var o=g[i];o.detachVisibleChanged(this._updateFormContainerVisibility,this);e.call(this,o);}this._updateFormContainerVisibility();this._updateLineBreaks();return g;};G.prototype.destroyFormElements=function(){F.prototype.destroyFormElements.apply(this,arguments);this._updateFormContainerVisibility();this._updateLineBreaks();return this;};function a(g){var u=this.getUseHorizontalLayout();var h=this.getHorizontalLayoutGroupElementMinWidth();if(h!=g.getHorizontalLayoutGroupElementMinWidth){g.setHorizontalLayoutGroupElementMinWidth(h);}if(u!=g.getUseHorizontalLayout()){g.setUseHorizontalLayout(u);}g.attachVisibleChanged(this._updateFormContainerVisibility,this);c.call(this,g);}function b(g){this._delegateEditModeFromParent(g);this._updateFormContainerVisibility();if(this.getUseHorizontalLayout()){g._updateGridDataSpan();this._updateLineBreaks();}}G.prototype.setLayout=function(L){L=this.validateAggregation("layout",L,false);return this.setLayoutData(L);};G.prototype.getLayout=function(){return this.getLayoutData();};G.prototype.destroyLayout=function(L){return this.destroyLayoutData();};G.prototype.addCustomData=function(C){if(!C){return this;}F.prototype.addCustomData.apply(this,arguments);var g=this.getGroupElements();for(var i=0;i<g.length;i++){d.call(this,g[i],C);}return this;};G.prototype.insertCustomData=function(C,I){if(!C){return this;}F.prototype.insertCustomData.apply(this,arguments);var g=this.getGroupElements();for(var i=0;i<g.length;i++){d.call(this,g[i],C);}return this;};G.prototype.removeCustomData=function(C){var o=F.prototype.removeCustomData.apply(this,arguments);if(o){var g=this.getGroupElements();for(var i=0;i<g.length;i++){e.call(this,g[i],o.getId());}}return o;};G.prototype.removeAllCustomData=function(){var C=F.prototype.removeAllCustomData.apply(this,arguments);if(C.length>0){var g=this.getGroupElements();for(var i=0;i<g.length;i++){e.call(this,g[i]);}}return C;};G.prototype.destroyCustomData=function(){F.prototype.destroyCustomData.apply(this,arguments);var g=this.getGroupElements();for(var i=0;i<g.length;i++){e.call(this,g[i]);}return this;};function c(g){var C=this.getCustomData();for(var i=0;i<C.length;i++){d.call(this,g,C[i]);}}function d(g,C){if(sap.ui.comp.smartform.inheritCostomDataToFields(C)){var n=C.clone();n._bFromGroup=true;n._sOriginalId=C.getId();g.addCustomData(n);}}function e(g,o){var C=g.getCustomData();for(var i=0;i<C.length;i++){var f=C[i];if(f._bFromGroup&&(!o||o==f._sOriginalId)){g.removeCustomData(f);}}}G.prototype.clone=function(I,L){var g=this.removeAllGroupElements();var C=F.prototype.clone.apply(this,arguments);for(var i=0;i<g.length;i++){var o=g[i];var f=o.clone(I,L);this.addGroupElement(o);C.addGroupElement(f);}return C;};return G;},true);
