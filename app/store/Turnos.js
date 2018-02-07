Ext.define('Torneo.store.Turnos', {
	 extend: 'Ext.data.Store'
	,storeId: 'Turnos'
	,autoLoad:true
	,proxy: {
		 type: 'ajax'
	,url: 'http://dario-casa.sytes.net/api/turno'
	//,url: 'http://localhost:8080/zonas'

//,url: 'https://api.myjson.com/bins/tj19n'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'turnos'
	}
	 }
});
