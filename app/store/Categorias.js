Ext.define('Torneo.store.Categorias', {
	 extend: 'Ext.data.Store'
	,storeId: 'Categorias'
	,proxy: {
		 type: 'ajax'
		// ,url:'http://localhost;8080/categoria'
	,url: '/api/categoria'
	///,url: 'https://api.myjson.com/bins/1deorr'
	//,url:'https://api.myjson.com/bins/l7tqx'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'categorias'
		}
	 }
});
