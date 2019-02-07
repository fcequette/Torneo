
Ext.define('Torneo.view.panels.MainUsuarios', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.panel.Panel'
    ,xtype: 'mainusuarios'
    // ,controller:'mainusuarios'
    // ,requires: [
    //     'Torneo.view.main.MainUsuariosController',
    // ]
    ,title: 'Usuarios'
    ,layout: 'vbox'
    ,items:[{
       xtype:'button'
      ,text: '<p style="font-size:20px;background-color:#2c8c04;color:white">Cerrar Sesion</p>'
      ,width: '100%'
      ,style:'background-color:#2c8c04;margin-top: 50px;'
      ,listeners:{
         click: function (btn,e){
                   Ext.create('Ext.window.Window', {
                         title: 'Cerrar sesión',
                         modal:true,
                         resizable:false,
                         closable:false,
                         height:150,
                         width:200,
                         layout: 'fit',
                         items:[{
                           xtype:'label',
                           text:'¿Desea cerrar sesión?',
                           margin:'20 0 0 20',
                           style:'background-color:#FFF;border-color:#FFF'
                         }]
                         ,dockedItems:[{
                           xtype:'toolbar'
                           ,dock:'bottom'
                           ,style:'background-color:#FFF'
                           ,items:[{
                             text:'CANCELAR'
                             ,ui:'action'
                             ,handler:function(btn,e){
                               Ext.cq1('app-main').setActiveItem(0);
                               btn.up().up('window').close();
                             }
                           },'->',{
                             text:'ACEPTAR'
                             ,ui:'action'
                             ,handler:function(btn,e){
                               btn.up().up('window').close();
                               location.reload();
                             }
                           }]
                           }]
                     }).show();
         }
      }
    }]

});
