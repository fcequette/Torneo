Ext.define('Torneo.store.Jugadores-Equipo', {
	 extend: 'Ext.data.Store'
	,storeId: 'Jugadores-Equipo'
	,proxy: {
		 type: 'ajax'
	 ,url: '/api/jugadores-equipo'
	 //,url: 'http://localhost:8080/jugadores'

	//,url: 'https://api.myjson.com/bins/kz1m3'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'jugadores'
	}
	 }
});
