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
      flex: 1,
      scrollable: true,
      height: 600

    },{
      xtype:'treeequipos',
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
      },'->',{
         xtype: 'button'
        ,text: 'Editar Equipos'
      }]
    }]

  ,listeners: {
        select: 'onItemSelected'
    }
});
