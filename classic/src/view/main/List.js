Ext.define('Torneo.view.main.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainlist',
    requires: [
        //'gcl.store.Personnel'
    ]
    ,layout: 'hbox'
    ,items:[{
      xtype: 'treetorneo'
     //,width:800
     // ,layout:'fit'
     ,flex:1
    },{
      xtype:'treeequipos'
      ,heigth:800

      //,height:800
     // ,layout:'fit'
     ,flex:1

		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
