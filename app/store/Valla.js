Ext.define('Torneo.store.Valla', {
	 extend: 'Ext.data.Store'
	,storeId: 'Valla'
	//,autoLoad:true
	,proxy: {
		type: 'ajax'
		,url: 'http://127.0.0.1:8080/vallamenosvencida'
		,method: 'GET'
	 	,reader: {
	 		 type: 'json',
			 rootProperty: 'valla'
		 }
	 }
});
