/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject"],function(q,M){"use strict";var T=function(d){this._sDefaultOperation=d;this._aKeyFields=[];this._mTypeOperations={"default":["EQ","BT","LT","LE","GT","GE","NE"],"string":["Contains","EQ","BT","StartsWith","EndsWith","LT","LE","GT","GE","NE"],"date":["EQ","BT","LT","LE","GT","GE","NE"],"time":["EQ","BT","LT","LE","GT","GE","NE"],"numeric":["EQ","BT","LT","LE","GT","GE","NE"],"numc":["Contains","EQ","BT","EndsWith","LT","LE","GT","GE","NE"],"boolean":["EQ"]};this._init();};T.prototype._init=function(){this.createOperation("BT","foo...bar","...",/^.+\.\.\..+$/,"$0...$1",function(t){var s=t.slice(0,t.indexOf(this.operation));var a=t.slice(t.indexOf(this.operation)+this.operation.length);return[s,a];});this.createOperation("EQ","=foo","=",/^\=.+$/,"=$0");this.createOperation("Contains","*foo*","**",/^\*.+\*$/,"*$0*",function(t){return[t.slice(1,t.length-1).trim()];});this.createOperation("StartsWith","foo*","*",/^([^\*].*)\*$/,"$0*",function(t){return[t.slice(0,t.length-1).trim()];});this.createOperation("EndsWith","*foo","*",/^\*(.*[^\*])$/,"*$0");this.createOperation("LT","< foo","<",/^\<([^\=].*)$/,"<$0");this.createOperation("LE","<=foo","<=",/^\<\=(.+)$/,"<=$0");this.createOperation("GT","> foo",">",/^\>([^\=].*)$/,">$0");this.createOperation("GE",">=foo",">=",/^\>\=(.+)$/,">=$0");this.createOperation("NE","!=foo","!=",/^\!\=(.+)$/,"!(=$0)").exclude=true;};T.prototype.destroy=function(){this._oInput.removeValidator(this._validator);this._oInput=null;this._aOrgValidators=null;this._aKeyFields=null;this._mTypeOperations=null;};T.prototype.setDefaultOperation=function(o){this._sDefaultOperation=o;};T.prototype.getDefaultOperation=function(){return this._sDefaultOperation;};T.prototype.getOperations=function(){return this._mOperations;};T.prototype.getOperation=function(o){return this._mOperations&&this._mOperations[o];};T.prototype._getKeyFieldByLabel=function(l){var k;this._aKeyFields.some(function(K){if(K.label.toUpperCase()===l.toUpperCase()){k=K;}},this);return k;};T.prototype.addKeyField=function(k){this._aKeyFields.push(k);};T.prototype.getKeyFields=function(){return this._aKeyFields;};T.prototype.addTypeOperations=function(t,o){this._mTypeOperations[t]=o;};T.prototype.removeTypeOperations=function(t){delete this._mTypeOperations[t];};T.prototype.getTypeOperations=function(t){return this._mTypeOperations[t]||this._mTypeOperations["default"];};T.prototype.createOperation=function(o,e,O,r,t,p){if(!this._mOperations){this._mOperations={};}this._mOperations[o]={key:o,example:e,operation:O,re:r,template:t,exclude:false,parser:this,match:function(s,k){var a=this.re.exec(s);if(a){var v=this.parse(s);if(k){v.forEach(function(V){if(k.hasOwnProperty("maxLength")&&k.maxLength>=0&&V.length>k.maxLength){a=null;}if(k.oType){try{V=k.oType.parseValue(V,"string");k.oType.validateValue(V);}catch(b){a=null;}}},this);}}return a;},parse:p||function(s){return[s.slice(this.operation.length).trim()];},getFilledTemplate:function(s,k){var v=this.parse(s);var a=this.template;for(var i=0;i<v.length;i++){a=a.replace("$"+i,this.formatValue(v[i],false,k));}return a;},getConditionData:function(s,k){var a={};a.exclude=this.exclude;a.operation=this.exclude?"EQ":this.key;var v=this.parse(s);for(var i=0;i<v.length;i++){a["value"+(i+1)]=this.formatValue(v[i],true,k);}return a;},formatValue:function(v,P,k){if(!k){return v;}if(k.hasOwnProperty("maxLength")){if(k.maxLength>=0){v=v.substring(0,k.maxLength);}}if(k.displayFormat){if(k.displayFormat==="UpperCase"){v=v.toUpperCase();}}if(k.oType){try{v=k.oType.parseValue(v,"string");k.oType.validateValue(v);}catch(a){return"ERROR";}if(!P){v=k.oType.formatValue(v,"string");}}return v;}};return this._mOperations[o];};T.prototype.removeOperation=function(o){delete this._mOperations[o];};T.prototype.removeAllOperations=function(){var o=Object.keys(this._mOperations);o.forEach(function(a){delete this._mOperations[a];},this);};T.prototype.getTranslatedText=function(t,o,r){var s=o.key;t=t!=="default"?"_"+t.toUpperCase()+"_":"";if(t==="_STRING_"||t==="_BOOLEAN_"||t==="_NUMC_"){t="";}if(t==="_TIME_"){t="_DATE_";}if(!r){r="sap.m";}s="CONDITIONPANEL_OPTION"+t+s;var a=sap.ui.getCore().getLibraryResourceBundle(r).getText(s)||s;if(q.sap.startsWith(a,"CONDITIONPANEL_OPTION")){s="CONDITIONPANEL_OPTION"+o.key;a=sap.ui.getCore().getLibraryResourceBundle(r).getText(s);}return a;};T.prototype.associateInput=function(i){this._oInput=i;this._aOrgValidators=this._oInput._tokenizer?this._oInput._tokenizer._aTokenValidators.slice():[];this._oInput.removeAllValidators();this._oInput.addValidator(this._validator.bind(this));};T.prototype._validator=function(a){if(this._aOrgValidators){var t;this._aOrgValidators.some(function(v){t=v(a);return t;},this);if(t){return t;}}if(a.suggestionObject&&a.suggestionObject.getKey){var k=a.suggestionObject.getKey();var b=a.suggestionObject.getText();var c=a.suggestionObject.getAdditionalText();if(c){return this._onValidate(c);}else{return new sap.m.Token({key:k,text:b+" ("+k+")",tooltip:b});}}if(a.suggestedToken){var s=a.suggestedToken.getText();var K=a.suggestedToken.getKey();a.suggestedToken.setText(s+" ("+K+")");a.suggestedToken.setTooltip(a.suggestedToken.getText());return a.suggestedToken;}if(a.text){return this._onValidate(a.text);}return null;};T.prototype._onValidate=function(t){var k=this._aKeyFields.length>0?this._aKeyFields[0]:null;if(this._oInput._getIsSuggestionPopupOpen&&this._oInput._getIsSuggestionPopupOpen()&&this._oInput._oSuggestionTable&&this._oInput._oSuggestionTable.getSelectedItem()){return null;}if(k){var a=/^\w+\:\s/.exec(t);if(a){var K=a[0];k=this._getKeyFieldByLabel(K.slice(0,K.indexOf(":")));t=t.slice(a[0].length).trim();}}var b=k&&k.type||"default";var c=this.getTypeOperations(b);var C=function(o,t){if(o.match(t,k)){var r=o.getConditionData(t,k);r.keyField=k?k.key:null;if(b=="numc"){if(["Contains","EndsWith"].indexOf(o.key)!=-1){r.value1=k.oType.formatValue(r.value1,"string");}}var s=(k&&k.label&&this._aKeyFields.length>1?k.label+": ":"")+o.getFilledTemplate(t,k);s=M.escapeSettingsValue(s);return new sap.m.Token({text:s,tooltip:s}).data("range",r);}return null;}.bind(this);var d;if(c.some(function(o){d=C(this._mOperations[o],t);return d;},this)){return d;}if(this._sDefaultOperation&&this._mOperations[this._sDefaultOperation]){t=this._mOperations[this._sDefaultOperation].template.replace("$0",t);return C(this._mOperations[this._sDefaultOperation],t);}return null;};return T;},true);
