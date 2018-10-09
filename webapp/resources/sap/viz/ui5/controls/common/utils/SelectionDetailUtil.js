/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/core/theming/Parameters'],function(P){"use strict";var S={};S.appendShapeStrings=function(d){d.forEach(function(i){if(i.graphicInfo){i.shapeString=g(i.graphicInfo);delete i.graphicInfo;}});};var g=function(o){var c=o.color;if(!c){return'';}if(typeof c==='object'){var s={};var k=["v-primary","v-additional","v-forecast"];for(var i=0;i<k.length;i++){var a=k[i];if(c[a]&&c[a]["id"]){s[c[a]["id"]]=g(c[a]);}}return s;}else if(typeof c==='string'){var b='';var m=10,p=m/2,d=p,w=m,h=m,e=o.type==='line';if(o.type&&e){p=m;w=m*2;m=6;}var f={rx:m/2,ry:m/2,type:o.shape,borderWidth:0};b=b+'<svg width='+w+'px height='+h+'px '+'focusable = false>';if(e){var l=o.lineInfo;var j=P.get(l.lineColor)||l.lineColor||c;if(l.lineType==='dotted'||l.lineType==='dash'){b=b+"<line x1 = '0' y1='"+d+"' x2 = '"+w+"' y2 = '"+d+"' stroke-width = '2' stroke-dasharray = '5, 3' ";}else if(l.lineType==='dot'){var n=Math.floor(w/2);n=n&1?n:n-1;if(n<3){n=3;}var q=w/n;b=b+"<line x1 ='"+(q/2)+"'y1='"+d+"' x2 = '"+w+"' y2 = '"+d+"' stroke-dasharray = ' 0,"+q*2+"' ";b=b+"stroke-width = '"+q+"' stroke-linecap = 'round'";}else{b=b+"<line x1 = '0' y1='"+d+"' x2 = '"+w+"' y2 = '"+d+"' stroke-width = '2' ";}b=b+" stroke = '"+j+"'> </line>";}b=b+"<path d = '"+S.generateShapePath(f)+"'";if(!o.pattern){b=b+" fill = '"+c+"'";}else if(o.pattern==='noFill'){var C=P.get('sapUiChartBackgroundColor');if(C==='transparent'){C="white";}b=b+" fill = '"+C+"'";b=b+" stroke = '"+c+"' stroke-width= '1px'";}else{b=b+" fill = '"+(o.patternURL||o.pattern)+"'";}b=b+" transform = 'translate("+p+","+d+")'></path>";b=b+'</svg>';return b;}};S.generateShapePath=function(p){var a;var t=p.borderWidth/2;switch(p.type){case"circle":a="M"+(-p.rx-t)+",0 A"+(p.rx+t)+","+(p.ry+t)+" 0 1,0 "+(p.rx+t)+",0 A";a+=(p.rx+t)+","+(p.ry+t)+" 0 1,0 "+(-p.rx-t)+",0z";break;case"cross":a="M"+(-p.rx-t)+","+(-p.ry/3-t)+"H"+(-p.rx/3-t)+"V"+(-p.ry-t)+"H"+(p.rx/3+t);a+="V"+(-p.ry/3-t)+"H"+(p.rx+t)+"V"+(p.ry/3+t)+"H"+(p.rx/3+t);a+="V"+(p.ry+t)+"H"+(-p.rx/3-t)+"V"+(p.ry/3+t)+"H"+(-p.rx-t)+"Z";break;case"diamond":a="M0,"+(-p.ry-t)+"L"+(p.rx+t)+",0"+" 0,"+(p.ry+t)+" "+(-p.rx-t)+",0"+"Z";break;case"triangle-down":case"triangleDown":a="M0,"+(p.ry+t)+"L"+(p.rx+t)+","+-(p.ry+t)+" "+-(p.rx+t)+","+-(p.ry+t)+"Z";break;case"triangle-up":case"triangleUp":a="M0,"+-(p.ry+t)+"L"+(p.rx+t)+","+(p.ry+t)+" "+-(p.rx+t)+","+(p.ry+t)+"Z";break;case"triangle-left":case"triangleLeft":a="M"+-(p.rx+t)+",0L"+(p.rx+t)+","+(p.ry+t)+" "+(p.rx+t)+","+-(p.ry+t)+"Z";break;case"triangle-right":case"triangleRight":a="M"+(p.rx+t)+",0L"+-(p.rx+t)+","+(p.ry+t)+" "+-(p.rx+t)+","+-(p.ry+t)+"Z";break;case"intersection":a="M"+(p.rx+t)+","+(p.ry+t)+"L"+(p.rx/3+t)+",0L"+(p.rx+t)+","+-(p.ry+t)+"L";a+=(p.rx/2-t)+","+-(p.ry+t)+"L0,"+(-p.ry/3-t)+"L"+(-p.rx/2+t)+","+-(p.ry+t)+"L";a+=-(p.rx+t)+","+-(p.ry+t)+"L"+-(p.rx/3+t)+",0L"+-(p.rx+t)+","+(p.ry+t)+"L";a+=(-p.rx/2+t)+","+(p.ry+t)+"L0,"+(p.ry/3+t)+"L"+(p.rx/2-t)+","+(p.ry+t)+"Z";break;case'squareWithRadius':var r=p.rx;var b=r-3;a="M0,"+-r+"L"+-b+","+-r+"Q"+-r+","+-r+" "+-r+","+-b+"L"+-r+","+b+"Q"+-r+","+r+" "+-b+","+r;a+="L"+b+","+r+"Q"+r+","+r+" "+r+","+b+"L"+r+","+-b+"Q"+r+","+-r+" "+b+","+-r+"Z";break;case"square":case"sector":default:a="M"+(-p.rx-t)+","+(-p.ry-t)+"L"+(p.rx+t)+",";a+=(-p.ry-t)+"L"+(p.rx+t)+","+(p.ry+t)+"L"+(-p.rx-t)+","+(p.ry+t)+"Z";break;}return a;};return S;});
