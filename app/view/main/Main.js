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
        'Torneo.view.main.MainController',
        'Torneo.view.main.MainModel',
        'Torneo.view.panels.MainFixture',
        'Torneo.view.panels.MainPlanilleros',
        'Torneo.view.main.MainTorneos',
        'Torneo.view.panels.MainPosiciones',
		    'Torneo.view.panels.MainConfiguracion',
        'Torneo.view.panels.MainResultados',
        'Torneo.view.panels.MainUsuarios',
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

            ,html:'<img width=100px; src="http://todalagringa.com.ar/logo.jpeg"  style="margin-left:20px;" alt="TODA LA GRINGA">'
            ,style:'background-color:#FFF'
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
            xtype: 'maintorneos'
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
        ,listeners:{
          activate: function(a,b){
            Ext.cq1('#cmbTorneo').select(Ext.cq1('#cmbTorneo').getStore().getAt(0));
          }
        }
    }, {
        title: 'Posiciones',
        iconCls: 'fa-list',
        items: [{
            xtype: 'mainposiciones'
        }]
        ,listeners:{
          activate: function(a,b){
            Ext.cq1('#cmbTorneoP').select(Ext.cq1('#cmbTorneoP').getStore().getAt(0));
          }
        }
    }, {
        title: 'Sancionados',
        iconCls: 'fa-ban',
        items: [{
            xtype: 'mainsancionados'
        }]
        ,listeners:{
          activate: function(a,b){
            Ext.cq1('#cmbTorneoS').select(Ext.cq1('#cmbTorneoS').getStore().getAt(0));
            Ext.cq1('#cmbTorneoS1').select(Ext.cq1('#cmbTorneoS1').getStore().getAt(0));
            Ext.cq1('#cmbTorneoS2').select(Ext.cq1('#cmbTorneoS2').getStore().getAt(0));
          }
        }
    }, {
        title: 'Planilleros',
        iconCls: 'fa-book',
        items:[{
          xtype:'mainplanilleros'
        }]
        ,listeners:{
          activate: function(a,b){
            Ext.cq1('#cmbTorneoPl').select(Ext.cq1('#cmbTorneoPl').getStore().getAt(0));
          }
        }
    },{
        title: 'Resultados',
        iconCls: 'fa-check',
        items:[{
          xtype:'mainresultados'
        }]
        ,listeners:{
          activate: function(a,b){
            Ext.cq1('#cmbTorneoR1').select(Ext.cq1('#cmbTorneoR1').getStore().getAt(0));
            Ext.cq1('#cmbTorneoR2').select(Ext.cq1('#cmbTorneoR2').getStore().getAt(0));

          }
        }
    },{
        title: 'Configuración',
        hidden:true,
        iconCls: 'fa-gear',
        items:[{
            xtype:'mainconfiguracion'
        }]
	 },{
       title: 'Usuario',
       iconCls: 'fa-user',
       items:[{
         xtype: 'mainusuarios'
       }]
    }]
    ,listeners:{
       render: 'onRender'
       ,afterRender:'onafterRender'
    }
});
