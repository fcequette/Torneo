Ext.define('Torneo.store.Equipozona', {
	 extend: 'Ext.data.Store'
	,storeId: 'Equipozona'
	//,model:'Torneo.model.Equipo'
	,proxy: {
		 type: 'ajax'
	,url: '/api/equipozona'
		//,url: 'https://api.myjson.com/bins/tnlgr'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'equipo_zona'
	}
	 }
});
