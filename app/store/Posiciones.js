Ext.define('Torneo.store.Posiciones', {
    extend: 'Ext.data.Store',

    alias: 'store.posiciones',
    storeId:'Posiciones',
    proxy: {
      type: 'ajax'
      ,url: '/api/posiciones'
      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'posiciones'
        }
    }
});
