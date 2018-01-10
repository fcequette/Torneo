
Ext.define('Torneo.view.trees.treeTorneo', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.tree.Panel'
    ,title: 'Gringa Champion Leage'
    ,xtype: 'treetorneo'
    ,requires: [
        'Torneo.view.trees.TreeTorneoController'
    ]
    ,controller: 'TreeTorneo'
    ,flex:1
    //,width: 500
    //,height: 850
    ,defaults:{
      padding:'0 5 0 5'
    }
    ,tools:[{
         xtype: 'button'
         ,tips: 'Eliminar'
         ,scale: 'medium'
         ,cls: 'toolbtn'
        ,glyph:'xe681@Linearicons'
        ,itemId: 'botonDelete'
        ,ventana: 'Torneo'
        ,record:''
        ,urlDelete:''
        ,margin:'0 5 0 5'
        ,handler: 'onDeleteClick'

    },{
        xtype: 'button'
        ,tooltip: 'Editar'
         ,scale: 'medium'
        ,margin:'0 5 0 5'
        ,glyph:'xe612@Linearicons'
        ,itemId: 'botonEdit'
        ,ventana: 'Torneo'
        ,edit: true
        ,record:''
        ,urlEdit:''
        ,handler: 'onEditClick'
        ,cls: 'toolbtn'
     },{
        xtype: 'button'
        ,tooltips: '+ torneo'
         ,scale: 'medium'
         ,cls: 'toolbtn'
        ,margin:'0 5 0 5'
        ,glyph:'xe98e@Linearicons'
          ,itemId: 'botonAdd'
        ,ventana: 'Torneo'
        ,record: ''
        ,urlAlta: ''
        ,handler: 'onAddClick'
     }]
      ,viewConfig:{
        loadMask:false,
        plugins:{
            ptype:'treeviewdragdrop',
            expandDelay:100
        }
        ,listeners:{
            beforedrop: function(node, data, overModel,position,handler, e) {
            // if you don't want to allow a drop event for some reason...
            console.log('uno',node);
            console.log('dos',data);
            console.log('tres',overModel);
            console.log('cuatro',position);
            console.log('cinco', handler);
            console.log('seis',e);
            if (overModel.data.zona_id) {
              var cant = overModel.childNodes.length;
              console.log('EStAAAAAAAAAA', cant, 'local',localStorage.getItem('cantidad-equiposxzonas'));
                  if(cant < overModel.data.zona_cantidad_equipos){
                      //var cantxzona = localStorage.getItem('cantidad_equiposxzonas');
                        return true;
                  }else{
                    return false;
                  }

                  }else{
                      return false;
                  }
               }
               ,drop: function ( node, data, overModel, dropPosition, eOpts ) {
                 console.log('lalalala',overModel.data);
                 console.log('llamar a  ajax request con', overModel.data.zona_id, ' y con el equipo',data.records[0].data.equipo_id);
                 var myObj = {
                   zona_id:overModel.data.zona_id,
                   equipo_id:data.records[0].data.equipo_id,
                   torneo_id:overModel.data.torneo_id
                 };
                 Ext.Ajax.request({
                   url: 'http://dario-casa.sytes.net/api/equipozona'
                    //url: 'http://localhost:8080/torneo'

                   ,jsonData: myObj
                   ,callback: function( opt, success, response ) {
                     var json = Ext.decode(response.responseText);
                     if ( response.status === 201 ) {
                       if ( json.success ) {

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

               }
            }
      }
      ,store: {
        folderSort: false
        ,autoDestroy: true
        ,proxy: {
          type: 'ajax'
          // ,url: 'https://api.myjson.com/bins/12po9z'
          ,url: 'http://dario-casa.sytes.net/api/torneocompleto'
        }
        ,storeId:'storeTorneo'

      ,sorters: [{
        property: 'torneo_descri'
        ,direction: 'ASC'
      }]
      ,root: {
        text: 'GCL'
        ,expanded: true
      }
      ,reader:{
        text:'torneo_descri'
      }

    }
    ,listeners:{
        'itemclick': 'onItemClick'
        ,update:function( comp, record, operation, modifiedFieldNames, details, eOpts ){
        }
        ,datachanged: function(a,b){
        console.log(a,b);
      },
      beforerender:function(a){

      }
//        ,load:function(treeStore, records, successful, operation){
//           console.log('llegaaaaaaaaaaaaaaaaaaaaaaaaa');
//          var id = 1; // This is the ID of the node that somehow you know in advance
//          var node = treeStore.getNodeById(id);
// console.log(node);
//          Ext.cq1('treetorneo').expandPath(node.getPath());
//        }
     }
});
