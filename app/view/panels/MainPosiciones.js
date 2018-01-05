/**
 * This view is an example list of people.
 */
Ext.define('Torneo.view.panels.MainPosiciones', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainposiciones',

    requires: [
        'Torneo.store.Posiciones'
    ],

    title: 'POSICIONES',

    store:'Posiciones'
    ,dockedItems:[{
      dock:'top'
      ,xtype:'toolbar'
      ,items:[{
        xtype:'form'
        //,url:'http://dario-casa.sytes.net/api/posiciones'
        ,itemId:'formPosiciones'
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
          ,listeners:{
            change: 'onComboboxChange'
          }
        },{
          xtype:'combobox'
          ,fieldLabel:'Zona'
          ,store: 'Zonas'
          ,displayField:'zona_descri'
          ,valueField:'zona_id'
          ,name:'zona_id'

        },{
          xtype:'button'
          ,text:'Posiciones'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler:function(btn,e){
            console.log(Ext.cq1('#formPosiciones').getValues());
              Ext.getStore('Posiciones').load({params:Ext.cq1('#formPosiciones').getValues()});
          }
        }]
     }]
   }]
    ,columns: [
       { text: 'Id  ', dataIndex: 'equipo_id', flex: 1 ,hidden:true},
       { text: 'Nombre equipo  ', dataIndex: 'equipo_nombre', flex: 2 },
       { text: 'Ptos',  dataIndex: 'ptos', flex: 1  },
       { text: 'P.Jugados', dataIndex: 'pj',flex: 1 },
       { text: 'P. ganados', dataIndex: 'pg', flex: 1 },
       { text: 'P. empatados', dataIndex: 'pe', flex: 1 },
       { text: 'P. perdidos', dataIndex: 'pp', flex: 1 },
       { text: 'Goles a favor', dataIndex: 'gf', flex: 1 },
       { text: 'Goles en  contra ', dataIndex: 'gc', flex: 1 },
       { text: 'Diferencia de goles ', dataIndex: 'dif', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
