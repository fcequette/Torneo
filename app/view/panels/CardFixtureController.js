Ext.define('Torneo.view.panels.CardFixtureController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.cardfixture',
  onComboboxChange:function(cmb , newValue , oldValue , e ){
    console.log('emtro',cmb.namecmb);
    if(cmb.idcmb){Ext.cq1(cmb.idcmb).clearValue();}
    Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
  }
  ,onPlanillerosClick:function(btn,e){
    Ext.getStore('PartidosFecha').load({params:btn.up('form').getValues()})
  }
  ,onPdfSancionasosClick:function(btn,e){
    var myObj = Ext.cq1('#formPlani').getValues();
    var myObj2 = {
      categoria_id: myObj.categoria_id,
      torneo_id:myObj.torneo_id,
      zona_id:myObj.zona_id,
      fecha_id:myObj.fecha_id,
      reporte:'sancionados',
    }
    Ext.Ajax.request({
       url: 'http://dario-casa.sytes.net/api/reporte'
      ,jsonData: myObj2
      ,callback: function( opt, success, response ) {
        var json = Ext.decode(response.responseText);
        if ( response.status === 201 ) {
          if ( json.success ) {
            OpenInNewTabWinBrowser(json.url)
              function OpenInNewTabWinBrowser(url) {
                var win = window.open(url, '_blank');
                win.focus();
              }
              btn.up('window').close();
          }
        }
      }
      ,failure : function( opt, success, response ) {
        Ext.Msg.show({
          title:'Error'
          ,message: 'No se ha generado el reporte, por favor intente nuevamente '
          ,buttons: Ext.Msg.OK
          ,icon: Ext.Msg.ERROR
        });
      }
    });
  }
});
