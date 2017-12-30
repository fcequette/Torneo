Ext.define('Torneo.view.main.MainEquipos', {
    extend: 'Ext.panel.Panel',
    //extend: 'Ext.tree.Panel',
    xtype: 'mainequipos',
    requires: [
        //'gcl.store.Personnel'
    ],
    layout: 'hbox'
    ,items:[{
      xtype: 'treeequiposjugadores',
      flex: 1,
      scrollable: true,
      height: 500

    },{
      xtype:'treejugadores',
      scrollable: true,
      flex:1,
      height: 500

		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
