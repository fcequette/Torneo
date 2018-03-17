Ext.define('Torneo.store.Vuelven', {
	 extend: 'Ext.data.Store'
	,storeId: 'Vuelven'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: 'http://dario-casa.sytes.net/api/sancionadosvuelven'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'sancionadosvuelven'
		 }
	 }
});
