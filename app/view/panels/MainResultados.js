
Ext.define('Torneo.view.panels.MainResultados', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.panel.Panel'
    ,xtype: 'mainresultados'
    /*,controller:'mainconfiguracion'*/
    ,requires: [
        'Torneo.view.panels.MainValla',
    ]
    ,layout:'fit'
    //,title: 'Configuración'
  	,items:[{
  			 xtype: 'tabpanel'
  			//,layout:'fit'
        //,store:'usuario'
  			,items:[{
          title:'PARTIDOS CERRADOS'
        },{
          title:'GOLEADORES'
        },{
            title:'VALLA MENOS VENCIDA',
            xtype:'mainvalla'
          }]
  			}]
});
