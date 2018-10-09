/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["sap/ui/core/Control","jquery.sap.global","sap/ui/core/ResizeHandler","./adapter3d/thirdparty/three","./adapter3d/thirdparty/OrbitControls","./library"],function(C,q,R,T,O,l){"use strict";var V=C.extend("sap.ui.vbm.Viewport",{metadata:{library:"sap.ui.vbm",properties:{width:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",defaultValue:"100%"}}}});var b=V.getMetadata().getParent().getClass().prototype;V.prototype.init=function(){if(b.init){b.init.call(this);}this._resizeListenerId=null;this._renderLoopRequestId=0;this._renderLoopFunction=this._renderLoop.bind(this);this._renderer=new T.WebGLRenderer({antialias:true});this._renderer.setPixelRatio(window.devicePixelRatio);this._renderer.shadowMap.enabled=true;this._renderer.domElement.tabIndex=-1;this._renderer.domElement.id=this.getId()+"-canvas";this._scene=new T.Scene();this._root=new T.Group();this._root.scale.set(-1,1,1);this._root.rotateX(T.Math.degToRad(90));this._scene.add(this._root);this._scene.background=new T.Color('white');var a=new T.AmbientLight(0x202020,1);this._scene.add(a);var c=new T.DirectionalLight(0x333333,1);c.position.set(0,0,-1);this._scene.add(c);var d=new T.DirectionalLight(0x51515b,1);d.position.set(-2,-1.1,2.5);this._scene.add(d);var e=new T.DirectionalLight(0x5b5b5b,2);e.position.set(2,1.5,0.5);this._scene.add(e);this._light=new T.DirectionalLight(0xEEEEEE,1);this._lightPos=new T.Vector3(0,0,0);this._scene.add(this._light);this._camera=new T.PerspectiveCamera(30,window.innerWidth/window.innerHeight,0.1,2000);this._scene.add(this._camera);this._camera.position.set(0,30,30);this._camera.lookAt(new T.Vector3(0,0,0));this._cameraController=new O(this._camera,this._renderer.domElement);this._cameraController.addEventListener("change",this._cameraHandler);this._cameraController.update();};V.prototype.exit=function(){if(this._resizeListenerId){R.deregister(this._resizeListenerId);this._resizeListenerId=null;}this._stopRenderLoop();this._scene=null;this._camera=null;this._renderer=null;if(b.exit){b.exit.call(this);}};V.prototype.getRoot=function(){return this._root;};V.prototype.getScene=function(){return this._scene;};V.prototype.getCamera=function(){return this._camera;};V.prototype.getCameraController=function(){return this._cameraController;};V.prototype.worldToScreen=function(p){var e=this.getDomRef();if(!e){return undefined;}var r=e.getBoundingClientRect();var c=this.getCamera();var m=new T.Matrix4().multiplyMatrices(c.projectionMatrix,new T.Matrix4().getInverse(c.matrixWorld));var s=p.clone().applyMatrix4(m);var x=Math.floor((+s.x*0.5+0.5)*r.width+0.5);var y=Math.floor((-s.y*0.5+0.5)*r.height+0.5);return new T.Vector2(x,y);};V.prototype._cameraHandler=function(e){};V.prototype._handleResize=function(e){if(!this._camera||!this._renderer){return false;}var w=e.size.width;var h=e.size.height;if(this._camera){this._camera.aspect=w/h;this._camera.updateProjectionMatrix();}this._renderer.setSize(w,h,false);};V.prototype._renderLoop=function(){this._cameraController.update();this._camera.getWorldDirection(this._lightPos);this._lightPos.negate();this._light.position.copy(this._lightPos);this._renderer.render(this._scene,this._camera);this._renderLoopRequestId=window.requestAnimationFrame(this._renderLoopFunction);};V.prototype.onBeforeRendering=function(){if(this._resizeListenerId){R.deregister(this._resizeListenerId);this._resizeListenerId=null;}this._stopRenderLoop();};V.prototype.onAfterRendering=function(){var d=this.getDomRef();d.appendChild(this._renderer.domElement);this._resizeListenerId=R.register(this,this._handleResize.bind(this));this._handleResize({size:{width:d.clientWidth,height:d.clientHeight}});this._startRenderLoop();};V.prototype._startRenderLoop=function(){if(!this._renderLoopRequestId){this._renderLoopRequestId=window.requestAnimationFrame(this._renderLoopFunction);}return this;};V.prototype._stopRenderLoop=function(){if(this._renderLoopRequestId){window.cancelAnimationFrame(this._renderLoopRequestId);this._renderLoopRequestId=0;}return this;};return V;});