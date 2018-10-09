/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/model/odata/type/Boolean','sap/ui/model/odata/type/Byte','sap/ui/model/odata/type/DateTime','sap/ui/model/odata/type/DateTimeOffset','sap/ui/model/odata/type/Decimal','sap/ui/model/odata/type/Double','sap/ui/model/odata/type/Single','sap/ui/model/odata/type/Guid','sap/ui/model/odata/type/Int16','sap/ui/model/odata/type/Int32','sap/ui/model/odata/type/Int64','sap/ui/model/odata/type/SByte','sap/ui/model/odata/type/String','sap/ui/model/odata/type/Time','sap/ui/comp/odata/type/StringDate'],function(B,a,D,b,c,d,S,G,I,e,f,g,h,T,i){"use strict";var u={"Edm.Boolean":B,"Edm.Byte":a,"Edm.DateTime":D,"Edm.DateTimeOffset":b,"Edm.Decimal":c,"Edm.Double":d,"Edm.Float":S,"Edm.Guid":G,"Edm.Int16":I,"Edm.Int32":e,"Edm.Int64":f,"Edm.SByte":g,"Edm.Single":S,"Edm.String":h,"Edm.Time":T};var m={"Edm.Boolean":"Boolean","Edm.Byte":"Byte","Edm.DateTime":"DateTime","Edm.DateTimeOffset":"DateTimeOffset","Edm.Decimal":"Decimal","Edm.Double":"Double","Edm.Float":"Float","Edm.Guid":"Guid","Edm.Int16":"Int16","Edm.Int32":"Int32","Edm.Int64":"Int64","Edm.SByte":"SByte","Edm.Single":"Single","Edm.String":"String","Edm.Time":"Time"};var n={"Edm.Decimal":true,"Edm.Double":true,"Edm.Float":true,"Edm.Int16":true,"Edm.Int32":true,"Edm.Int64":true,"Edm.Single":true};var j={"Edm.DateTime":true,"Edm.DateTimeOffset":true,"Edm.Time":true};var O={getType:function(t,F,C,k){var o=null,_;if(k){return new i(F);}_=u[t];if(_){o=new _(F,C);}return o;},isNumeric:function(t){return n[t]?true:false;},isDateOrTime:function(t){return j[t]?true:false;},getDefaultValueTypeName:function(t){return m[t];}};return O;},true);
