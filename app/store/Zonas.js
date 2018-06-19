Ext.define('Torneo.store.Zonas', {
	 extend: 'Ext.data.Store'
	,storeId: 'Zonas'
	,model:'Torneo.model.Zona'
	,proxy: {
		 type: 'ajax'
	,url: 'http://127.0.0.1:8080/zona'
	//,url: 'http://localhost:8080/zonas'

	// ,url: 'https://api.myjson.com/bins/14dzfd
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'zonas'
	}
	 }
});
