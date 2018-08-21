
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
          ,height:700
          ,titleBar: { hidden: true }
          ,layout:'fit'
          ,dockedItems:[{
            dock:'top'
            ,xtype:'toolbar'
            ,items:[{
              xtype:'form'
              //,url:'/api/posiciones'
              ,itemId:'formSancionados'
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
                  ,idcmb:'#cmbcateS'
                  ,listeners:{
                    change: 'onComboboxChange'
                  }
              },{
                xtype:'combobox'
                ,fieldLabel:'Categoria'
                ,store: 'Categorias'
                ,displayField:'categoria_descri'
                ,name:'categoria_id'
                ,itemId:'cmbcateS'
                ,valueField:'categoria_id'
                ,idcmb:'#cmbzonaS'
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
                  console.log(Ext.cq1('#formSancionados').getValues());
                    Ext.getStore('Sancionados').removeAll();
                    Ext.getStore('Sancionados').load({params:Ext.cq1('#formSancionados').getValues()});
                }
              },{
                xtype:'button'
                ,text:'+ Sanción'
                ,ui:'action'
                ,margin: '25 0 0 25'
                ,handler:function(btn,e){
                  var rec = Ext.cq1('#formSancionados').getValues();
console.log('esta es rec', rec);
                  if(rec.categoria_id) {
                  Ext.create('Ext.window.Window', {
                    // title: 'EDITAR '+record.data.equipo1+' VS '+record.data.equipo2 ,
                     height: 200,
                     width: 350,
                     modal: true,
                     title: 'Alta de sanción',
                     items:[{
                       xtype:'form'
                       ,url: '/api/sancionados'
                       ,itemId: 'formAltaSan'
                       ,bodyPadding:15
                     ,height:150
                       ,items:[{
                         xtype: 'combobox'
                         ,fieldLabel:'Zona'
                         ,name: 'sancionados_zona_id'
                         ,store: 'Zonas'
                         ,itemId:'cmbzonaS'
                         ,namecmb:'Equipozona'
                         ,displayField:'zona_descri'
                         ,valueField:'zona_id'
                         ,idcmb:'#cmbequipozonaS'
                         ,listeners:{
                           change: 'onComboboxChange'
                         }
                       },{
                         xtype: 'combobox'
                         ,fieldLabel:'Equipo'
                         ,name: 'sancionados_equipo_id'
                         ,store: 'Equipozona'
                         ,itemId:'cmbequipozonaS'
                         ,displayField: 'equipo_nombre'
                         ,namecmb:'Jugadores-Equipo'
                         ,idcmb: '#jugadoresequiposS'
                         ,valueField:'equipo_id'
                         ,listeners:{
                           change: 'onComboboxChange'
                         }
                       },{
                         xtype: 'combobox'
                         ,store: 'Jugadores-Equipo'
                         ,itemId: 'jugadoresequiposS'
                         ,displayField: 'text'
                         ,valueField: 'jugadore_id'
                         ,name: 'sancionados_jugador_id'
                         ,fieldLabel: 'Jugador'
                         ,listeners:{
                           render: function(cmb,e){
                             console.log('este es store',cmb.getStore());
                           }
                         }
                       },{
                         xtype: 'numberfield'
                         ,name: 'sancionados_sancion'
                         ,fieldLabel: 'Sanción'
                       },{
                         xtype: 'textfield'
                         ,name: 'sancionados_torneo_id'
                         ,value: rec.torneo_id
                         ,hidden:true
                       },{
                         xtype: 'textfield'
                         ,name: 'sancionados_categoria_id'
                         ,value: rec.categoria_id
                         ,hidden:true
                       }]
                     }]
                     ,dockedItems:[{
                       xtype: 'toolbar'
                       ,dock: 'bottom'
                       ,items:['->',{ xtype:'button',
                        text:'Guardar'
                        ,handler: function (btn,e){
                          Ext.cq1('#formAltaSan').submit({
                            jsonSubmit:true
                            ,url: '/api/sancionados'
                            ,method: 'POST'
                            ,success:function(r,a){
                              console.log('lo  hizo');
                              Ext.Msg.show({
                                 title:'Guardado'
                                ,message: 'Se ha guardado la nueva sanción '
                                ,buttons: Ext.Msg.OK
                                ,icon: Ext.Msg.INFO
                              });
                              btn.up().up('window').close();
                              Ext.getStore('Sancionados').reload(); //TODO los parmetros
                            }
                            ,failure:function(r,a){
                              console.log('no  lo  hizo');
                              Ext.Msg.show({
                                 title:'Error'
                                ,message: 'No se ha cargado la nueva sanción '
                                ,buttons: Ext.Msg.OK
                                ,icon: Ext.Msg.ERROR
                              });

                            }
                          });
                        }
                      }]
                     }]
                   }).show();
                 }else{
                   alert('ingresar torneo y categoria');
                 }
                }
              }]
           }]
         },{
           dock:'bottom'
           ,xtype:'toolbar'
         }]
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
            text: 'Equipo'
            ,name: 'equipo_nombre'
            ,dataIndex: 'equipo_nombre'
            ,flex:1
          },{
            text: 'Sancionados vuelve'
            ,name: 'sancionados_vuelve'
            ,dataIndex: 'sancionados_vuelve'
            ,flex:1
            ,hidden:true

          },{
            text: 'Sancion'
            ,name: 'Nombre jugador'
            ,dataIndex: 'sancion'
            ,flex:1

          },{
            xtype:'actioncolumn'
            ,width:50
            ,items:[{
                text:'Eliminar'
                ,tooltip:'Eliminar sanción'

                ,glyph: 'xe787@Linearicons'
                ,handler:function(grid, rowIndex, colIndex) {

                  Ext.Msg.confirm("ATENCIÓN", "Se eliminará la sanción", function(btnText){
                      if(btnText === "yes"){
                        // Ext.Msg.alert("ATENCIÓN", "You have confirmed 'Si'.");
                        grid.mask('Espere por favor..');
                        var record = grid.getStore().getAt(rowIndex);
                        console.log ('Esto es',record.data);
                        // var myObj = {
                        //    fixture_id: record.data.fixture_id
                        // }
                        Ext.Ajax.request({
                          // url: '/api/cierropartido'
                           url: '/api/sancionados/'+record.data.sancionados_id
                        //  ,jsonData: myObj
                          ,method:'DELETE'
                          // ,jsonSubmit:true
                          ,callback: function( opt, success, response ) {
                            var json = Ext.decode(response.responseText);
                            if ( response.status === 201 ) {
                              if ( json.success ) {
                                Ext.Msg.show({
                                   title:'Correcto'
                                  ,message: json.msg
                                  ,buttons: Ext.Msg.OK
                                  ,icon: Ext.Msg.INFO
                                });
                                grid.unmask();

                              }else{
                                Ext.Msg.show({
                                   title:'Error'
                                  ,message: json.msg
                                  ,buttons: Ext.Msg.OK
                                  ,icon: Ext.Msg.ERROR
                                });
                                grid.unmask();
                              }
                            }
                          }
                          ,failure : function( opt, success, response ) {
                            Ext.Msg.show({
                               title:'Error'
                              ,message: 'Problemas de conexion'
                              ,buttons: Ext.Msg.OK
                              ,icon: Ext.Msg.ERROR
                            });

                          }
                        });
                      }
                  }, this);

                }
              },{
                  text:'Modificar'
                  ,tooltip:'Modificar sancionados'
                  ,glyph: 'xe613@Linearicons'
                  ,handler:function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(rowIndex);
                    console.log('este es record',record);
                    Ext.create('Ext.window.Window', {
                      // title: 'EDITAR '+record.data.equipo1+' VS '+record.data.equipo2 ,
                       height: 200,
                       width: 350,
                       layout: 'fit',
                       modal:true,
                       items: {  // Let's put an empty grid in just to illustrate fit layout
                          xtype:'form'
                          ,url:'/api/sancionados'
                          ,bodyPadding:15
                          ,itemId:'formModifSan'
                          ,items:[{
                            xtype:'textfield'
                            ,name:'sancionados_id'
                            ,value: record.data.sancionados_id
                            ,hidden:true
                          },{
                            xtype:'textfield'
                            ,fieldLabel:'Equipos'
                            ,readOnly: true
                            ,store: 'Equipos'
                            ,name:'text'
                            ,itemId:'cmbEquipo'
                            //,defaultValue: record.data.turno_id
                            ,value: record.data.equipo_nombre
                          },{
                            xtype:'textfield'
                            ,fieldLabel:'Jugador'
                            ,readOnly: true
                            ,name:'jugador_nombre'
                            ,value: record.data.text
                            //,value: fecha
                          },{
                            xtype:'numberfield'
                            ,fieldLabel: 'Sanción'
                            ,name:'sancionados_sancion'
                            ,value: record.data.sancion
                          },{
                            xtype:'textfield'
                            ,hidden:true
                            ,name: 'update'
                            ,value: true
                          }]
                        }
                        ,buttons:[{
                          text:'Cancelar',
                          ui:'decline'
                          ,handler:function(btn,e){
                            btn.up().up('window').close();
                          },
                        },'->',{
                          text:'Guardar',
                          ui:'action',
                          handler:function(btn,e){
                            Ext.cq1('#formModifSan').submit({
                              jsonSubmit:true
                              ,method: 'post'
                              ,success:function(r,a){
                                console.log('lo  hizo');
                                Ext.Msg.show({
                                   title:'Guardado'
                                  ,message: 'Se ha modificado la sanción correctamente '
                                  ,buttons: Ext.Msg.OK
                                  ,icon: Ext.Msg.INFO
                                });
                                btn.up().up('window').close();
                                Ext.getStore('Sancionados').reload(); //TODO los parmetros
                              }
                              ,failure:function(r,a){
                                console.log('no  lo  hizo');
                                Ext.Msg.show({
                                   title:'Error'
                                  ,message: 'No se ha cargado el turno y  la  cancha correctamente '
                                  ,buttons: Ext.Msg.OK
                                  ,icon: Ext.Msg.ERROR
                                });

                              }
                            });
                          }
                        }]
                      }).show();
                    ////////////////////////////////////////
                  }
                }]
          }]
        },{
          title:'EN CAPILLA'
          ,xtype:'maincapilla'
        },{
          title:'VUELVEN DE SUSPENSIÓN'
          ,xtype:'mainvuelven'

        }]
      }]
});
