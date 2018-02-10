  Ext.define('Torneo.view.panels.CardFixtureController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.cardfixture',


    onComboboxChange:function(cmb , newValue , oldValue , e ){
      console.log('emtro',cmb.namecmb);
      Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
    }
    ,onPlanillerosClick:function(btn,e){
      Ext.getStore('PartidosFecha').load({params:btn.up('form').getValues()})
    }
  });
