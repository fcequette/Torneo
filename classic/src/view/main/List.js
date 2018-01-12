Ext.define('Torneo.view.main.List', {
    extend: 'Ext.panel.Panel',
    //extend: 'Ext.tree.Panel',
    xtype: 'mainlist',
    requires: [
        //'gcl.store.Personnel'
    ],
    layout: 'hbox'
    ,items:[{
      //layout:'fit'
      xtype: 'treetorneo',
      // scrollable: true,
        height: 630,

        //height: '50%'


    },{
      //layout:'fit'
      xtype:'treeequipos',
      scrollable: true,
        height:630,
        flex:1
        //height: 500

		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
