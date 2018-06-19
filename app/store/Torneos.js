
Ext.define('Torneo.store.Torneos', {
	 extend: 'Ext.data.Store'
	,storeId: 'Torneos'
	,autoLoad:'false'
	,proxy: {
		 type: 'ajax'
		 ,url: '/api/torneo'
		 //,url:'http://localhost;8080/torneo'

			//,url: 'https://api.myjson.com/bins/10dic7'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'torneos'
		}
	 }
});
