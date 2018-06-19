Ext.define('Torneo.store.Vuelven', {
	 extend: 'Ext.data.Store'
	,storeId: 'Vuelven'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: '/api/sancionadosvuelven'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'sancionadosvuelven'
		 }
	 }
});
