Ext.define('Torneo.view.main.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainlist',
    requires: [
        //'gcl.store.Personnel'
    ]
    ,layout: 'hbox'
    ,items:[{
      xtype: 'treetorneo'
     ,layout:'fit'
    },{
      xtype:'treeequipos'
      ,layout:'fit'
		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
