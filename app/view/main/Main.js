/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Torneo.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        //'Ext.plugin.Viewport',
        //'Ext.window.MessageBox',

        'Torneo.view.main.MainController',
        'Torneo.view.main.MainModel',
        'Torneo.view.panels.MainFixture',
        'Torneo.view.panels.MainPlanilleros',
        'Torneo.view.main.List',
        'Torneo.view.panels.MainPosiciones',
		    'Torneo.view.panels.MainConfiguracion',
        'Torneo.view.panels.MainResultados',
        'Torneo.view.panels.MainSancionados'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

      header: {
          layout: {
              align: 'stretchmax'
          },
            title: {
                bind: {
                    //text: '{name}'
                },
                flex: 0
            }
           //,xtype:'splitbutton'
            //,iconCls: 'fa-cog'
            ,html:'<img width=100px; src="http://todalagringa.com.ar/logo.jpeg"  style="margin-left:20px;" alt="TODA LA GRINGA">'
            ,style:'background-color:#FFF'
            //,margin:'0 0 0 20'
             // ,items:[{
             //     text:'Cerrar sesion'
             // }]

        },

      tabBar: {
          flex: 1,
          layout: {
              align: 'stretch',
              overflowHandler: 'none'
          }
      },

      responsiveConfig: {
          tall: {
              headerPosition: 'top'
          },
          wide: {
              headerPosition: 'left'
          }
      },

      defaults: {
          bodyPadding: 10,
          tabConfig: {
            plugins: 'responsive',
            style:'padding:20px;',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Torneo',
        iconCls: 'fa-soccer-ball-o',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainlist'
        }]
        ,listeners:{
          activate:function(btn,e){
            Ext.cq1('treeequipos').getStore().load();
          }
        }
    }, {
        title: 'Equipos',
        iconCls: 'fa-users',
        items: [{
            xtype: 'mainequipos'
        }]
        ,listeners:{
          activate:function(btn,e){
            Ext.cq1('treeequiposjugadores').getStore().load();
            Ext.cq1('treejugadores').getStore().load();
          }
        }
    }, {
        title: 'Fixture',
        iconCls: 'fa-calendar',
        items: [{
            xtype: 'mainfixture'
        }]
    }, {
        title: 'Posiciones',
        iconCls: 'fa-list',
        items: [{
            xtype: 'mainposiciones'
        }]
    }, {
        title: 'Sancionados',
        iconCls: 'fa-ban',
        items: [{
            xtype: 'mainsancionados'
        }]
    }, {
        title: 'Planilleros',
        iconCls: 'fa-book',
        items:[{
          xtype:'mainplanilleros'
         // xtype:'cardfixture'
        }]
        // ,activate:function(btn,e){
        //   Ext.cq1('treeequiposjugadores').getStore().load();
        //   Ext.cq1('treejugadores').getStore().load();
        // }
    },{
        title: 'Resultados',
        iconCls: 'fa-check',
        items:[{
          xtype:'mainresultados'
        }]
    },{
        title: 'Configuración',
        //hidden:true,
        iconCls: 'fa-gear',
        items:[{
            xtype:'mainconfiguracion'
        }]
	 },{
       title: 'Usuario',
       //hidden:true,
       iconCls: 'fa-user',
       listeners:{
       activate:function(btn,e){
         console.log('lalala');
         Ext.create('Ext.window.Window', {
             title: 'Cerrar sesión',
             modal:true,
             resizable:false,
             closable:false,
             height:130,
             layout: 'fit',
             items:[{
               xtype:'label',
               text:'¿Desea cerrar sesión?',
               padding:10,
               style:'background-color:#FFF;border:none'
             },{
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
           }
         ).show();
       }
     }
       // items:[{
       //     xtype:'container'
       //     ,items:[{
       //       xtype:'button'
       //       ,text:'Cerrar Sesion'
       //       , handler:function(btn,e){
       //
       //       }
       //     }]
       // }]


    }]
    ,listeners:{
       render: 'onRender'
       ,afterRender:'onafterRender'
    }
});
