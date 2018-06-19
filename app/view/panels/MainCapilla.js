
Ext.define('Torneo.view.panels.MainCapilla', {
     extend: 'Ext.grid.Panel'
    ,xtype: 'maincapilla'
    ,store: 'Capilla'
    ,emptyText:'No hay  jugadores  en capillla para la categoria'
    ,dockedItems:[{
      dock:'top'
      ,xtype:'toolbar'
      ,items:[{
        xtype:'form'
        //,url:'/api/posiciones'
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
            ,idcmb:'#cmbcateCa'
            ,listeners:{
              change: 'onComboboxChange'
            }
        },{
          xtype:'combobox'
          ,fieldLabel:'Categoria'
          ,itemId:'cmbcateCa'
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
          ,text:'Ver'
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
   ,height:600
    ,columns:[{
      text: 'Jugador Id'
      ,name: 'jugador_id'
      ,dataIndex : 'jugador_id'
      ,flex: 1
      ,hidden:true
    },{
      text: 'Jugador'
      ,name: 'text'
      ,dataIndex : 'text'
      ,flex: 2
    },{
       text: 'Equipo'
      ,name: 'equipo'
      ,dataIndex : 'equipo'
      ,flex: 2
    },{
      text: 'Cantidad de Amarillas'
      ,name: 'cantamarillas'
      ,dataIndex : 'cantamarillas'
      ,flex: 1
    }]
  	// }]
});
