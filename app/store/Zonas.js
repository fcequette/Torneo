Ext.define('Torneo.store.Zonas', {
	 extend: 'Ext.data.Store'
	,storeId: 'Zonas'
	,model:'Torneo.model.Zona'
	,proxy: {
		 type: 'ajax'
	,url: 'http://dario-casa.sytes.net/api/zona'
	//,url: 'http://localhost:8080/zonas'

	// ,url: 'https://api.myjson.com/bins/14dzfd
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'zonas'
	}
	 }
});
