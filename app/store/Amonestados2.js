Ext.define('Torneo.store.Amonestados2', {
	 extend: 'Ext.data.Store'
	,storeId: 'Amonestados2'
	,model:'Torneo.model.Amonestado'
	,proxy: {
		 type: 'ajax'
	,url: '/api/amonestados'
		//,url: 'https://api.myjson.com/bins/tnlgr'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'amonestados'
	}
	 }
});
