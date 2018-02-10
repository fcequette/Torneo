Ext.define('Torneo.store.Usuario', {
	 extend: 'Ext.data.Store'
	,storeId: 'Usuario'
	,autoLoad:true
	,proxy: {
		  type: 'ajax'
		 ,url: 'https://api.myjson.com/bins/ug4bp'
	//,url: 'http://localhost:8080/zonas'

//,url: 'https://api.myjson.com/bins/tj19n'
		,method: 'GET'
	 	,reader: {
	 		 type: 'json',
			 rootProperty: 'usuarios'
		 }
	 }
});
