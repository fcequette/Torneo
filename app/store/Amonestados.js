Ext.define('Torneo.store.Amonestados', {
	 extend: 'Ext.data.Store'
	,storeId: 'Amonestados'
	,model:'Torneo.model.Amonestado'
	,proxy: {
		 type: 'ajax'
	//,url: 'http://dario-casa.sytes.net/api/catalogo'
		,url: 'https://api.myjson.com/bins/tnlgr'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'amonestados'
	}
	 }
});
