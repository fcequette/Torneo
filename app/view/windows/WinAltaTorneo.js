Ext.define('Toreo.view.windowa.WinAltaTorneo', {
	 extend: 'Ext.window.Window'
	,xtype: 'winaltatorneo'
  title: 'Alta de '+ Ext.ComponentQuery.query('#botonAdd')[0].ventana,
  height: 200,
  width: 400,
  layout: 'fit',
  items: {  // Let's put an empty grid in just to illustrate fit layout
       xtype:'form'
      ,bodyPadding: '15px'
      ,items:[{
        //fieldLabel:'Hola'
      }]// A dummy empty data store
    }
});
