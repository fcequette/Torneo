Ext.define('Torneo.store.Valla', {
	 extend: 'Ext.data.Store'
	,storeId: 'Valla'
	//,autoLoad:true
	,proxy: {
		type: 'ajax'
		,url: '/api/vallamenosvencida'
		,method: 'GET'
	 	,reader: {
	 		 type: 'json',
			 rootProperty: 'valla'
		 }
	 }
});
