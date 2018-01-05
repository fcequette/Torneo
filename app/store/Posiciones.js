Ext.define('Torneo.store.Posiciones', {
    extend: 'Ext.data.Store',

    alias: 'store.posiciones',
    storeId:'Posiciones',
    proxy: {
      type: 'ajax'
      ,url: 'http://dario-casa.sytes.net/api/posiciones'
      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'posiciones'
        }
    }
});
