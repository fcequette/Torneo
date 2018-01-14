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
      height: 630

    },{
      xtype:'treejugadores',
      scrollable: true,
      flex:1,
      height: 630

		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
