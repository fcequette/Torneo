
Ext.define('Torneo.view.panels.MainCapilla', {
     extend: 'Ext.grid.Panel'
    ,xtype: 'maincapilla'
    //,store: 'Capilla'
    ,dockedItems:[{
      dock:'top'
      ,xtype:'toolbar'
      ,items:[{
        xtype:'form'
        //,url:'http://dario-casa.sytes.net/api/posiciones'
        ,itemId:'formCapilla'
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
          ,valueField:'categoria_id'
          ,namecmb:'Zonas'
          ,posiciones:true
          ,listeners:{
            change: 'onComboboxChange'
          }
        },{
          xtype:'button'
          ,text:'Capilla'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler:function(btn,e){
            console.log(Ext.cq1('#formCapilla').getValues());
              Ext.getStore('Capilla').load({params:Ext.cq1('#formCapilla').getValues()});
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
      ,dataIndex : 'equipo'
      ,flex: 1
    },{
      text: 'Cantidad de Amarillaas'
      ,name: 'cantamarillas'
      ,dataIndex : 'cantamarillas'
      ,flex: 1
    }]
  	// }]
});
