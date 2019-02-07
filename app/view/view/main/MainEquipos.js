Ext.define('Torneo.view.main.MainEquipos', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainequipos',
    requires: [
        //'gcl.store.Personnel'
    ]
    ,layout: 'hbox'
    ,items:[{
      xtype: 'treeequiposjugadores'
      ,itemId:'treeequiposjugadores'
      ,width:'50%'
      ,scrollable:true
      ,height:window.innerHeight-10

    },{
      xtype:'panel'
      ,layout:'vbox'
      ,bodyStyle: 'background:#2c8c04'
      ,height:window.innerHeight-10
      ,items:[{
        xtype: 'button'
        ,text:'<<<'
        ,tooltip: 'Agregar Jugador a Equipo'
        ,margin: '60 0 0 0'
        ,handler: function (btn, e){
           var band = true;
            if(Ext.isDefined(Ext.cq1('treeequiposjugadores').getSelectionModel().selected.items[0])){
              if(!Ext.cq1('treeequiposjugadores').getSelectionModel().selected.items[0]){
                Ext.Msg.show({
                   title:'Atención'
                  ,message: 'Debe seleccionar un Equipo'
                  ,buttons: Ext.Msg.OK
                  ,icon: Ext.Msg.WARNING// WARNING:
                });
              }else{
              /*  var cantPermitida = Ext.cq1('treeequiposjugadores').getSelectionModel().selected.items[0].data.zona_cantidad_equipos
                var cantReal = Ext.cq1('treeequiposjugadores').getSelectionModel().selected.items[0].childNodes.length;
                var cantPasar = Ext.cq1('treejugadores').getSelectionModel().selected.items.length
                if(cantPermitida<=cantReal+cantPasar){
                  Ext.Msg.show({
                     title:'Atención'
                    ,message: 'La cantidad de jugadores superan la cantidad maxima por equipo'
                    ,buttons: Ext.Msg.OK
                    ,icon: Ext.Msg.WARNING// WARNING:
                  });
                }else{*/
                  var equipo_id = Ext.cq1('treeequiposjugadores').getSelectionModel().selected.items[0].data.equipo_id;
                  Ext.cq1('treejugadores').getSelectionModel().selected.items.forEach(function(rec){
                   console.log('consultar por estos', rec);
                   var myObj = {
                     //zona_id:Ext.cq1('treeequiposjugadores').getSelectionModel().selected.items[0].data.zona_id,
                     jugador_id:rec.data.jugador_id,
                     equipo_id:Ext.cq1('treeequiposjugadores').getSelectionModel().selected.items[0].data.equipo_id
                   };
                   Ext.Ajax.request({
                     url: '/api/jugadores-equipo'
                     ,jsonData: myObj
                     ,callback: function( opt, success, response ) {
                       var json = Ext.decode(response.responseText);
                       if ( response.status === 201 ) {

                         if ( !json.success ) {
                             Ext.Msg.show({
                                title:'Error ' + rec.data.jugador_nombre
                               ,message: json.msg
                               ,buttons: Ext.Msg.OK
                               ,icon: Ext.Msg.ERROR
                             });
                             band = false;
                             return false;
                         }else{
                           Ext.getStore('EquiposJugadores').reload();
                           Ext.defer(function(){Ext.getStore('EquiposJugadores').getRootNode().findChild('equipo_id', equipo_id, true).expand();},2000);
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
                //}
              }


            }else{
              Ext.Msg.show({
                 title:'Atención'
                ,message: 'Debe seleccionar un Equipo'
                ,buttons: Ext.Msg.OK
                ,icon: Ext.Msg.WARNING// WARNING:
              });
            }
        }
      }]

    },{
      xtype:'treejugadores'
      ,width:'50%'
      ,scrollable:true
      ,height:window.innerHeight-10
      ,itemId:'treejugadores'

		}]

  ,listeners: {
     select: 'onItemSelected'
   }
});
