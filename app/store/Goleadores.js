Ext.define('Torneo.store.Goleadores', {
	 extend: 'Ext.data.Store'
	,storeId: 'Goleadores'
	,model:'Torneo.model.Goleador'
	,proxy: {
		 type: 'ajax'
	//,url: 'http://dario-casa.sytes.net/api/catalogo'
,url: 'https://api.myjson.com/bins/cz81f'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'goleadores'
	}
	 }
});
