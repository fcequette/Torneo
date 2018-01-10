Ext.define('Torneo.store.Fixture', {
	 extend: 'Ext.data.Store'
	,storeId: 'Fixture'
	//,autoLoad: true
	,groupField: 'fecha'
	,model:'Torneo.model.Fixtures'
	,proxy: {
		 type: 'ajax'
		 ,url: 'http://dario-casa.sytes.net/api/fixture'
		//,url: 'https://api.myjson.com/bins/1c7zflÃ±'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
		//rootProperty: 'data'
		rootProperty: 'fixture'

		}
	 }
});
