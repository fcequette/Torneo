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
      ,height:window.innerHeight-10

    },{
      xtype:'treejugadores'
      ,width:'50%'
      ,scrollable:true
      ,height:window.innerHeight-10
      ,itemId:'treejugadores'

		}]

  ,listeners: {
     select: 'onItemSelected'
   }
});
