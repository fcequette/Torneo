Ext.define('Torneo.store.Canchas', {
	 extend: 'Ext.data.Store'
	,storeId: 'Canchas'
	,autoLoad:true
	,proxy: {
		 type: 'ajax'
	,url: 'http://dario-casa.sytes.net/api/cancha'
	//,url: 'http://localhost:8080/zonas'

		//,url: 'https://api.myjson.com/bins/15huiz'
				,method: 'GET'
			 	,reader: {
			 		type: 'json',
					 rootProperty: 'canchas'
			}
	 }
});
