/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/EventProvider","./InputDeviceMouse"],function(q,E,I){"use strict";var a=E.extend("sap.ui.vk.InputDevicePointer",{metadata:{publicMethods:["isSupported","enable","disable"]},constructor:function(L){this._loco=L;this._pointerIds=[];this._pointers=[];this._count=0;this._points=0;this._buttons=0;this._mouse=new I(this._loco);this._pointerdownProxy=this._onpointerdown.bind(this);this._pointerupProxy=this._onpointerup.bind(this);this._pointermoveProxy=this._onpointermove.bind(this);this._mousewheelProxy=this._mouse._onmousewheel.bind(this._mouse);this._contextmenuProxy=this._mouse._oncontextmenu.bind(this._mouse);this._onpointerupWindowListenerProxy=this._onpointerupWindowListener.bind(this);}});a.prototype._clearPointers=function(){this._pointerIds=[];this._pointers=[];this._count=0;this._points=0;this._buttons=0;};a.prototype._addPointer=function(i,_,b){if(this._pointerIds[i]==null){this._pointerIds[i]=this._count;}var c=this._pointerIds[i];if(this._pointers.length<=c||this._pointers[c]==null){this._count++;}this._pointers[c]={x:_,y:b};return this._count;};a.prototype._removePointer=function(i){if(this._pointerIds[i]==null){return this._count;}var b=this._pointerIds[i];this._pointerIds[i]=null;if(this._pointers.length>b&&this._pointers[b]!=null){this._count--;}this._pointers[b]=null;return this._count;};a.prototype._eventToInput=function(e){var b={x:0,y:0,z:0,d:0,n:this._count,buttons:0,scroll:0,points:[],handled:false};var t=this._pointers;var l=t.length;for(var i=0;i<l;i++){var c=t[i];if(c!=null){b.points.push({x:c.x,y:c.y,z:0});}}return b;};a.prototype._onpointerdown=function(e){var b=e.originalEvent?e.originalEvent:e;if(b.pointerType!="touch"&&b.pointerType!="pen"){this._buttons=b.buttons;this._mouse._onmousedown(b);return;}if(b.isPrimary){this._clearPointers();}this._addPointer(b.pointerId,b.pageX,b.pageY);b.target.setPointerCapture(b.pointerId);var i=this._eventToInput(b);if(this._points!=0&&this._points!=i.n){this._loco.endGesture(i,this._control);this._loco._resetClickTimer();}this._points=i.n;i.handled=false;this._loco.beginGesture(i,this._control);if(i.handled){}else{this._removePointer(b.pointerId);}};a.prototype._onpointerup=function(e){this._capturedByControl=true;var b=e.originalEvent?e.originalEvent:e;if(b.pointerType!="touch"&&b.pointerType!="pen"){this._buttons=0;this._mouse._onmouseup(b);return;}this._removePointer(b.pointerId);b.target.releasePointerCapture(b.pointerId);var i=this._eventToInput(b);this._loco.endGesture(i,this._control);if(i.n!=0&&this._points!=i.n){i.handled=false;this._loco.beginGesture(i,this._control);this._loco._resetClickTimer();}this._points=i.n;};a.prototype._onpointerupWindowListener=function(e){if(!this._capturedByControl){this._onpointerup(e);}this._capturedByControl=false;};a.prototype._onpointermove=function(e){if(e.buttons!==0||sap.ui.Device.system.desktop){var b=e.originalEvent?e.originalEvent:e;if(b.pointerType!="touch"&&b.pointerType!="pen"){this._mouse._onmousemove(b);return;}this._addPointer(b.pointerId,b.pageX,b.pageY);var i=this._eventToInput(b);if(this._points!=i.n){this._loco.endGesture(i,this._control);this._loco._resetClickTimer();i.handled=false;this._loco.beginGesture(i,this._control);this._loco._resetClickTimer();this._points=i.n;}else{this._loco.move(i,this._control);}}};a.prototype.isSupported=function(){if((sap.ui.Device.browser.edge||sap.ui.Device.browser.msie)&&sap.ui.Device.support.pointer){return true;}return false;};a.prototype.enable=function(c){this._pointerIds=[];this._pointers=[];this._points=0;this._count=0;this._buttons=0;this._mouse._buttons=0;this._control=c;this._mouse._control=c;var f=this._control?this._control.attachBrowserEvent.bind(this._control):window.document.addEventListener;f("pointerdown",this._pointerdownProxy);f("pointerup",this._pointerupProxy);f("pointermove",this._pointermoveProxy);f("mousewheel",this._mousewheelProxy);f("DOMMouseScroll",this._mousewheelProxy);f("contextmenu",this._contextmenuProxy);window.document.addEventListener("pointerup",this._onpointerupWindowListenerProxy);};a.prototype.disable=function(){var f=this._control?this._control.detachBrowserEvent.bind(this._control):window.document.removeEventListener;f("pointerdown",this._pointerdownProxy);f("pointerup",this._pointerupProxy);f("pointermove",this._pointermoveProxy);f("mousewheel",this._mousewheelProxy);f("DOMMouseScroll",this._mousewheelProxy);f("contextmenu",this._contextmenuProxy);window.document.removeEventListener("pointerup",this._onpointerupWindowListenerProxy);};return a;},true);
