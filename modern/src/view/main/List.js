Ext.define('Torneo.view.main.List', {
    extend: 'Ext.container.Container',
    //extend: 'Ext.tree.Panel',
    xtype: 'mainlist',
    requires: [
        //'gcl.store.Personnel'
    ],
    layout: 'hbox'
    ,items:[{
      xtype: 'treetorneo'
    },{
      xtype:'treeequipos'
		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
