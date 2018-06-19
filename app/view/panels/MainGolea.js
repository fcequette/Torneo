
Ext.define('Torneo.view.panels.MainGolea', {
     extend: 'Ext.grid.Panel'
    ,xtype: 'maingolea'
    ,store: 'Golea'
    ,height:600
    ,emptyText:'No hay goleadores'
    ,scrollable:true
    ,dockedItems:[{
      dock:'top'
      ,xtype:'toolbar'
      ,items:[{
        xtype:'form'
        //,url:'/api/posiciones'
        ,itemId:'formGolea'
        ,jsonSubmit: true
        ,layout:'hbox'
        ,defaults:{
          labelAlign: 'top'
          ,margin:'0 25 0 25'
        }
        ,items:[{
              xtype:'combobox'
            ,fieldLabel:'Torneo'
            ,name:'torneo_id'
            ,store:'Torneos'
            ,displayField:'torneo_descri'
            ,valueField:'torneo_id'
            ,namecmb:'Categorias'
            ,idcmb:'#cmbcateG'
            ,listeners:{
              change: 'onComboboxChange'
            }
        },{
          xtype:'combobox'
          ,fieldLabel:'Categoria'
          ,store: 'Categorias'
          ,displayField:'categoria_descri'
          ,name:'categoria_id'
          ,namecmb:'Zonas'
          ,itemId:'cmbcateG'
          //,idcmb:'#cmbzonaG'
          ,valueField:'categoria_id'
          ,namecmb:'Zonas'
          ,posiciones:true
          ,listeners:{
            change: 'onComboboxChange'
          }
        },{
          xtype:'button'
          ,text:'Ver'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler:function(btn,e){
            console.log('estos soooooon',Ext.cq1('#formGolea').getValues());
              Ext.getStore('Golea').load({params:Ext.cq1('#formGolea').getValues()});
          }
        }]
     }]
   },{
     dock:'bottom'
     ,xtype:'toolbar'
   }]
    ,columns:[{
      text: 'Jugador Id'
      ,name: 'jugador_id'
      ,dataIndex : 'jugador_id'
      ,flex: 1
      ,hidden:true
    },{
      text: 'Nombre'
      ,name: 'jugador_nombre'
      ,dataIndex : 'jugador_nombre'
      ,flex: 2
    },{
      text: 'Apellido'
      ,name: 'jugador_apellido'
      ,dataIndex : 'jugador_apellido'
      ,flex: 1
    },{
      text: 'Equipo'
      ,name: 'equipo'
      ,dataIndex : 'equipo_nombre'
      ,flex: 1
    },{
      text: 'Goles'
      ,name: 'golesXjug'
      ,dataIndex : 'golesXjug'
      ,flex: 1
    }]
  	// }]
});
