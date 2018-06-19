Ext.define('Torneo.store.Jugadores', {
	 extend: 'Ext.data.Store'
	,storeId: 'Jugadores'
	,proxy: {
		 type: 'ajax'
	 ,url: '/api/jugador'
	 //,url: 'http://localhost:8080/jugadores'

	//,url: 'https://api.myjson.com/bins/kz1m3'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'children'
	}
	 }
});
