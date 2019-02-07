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
        //,url:'/api/posiciones'
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
            ,itemId:'cmbTorneoP'
            ,namecmb:'Categorias'
            ,idcmb:'#cmbCateP'
            ,listeners:{
              change: 'onComboboxChange'
            }
        },{
          xtype:'combobox'
          ,fieldLabel:'Categoria'
          ,store: 'Categorias'
          ,displayField:'categoria_descri'
          ,name:'categoria_id'
          ,itemId:'cmbCateP'
          ,idcmb:'#cmbzonaP'
          ,namecmb:'Zonas'
          ,valueField:'categoria_id'
          ,namecmb:'Zonas'
          ,posiciones:true
          ,listeners:{
            change: 'onComboboxChange'
          }
        },{
          xtype:'combobox'
          ,fieldLabel:'Zona'
          ,store: 'Zonas'
          ,displayField:'zona_descri'
          ,itemId:'cmbzonaP'
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
        },{
          xtype:'button'
          ,text:'Quita puntos'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler:function(btn,e){
            console.log(Ext.cq1('#formPosiciones').getValues());
            Ext.getStore('Posiciones').load({params:Ext.cq1('#formPosiciones').getValues()});
            Ext.create('Ext.window.Window', {
              title: 'Puntos',
              modal:true,
              width:400,
              height:265,
              itemId: 'winPuntos',
              items:[{
                xtype:'form',
                itemId:'formpuntos',
                bodyPadding:20,
                defaults:{
                  padding:30
                }
                ,items:[{
                  xtype:'hiddenfield'
                  ,name:'torneo_id'
                  ,value:Ext.cq1('#formPosiciones').getValues().torneo_id
                },
                {
                  xtype:'hiddenfield'
                  ,name:'categoria_id'
                  ,value:Ext.cq1('#formPosiciones').getValues().categoria_id
                },{
                  xtype:'hiddenfield'
                  ,name:'zona_id'
                  ,value:Ext.cq1('#formPosiciones').getValues().zona_id
                },{
                    xtype:'combobox'
                  ,fieldLabel:'Equipo:'
                  ,store: 'Posiciones'
                  ,displayField:'equipo_nombre'
                  ,valueField:'equipo_id'
                  ,name:'equipo_id'
                },{
                    xtype:'numberfield'
                   ,fieldLabel:'Puntos:'
                   ,name:'cant'
                }]
                ,dockedItems:[{
                  xtype:'toolbar',
                  dock:'bottom',
                  items:['->',{
                    xtype:'button'
                    ,text:'Cambiar'
                    ,handler: function(btn,e){
                      Ext.cq1('#formpuntos').getForm().submit({
                        method:'post'
                        ,url:'/api/quitapuntos'
                        ,jsonSubmit: true
                        ,success: function( form, action ) {
                          if(action.result.success == true){
                            Ext.Msg.show({
                               title: 'Cambio realizado'
                              ,message: action.result.mensaje
                              ,buttons: Ext.Msg.OK
                              ,icon: Ext.Msg.OK
                            });
                             Ext.cq1('#winPuntos').close();
                          }else{
                            Ext.Msg.show({
                               title: 'Atención'
                              ,message: action.result.mensaje
                              ,buttons: Ext.Msg.OK
                              ,icon: Ext.Msg.WARNING
                            });
                          }
                        }
                        ,failure: function( form, action ) {

                          Ext.Msg.show({
                             title: 'Atención'
                            ,message: 'La operación no fue realizada'
                            ,buttons: Ext.Msg.OK
                            ,icon: Ext.Msg.WARNING
                          });
                        }

                      });
                    }
                  }]

                }]
              }]

              ,listeners:{
                close:function(btn,e){
                 // Ext.cq1('app-main').setActiveItem(1);
                }
              }
            }).show();
              //Ext.getStore('Posiciones').load({params:Ext.cq1('#formPosiciones').getValues()});

          }
        }]
     }]
   }]
    ,columns: [
      { text: '', dataIndex: 'pos',sortable: false, width:40},
       { text: 'Id  ', dataIndex: 'equipo_id', flex: 1 ,hidden:true},
       { text: 'Nombre equipo  ', dataIndex: 'equipo_nombre',sortable: false, flex: 2 },
       { text: 'Ptos',  dataIndex: 'ptos',sortable: false, width:50  },
       { text: 'P.J', dataIndex: 'pj',sortable: false,width:85  },
       { text: 'P.G', dataIndex: 'pg',sortable: false, width:85 },
       { text: 'P.E', dataIndex: 'pe',sortable: false, flex: 1 },
       { text: 'P.P', dataIndex: 'pp',sortable: false, flex: 1 },
       { text: 'G.a.F', dataIndex: 'gf',sortable: false, flex: 1 },
       { text: 'G.e.C ', dataIndex: 'gc',sortable: false, flex: 1 },
       { text: 'Dif ',sortable: false, dataIndex: 'dif', flex: 1 }
    ]
});
