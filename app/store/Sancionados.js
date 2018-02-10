Ext.define('Torneo.store.Sancionados', {
	 extend: 'Ext.data.Store'
	,storeId: 'Sancionados'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: 'http://dario-casa.sytes.net/api/sancionados/1'
			//,url: 'https://api.myjson.com/bins/tnlgr'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'sancionados'
		 }
	 }
});
