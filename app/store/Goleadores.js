Ext.define('Torneo.store.Goleadores', {
	 extend: 'Ext.data.Store'
	,storeId: 'Goleadores'
	,model:'Torneo.model.Goleador'
	,proxy: {
		 type: 'ajax'
	,url: 'http://dario-casa.sytes.net/api/goleadores'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'goleadores'
	}
	 }
});
