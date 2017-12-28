Ext.define('Torneo.store.Fixture', {
	 extend: 'Ext.data.Store'
	,storeId: 'Fixture'
	,autoLoad: true
	,model:'Torneo.model.Fixtures'
	,proxy: {
		 type: 'ajax'
		 ,url: 'http://dario-casa.sytes.net/api/fixture'
		//,url: 'https://api.myjson.com/bins/19lrzn	'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
		rootProperty: 'data'
		}
	 }
});
