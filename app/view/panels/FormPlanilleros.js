Ext.define('Torneo.view.panels.FormPlanilleros', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.form.Panel'
     ,requires: [
        // 'Torneo.view.panels.CardFixtureController',
     ]

     ,xtype:'formplanilleros'
     ,jsonSubmit:true
     ,initComponent: function(config) {
      		var me = this;
          Ext.apply(me, {
            url: me.url
            ,itemId:'frmPlanilleros-'+me.equipo_id
           //,scrollable: true
           ,items:[
             {
                xtype: 'textfield'
               ,name: 'fixture_id'
               ,hidden:true
               ,value:me.fixture_id
             },{
               xtype: 'textfield'
              ,name: 'equipo_id'
              ,hidden:true
              ,value:me.equipo_id
             },{
               xtype: 'textfield'
              ,name: 'fecha_id'
              ,hidden:true
              ,value:me.fecha_id
             },{
             xtype:'fieldset'
             ,title: me.equipo
             ,collapsible: true
             ,name: 'equipo 1'
             ,defaultType: 'textfield'
             ,defaults: {anchor: '100%'}
             ,layout: 'anchor'
             ,collapsible: false
             ,defaults: {
             },
             defaultType: 'textfield'
             ,items:[{
               xtype: 'fieldset'
               ,title: 'Goleadores'
               ,items: [{
                 xtype: 'container'
                 ,layout:'hbox'
                 ,items:[{
                   fieldLabel: 'Jugador:'
                   ,xtype: 'combobox'
                   ,name: 'goleador_jugador_id'
                   ,itemId: 'cmbgoljugador'+me.equipo_id
                   //,displayField: 'jugador_nombre'
                   ,store:'Jugadores'
                   ,valueField: 'jugador_id'
                   //,allowBlank: false
                 },{
                   text: '+'
                   ,xtype: 'button'
                   ,margin: '0 0 0 25'
                   ,handler: function (btn ,e){
                     console.log ('agregar data al store');
                     var combobox = Ext.cq1('#cmbgoljugador'+me.equipo_id);
                     var v =  Ext.cq1('#cmbgoljugador'+me.equipo_id).getValue();
                     var record = combobox.findRecord(combobox.valueField || combobox.displayField, v);
                     var index = combobox.store.indexOf(record);
                     console.log('este es record',record);
                     record.set('cant_goles',1);
                     Ext.getStore('Goleadores').add(record);
                     combobox.reset();
                   }
                 }]

               },{
                 xtype: 'grid'
                 //,title: 'Goleadores'
                 ,name: 'goleadores'
                 ,isSubmit: true
	               ,submitConfig: [{"type":"All","fields":["jugador_id","jugador_nombre","cant_goles"]}]
                 ,plugins: [{
                    ptype: "cellediting"
                    ,clicksToEdit: 2,

                  }]
                 ,store: 'Goleadores'
                 ,emptyText: 'No hay jugadores asignados'
                 ,height: 100
                 ,columns:[{
                   text: 'Id de jugador'
                   ,name: 'Id de jugador'
                   ,dataIndex : 'jugador_id'
                   ,flex: 1
                   ,hidden:true

                 },{
                   text: 'Nombre de jugador'
                   ,name: 'Nombre jugador'
                   ,dataIndex: 'jugador_nombre'

                   ,flex: 2
                 },{
                   text: 'Goles'
                   ,name: 'Goles'
                   ,dataIndex: 'cant_goles'
                   ,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}
                 },{
                   xtype: 'actioncolumn'
                   ,text: 'delete'
                   ,glyph:'xe681@Linearicons'
                   ,handler: function (grid, rowIndex, colIndex, btn, e, record,row ) {
                     grid.getStore().remove(record);
                   }
                 }]
                 ,listeners:{
                   render: function (grid,e){
                     //Ext.getStore('Goleadores').load({params:{fecha_id:1,equipo_id:1}}); TODO
                     Ext.getStore('Goleadores').load();
                   }
                 }
               }]
             },{
               xtype: 'fieldset'
               ,title: 'Amonestados'
               ,items: [{
                 xtype: 'container'
                 ,layout:'hbox'
                 ,items:[{
                   fieldLabel: 'Jugador:'
                   ,xtype: 'combobox'
                   //,name: 'goleador_jugador_id'
                   ,itemId: 'cmbamojugadore2'+me.equipo_id
                   ,store: 'Jugadores'
                   ,vtype: 'password'
                   //,allowBlank: false
                 },{
                   text: '+'
                   ,xtype: 'button'
                   ,margin: '0 0 0 25'
                   ,handler: function (btn ,e){
                     console.log ('agregar data al store');
                     var combobox = Ext.cq1('#cmbamojugadore2'+me.equipo_id);
                     var v =  Ext.cq1('#cmbamojugadore2'+me.equipo_id).getValue();
                     var record = combobox.findRecord(combobox.valueField || combobox.displayField, v);
                     var index = combobox.store.indexOf(record);
                     console.log('este es record',record);
                     record.set('cant_tarjetas',1);
                     Ext.getStore('Amonestados').add(record);
                     combobox.reset();
                   }
                 }]

               },{
                 xtype: 'grid'
                 ,emptyText: 'No hay jugadores asignados'
                 ,height: 100
                 ,name: 'amonestados'
                 ,isSubmit: true
                 ,submitConfig: [{"type":"All","fields":["jugador_id","jugador_nombre","cant_tarjetas"]}]
                 ,plugins: [{
                    ptype: "cellediting"
                    ,clicksToEdit: 2,

                  }]
                 ,store: 'Amonestados'
                 ,columns:[{
                   text: 'Id de jugador'
                   ,name: 'Id de jugador'
                   ,flex: 1
                   ,dataIndex:'jugador_id'
                   ,hidden:true
                 },{
                   text: 'Nombre de jugador'
                   ,name: 'Nombre jugador'
                   ,flex: 2
                   ,dataIndex:'jugador_nombre'
                 },{
                   text: 'Tarjetas',
                   name:"cant_tarjetas",
                   dataIndex:"cant_tarjetas"
                   ,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}
                 },{
                   xtype: 'actioncolumn'
                   ,text: 'delete'
                   ,glyph:'xe681@Linearicons'
                   ,handler: function (grid, rowIndex, colIndex, btn, e, record,row ) {
                     grid.getStore().remove(record);
                   }
                 }]
                 ,listeners:{
                   render: function (grid,e){
                     //Ext.getStore('Amonestados').load({params:{fecha_id:1,equipo_id:1}}); TODO
                     Ext.getStore('Amonestados').load();
                   }
                 }
               }]
             },{
               xtype: 'fieldset'
               ,title: 'Expulsados'
               ,items: [{
                 xtype: 'container'
                 ,layout:'hbox'
                 ,items:[{
                   fieldLabel: 'Jugador:'
                   ,xtype: 'combobox'
                   ,itemId: 'cmbexpjugadore2'+me.equipo_id
                   ,name: 'goleador_jugador_id'
                   ,store: 'Jugadores'
                   //,vtype: 'password'
                   //,allowBlank: false
                 },{
                   text: '+'
                   ,xtype: 'button'
                   ,margin: '0 0 0 25'
                   ,handler: function (btn ,e){
                     console.log ('agregar data al store');
                     var combobox = Ext.cq1('#cmbexpjugadore2'+me.equipo_id);
                     var v =  Ext.cq1('#cmbexpjugadore2'+me.equipo_id).getValue();
                     var record = combobox.findRecord(combobox.valueField || combobox.displayField, v);
                     var index = combobox.store.indexOf(record);
                     console.log('este es record',record);
                     record.set('cant_fechas',1);
                     Ext.getStore('Expulsados').add(record);
                     combobox.reset();
                   }
                 }]

               },{
                 xtype: 'grid'
                 //,title: 'Goleadores'
                 ,emptyText: 'No hay jugadores asignados'
                 ,height: 100
                 ,isSubmit: true
                 ,name: 'expulsados'
                 ,submitConfig: [{"type":"All","fields":["jugador_id","jugador_nombre","cant_fechas"]}]
                 ,plugins: [{
                    ptype: "cellediting"
                    ,clicksToEdit: 2,

                  }]
                 ,store: 'Expulsados'
                 ,columns:[{
                   text: 'Id de jugador'
                   ,name: 'Id de jugador'
                   ,flex: 1
                   ,dataIndex:'jugador_id'
                   ,hidden:true
                 },{
                   text: 'Nombre de jugador'
                   ,name: 'Nombre jugador'
                   ,dataIndex:'jugador_nombre'
                   ,flex: 2
                 },{
                   text: 'Fechas'
                   ,dataIndex:'cant_fechas'
                   ,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}
                 },{
                   xtype: 'actioncolumn'
                   ,text: 'delete'
                   ,glyph:'xe681@Linearicons'
                   ,handler: function (grid, rowIndex, colIndex, btn, e, record,row ) {
                     grid.getStore().remove(record);
                   }
                 }]
               }]
               ,listeners:{
                 render: function (grid,e){
                   //Ext.getStore('Amonestados').load({params:{fecha_id:1,equipo_id:1}}); TODO
                   Ext.getStore('Expulsados').load();
                 }
               }
             }]

             /////////////
           }]


           ,dockedItems:[{
             xtype:'toolbar'
             ,dock: 'bottom'
             ,items:['->',{
                 xtype:'button'
                 ,text: 'Guardar'
                 ,handler: function (btn,e){
                   Ext.cq1('#frmPlanilleros-'+me.equipo_id).submit();
                 }
               }]
          }]

        });
           me.callParent(config);
    }
  });
