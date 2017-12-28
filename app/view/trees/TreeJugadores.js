Ext.define('Torneo.view.trees.TreeJugadores', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.tree.Panel'
    ,title: 'Jugadores'
    ,xtype: 'treejugadores'

    ,requires: [
        //'gcl.view.trees.TreeJugadoresController'
    ]
    //,controller: 'TreeJugadores'
    //,flex:1
    //,height: 300
    ,tbar: [{
      labelWidth: 130,
      xtype: 'triggerfield',
      fieldLabel: 'Buscar Jugador',
      triggerCls: 'x-form-clear-trigger',
      onTriggerClick: function () {
          var store = this.up('treepanel').store;

          this.reset();
          store.clearFilter();
          this.focus();
      },
      listeners: {
          change: function () {
              var tree = this.up('treepanel'),
                  v,
                  matches = 0;

              try {
                  v = new RegExp(this.getValue(), 'i');
                  tree.store.filter({
                      filterFn: function (node) {
                          var children = node.childNodes,
                              len = children && children.length,
                              visible = node.isLeaf() ? v.test(node.get('text')) : false,
                              i;
                          for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                          if (visible && node.isLeaf()) {
                              matches++;
                          }
                          return visible;
                      },
                      id: 'titleFilter'
                  });
                  tree.down('#matches').setValue(matches);
              } catch (e) {
                  this.markInvalid('Invalid regular expression');
              }
          },
          buffer: 250
      }
    }, {
      xtype: 'displayfield',
      itemId: 'matches',
      fieldLabel: 'Resultados',

      // Use shrinkwrap width for the label
      labelWidth: null,
      listeners: {
          beforerender: function () {
              var me = this,
                  tree = me.up('treepanel'),
                  root = tree.getRootNode(),
                  leafCount = 0;

              tree.store.on('fillcomplete', function (store, node) {
                  if (node === root) {
                      root.visitPostOrder('', function (node) {
                          if (node.isLeaf()) {
                              leafCount++;
                          }
                      });
                      me.setValue(leafCount);
                  }
              });
          },
          single: true
      }
    }]
    //,width: 500
    //,height: 850
    ,tools:[{
         xtype: 'button'
        //,text: 'Eliminar'
        ,glyph:'xe681@Linearicons'
        ,scale: 'medium'
        ,itemId: 'botonDeleteJugador'
        ,cls: 'toolbtn'
        ,handler: function(btn, e){
          Ext.create('Ext.window.Window', {
             title: 'Eliminación de '+ Ext.ComponentQuery.query('#botonDeleteJugador')[0].ventana,
             height: 250,
             width: 400,
             layout: 'fit',
             items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype:'form'
               ,bodyPadding: '15px'
               ,itemId:'formDeleteJugador'
               ,defaults:{
                 margin: '20 0 20 0'
               }
               ,items:[{
                 xtype: 'label'
                 ,text: '¿Está seguro de eliminarlo?'
               },{
                    xtype:'textfield'
                   ,fieldLabel: 'Descripción'
                   ,itemId:'winDeleteDescriJugador'
                   ,readOnly: true
                   ,name: ''
                   ,hidden: true
                   //,value: Ext.ComponentQuery.query('#botonDelete')[0].record.data.jugador_nombre
               },{
                  xtype: 'textfield',
                  fieldLabel: 'Id',
                  itemId: 'winDeleteIdJugador',
                  columns: 1,
                  readOnly: true,
                  vertical: true
                  ,name: ''
                  ,hidden: true
                  //,value: Ext.ComponentQuery.query('#botonDelete')[0].record.data.jugador_id
               }]// A dummy empty data store
             }
             ,dockedItems:[{
                    xtype: 'toolbar'
                   ,dock: 'bottom'
                   ,items:[{
                         xtype: 'button'
                         ,text: 'Cancelar'
                         ,ui: 'decline'
                   },'->',{
                     xtype: 'button'
                     ,text: 'Eliminar'
                     ,ui: 'action'
                     ,handler: function (btn,e){
                       Ext.ComponentQuery.query('#formDeleteJugador')[0].submit(
                         {
                            jsonSubmit: true
                            ,method: 'DELETE'
                            ,url: 'http://dario-casa.sytes.net/api/jugador/'+Ext.ComponentQuery.query('#botonDeleteJugador')[0].record.data.jugador_id
                            ,success: function( form, action ) {
                              if(action.result.success == true){
                                  Ext.getStore('storeJugador').reload();
                                  btn.up().up('window').close();
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
                            // });
                            // }
                         }
                       );

                     }
                   }]
             }]
           }).show();
        }
    },{
        xtype: 'button'
        //,text: 'Editar'
        ,scale: 'medium'
        ,cls: 'toolbtn'
        ,glyph:'xe612@Linearicons'
        ,itemId: 'botonEditJugador'
        ,ventana: 'Jugadores'
        ,edit: true
        ,record: ''
        ,handler:function (){
            // console.log('llamar a ventana',Ext.ComponentQuery.query('#botonAddEquipoEquipo')[0].ventana);
            console.log('con este record',Ext.ComponentQuery.query('#botonEditJugador')[0].record);
            console.log(Ext.ComponentQuery.query('#botonEditJugador')[0].record.data.text);
            Ext.create('Ext.window.Window', {
                title: 'EDITAR Jugador',
                height: 250,
                width: 400,
                layout: 'fit',
                items: {  // Let's put an empty grid in just to illustrate fit layout
                  xtype:'form'
                 ,bodyPadding: '15px'
                 ,itemId: 'formEditJugador'
                 ,items:[{
                      xtype:'textfield'
                     ,fieldLabel: 'Id'
                     ,name: 'jugador_id'
                     ,readOnly:true
                     ,value: Ext.ComponentQuery.query('#botonEditJugador')[0].record.data.jugador_id
                 },{
                      xtype:'textfield'
                     ,fieldLabel: 'Nombre'
                     ,name: 'jugador_nombre'
                     ,value: Ext.ComponentQuery.query('#botonEditJugador')[0].record.data.jugador_nombre
                 },{
                   xtype: 'textfield',
                   fieldLabel: 'Apellido'
                   ,name: 'jugador_apellido'
                   ,value: Ext.ComponentQuery.query('#botonEditJugador')[0].record.data.jugador_apellido

                   //,value: rec.data.entidad_activo
                 },{
                   xtype: 'textfield'
                   ,name: 'update'
                   ,value: true
                   ,hidden: true
                 }]// A dummy empty data store
                }
                ,dockedItems:[{
                      xtype: 'toolbar'
                     ,dock: 'bottom'
                     ,items:[{
                           xtype: 'button'
                           ,text: 'Cancelar'
                           ,ui: 'decline'
                           ,handler: function (btn, e){
                             btn.up().up('window').close();
                           }
                     },'->',{
                       xtype: 'button'
                       ,text: 'Guardar Cambios'
                       ,ui: 'action'
                       ,handler: function (btn,e){
                         Ext.cq1('#formEditJugador').getForm().submit({
                           url: 'http://dario-casa.sytes.net/api/jugador'
                           ,jsonSubmit:true
                           ,method: 'post'
                           ,success: function( form, action ) {
                             if(action.result.success == true){
                                 Ext.getStore('storeJugador').reload();
                                 btn.up().up('window').close();
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
            }).show();
        }
     },{
        xtype: 'button'
        ,glyph:'xe98e@Linearicons'
        ,itemId: 'botonAddJugador'
        ,ventana: 'Jugadores'
        ,record: ''
        ,scale: 'medium'
        ,cls: 'toolbtn'

        //,edit: false
        ,handler: function (){
          console.log('llamar a ventana',Ext.ComponentQuery.query('#botonAddJugador')[0].ventana);
          console.log('con este record',Ext.ComponentQuery.query('#botonAddJugador')[0].record);
          Ext.create('Ext.window.Window', {
                title: 'Alta de Jugador',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {  // Let's put an empty grid in just to illustrate fit layout
                     xtype:'form'
                    ,bodyPadding: '15px'
                    ,items: {  // Let's put an empty grid in just to illustrate fit layout
                       xtype:'form'
                      ,bodyPadding: '15px'
                      ,itemId:'formAltaJugador'
                      ,url: 'http://dario-casa.sytes.net/api/jugador'
                      ,items:[{
                           xtype:'textfield'
                          ,fieldLabel: 'Nombre'
                          ,itemId:'winAltaNombreJugador'
                          ,name: 'jugador_nombre'
                          //,value: Ext.ComponentQuery.query('#botonEditJugador')[0].record.data.torneo_descri
                      },{
                         xtype: 'textfield',
                         fieldLabel: 'Apellido',
                         itemId: 'winAltaApellidoJugador'
                         ,name: 'jugador_apellido'


                        //,value: Ext.ComponentQuery.query('#botonEditJugador')[0].record.data.torneo_estado
                      }]// A dummy empty data store
                    }
                    ,dockedItems:[{
                           xtype: 'toolbar'
                          ,dock: 'bottom'
                          ,items:[{
                                xtype: 'button'
                                ,text: 'Cancelar'
                                ,ui: 'decline'
                                ,handler: function (btn,e ){
                                  btn.up().up('window').close();
                                }
                          },'->',{
                            xtype: 'button'
                            ,text: 'Guardar Cambios'
                            ,ui: 'action'
                            ,handler: function (btn,e){

                              Ext.ComponentQuery.query('#formAltaJugador')[0].submit(
                                {
                                method: 'POST'
                                ,jsonSubmit: true
                                ,success: function( form, action ) {
                                  if(action.result.success == true){
                                      Ext.getStore('storeJugador').reload();
                                      btn.up().up('window').close();
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
                              }
                              );

                            }
                          }]
                    }]
                }
          }).show();
        }
     }]
      ,viewConfig:{
        loadMask:false,
        plugins:{
        ptype:'treeviewdragdrop',
        expandDelay:100
        }
      }
      ,store: {
        folderSort: false
        ,autoDestroy: true
        ,storeId: 'storeJugador'
        ,proxy: {
          type: 'ajax'
          ,url: 'http://dario-casa.sytes.net/api/jugador'
        }
      ,sorters: [{
        property: 'menu_secuencial'
        ,direction: 'ASC'
      }]
      ,root: {
        text: 'Jugadores'
        ,expanded: true
      }
    }
    ,listeners:{
      itemclick: function (est, record, item, index, e, eOpts ){
          console.log('SE EJECUTO',est,record,item,index);
            Ext.ComponentQuery.query('#botonAddJugador')[0].setText('');
            Ext.ComponentQuery.query('#botonAddJugador')[0].ventana = 'Jugador';
            Ext.ComponentQuery.query('#botonEditJugador')[0].record = record;
            Ext.ComponentQuery.query('#botonDeleteJugador')[0].record = record;
      }
    }
 });
