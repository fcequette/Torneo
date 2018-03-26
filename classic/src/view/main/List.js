Ext.define('Torneo.view.main.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainlist',
    requires: [
        //'gcl.store.Personnel'
    ]
    ,layout: 'hbox'
    ,flex:1
    ,fullscreen:true
    ,items:[{
       xtype: 'treetorneo'
     //,layout:'fit'
      ,height:window.innerHeight-10
    },{
      xtype:'treeequipos'
      //,layout:'fit'
       ,height:window.innerHeight -10
		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
