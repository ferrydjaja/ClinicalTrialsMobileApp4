/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device","./library","./ListItemBaseRenderer","./Label"],function(q,R,c,D,l,L,a){"use strict";var P=l.PopinDisplay;var V=c.VerticalAlign;var b=l.PopinLayout;var C=R.extend(L);C.render=function(r,o){var t=o.getTable();if(!t){return;}L.render.apply(this,arguments);if(o.getVisible()&&t.hasPopin()){this.renderPopin(r,o,t);}};C.renderHighlight=function(r,o){r.write('<td class="sapMListTblHighlightCell" aria-hidden="true">');L.renderHighlight.apply(this,arguments);r.write('</td>');};C.renderType=function(r,o){r.write('<td class="sapMListTblNavCol" aria-hidden="true">');L.renderType.apply(this,arguments);r.write('</td>');};C.renderModeContent=function(r,o){r.write('<td class="sapMListTblSelCol" aria-hidden="true">');L.renderModeContent.apply(this,arguments);r.write('</td>');};C.renderCounter=function(r,o){};C.getAriaRole=function(o){return"";};C.renderLIAttributes=function(r,o){r.addClass("sapMListTblRow");var A=o.getVAlign();if(A!=V.Inherit){r.addClass("sapMListTblRow"+A);}var t=o.getTable();if(t&&t.getAlternateRowColors()){var p=t.indexOfItem(o);if(p%2==0){r.addClass("sapMListTblRowAlternate");}}};C.renderLIContentWrapper=function(r,o){var t=o.getTable();if(!t){return;}var d=t.getColumns(true),e=o.getCells();o._destroyClonedHeaders();d.forEach(function(f,i){var g,h,j=true,k=e[f.getInitialOrder()];if(!k||!f.getVisible()||f.isPopin()){f.setIndex(-1);return;}r.write("<td");r.addClass("sapMListTblCell");r.writeAttribute("id",o.getId()+"_cell"+i);r.writeAttribute("data-sap-ui-column",f.getId());if(f){g=f.getStyleClass(true);g&&r.addClass(q.sap.encodeHTML(g));h=f.getHeader();if(h){r.writeAttribute("headers",h.getId());}if(!t.hasPopin()&&f.getMergeDuplicates()){var F=f.getMergeFunctionName(),m=F.split("#"),s=m[1],n=m[0];if(typeof k[n]!="function"){q.sap.log.warning("mergeFunctionName property is defined on "+f+" but this is not function of "+k);}else if(t._bRendering||!k.bOutput){var p=f.getLastValue(),u=k[n](s);if(p===u){j=sap.ui.getCore().getConfiguration().getAccessibility();k.addStyleClass("sapMListTblCellDupCnt");r.addClass("sapMListTblCellDup");}else{f.setLastValue(u);}}else if(k.hasStyleClass("sapMListTblCellDupCnt")){r.addClass("sapMListTblCellDup");}}f.getVAlign()!="Inherit"&&r.addStyle("vertical-align",f.getVAlign().toLowerCase());var A=f.getCssAlign();if(A){r.addStyle("text-align",A);}r.writeStyles();}r.writeClasses();r.write(">");if(j){this.applyAriaLabelledBy(h,k);r.renderControl(f.applyAlignTo(k));}r.write("</td>");},this);};C.applyAriaLabelledBy=function(h,o){if(o){o.removeAssociation("ariaLabelledBy",o.data("ariaLabelledBy")||undefined,true);}if(h&&h.getText&&o.getAriaLabelledBy&&h.getVisible()){o.addAssociation("ariaLabelledBy",h,true);o.data("ariaLabelledBy",h.getId());}};C.renderPopin=function(r,o,t){o.removePopin();r.write("<tr");r.addClass("sapMListTblSubRow");r.writeElementData(o.getPopin());r.writeAttribute("tabindex","-1");if(o.isSelectable()){r.writeAttribute("aria-selected",o.getSelected());}r.writeClasses();r.write(">");this.renderHighlight(r,o);r.write("<td");r.writeAttribute("id",o.getId()+"-subcell");r.writeAttribute("colspan",t.getColSpan());var p=t.getPopinLayout();if(D.browser.msie||(D.browser.edge&&D.browser.version<16)){p=b.Block;}r.write("><div");r.addClass("sapMListTblSubCnt");r.addClass("sapMListTblSubCnt"+p);r.writeClasses();r.write(">");var d=o.getCells(),e=t.getColumns(true);e.forEach(function(f){if(!f.getVisible()||!f.isPopin()){return;}var g=d[f.getInitialOrder()],h=f.getHeader();if(!h&&!g){return;}var s=f.getStyleClass(),i=f.getPopinDisplay();r.write("<div");r.addClass("sapMListTblSubCntRow");s&&r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.write(">");if(h&&i!=P.WithoutHeader){r.write("<div");r.addClass("sapMListTblSubCntHdr");r.writeClasses();r.write(">");var j=sap.ui.require("sap/m/ColumnHeader");if(typeof j=="function"&&h instanceof j){var k=h.getText();h=new a({text:k});}else{h=h.clone();}f.addDependent(h);o._addClonedHeader(h);f.applyAlignTo(h,"Begin");r.renderControl(h);r.write("</div>");r.write("<div class='sapMListTblSubCntSpr'>:</div>");}if(g){r.write("<div");r.addClass("sapMListTblSubCntVal");r.addClass("sapMListTblSubCntVal"+i);r.writeClasses();r.write(">");f.applyAlignTo(g,"Begin");this.applyAriaLabelledBy(h,g);r.renderControl(g);r.write("</div>");}r.write("</div>");},this);r.write("</div></td></tr>");};C.addLegacyOutlineClass=function(r,o){};return C;},true);