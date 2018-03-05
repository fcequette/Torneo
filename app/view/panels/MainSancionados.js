
Ext.define('Torneo.view.panels.MainSancionados', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.panel.Panel'
    ,xtype: 'mainsancionados'
    ///-,controller:'mainconfiguracion'
    ,requires: [
      'Torneo.view.panels.MainCapilla'
      ,'Torneo.view.panels.MainVuelven'
    ]
    ,layout:'fit'
    //,title: 'Configuración'
  	,items:[{
  			 xtype: 'tabpanel'
  			,layout:'fit'
        //,store:'usuario'
  			,items:[{
  				title: 'SANCIONADOS'
          ,xtype: 'grid'
          ,store: 'Sancionados'
          ,emptyText:'No hay expulsados cargados'
          ,height:200
          ,titleBar: { hidden: true }
          ,layout:'fit'
          ,columns:[{
            text: 'Id de jugador'
            ,name: 'Id de jugador'
            ,dataIndex : 'text'
            ,width:300
            ,hidden:true

          },{
            text: 'Jugador'
            ,name: 'Nombre jugador'
            ,dataIndex: 'jugador_nombre'
            ,flex:1
          },{
            text: 'Amarilla'
            ,name: 'Nombre jugador'
            ,dataIndex: 'sancionados_amarilla'
            ,flex:1
          },{
            text: 'Roja'
            ,name: 'Nombre jugador'
            ,dataIndex: 'sancionados_roja'
            ,flex:1

          },{
            text: 'Sancion'
            ,name: 'Nombre jugador'
            ,dataIndex: 'sancionados_sancion'
            ,flex:1

          },{
            cell: {
                   xtype: 'gridcell',
                   encodeHtml: false
               },
               tpl: '<i class="fa fa-trash"></i>',
               width: 50
          }]
        },{
          title:'EN CAPILLA'
          ,xtype:'maincapilla'
        },{
          title:'VUELVEN DE SUSPENCION'
          ,xtype:'mainvuelven'

        }]
      }]
});
