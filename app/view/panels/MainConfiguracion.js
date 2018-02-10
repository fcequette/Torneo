
Ext.define('Torneo.view.panels.MainConfiguracion', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.panel.Panel'
    ,xtype: 'mainconfiguracion'
    /*,controller:'mainconfiguracion'
    ,requires: [
        'Torneo.view.main.MainFixtureController',
    ]*/
    ,layout:'fit'
    //,title: 'Configuración'
  	,items:[{
  			 xtype: 'tabpanel'
  			,layout:'fit'
        ,store:'usuario'
        ,tools:[{
           xtype:'button'
          ,text:'+'
          ,handler:function(btn,e){
            win.show();
          }
        }]
  			,items:[{
  				title: 'Usuarios'
          ,xtype: 'grid'
          ,store: 'Usuario'
          ,columns:[{
            text: 'Id de usuario'
            ,name: 'user_id'
            ,dataIndex : 'user_id'
            ,flex: 1
          },{
            text: 'Nombre de Usuario'
            ,name: 'username'
            ,dataIndex : 'username'
            ,flex: 1
          },{
            text: 'Nombre de Usuario'
            ,name: 'username'
            ,dataIndex : 'username'
            ,flex: 1
          },{
            text: 'Nombre'
            ,name: 'user_firstname'
            ,dataIndex : 'user_firstname'
            ,flex: 1
          },{
            text: 'Apellido'
            ,name: 'user_lastname'
            ,dataIndex : 'user_lastname'
            ,flex: 1
          },{
            xtype: 'actioncolumn'
            ,text: 'Eliminar'
            ,glyph:'xe681@Linearicons'
            ,handler: function (grid, rowIndex, colIndex, btn, e, record,row ) {
              grid.getStore().remove(record);
            }
          },{
            xtype: 'actioncolumn'
            ,text: 'Editar'
            ,glyph:'xe612@Linearicons'
            ,handler: function (grid, rowIndex, colIndex, btn, e, record,row ) {
              console.log(record.data.user_id);
              // Ext.cq1('#txtUserId').setValue(record.data.user_id);
              // Ext.cq1('#txtName').setValue(record.data.username);
              // Ext.cq1('#txtFirst').setValue(record.data.user_firstname);
              // Ext.cq1('#txtLast').setValue(record.data.user_lastname);
              // Ext.cq1('#txtPsw').setValue(record.data.password);
              // Ext.cq1('#txtUpdate').setValue(true);
              // win.show();
              Ext.create('Ext.window.Window', {
                   title: 'Usuarios ',
                   height: 300,
                   width: 350,
                   layout: 'fit',
                   modal:true,
                   items: {  // Let's put an empty grid in just to illustrate fit layout
                      xtype:'form'
                     ,bodyPadding: '15px'
                     ,items:[{
                       xtype:'textfield' //TODO
                       ,fieldLabel: 'Id Usuario'
                       ,name:'id_user'
                       ,itemId:'txtUserId'
                       ,value:record.data.user_id
                     },{
                       xtype:'textfield'
                       ,fieldLabel: 'Usuario'
                       ,name:'username'
                       ,value:record.data.username

                     },{
                       xtype:'textfield'
                       ,fieldLabel: 'Nombre'
                       ,name:'user_firstname'
                       ,value:record.data.user_firstname
                     },{
                       xtype:'textfield'
                       ,fieldLabel: 'Apellido'
                       ,name:'user_lastname'
                       ,value:record.data.user_lastname
                     },{
                       xtype:'textfield'
                       ,fieldLabel: 'Clave'
                       ,name:'user_password'
                       ,value:record.data.password
                     },{
                        xtype:'textfield'
                       ,name:'update'
                       ,value: false
                       ,hidden: true
                     }]
                     ,buttons:[{
                       text:'Cancelar'
                       ,ui:'decline'
                       ,handler: function (btn,e){
                         btn.up().up('window').close()
                       }
                     },'->',{
                       text:'Guardar'
                       ,ui: 'action'
                       ,handler: function(btn,e){
                         btn.up().up().mask('Espere por favor...');
                         Ext.ComponentQuery.query('#formAltaUsu')[0].submit({
                           jsonSubmit: true
                           ,method: 'POST'
                           ,success: function( form, action ) {
                             var values = form.getValues();
                             console.log('values',values);
                             if(action.result.success == true){
                               Ext.getStore('Usuario').reload();
                               Ext.Msg.show({
                                  title: 'CORRECTO'
                                 ,message: 'Los cambios fueron realizados.'
                                 ,buttons: Ext.Msg.OK
                                 //,icon: Ext.Msg.INFO
                               });
                              // Ext.defer(function(){btn.up().up('window').close()},3000);
                             }else{
                               Ext.Msg.show({
                                  title: 'ATENCIÓN'
                                 ,message: action.result.mensaje
                                 ,buttons: Ext.Msg.OK
                                 ,icon: Ext.Msg.WARNING
                               });
                             }
                             btn.up().up().unmask();
                           }
                           ,failure: function( form, action ) {
                             Ext.Msg.show({
                               title: 'ATENCIÓN'
                               ,message: 'La operación no fue realizada'
                               ,buttons: Ext.Msg.OK
                               ,icon: Ext.Msg.WARNING
                             });
                             btn.up().up().unmask();
                           }
                         });
                       }
                     }]
                   }
             }).show();
            }
          }]
  			}]
  	}]
});
 var win = Ext.create('Ext.window.Window', {
      title: 'Usuarios ',
      height: 300,
      width: 350,
      layout: 'fit',
      modal:true,
      items: {  // Let's put an empty grid in just to illustrate fit layout
         xtype:'form'
         ,itemId: 'formAltaUsu'
         ,url:'ponerurl'
        ,bodyPadding: '15px'
        ,defaults:{
          padding: '15 0 0 0'
        }
        ,items:[{

          xtype:'textfield'
          ,fieldLabel: 'Usuario'
          ,name:'username'
          ,allowBlank:false
         // ,itemId:'txtName'
        },{
          xtype:'textfield'
          ,fieldLabel: 'Nombre'
          ,name:'user_firstname'
          ,allowBlank:false
          //,itemId:'txtFirst'
        },{
          xtype:'textfield'
          ,fieldLabel: 'Apellido'
          ,name:'user_lastname'
          ,allowBlank:false
          //,itemId:'txtLast'
        },{
            xtype:'textfield'
          ,fieldLabel: 'Clave'
          ,name:'user_password'
          ,allowBlank:false
          //,itemId:'txtPsw'
        },{
           xtype:'textfield'
          ,name:'update'
          ,value: false
          //,itemId:'txtUpdate'
          ,hidden: true
        }]
        ,buttons:[{
          text:'Cancelar'
          ,ui:'decline'
          ,handler: function (btn,e){
            btn.up().up('window').close()
          }
        },'->',{
          text:'Guardar'
          ,ui: 'action'
          ,handler: function(btn,e){
            btn.up().up().mask('Espere por favor...');
            Ext.ComponentQuery.query('#formAltaUsu')[0].submit({
              jsonSubmit: true
              ,method: 'POST'
              ,success: function( form, action ) {
                var values = form.getValues();
                console.log('values',values);
                if(action.result.success == true){
                  Ext.getStore('Usuario').reload();
                  Ext.Msg.show({
                     title: 'CORRECTO'
                    ,message: 'Los cambios fueron realizados.'
                    ,buttons: Ext.Msg.OK
                    //,icon: Ext.Msg.INFO
                  });
                 // Ext.defer(function(){btn.up().up('window').close()},3000);
                }else{
                  Ext.Msg.show({
                     title: 'ATENCIÓN'
                    ,message: action.result.mensaje
                    ,buttons: Ext.Msg.OK
                    ,icon: Ext.Msg.WARNING
                  });
                }
                btn.up().up().unmask();
              }
              ,failure: function( form, action ) {
                Ext.Msg.show({
                  title: 'ATENCIÓN'
                  ,message: 'La operación no fue realizada'
                  ,buttons: Ext.Msg.OK
                  ,icon: Ext.Msg.WARNING
                });
                btn.up().up().unmask();
              }
            });
          }
        }]
      }
});
