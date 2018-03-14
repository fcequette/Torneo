Ext.define('Torneo.store.PartidosFecha', {
	 extend: 'Ext.data.Store'
	,storeId: 'PartidosFecha'
	//,autoLoad: true
	,model:'Torneo.model.PartidosFechas'
	,proxy: {
		 type: 'ajax'
		 ,url: 'http://dario-casa.sytes.net/api/partidosfecha'
		//,url: 'https://api.myjson.com/bins/6skon'
		,paramsAsJson:true
		,actionMethods : {
        create  : 'POST',
        read    : 'POST',
        update  : 'PUT',
        destroy : 'DELETE'
    }
	 	,reader: {
	 		type: 'json',
			rootProperty: 'data'
		}
	 }
});
