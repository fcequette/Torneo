Ext.define('Torneo.store.Valla', {
	 extend: 'Ext.data.Store'
	,storeId: 'Valla'
	//,autoLoad:true
	,proxy: {
		type: 'ajax'
		,url: 'http://dario-casa.sytes.net/api/vallamenosvencida'
		,method: 'GET'
	 	,reader: {
	 		 type: 'json',
			 rootProperty: 'valla'
		 }
	 }
});
