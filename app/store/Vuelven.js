Ext.define('Torneo.store.Vuelven', {
	 extend: 'Ext.data.Store'
	,storeId: 'Vuelven'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: 'http://127.0.0.1:8080/sancionadosvuelven'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'sancionadosvuelven'
		 }
	 }
});
