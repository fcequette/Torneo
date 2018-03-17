Ext.define('Torneo.store.Capilla', {
	 extend: 'Ext.data.Store'
	,storeId: 'Capilla'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: 'http://dario-casa.sytes.net/api/encapilla'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'encapilla'
		 }
	 }
});
