
Ext.define('Torneo.view.panels.MainVuelven', {
     extend: 'Ext.grid.Panel'
    ,xtype: 'mainvuelven'
    ,store: 'Vuelven'
    ,heigth:600
    ,dockedItems:[{
      dock:'top'
      ,xtype:'toolbar'
      ,items:[{
        xtype:'form'
        //,url:'http://dario-casa.sytes.net/api/posiciones'
        ,itemId:'formVuelven'
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
            ,idcmb:'#cmbcateV'
            ,listeners:{
              change: 'onComboboxChange'
            }
        },{
          xtype:'combobox'
          ,fieldLabel:'Categoria'
          ,store: 'Categorias'
          ,displayField:'categoria_descri'
          ,name:'categoria_id'
          ,itemId:'cmbcateV'
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
            console.log('estos soooooon',Ext.cq1('#formVuelven').getValues());
              Ext.getStore('Vuelven').load({params:Ext.cq1('#formVuelven').getValues()});
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
      ,dataIndex : 'equipo'
      ,flex: 1
    }]
  	// }]
});
