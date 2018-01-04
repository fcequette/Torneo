Ext.define('Torneo.view.main.TreeEquipos', {
    //extend: 'Ext.container.Container',
    extend: 'Ext.tree.Panel'
    ,xtype: 'treeequipos'
    ,title: '<p style="height:4px">Equipos</p>'
    //,width: 500
    //,height: 850
    ,scrollable:true
    ,flex:1

    ,tbar: [{
      labelWidth: 130,
      xtype: 'triggerfield',
      fieldLabel: 'Buscar Equipo',
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
    }]

  ,viewConfig:{
      loadMask:false,
      plugins:{
        ptype:'treeviewdragdrop',
        expandDelay:100
     }
     ,listeners:{
       beforedrop: function(node, data, overModel,position,handler, e) {
         console.log('hola');
         return false;
       }
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
