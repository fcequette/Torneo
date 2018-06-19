Ext.define('Torneo.store.Goleadores', {
	 extend: 'Ext.data.Store'
	,storeId: 'Goleadores'
	,model:'Torneo.model.Goleador'
	,proxy: {
		 type: 'ajax'
		 ,url: '/api/goleadores'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'goleadores'
		 }
	 }
});
