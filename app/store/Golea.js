Ext.define('Torneo.store.Golea', {
	 extend: 'Ext.data.Store'
	,storeId: 'Golea'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: '/api/goleadoresporcategoria'
			//,url: 'https://api.myjson.com/bins/tnlgr'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'goleadores'
		 }
	 }
});
