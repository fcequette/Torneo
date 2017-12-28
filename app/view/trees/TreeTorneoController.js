/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Torneo.view.trees.TreeTorneoController', {
     extend: 'Ext.app.ViewController',
     alias: 'controller.TreeTorneo'
     ,onEditClick:function (btn , e){
       var v = Ext.ComponentQuery.query('#botonEdit')[0].ventana

         Ext.create('Ext.window.Window', {
            title: 'EDITAR '+ Ext.ComponentQuery.query('#botonEdit')[0].ventana,
            height: 250,
            width: 400,
            layout: 'fit',
            descri: 'torneo-descri',
            items: {  // Let's put an empty grid in just to illustrate fit layout
               xtype:'form'
              ,bodyPadding: '15px'
              ,itemId: 'formEdit'
              ,url: Ext.ComponentQuery.query('#botonEdit')[0].urlEdit
              ,items:[{
                    xtype:'textfield' //TODO
                    ,fieldLabel: 'idpadre'
                   ,itemId: 'winEditIdPadre'
                   ,name:''
                   ,hidden:true
              },{
                   xtype:'textfield'
                  ,fieldLabel: 'Id'
                  ,itemId: 'winEditId'
                  ,name:''
                  ,readOnly: true
                  //,value: Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_id
              },{
                   xtype:'textfield'
                  ,fieldLabel: 'Descripción'
                  ,itemId: 'winEditDescri'
                  ,name:''

                  //,value: Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_descri
              },{
                   xtype:'textfield'
                  ,name:'update'
                  ,value: true
                  ,hidden: true
              },{
                 xtype: 'radiogroup',
                 fieldLabel: 'Estado',
                 columns: 1,
                 name: 'torneo_estado',
                 vertical: true,
                 items: [
                    { boxLabel: 'Activo', name:'', inputValue: '1', checked: true },
                    { boxLabel: 'Inactivo', name:'', inputValue: '0'}
                  ]
                  ,itemId: 'winEditEstado'

                //,value: Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_estado
              }]// A dummy empty data store
            }
            ,dockedItems:[{
                   xtype: 'toolbar'
                  ,dock: 'bottom'
                  ,items:[{
                            xtype: 'button'
                            ,text: 'Cancelar'
                            ,ui: 'decline'
                            ,handler: function (btn,e){
                              btn.up().up('window').close()
                            }

                  },'->',{
                    xtype: 'button'
                    ,text: 'Guardar Cambios'
                    ,ui: 'action'
                    ,handler: function (btn,e){
                      Ext.ComponentQuery.query('#formEdit')[0].submit(
                        {
                           jsonSubmit: true
                           ,method: 'POST'
                          ,success: function( form, action ) {
                            if(action.result.success == true){
                                Ext.getStore('storeTorneo').reload();
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
            ,listeners:{
              afterRender: function (win,e){
                switch (v) {
                  case 'Torneo':

                    win.down('#winEditId').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_id);
                    win.down('#winEditId').name = 'torneo_id';
                    win.down('#winEditDescri').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_descri);
                    win.down('#winEditDescri').name = 'torneo_descri';
                    win.down('#winEditEstado').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_estado);
                   //Ext.ComponentQuery.query('#winEditEstado')[0].name = 'torneo_estado';
                   //Ext.ComponentQuery.query('#winEditEstado')[1].name = 'torneo_estado';
                   break;
                   case 'Categoria':

                      win.down('#winEditIdPadre').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_torneo_id);
                      win.down('#winEditIdPadre').name = 'categoria_torneo_id';
                      //win.down('#winAltaIdPadre').setValue(Ext.ComponentQuery.query('#botonadd')[0].record.data.categoria_torneo_id);
                      //win.down('#winAltaIdPadre').name = 'categoria_torneo_id';
                      win.down('#winEditId').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_id);
                      win.down('#winEditId').name ='categoria_id';
                      win.down('#winEditDescri').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_descri);
                      win.down('#winEditDescri').name ='categoria_descri';
                      win.down('#winEditEstado').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_estado);
                      win.down('#winEditEstado').name = 'categoria_estado';

                   break;
                   case 'Zona':
                        win.down('#winEditIdPadre').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_categoria_id);
                        win.down('#winEditIdPadre').name = 'zona_categoria_id';
                        win.down('#winAltaIdPadre').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_categoria_id);
                        win.down('#winAltaIdPadre').name = 'zona_categoria_id';
                       win.down('#winEditId').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_id);
                       win.down('#winEditId').name ='zona_id';
                       win.down('#winEditDescri').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_descri);
                       win.down('#winEditDescri').name ='zona_descri';
                       win.down('#winEditEstado').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_estado);
                       win.down('#winEditEstado').name ='zona_estado';
                   break;
                }
              }
            }
            }).show();


     }
     ,onDeleteClick:function (btn, e) {
       var ventana =Ext.ComponentQuery.query('#botonDelete')[0].ventana;
       Ext.create('Ext.window.Window', {
          title: 'Eliminación de '+ Ext.ComponentQuery.query('#botonDelete')[0].ventana,
          height: 250,
          width: 400,
          layout: 'fit',
          items: {  // Let's put an empty grid in just to illustrate fit layout
             xtype:'form'
            ,bodyPadding: '15px'
            ,itemId:'formDelete'
            ,url: Ext.ComponentQuery.query('#botonDelete')[0].urlDelete
            ,defaults:{
              margin: '20 0 20 0'
            }
            ,items:[{
              xtype: 'label'
              ,text: '¿Está seguro de eliminarlo?'
            },{
                 xtype:'textfield'
                ,fieldLabel: 'Descripción'
                ,itemId:'winDeleteDescri'
                ,readOnly: true
                ,name: ''
                //,value: Ext.ComponentQuery.query('#botonDelete')[0].record.data.torneo_descri
            },{
               xtype: 'textfield',
               fieldLabel: 'Id',
               itemId: 'winDeleteId',
               columns: 1,
               readOnly: true,
               vertical: true
               ,name: ''
               //,value: Ext.ComponentQuery.query('#botonDelete')[0].record.data.torneo_estado
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
                    Ext.ComponentQuery.query('#formDelete')[0].submit(
                      {
                         jsonSubmit: true
                         ,method: 'DELETE'
                         ,url: Ext.ComponentQuery.query('#botonDelete')[0].urlDelete +'/'+Ext.cq1('#winDeleteId').getValue()
                        ,success: function( form, action ) {
                          if(action.result.success == true){
                              Ext.getStore('storeTorneo').load();
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
        //var win =Ext.ComponentQuery.query('winaltatorneo').create();
       // win.show();
       ,listeners:{
         afterRender: function (win,e){
           switch (ventana) {
             case 'Torneo':
               win.down('#winDeleteDescri').name = 'torneo_descri';
               win.down('#winDeleteId').name = 'torneo_id';
               win.down('#winDeleteDescri').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.torneo_descri);
               win.down('#winDeleteId').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.torneo_id);
              //Ext.ComponentQuery.query('#winEditEstado')[0].name = 'torneo_estado';
              //Ext.ComponentQuery.query('#winEditEstado')[1].name = 'torneo_estado';
              break;
              case 'Categoria':
                 win.down('#winDeleteDescri').name ='categoria_descri';
                 win.down('#winDeleteId').name = 'categoria_id';
                 win.down('#winDeleteDescri').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.categoria_descri);
                 win.down('#winDeleteId').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.categoria_id);

              break;
              case 'Zona':
                  win.down('#winDeleteDescri').name ='zona_descri';
                  win.down('#winDeleteId').name ='zona_id';
                  win.down('#winDeleteDescri').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.zona_descri);
                  win.down('#winDeleteId').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.zona_id);

              break;
           }
         }
       }
       }).show();


     }
     ,onAddClick:function (btn, e) {
         console.log('llamar a ventana',Ext.ComponentQuery.query('#botonAdd')[0].ventana);
         console.log('con este record',Ext.ComponentQuery.query('#botonAdd')[0].record);
         var ventana =Ext.ComponentQuery.query('#botonAdd')[0].ventana;
         if (ventana == 'fixture'){
           var myObj = {
     				 torneo_id: '1'
     				,categoria_id:Ext.ComponentQuery.query('#botonAdd')[0].record.data.zona_categoria_id
     				,zona_id:Ext.ComponentQuery.query('#botonAdd')[0].record.data.zona_id
     			};
     			Ext.Ajax.request({
     				 url: 'http://dario-casa.sytes.net/api/fixture'
             //url: 'http://localhost:8080/fixture'

     				,jsonData: myObj
     				,callback: function( opt, success, response ) {
     					var json = Ext.decode(response.responseText);
     					if ( response.status === 201 ) {
     						if ( json.success ) {
                    console.log('flo')
     						}
     					}
     				}
     				,failure : function( opt, success, response ) {
     					Ext.Msg.show({
     						 title:'Error'
     						,message: 'No se ha generado el fixture, por favor intente nuevamente '
     						,buttons: Ext.Msg.OK
     						,icon: Ext.Msg.ERROR
     					});
     				}
     			});
        }else{
         Ext.create('Ext.window.Window', {
            title: 'Alta de '+ Ext.ComponentQuery.query('#botonAdd')[0].ventana,
            height: 250,
            width: 400,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
               xtype:'form'
              ,bodyPadding: '15px'
              ,itemId:'formAlta'
              ,url: Ext.ComponentQuery.query('#botonAdd')[0].urlAlta
              ,items:[
                {
                      xtype:'textfield' //TODO
                      ,fieldLabel: 'idpadre'
                     ,itemId: 'winAltaIdPadre'
                     ,name:''
                    // ,value:Ext.ComponentQuery.query('#botonAdd')[0].record.torneo_id
                     ,hidden:true
                },
              {
                   xtype:'textfield'
                  ,fieldLabel: 'Descripción'
                 ,itemId:'winAltaDescri'
                 ,name: 'torneo_descri'
                //  ,value: Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_descri
              },
              {
                xtype: 'textfield'
                ,name: 'update'
                ,value: ''
                ,hidden:true
              },{
                 xtype: 'radiogroup',
                 fieldLabel: 'Estado',
                 itemId: 'winAltaEstado',
                 columns: 1,
                 vertical: true
                 ,name: 'torneo_estado'
                 ,items: [
                    { boxLabel: 'Activo', name: 'torneo_estado', inputValue: true, checked: true },
                    { boxLabel: 'Inactivo', name: 'torneo_estado', inputValue: false}
                  ]
                //,value: Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_estado
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
                    ,ui: 'action'
                    ,handler: function (btn,e){
                      Ext.ComponentQuery.query('#formAlta')[0].submit(
                        {
                           jsonSubmit: true
                           ,method: 'POST'
                           ,url: Ext.ComponentQuery.query('#botonAdd')[0].urlAlta
                          ,success: function( form, action ) {
                            if(action.result.success == true){
                              console.log('hizo el alta',action.result.success)
                              //var panel= Ext.cq1('#dvFixture');
                              //panel.update(action.result);
                              Ext.getStore('storeTorneo').load();
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
          //var win =Ext.ComponentQuery.query('winaltatorneo').create();
         // win.show();
         ,listeners:{
           afterRender: function (win,e){
             switch (ventana) {
               case 'Torneo':
                 win.down('#winAltaDescri').name = 'torneo_descri';
                //Ext.ComponentQuery.query('#winEditEstado')[0].name = 'torneo_estado';
                //Ext.ComponentQuery.query('#winEditEstado')[1].name = 'torneo_estado';
                break;
                case 'Categoria':
                //console.log('*******************************111',Ext.ComponentQuery.query('#botonadd')[0].record.data.categoria_torneo_id);
                //console.log('*******************************111',Ext.ComponentQuery.query('#botonadd')[0].record.data.torneo_id);
                   win.down('#winAltaDescri').name ='categoria_descri';
                   win.down('#winAltaEstado').name = 'categoria_estado';
                   win.down('#winAltaIdPadre').setValue(Ext.ComponentQuery.query('#botonAdd')[0].record.data.torneo_id);
                   win.down('#winAltaIdPadre').name = 'categoria_torneo_id';
                break;
                case 'Zona':
                    win.down('#winAltaDescri').name ='zona_descri';
                    win.down('#winAltaEstado').name ='zona_estado';
                    win.down('#winAltaIdPadre').setValue(Ext.ComponentQuery.query('#botonAdd')[0].record.data.categoria_id);
                    win.down('#winAltaIdPadre').name = 'zona_categoria_id';
                break;
                default:
                  Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://dario-casa.sytes.net/api/torneo';
                break;
             }
           }
         }
         }).show();
         }
      }

      ,onItemClick:function (est, record, item, index, e, eOpts ){
        console.log('SE EJECUTO',est,record,item,index);
         if(record.data.root){
           Ext.ComponentQuery.query('#botonAdd')[0].setText('');
           Ext.ComponentQuery.query('#botonAdd')[0].ventana = 'Torneo';
             Ext.ComponentQuery.query('#botonEdit')[0].record = record;
             Ext.ComponentQuery.query('#botonAdd')[0].record = record;
           Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Torneo';
           Ext.ComponentQuery.query('#botonDelete')[0].record = record;
           Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://dario-casa.sytes.net/api/torneo';
           Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://dario-casa.sytes.net/api/torneo';
           Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://dario-casa.sytes.net/api/torneo';
           //Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://localhost:8080/torneo';
          // Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://localhost:8080/torneo';
           //Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://localhost:8080/torneo';
          }
          if(record.data.nivel == 1 ){
              Ext.ComponentQuery.query('#botonEdit')[0].ventana = 'Torneo';
              Ext.ComponentQuery.query('#botonEdit')[0].record = record;
              Ext.ComponentQuery.query('#botonAdd')[0].record = record;
              Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Torneo';
              Ext.ComponentQuery.query('#botonDelete')[0].record = record;
              Ext.ComponentQuery.query('#botonAdd')[0].setText('');
              Ext.ComponentQuery.query('#botonAdd')[0].ventana = 'Categoria';
              //Ext.cq1('#winAltaIdPadre').name = 'categoria_torneo_id';
              //Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://localhost:8080/torneo';
              //Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://localhost:8080/categoria';
              // Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://localhost:8080/categoria';
               Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://dario-casa.sytes.net/api/torneo';
               Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://dario-casa.sytes.net/api/categoria';
               Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://dario-casa.sytes.net/api/torneo';
             if(record.childNodes.length > localStorage.getItem('cantidad-categoriasxtorneos')) {

                  console.log ('Deshabilitar alta');
                    Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (true);
              }else{
                console.log('Permitir alta');
                Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (false);
              }



          }
          if(record.data.nivel == 2){
            Ext.ComponentQuery.query('#botonEdit')[0].ventana = 'Categoria';
            Ext.ComponentQuery.query('#botonDelete')[0].record = record;
            Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Categoría';
            Ext.ComponentQuery.query('#botonEdit')[0].record = record;
            Ext.ComponentQuery.query('#botonAdd')[0].setText('');
            Ext.ComponentQuery.query('#botonAdd')[0].ventana = 'Zona';
            Ext.ComponentQuery.query('#botonAdd')[0].record = record;
            //Ext.cq1('#winAltaIdPadre').name = 'zona_categoria_id';
            Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://dario-casa.sytes.net/api/categoria';
            Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://dario-casa.sytes.net/api/zona';
            Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://dario-casa.sytes.net/api/zona';
            if(record.childNodes.length > localStorage.getItem('cantidad-zonasxcategorias')) {

                 console.log ('Deshabilitar alta');
                   Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (true);
             }else{
               console.log('Permitir alta');
               Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (false);
             }

          }
          if(record.data.nivel == 3){
            Ext.ComponentQuery.query('#botonEdit')[0].ventana = 'Zona';
            Ext.ComponentQuery.query('#botonEdit')[0].record = record;
            Ext.ComponentQuery.query('#botonDelete')[0].record = record;
            Ext.ComponentQuery.query('#botonAdd')[0].record = record;
            Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Zona';
            Ext.ComponentQuery.query('#botonAdd')[0].setText('<a style="color:#FFF">Crear Fixture</a>');
            Ext.ComponentQuery.query('#botonAdd')[0].ventana = 'fixture';
            if(record.childNodes.length != localStorage.getItem('cantidad-equiposxzonas')) {

                 console.log ('Deshabilitar alta');
                   Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (true);
             }else{
               console.log('Permitir alta');
               Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (false);
             }
          }
     }
});
