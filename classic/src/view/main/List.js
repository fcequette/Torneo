Ext.define('Torneo.view.main.List', {
    extend: 'Ext.panel.Panel',
    //extend: 'Ext.tree.Panel',
    xtype: 'mainlist',
    requires: [
        //'gcl.store.Personnel'
    ],
    layout: 'hbox'
    ,items:[{
      xtype: 'treetorneo',
      // scrollable: true,
      height: 500

    },{
      xtype:'treeequipos',
      scrollable: true,
      height: 500

		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
