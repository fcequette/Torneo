Ext.define('Torneo.store.Turnos', {
	 extend: 'Ext.data.Store'
	,storeId: 'Turnos'
	,proxy: {
		 type: 'ajax'
	//,url: 'http://dario-casa.sytes.net/api/zona'
	//,url: 'http://localhost:8080/zonas'

,url: 'https://api.myjson.com/bins/tj19n'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'turnos'
	}
	 }
});
