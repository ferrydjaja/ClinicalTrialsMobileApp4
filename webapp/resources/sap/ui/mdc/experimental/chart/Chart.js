/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/m/library','sap/ui/core/XMLComposite',"sap/m/OverflowToolbar",'sap/m/ToolbarDesign',"sap/m/FlexItemData"],function(q,M,X,O,T,F){"use strict";var C=X.extend("sap.ui.mdc.experimental.chart.Chart",{metadata:{library:"sap.ui.mdc",defaultAggregation:"",properties:{entitySet:{type:"string",group:"Misc",defaultValue:null},chartType:{type:"string",group:"Misc",defaultValue:null},header:{type:"string",group:"Misc",defaultValue:null},showDetailsButton:{type:"boolean",group:"Misc",defaultValue:false},showDrillBreadcrumbs:{type:"boolean",group:"Misc",defaultValue:false},showChartTooltip:{type:"boolean",group:"Misc",defaultValue:true},showToolbar:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{toolbar:{type:"sap.m.Toolbar",multiple:false},dimensions:{type:"sap.chart.data.Dimension",multiple:true,forwarding:{idSuffix:"--innerChart",aggregation:"dimensions"}},measures:{type:"sap.chart.data.Measure",multiple:true,forwarding:{idSuffix:"--innerChart",aggregation:"measures"}}}}});C.prototype.init=function(){q.sap.log.info("Chart init");sap.m.FlexBox.prototype.init.call(this);this.addStyleClass("sapUiMdcChart");};C.prototype._getChart=function(){return sap.ui.getCore().byId(this.getId()+"--innerChart")||null;};return C;},true);
