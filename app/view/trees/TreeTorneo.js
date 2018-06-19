
Ext.define('Torneo.view.trees.treeTorneo', {
     extend: 'Ext.tree.Panel'
    ,title: localStorage.getItem('nombre_torneo')
    ,xtype: 'treetorneo'
    ,scrollable:true
    // ,layout:'fit'
    ,flex:1
    ,requires: [
        'Torneo.view.trees.TreeTorneoController'
        ,'Ext.form.field.Text'
        ,'Ext.form.field.Trigger'
    ]
    ,width:'50%'
    ,controller: 'TreeTorneo'
    ,tbar: [{
      text:'Torneo'
      ,xtype:'label'
      ,padding:5.5
    }]
    ,bodyStyle: {
    // background: ' #9dc00278',
    //padding: '10px'
    }
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
        //,ventana: 'Torneo'
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
       // ,ventana: 'Torneo'
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
        ,urlAlta: '/api/torneo'
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
                if (overModel.data.zona_id) {
                  var cant = overModel.childNodes.length;
                    if(cant < overModel.data.zona_cantidad_equipos){
                          return true;
                    }else{
                        return false;
                    }

                 }else{
                     return false;
                  }
               }
               ,beforedrop: function ( node, data, overModel, dropPosition, dropHandlers ) {
                  dropHandlers.wait = true;
                 if(Ext.isDefined(overModel.data.zona_id)){
                 var myObj = {
                   zona_id:overModel.data.zona_id,
                   equipo_id:data.records[0].data.equipo_id,
                   torneo_id:overModel.data.torneo_id
                 };
                 Ext.Ajax.request({
                   url: '/api/equipozona'
                   ,jsonData: myObj
                   ,callback: function( opt, success, response ) {
                     var json = Ext.decode(response.responseText);
                     if ( response.status === 201 ) {
                       if ( json.success ) {
                         dropHandlers.processDrop();
                       }else{
                         dropHandlers.cancelDrop();
                         console.log('deberia cancelar el  drop');
                         Ext.Msg.show({
                            title:'Error'
                           ,message: json.msg
                           ,buttons: Ext.Msg.OK
                           ,icon: Ext.Msg.ERROR
                         });
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
                      dropHandlers.cancelDrop();
                   }
                 });

               }else{
                 Ext.Msg.show({
                   title:'Error'
                   ,message: 'Los equipos deben cargarse en una zona. '
                   ,buttons: Ext.Msg.OK
                   ,icon: Ext.Msg.ERROR
                 });
                  dropHandlers.cancelDrop();
               }
             }
            }
      }
      ,store: {
        folderSort: false
        ,autoDestroy: true
        ,proxy: {
          type: 'ajax'
          ,url: '/api/torneocompleto'
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
     }
});
