
Ext.define('Torneo.view.trees.treeTorneo', {
     extend: 'Ext.tree.Panel'
    ,title: localStorage.getItem('nombre_torneo')
    ,xtype: 'treetorneo'
    ,scrollable:true
    ,flex:1
    ,requires: [
        'Torneo.view.trees.TreeTorneoController'
        ,'Ext.form.field.Text'
        ,'Ext.form.field.Trigger'
    ]
    ,width:'50%'
    ,controller: 'TreeTorneo'
    ,tbar: [
      {
        html: 'Organizacion de los torneos'
      }
     /* {
          labelWidth: 130,
          xtype: 'triggerfield',
          fieldLabel: 'Buscar Torneo',
          triggerCls: 'x-form-clear-trigger',
          onTriggerClick:function () {
              var store = this.up('treepanel').store;
              this.reset();
              store.clearFilter();
              this.focus();
          },
          listeners: {
              change: function () {
                  var tree = this.up('treepanel'),
                      v,
                      matches = 0;

                  try {
                      v = new RegExp(this.getValue(), 'i');
                      tree.store.filter({
                          filterFn: function (node) {
                              var children = node.childNodes,
                                  len = children && children.length,
                                  visible = node.isLeaf() ? v.test(node.get('text')) : false,
                                  i;
                              for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                              if (visible && node.isLeaf()) {
                                  matches++;
                              }
                              return visible;
                          },
                          id: 'titleFilter'
                      });
                      tree.down('#matches').setValue(matches);
                  } catch (e) {
                      this.markInvalid('Invalid regular expression');
                  }
              },
              buffer: 250
          }
        }, {
          xtype: 'displayfield',
          itemId: 'matches',
          fieldLabel: 'Resultados',

          // Use shrinkwrap width for the label
          labelWidth: null,
          listeners: {
              beforerender: function () {
                  var me = this,
                      tree = me.up('treepanel'),
                      root = tree.getRootNode(),
                      leafCount = 0;

                  tree.store.on('fillcomplete', function (store, node) {
                      if (node === root) {
                          root.visitPostOrder('', function (node) {
                              if (node.isLeaf()) {
                                  leafCount++;
                              }
                          });
                          me.setValue(leafCount);
                      }
                  });
              },
              single: true
          }
    }*/
  ]
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
                         console.log('node',node);
                         console.log('data', data);
                         console.log('overModel',overModel);
                         console.log('dropPosition',dropPosition);
                         console.log('dropHandlers', dropHandlers);
                         if(dropPosition ==  "before"){
                            dropHandlers.cancelDrop();
                         }else{
                           dropHandlers.processDrop();
                         }

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
        text: 'Torneos'
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
