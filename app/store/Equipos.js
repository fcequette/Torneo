Ext.define('Torneo.store.Equipos', {
	 extend: 'Ext.data.Store'
	,storeId: 'Equipos'
	,model:'Torneo.model.Equipo'
	,proxy: {
		 type: 'ajax'
	,url: '/api/equipo?jug=no'
		//,url: 'https://api.myjson.com/bins/tnlgr'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'children'
	}
	 }
});
