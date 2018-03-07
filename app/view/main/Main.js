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
            ,html:'<img width=254px; src="http://www.todalagringa.com.ar/wp-content/uploads/gfhfgh.png" alt="TODA LA GRINGA">'
            // ,items:[{
            //
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
    }, {
        title: 'Equipos',
        iconCls: 'fa-users',
        items: [{
            xtype: 'mainequipos'
        }]
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
        }]
    },{
        title: 'Resultados',
        iconCls: 'fa-check',
        items:[{
          xtype:'mainresultados'
        }]
    },{
        title: 'Configuración',
        iconCls: 'fa-gear',
        items:[{
            xtype:'mainconfiguracion'
        }]
	 }]
    ,listeners:{
       render: 'onRender'
       ,afterRender:'onafterRender'
    }
});
