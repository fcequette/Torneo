Ext.define('Torneo.store.Sancionados', {
	 extend: 'Ext.data.Store'
	,storeId: 'Sancionados'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: '/api/sancionados'
			//,url: 'https://api.myjson.com/bins/tnlgr'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'sancionados'
		 }
	 }
});
