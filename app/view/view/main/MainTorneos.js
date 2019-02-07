Ext.define('Torneo.view.main.MainTorneos', {
     extend: 'Ext.panel.Panel'
    ,xtype: 'maintorneos'
    ,layout: 'hbox'
    ,fullscreen:true
    ,items:[{
       xtype: 'treetorneo'
      ,height:window.innerHeight-10
    },{
      xtype:'panel'
      ,layout:'vbox'
      ,bodyStyle: 'background:#2c8c04'
      ,height:window.innerHeight-10
      ,items:[{
        xtype: 'button'
        ,text:'<<<'
        ,tooltip: 'Agregar Equipos a Zona'
        ,margin: '60 0 0 0'
        ,handler: function (btn, e){
           var band = true;
            if(Ext.isDefined(Ext.cq1('treetorneo').getSelectionModel().selected.items[0])){
              if(Ext.cq1('treetorneo').getSelectionModel().selected.items[0].data.nivel != 3){
                Ext.Msg.show({
                   title:'Atención'
                  ,message: 'Debe seleccionar una Zona'
                  ,buttons: Ext.Msg.OK
                  ,icon: Ext.Msg.WARNING// WARNING:
                });
              }else{
                var cantPermitida = Ext.cq1('treetorneo').getSelectionModel().selected.items[0].data.zona_cantidad_equipos
                var cantReal = Ext.cq1('treetorneo').getSelectionModel().selected.items[0].childNodes.length;
                var cantPasar = Ext.cq1('treeequipos').getSelectionModel().selected.items.length
                if(cantPermitida<=cantReal+cantPasar){
                  Ext.Msg.show({
                     title:'Atención'
                    ,message: 'La cantidad de equipos superan la cantidad maxima por zona'
                    ,buttons: Ext.Msg.OK
                    ,icon: Ext.Msg.WARNING// WARNING:
                  });
                }else{
                  var zonaId = Ext.cq1('treetorneo').getSelectionModel().selected.items[0].data.zona_id;
                  Ext.cq1('treeequipos').getSelectionModel().selected.items.forEach(function(rec){
                   console.log('consultar por estos', rec);
                   var myObj = {
                     zona_id:Ext.cq1('treetorneo').getSelectionModel().selected.items[0].data.zona_id,
                     equipo_id:rec.data.equipo_id,
                     torneo_id:Ext.cq1('treetorneo').getSelectionModel().selected.items[0].data.torneo_id
                   };
                   Ext.Ajax.request({
                     url: '/api/equipozona'
                     ,jsonData: myObj
                     ,callback: function( opt, success, response ) {
                       var json = Ext.decode(response.responseText);
                       if ( response.status === 201 ) {

                         if ( !json.success ) {
                             Ext.Msg.show({
                                title:'Error ' + rec.data.equipo_nombre
                               ,message: json.msg
                               ,buttons: Ext.Msg.OK
                               ,icon: Ext.Msg.ERROR
                             });
                             band = false;
                             return false;
                         }else{
                           Ext.getStore('storeTorneo').reload();
                           Ext.defer(function(){Ext.getStore('storeTorneo').getRootNode().findChild('zona_id', zonaId, true).expand();},2000);
                         }
                       }
                     }
                     ,failure : function( opt, success, response ) {
                       Ext.Msg.show({
                          title:'Error'
                         ,message: 'No se ha cargado el equipo correctamente '
                         ,buttons: Ext.Msg.OK
                         ,icon: Ext.Msg.ERROR
                       });
                     }
                   });
                  });
                }
              }


            }else{
              Ext.Msg.show({
                 title:'Atención'
                ,message: 'Debe seleccionar una Zona'
                ,buttons: Ext.Msg.OK
                ,icon: Ext.Msg.WARNING// WARNING:
              });
            }
        }
      }]

    },{
        xtype:'treeequipos'
       ,scrollable: true
       ,height:window.innerHeight -10
		}]

  ,listeners: {
        select: 'onItemSelected'
    }
});
