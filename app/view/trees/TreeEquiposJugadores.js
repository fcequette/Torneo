Ext.define('Torneo.view.main.TreeEquiposJugadores', {
    extend: 'Ext.tree.Panel'
    ,xtype: 'treeequiposjugadores'
    ,title: 'EQUIPOS'
    ,scrollable:true
    ,flex:1
    ,tbar: [{
      text:'Equipos'
      ,xtype:'label'
      ,padding:5.5
    }]
    ,tools:[{
        xtype: 'button'
       ,scale: 'medium'
       ,cls: 'toolbtn'
       ,glyph:'xe681@Linearicons'
       ,itemId:'botonDeleteEquipoJugador'
       ,record: ''
       ,handler: function(btn, e){
         console.log('me llega esto',btn.record);
         Ext.create('Ext.window.Window', {
            title: 'Se eliminará ' + btn.record.data.text,
            height: 250,
            width: 400,
            modal:true,
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
              },{
                 xtype: 'textfield',
                 fieldLabel: 'Id',
                 itemId: 'winDeleteIdJugador',
                 columns: 1,
                 readOnly: true,
                 vertical: true
                 ,name: ''
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
                  },'->',{
                    xtype: 'button'
                    ,text: 'Eliminar'
                    ,ui: 'action'
                    ,handler: function (btn,e){

                      if(Ext.ComponentQuery.query('#botonDeleteEquipoJugador')[0].record.data.equipo_id){
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
                        }else{
                          console.log('hacer request DELETE a  donde  acordemos',Ext.ComponentQuery.query('#botonDeleteEquipoJugador')[0].record.data)
                          var myObj = {
                            jugador_id: Ext.ComponentQuery.query('#botonDeleteEquipoJugador')[0].record.data.jugador_id
                            ,jugador_nombre:Ext.ComponentQuery.query('#botonDeleteEquipoJugador')[0].record.data.jugador_nombre
                            ,jugador_apellido:Ext.ComponentQuery.query('#botonDeleteEquipoJugador')[0].record.data.jugador_apellido
                            ,jugador_dni:Ext.ComponentQuery.query('#botonDeleteEquipoJugador')[0].record.data.jugador_dni
                            ,equipo_id:null
                            ,jugador_fechanac:Ext.ComponentQuery.query('#botonDeleteEquipoJugador')[0].record.data.jugador_fechanac

                            ,update:true
                          };
                          Ext.Ajax.request({
                             url: 'http://dario-casa.sytes.net/api/jugador'
                            ,jsonData: myObj
                            ,callback: function( opt, success, response ) {
                              var json = Ext.decode(response.responseText);
                              if ( response.status === 201 ) {
                                if ( json.success ) {
                                  Ext.Msg.show({
                                    title:'ATENCIÓN'
                                    ,message: 'Se ha borrado el jugador correctamente '
                                    ,buttons: Ext.Msg.OK
                                    ,icon: Ext.Msg.INFO
                                  });
                                  Ext.getStore('EquiposJugadores').reload();
                                 btn.up().up('window').close();
                                }
                              }
                            }
                            ,failure : function( opt, success, response ) {
                              Ext.Msg.show({
                                title:'Error'
                                ,message: 'No se ha borrado el jugador, por favor intente nuevamente '
                                ,buttons: Ext.Msg.OK
                                ,icon: Ext.Msg.ERROR
                              });
                            }
                          });
                        }
                   }
               }]
            }]
          }).show();

       }
    },{
        xtype: 'button'
       ,scale: 'medium'
       ,cls: 'toolbtn'
       ,glyph:'xe612@Linearicons'
       ,itemId: 'botonEditEquipo'
       ,ventana: 'Equipo'
       ,edit: true
       ,record: ''
       ,handler:function (){ ///////////////////////////////EDITAR////////////////////////////////////////////////
           console.log('con este record',Ext.ComponentQuery.query('#botonEditEquipo')[0].record);
           console.log(Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.text);
           if(Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.equipo_id){
           Ext.create('Ext.window.Window', {
               title: 'Editar Equipo',
               height: 250,
               width: 400,
               modal:true,
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
                    xtype: 'radiogroup',
                    fieldLabel: 'Estado',
                    columns: 1,
                    name: 'equipo_estado',
                    vertical: true
                    //,hidden :Ext.ComponentQuery.query('#botonEdit')[0].ventana != 'Torneo' ?  true : false
                    , items: [
                      {boxLabel: 'Inactivo', name:'', inputValue: '0'},
                      { boxLabel: 'Activo', name:'', inputValue: '1'}
                    ]
                    ,itemId: 'winEditEstadoEquipo'
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
         }else{
           Ext.Msg.show({
              title: 'Atención'
             ,message: 'Por  favor, seleccione el Equipo que desea editar'
             ,buttons: Ext.Msg.OK
             ,icon: Ext.Msg.WARNING
           });
         }
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
               height: 300,
               width: 400,
               modal:true,
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
                     },{
                       xtype: 'radiogroup',
                       fieldLabel: 'Estado',
                       itemId: 'winAltaEstadoEquipo',
                       columns: 1,
                       vertical: true
                       ,name: 'equipo_estado'
                       //,hidden :Ext.ComponentQuery.query('#botonAdd')[0].ventana != 'Torneo' ?  true : false
                       ,items: [
                         { boxLabel: 'Activo', name: 'torneo_estado', inputValue: true, checked: true },
                         { boxLabel: 'Inactivo', name: 'torneo_estado', inputValue: false}
                       ]
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
                                     //Ext.getStore('storeAllEquipos').load();
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
     ,listeners:{
         beforedrop: function ( node, data, overModel, dropPosition, dropHandlers ) {
            dropHandlers.wait = true;
            console.log(data);
            console.log(overModel.data);

           var myObj = {
             jugador_id:data.records[0].data.jugador_id,
             equipo_id:overModel.data.equipo_id
           };
           Ext.Ajax.request({
             url: 'http://dario-casa.sytes.net/api/jugadores-equipo'
             ,jsonData: myObj
             ,callback: function( opt, success, response ) {
               var json = Ext.decode(response.responseText);
               if ( response.status === 201 ) {
                 if ( json.success ) {
                   dropHandlers.processDrop();
                 }else{
                   dropHandlers.cancelDrop();
                   console.log('deberia cancelar el  drop');
                   Ext.Msg.show({
                      title:'Error'
                     ,message: json.msg
                     ,buttons: Ext.Msg.OK
                     ,icon: Ext.Msg.ERROR
                   });
                 }
               }
             }
             ,failure : function( opt, success, response ) {
               Ext.Msg.show({
                  title:'Error'
                 ,message: 'No se ha cargado el equipo correctamente '
                 ,buttons: Ext.Msg.OK
                 ,icon: Ext.Msg.ERROR
               });
                dropHandlers.cancelDrop();
             }
           });


       }
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
