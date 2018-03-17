Ext.define('Torneo.view.main.MainEquipos', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainequipos',
    requires: [
        //'gcl.store.Personnel'
    ]
    ,layout: 'hbox'
    ,items:[{
      xtype: 'treeequiposjugadores'
      ,itemId:'treeequiposjugadores'
      ,width:'50%'
      ,scrollable:true
      ,height:600

    },{
      xtype:'treejugadores'
      ,width:'50%'
      ,scrollable:true
      ,height:600
      ,itemId:'treejugadores'

		}]

  ,listeners: {
     select: 'onItemSelected'
   }
});
