
Ext.define('Torneo.view.panels.MainValla', {
     extend: 'Ext.grid.Panel'
    ,xtype: 'mainvalla'
    ,store: 'Valla'
    ,dockedItems:[{
      dock:'top'
      ,xtype:'toolbar'
      ,items:[{
        xtype:'form'
        //,url:'http://dario-casa.sytes.net/api/posiciones'
        ,itemId:'formValla'
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
          ,text:'Valla'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler:function(btn,e){
            console.log(Ext.cq1('#formValla').getValues());
              Ext.getStore('Valla').load({params:Ext.cq1('#formValla').getValues()});
          }
        }]
     }]
   },{
     dock:'bottom'
     ,xtype:'toolbar'
   }]
    ,columns:[{
      text: 'Posicion'
      ,name: 'pos'
      ,dataIndex : 'pos'
      ,flex: 1
    },{
      text: 'Equipo'
      ,name: 'equipo_nombre'
      ,dataIndex : 'equipo_nombre'
      ,flex: 2
    },{
      text: 'Posicion general'
      ,name: 'pos-gral'
      ,dataIndex : 'pos-gral'
      ,flex: 1
    },{
      text: 'prom_gol_rec'
      ,name: 'prom_gol_rec'
      ,dataIndex : 'prom_gol_rec'
      ,flex: 1
    },{
      text: 'Puntos'
      ,name: 'ptos'
      ,dataIndex : 'ptos'
      ,flex: 1
    },{
      text: 'P.Jugados'
      ,name: 'pj'
      ,dataIndex : 'pj'
      ,flex: 1
    },{
      text: 'P.Ganados'
      ,name: 'pg'
      ,dataIndex : 'pg'
      ,flex: 1
    },{
      text: 'P.Empatados'
      ,name: 'pe'
      ,dataIndex : 'pe'
      ,flex: 1
    }
    ,{
      text: 'P.Perdidos'
      ,name: 'pp'
      ,dataIndex : 'pp'
      ,flex: 1
    },{
      text: 'GF'
      ,name: 'gf'
      ,dataIndex : 'gf'
      ,flex: 1
    },{
      text: 'GC'
      ,name: 'gc'
      ,dataIndex : 'gc'
      ,flex: 1
    },{
      text: 'Diferencia'
      ,name: 'dif'
      ,dataIndex : 'dif'
      ,flex: 1
	}]
  	// }]
});
