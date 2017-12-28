Ext.define('Torneo.view.main.TreeEquipos', {
    //extend: 'Ext.container.Container',
    extend: 'Ext.tree.Panel'
    ,xtype: 'treeequipos'
    ,title: 'Equipos'
    //,width: 500
    //,height: 850
    ,scrollable:true
    ,flex:1
    ,tbar: [{
      labelWidth: 130,
      xtype: 'triggerfield',
      fieldLabel: 'Buscar Equipo',
      triggerCls: 'x-form-clear-trigger',
      onTriggerClick: function () {
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
    }]
    // ,tools:[{
    //     xtype: 'button'
    //     ,tips: 'Eliminar'
    //     ,scale: 'medium'
    //     ,cls: 'toolbtn'
    //    ,glyph:'xe681@Linearicons'
    // },{
    //     xtype: 'button'
    //     ,tooltip: 'Editar'
    //      ,scale: 'medium'
    //     ,margin:'0 5 0 5'
    //     ,cls: 'toolbtn'
    //     ,glyph:'xe612@Linearicons'
    //    ,itemId: 'botonEditEquipo'
    //    ,ventana: 'Equipo'
    //    ,edit: true
    //    ,record: ''
    //    ,handler:function (){
    //        console.log('llamar a ventana',Ext.ComponentQuery.query('#botonAddEquipo')[0].ventana);
    //        console.log('con este record',Ext.ComponentQuery.query('#botonEditEquipo')[0].record);
    //        console.log(Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.text);
    //        Ext.create('Ext.window.Window', {
    //            title: 'EDITAR '+ Ext.ComponentQuery.query('#botonEditEquipo')[0].ventana,
    //            height: 250,
    //            width: 400,
    //            layout: 'fit',
    //            items: {  // Let's put an empty grid in just to illustrate fit layout
    //              xtype:'form'
    //             ,bodyPadding: '15px'
    //             ,items:[{
    //                  xtype:'textfield'
    //                 ,fieldLabel: 'Id'
    //                 ,value: Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.equipo_id
    //             },{
    //                  xtype:'textfield'
    //                 ,fieldLabel: 'Descripción'
    //                 ,value: Ext.ComponentQuery.query('#botonEditEquipo')[0].record.data.text
    //             },{
    //               xtype: 'radiogroup',
    //               fieldLabel: 'Estado',
    //               // Arrange radio buttons into two columns, distributed vertically
    //               columns: 1,
    //               vertical: true,
    //               valueField:'entidad_activo',
    //               items: [
    //                   { boxLabel: 'Activo', name: 'entidad_activo', inputValue: '1', checked: true },
    //                   { boxLabel: 'Inactivo', name: 'entidad_activo', inputValue: '0'}
    //               ]
    //               //,value: rec.data.entidad_activo
    //             }]// A dummy empty data store
    //            }
    //            ,dockedItems:[{
    //                  xtype: 'toolbar'
    //                 ,dock: 'bottom'
    //                 ,items:[{
    //                       xtype: 'button'
    //                       ,text: 'Cancelar'
    //                 },'->',{
    //                   xtype: 'button'
    //                   ,text: 'Guardar Cambios'
    //                   ,handler: function (btn,e){
    //
    //                   }
    //                 }]
    //            }]
    //        }).show();
    //    }
    //  },{
    //     xtype: 'button'
    //     ,tooltips: '+ Equipo'
    //      ,scale: 'medium'
    //      ,glyph:'xe98e@Linearicons'
    //      ,cls: 'toolbtn'
    //     ,margin:'0 5 0 5'
    //    ,itemId: 'botonAddEquipo'
    //    ,ventana: 'Equipo'
    //    ,record: ''
    //    //,edit: false
    //    ,handler:function (){
    //      console.log('llamar a ventana',Ext.ComponentQuery.query('#botonAddEquipo')[0].ventana);
    //      console.log('con este record',Ext.ComponentQuery.query('#botonAddEquipo')[0].record);
    //      Ext.create('Ext.window.Window', {
    //            title: 'Alta de '+ Ext.ComponentQuery.query('#botonAddEquipo')[0].ventana,
    //            height: 200,
    //            width: 400,
    //            layout: 'fit',
    //            items: {  // Let's put an empty grid in just to illustrate fit layout
    //                 xtype:'form'
    //                ,bodyPadding: '15px'
    //               ,items:[{
    //                    xtype:'textfield'
    //                   ,fieldLabel: 'Descripción'
    //                   ,name: 'equipo_descri'
    //               },{
    //                  xtype: 'combobox'
    //                 ,fieldLabel: 'Delegado:'
    //                 ,store: 'Jugadores'
    //                 ,valueField: 'jugador_id'
    //                 ,name: 'equipo_delegado'
    //               }]// A dummy empty data store
    //            }
    //      }).show();
    //    }
    // }]

  ,viewConfig:{
      loadMask:false,
      plugins:{
        ptype:'treeviewdragdrop',
        expandDelay:100
     }
  }
   ,store: {
       folderSort: false
       ,autoDestroy: true
       ,proxy: {
       type: 'ajax'
       //,url: 'https://api.myjson.com/bins/phidn'
       ,url: 'http://dario-casa.sytes.net/api/equipo?jug=no'
       //,url: 'http://localhost:8080/equipo'

       }
       ,sorters: [{
          property: 'equipo_descri'
         ,direction: 'ASC'
       }]
       ,root: {
         text: 'Equipos'
         ,expanded: true
       }
       ,reader:{
         text:'equipo_descri'
       }
   }
  ,listeners:{
     // 'itemclick': function (est, record, item, index, e, eOpts ){
     //     console.log('SE EJECUTO',est,record,item,index);
     //     if(index == 0 ){
     //       Ext.ComponentQuery.query('#botonAddEquipo')[0].setText('');
     //       Ext.ComponentQuery.query('#botonAddEquipo')[0].ventana = 'Equipo';
     //       Ext.ComponentQuery.query('#botonEditEquipo')[0].record = record;
     //     }
     //     if(index == 1 ){
     //       Ext.ComponentQuery.query('#botonEditEquipo')[0].ventana = 'Equipo';
     //       Ext.ComponentQuery.query('#botonEditEquipo')[0].record = record;
     //       Ext.ComponentQuery.query('#botonAddEquipo')[0].setText('');
     //       Ext.ComponentQuery.query('#botonAddEquipo')[0].ventana = 'Equipo';
     //     }
     //     if(index == 2 ||index == 3){
     //       Ext.ComponentQuery.query('#botonEditEquipo')[0].ventana = 'Equipo';
     //       Ext.ComponentQuery.query('#botonEditEquipo')[0].record = record;
     //       Ext.ComponentQuery.query('#botonAddEquipo')[0].setText('');
     //       Ext.ComponentQuery.query('#botonAddEquipo')[0].ventana = 'Equipo';
     //     }
     // }
  }
});
