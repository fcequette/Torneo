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
      ,height:600
    },{
      xtype:'treeequipos'
      //,layout:'fit'
       ,height:600
		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
