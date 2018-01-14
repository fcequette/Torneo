Ext.define('Torneo.view.main.TreeEquiposJugadores', {
    //extend: 'Ext.container.Container',
    extend: 'Ext.tree.Panel'
    ,xtype: 'treeequiposjugadores'
    ,title: 'Equipos'
    //,width: 500
    ,height: 650
    ,scrollable:true
    ,flex:1
    ,tbar: [{
      text:'Equipos'
      ,xtype:'label'
      ,padding:5.5
    }]
    ,tools:[{
        xtype: 'button'
       //,text: 'Eliminar'
       ,scale: 'medium'
       ,cls: 'toolbtn'
       ,glyph:'xe681@Linearicons'
       ,itemId:'botonDeleteEquipoJugador'
       ,record: ''
       ,handler: function(btn, e){
         Ext.create('Ext.window.Window', {
            title: 'Eliminación de '+ Ext.ComponentQuery.query('#botonDeleteJugador')[0].ventana,
            height: 250,
            width: 400,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
               xtype:'form'
              ,bodyPadding: '15px'
              ,itemId:'formDeleteEquipoJugador'
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
                      Ext.ComponentQuery.query('#formDeleteEquipoJugador')[0].submit(
                        {
                           jsonSubmit: true
                           ,method: 'DELETE'
                           ,url: 'http://dario-casa.sytes.net/api/equipo/'+Ext.ComponentQuery.query('#botonDeleteEquipoJugador')[0].record.data.equipo_id
                           ,success: function( form, action ) {
                             if(action.result.success == true){
                                  Ext.getStore('EquiposJugadores').reload();
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
          }).show();
       }
    },{
        xtype: 'button'
       //,text: 'Editar'
       ,scale: 'medium'
       ,cls: 'toolbtn'
        ,glyph:'xe612@Linearicons'
       ,itemId: 'botonEditEquipo'
       ,ventana: 'Equipo'
       ,edit: true
       ,record: ''
       ,handler:function (){
           console.log('con este record',Ext.ComponentQuery.query('#botonEditEquipo')[0].record);
           console.log(Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.text);
           Ext.create('Ext.window.Window', {
               title: 'EDITAR Equipo',
               height: 250,
               width: 400,
               layout: 'fit',
               items: {  // Let's put an empty grid in just to illustrate fit layout
                 xtype:'form'
                ,url: 'http://dario-casa.sytes.net/api/equipo'
                ,itemId: 'formEditEquipoJugador'
                ,bodyPadding: '15px'
                ,items:[{
                     xtype:'textfield'
                    ,fieldLabel: 'Id'
                    ,name: 'equipo_id'
                    ,value: Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.equipo_id
                    ,readOnly:true
                },{
                     xtype:'textfield'
                    ,fieldLabel: 'Nombre'
                    ,name: 'equipo_nombre'
                    ,value: Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.equipo_nombre
                },{
                  xtype: 'textfield',
                  fieldLabel: 'Delegado',
                  // Arrange radio buttons into two columns, distributed vertically
                  vertical: true,
                  name:'equipo_delegado'
                  ,value: Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.equipo_delegado


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
                          ,handler: function(btn,e){
                            btn.up().up('window').close();
                          }
                    },'->',{
                      xtype: 'button'
                      ,text: 'Guardar Cambios'
                      ,ui:'action'
                      ,handler: function (btn,e){
                        Ext.cq1('#formEditEquipoJugador').submit( {
                         method: 'POST'
                         ,jsonSubmit: true
                         ,success: function( form, action ) {
                           if(action.result.success == true){
                               Ext.getStore('EquiposJugadores').reload();
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
                       })
                      }
                    }]
               }]
           }).show();
       }
     },{
        xtype: 'button'
       ,scale: 'medium'
       ,cls: 'toolbtn'
       ,itemId: 'botonAddEquipo'
       ,ventana: 'Equipo'
       ,glyph:'xe98e@Linearicons'
       ,record: ''
       //,edit: false
       ,handler:function (){
         console.log('llamar a ventana',Ext.ComponentQuery.query('#botonAddEquipo')[0].ventana);
         console.log('con este record',Ext.ComponentQuery.query('#botonAddEquipo')[0].record);
         Ext.create('Ext.window.Window', {
               title: 'Alta de Equipo',
               height: 200,
               width: 400,
               layout: 'fit',
               items: {  // Let's put an empty grid in just to illustrate fit layout
                    xtype:'form'
                   ,bodyPadding: '15px'
                   ,items: {  // Let's put an empty grid in just to illustrate fit layout
                      xtype:'form'
                     ,bodyPadding: '15px'
                     ,itemId:'formAltaEquipoJugadores'
                      ,url: 'http://dario-casa.sytes.net/api/equipo'
                     //,url: 'http://localhost:8080/equipo'

                     ,items:[{
                          xtype:'textfield'
                         ,fieldLabel: 'Descripción'
                         ,itemId:'winAltaDescriEquipo'
                         ,name: 'equipo_nombre'
                         //,value: Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.torneo_descri
                     },{
                        xtype: 'textfield',
                        fieldLabel: 'Delegado',
                        itemId: 'winAltaDelegado',
                        columns: 1,
                        vertical: true
                        ,name: 'equipo_delegado'
                       //,value: Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.torneo_estado
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
                           ,text: 'Guardar Cambios'
                           ,ui: 'action'
                           ,handler: function (btn,e){
                             Ext.ComponentQuery.query('#formAltaEquipoJugadores')[0].submit(
                               {
                               method: 'POST'
                               ,jsonSubmit: true
                               ,success: function( form, action ) {
                                 if(action.result.success == true){
                                     Ext.getStore('EquiposJugadores').reload();
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
       ,autoLoad: true
       ,proxy: {
          type: 'ajax'
         ,url: 'http://dario-casa.sytes.net/api/equipo?jug=si'
       }
       // ,sorters: [{
       //   property: 'equipo_descri'
       //   ,direction: 'ASC'
       // }]
       ,storeId:'EquiposJugadores'
       ,root: {
         text: 'Equipos'
         //,expanded: true
       }
       ,reader:{
         // text:'equipo_descri'
       }
   }
  ,listeners:{
     itemclick: function (est, record, item, index, e, eOpts ){
         console.log('SE EJECUTO',record);
           Ext.ComponentQuery.query('#botonAddEquipo')[0].setText('');
           Ext.ComponentQuery.query('#botonAddEquipo')[0].ventana = 'Equipo';
           Ext.ComponentQuery.query('#botonEditEquipo')[0].record = record  ;
           //console.log('HOLA',Ext.cq1('#botonDeleteEquipoJugador').record);
            Ext.cq1('#botonDeleteEquipoJugador').record = record;
     }
  }
});
