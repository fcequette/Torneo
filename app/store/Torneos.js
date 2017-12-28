
Ext.define('Torneo.store.Torneos', {
	 extend: 'Ext.data.Store'
	,storeId: 'Torneos'
	,proxy: {
		 type: 'ajax'
		 ,url: 'http://dario-casa.sytes.net/api/torneo'
		 //,url:'http://localhost;8080/torneo'

			//,url: 'https://api.myjson.com/bins/10dic7'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'torneos'
		}
	 }
});
