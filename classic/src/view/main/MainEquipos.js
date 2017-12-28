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
      height: 600

    },{
      xtype:'treejugadores',
      scrollable: true,
      flex:1,
      height: 600

		}]
    ,dockedItems:[{
       xtype: 'toolbar'
      ,dock: 'bottom'
      ,items:[{
         xtype: 'button'
        ,text: 'Cancelar'
      }]
    }]

  ,listeners: {
        select: 'onItemSelected'
    }
});
