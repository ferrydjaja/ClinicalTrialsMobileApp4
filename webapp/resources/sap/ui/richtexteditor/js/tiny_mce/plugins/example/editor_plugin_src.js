(function(){tinymce.PluginManager.requireLangPack('example');tinymce.create('tinymce.plugins.ExamplePlugin',{init:function(e,u){e.addCommand('mceExample',function(){e.windowManager.open({file:u+'/dialog.htm',width:320+parseInt(e.getLang('example.delta_width',0)),height:120+parseInt(e.getLang('example.delta_height',0)),inline:1},{plugin_url:u,some_custom_arg:'custom arg'});});e.addButton('example',{title:'example.desc',cmd:'mceExample',image:u+'/img/example.gif'});e.onNodeChange.add(function(e,c,n){c.setActive('example',n.nodeName=='IMG');});},createControl:function(n,c){return null;},getInfo:function(){return{longname:'Example plugin',author:'Some author',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',version:"1.0"};}});tinymce.PluginManager.add('example',tinymce.plugins.ExamplePlugin);})();