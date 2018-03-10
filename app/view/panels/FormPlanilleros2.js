Ext.define('Torneo.view.panels.FormPlanilleros2', {
     extend: 'Ext.form.Panel'
     ,requires: [
        // 'Torneo.view.panels.CardFixtureController',
     ]
     ,xtype:'formplanilleros2'
     ,layout:'fit'
     ,jsonSubmit:true
     ,initComponent: function(config) {
      		var me = this;
          Ext.apply(me, {
               url: me.url
              ,itemId:'frmPlanilleros-'+me.equipo_id
              ,items:[{
                  xtype: 'textfield'
                  ,name: 'fixture_id'
                  ,hidden:true
                  ,value:me.fixture_id
                },{
                  xtype: 'textfield'
                  ,name: 'equipo_id'
                  ,hidden:true
                  ,value:  me.equipo_id
                },{
                  xtype: 'textfield'
                  ,name: 'fecha_id'
                  ,hidden:true
                  ,value: me.fecha_id
                },{
                  xtype:'panel'
                  // ,layout:'fit'
                  ,height: 550
                  ,scrollable:true
                  ,items:[{
                      xtype: 'fieldset'
                     ,height:200
                     ,title: 'GOLEADORES'
                     ,itemId:'fgol2'
                     ,collapsible: true
                     ,collapsed: false
                     ,scrollable:true
                     ,items: [{
						              xtype: 'container'// XXX:
						             ,layout:'hbox'
						             ,items:[{
							              fieldLabel: 'Jugador:'
							              ,xtype: 'combobox'
                            ,padding: 10
							              //,name: 'goleador_jugador_id'
							              ,itemId: 'cmbgoljugador'+me.equipo_id
							               //,displayField: 'jugador_nombre'
							              ,store:'Jugadores-Equipo'
							              ,valueField: 'jugador_id'
							              ,listeners:{
							                  change:function(cmb) {
  									               console.log('rara',cmb.getValue());
  									               if(!Ext.isEmpty(cmb.getValue())){
  									                  Ext.cq1('#btnaddgol2').setDisabled(false);
  									               }else{
  									                  Ext.cq1('#btnaddgol2').setDisabled(true);
  									               }
							                  }
							               }
              						},{
              							  text: '+'
              							 ,xtype: 'button'
              							 ,itemId:'btnaddgol2'
              							 ,disabled:true
              							 ,margin: '10 0 0 25'
              							 ,handler: function (btn ,e){
              							   console.log ('agregar data al store');
              							   var combobox = btn.up().down('#cmbgoljugador'+me.equipo_id);
              							   var v =  btn.up().down('#cmbgoljugador'+me.equipo_id).getValue();
              							   console.log('&&&&&&&&&',v);
              							   var record = combobox.findRecord(combobox.valueField || combobox.displayField, v);
              							   var index = combobox.store.indexOf(record);
              							   console.log('este es record',record);
              							   record.set('cant_goles',1);
              							   Ext.getStore('Goleadores2').add(record);
              							   combobox.reset();
              							 }
                        }]
					          },{
          						  xtype: 'grid'
          						 ,name: 'goleadores'
          						 ,isSubmit: true
          						 ,submitConfig: [{"type":"All","fields":["jugador_id","jugador_nombre","cant_goles"]}]
          						 ,plugins: [{
          							        ptype: "cellediting"
          							        ,clicksToEdit: 2,
          						  }]
          						 ,store: 'Goleadores2'
          						 ,emptyText: 'No hay jugadores asignados'
          						 ,columns:[{
          						   text: 'Id de jugador'
          						   ,name: 'Id de jugador'
          						   ,dataIndex : 'jugador_id'
          						   ,flex: 1
          						   ,hidden:true

          						 },{
          						   text: 'Nombre de jugador'
          						   ,name: 'Nombre jugador'
          						   ,dataIndex: 'text'

          						   ,flex: 2
          						 },{
          						   text: 'Goles'
          						   ,name: 'Goles'
          						   ,dataIndex: 'cant_goles'
          						   ,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}
          						 },{
          						   xtype: 'actioncolumn'
          						   ,text: 'Eliminar'
          						   ,glyph:'xe681@Linearicons'
          						   ,handler: function (grid, rowIndex, colIndex, btn, e, record,row ) {
          							       grid.getStore().remove(record);
          						   }
          						 }]
          						 ,listeners:{
          						   render: function (grid,e) {
                           console.log('render goleadores2');
          							    Ext.getStore('Goleadores2').load({params:{fixture_id:me.fixture_id,fecha_id:me.fecha_id,equipo_id:me.equipo_id}});
          						   }
          						 }
                   }]
      				      },{  /////////////CIERRE FIELDSET  1
              				   xtype: 'fieldset'
                         ,height:200
                         ,scrollable:true
              				   ,collapsible:true
              				   ,collapsed:false
              				   ,title: 'AMONESTADOS'
              				   ,itemId:'famo2'
              				   // ,height: 250
              				   ,items: [{
              					 xtype: 'container'
              					 ,layout:'hbox'
              					 ,items:[{
              					   fieldLabel: 'Jugador:'
              					   ,xtype: 'combobox'
                           ,padding: 10
              					   //,name: 'goleador_jugador_id'
              					   ,itemId: 'cmbamojugadore2'+me.equipo_id
              					   ,store: 'Jugadores-Equipo'
              					   //,allowBlank: false
              					   ,listeners:{
                  						 change:function(cmb){
                  							   console.log('rara',cmb.getValue());
                  							   if(!Ext.isEmpty(cmb.getValue())){
                  								     Ext.cq1('#btnaddamo2').setDisabled(false);
                  							   }else{
                  								     Ext.cq1('#btnaddamo2').setDisabled(true);
                  							   }
                  						 }
              					   }
              					 },{
              					   text: '+'
              					   ,xtype: 'button'
              					   ,disabled:true
              					   ,margin: '10 0 0 25'
              					   ,itemId:'btnaddamo2'
              					   ,handler: function (btn ,e){
                  						 console.log ('agregar data al store');
                  						 var combobox = btn.up().down('#cmbamojugadore2'+me.equipo_id);
                  						 var v =  btn.up().down('#cmbamojugadore2'+me.equipo_id).getValue();
                  						 var record = combobox.findRecord(combobox.valueField || combobox.displayField, v);
                  						 var index = combobox.store.indexOf(record);
                  						 console.log('este es record',record);
                  						 record.set('cant_tarjetas',1);
                  						 Ext.getStore('Amonestados2').add(record);
                  						 combobox.reset();
              					   }
              					 }]

              				   },{
              					 xtype: 'grid'
              					 ,name: 'amonestados'
              					 ,isSubmit: true
              					 ,submitConfig: [{"type":"All","fields":["jugador_id","jugador_nombre","cant_tarjetas"]}]
              					 ,plugins: [{
              						  ptype: "cellediting"
              						 ,clicksToEdit: 2,
              					  }]
              					 ,store: 'Amonestados2'
                         ,emptyText: 'No hay jugadores asignados'
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
              					   ,dataIndex:'text'
              					 },{
              					   text: 'Tarjetas',
              					   name:"cant_tarjetas",
              					   dataIndex:"cant_tarjetas"
              					   ,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}
              					 },{
              					   xtype: 'actioncolumn'
              					   ,text: 'Eliminar'
              					   ,glyph:'xe681@Linearicons'
              					   ,handler: function (grid, rowIndex, colIndex, btn, e, record,row ) {
              						      grid.getStore().remove(record);
              					   }
              					 }]
              					 ,listeners:{
              					   render: function (grid,e){
                             console.log('render amonestados2');
              						      Ext.getStore('Amonestados2').load({params:{fixture_id:me.fixture_id,fecha_id:me.fecha_id,equipo_id:me.equipo_id}});
              					   }
              					 }
              		 }]
      				},{ //CIERRRE  FIELDSET 2

      				   xtype: 'fieldset'
      				   // ,height: 250
      				   ,itemId:'fexp2'
                 ,height:200
                 ,scrollable:true
      				   ,collapsible:true
      				   ,collapsed: false
      				   ,title: 'EXPULSADOS'
      				   ,items: [{
      					 xtype: 'container'
      					 ,layout:'hbox'
      					 ,items:[{
      					   fieldLabel: 'Jugador:'
      					   ,xtype: 'combobox'
                   ,padding: 10
      					   ,itemId: 'cmbexpjugadore2'+me.equipo_id
      					   //,name: 'goleador_jugador_id'
      					   ,store: 'Jugadores-Equipo'
      					   //,vtype: 'password'
      					   //,allowBlank: false
      					   ,listeners:{
        						 change:function(cmb) {
        						   console.log('rara',cmb.getValue());
        						   if(!Ext.isEmpty(cmb.getValue())){
        							    Ext.cq1('#btnaddexp2').setDisabled(false);
        						   }else{
        							    Ext.cq1('#btnaddexp2').setDisabled(true);
        						   }
        						 }
      					   }
      					 },{
      					   text: '+'
      					   ,xtype: 'button'
      					   ,itemId:'btnaddexp2'
      					   ,disabled:true
      					   ,margin: '10 0 0 25'
      					   ,handler: function (btn ,e){
      						 console.log ('agregar data al store');
      						 var combobox = btn.up().down('#cmbexpjugadore2'+me.equipo_id);
      						 var v =  btn.up().down('#cmbexpjugadore2'+me.equipo_id).getValue();
      						 var record = combobox.findRecord(combobox.valueField || combobox.displayField, v);
      						 var index = combobox.store.indexOf(record);
      						 console.log('este es record',record);
      						 record.set('cant_fechas',1);
      						 Ext.getStore('Expulsados2').add(record);
      						 combobox.reset();
      					   }
      					}]

      				   },{
      						  xtype: 'grid'
      						 ,isSubmit: true
      						 ,name: 'expulsados'
      						 ,submitConfig: [{"type":"All","fields":["jugador_id","jugador_nombre","cant_fechas"]}]
      						 ,plugins: [{
      							        ptype: "cellediting"
      							        ,clicksToEdit: 2,
      						  }]
      						 ,store: 'Expulsados2'
                   ,emptyText: 'No hay jugadores asignados'
      						 ,columns:[{
      						   text: 'Id de jugador'
      						   ,name: 'Id de jugador'
      						   ,flex: 1
      						   ,dataIndex:'jugador_id'
      						   ,hidden:true
      						 },{
      						   text: 'Nombre de jugador'
      						   ,name: 'Nombre jugador'
      						   ,dataIndex:'text'
      						   ,flex: 2
      						 },{
      						   text: 'Fechas'
      						   ,dataIndex:'cant_fechas'
      						   ,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}
      						 },{
      						   xtype: 'actioncolumn'
      						   ,text: 'Eliminar'
      						   ,glyph:'xe681@Linearicons'
      						   ,handler: function (grid, rowIndex, colIndex, btn, e, record,row ) {
      							 grid.getStore().remove(record);
      						   }
      						 }]
      						 ,listeners:{
      							render: function (grid,e){
                      console.log('render expulsados2');
      								Ext.getStore('Expulsados2').load({params:{fixture_id:me.fixture_id,fecha_id:me.fecha_id,equipo_id:me.equipo_id}});
      							}
      						}
      				   }]
      				},{
      					xtype: 'fieldset'
      					,itemId:'penales2'
                ,scrollable:true
      				   ,collapsible:true
      				   ,collapsed: false
      				   ,title: 'DEFINICIÓN POR PENALES'
                ,height:100
      					,items: [{
      					   xtype: 'numberfield'
      					  ,flex:1
      					  ,fieldLabel: 'Goles'
      					  ,name: 'penales'
      					}]
      			}]
              ,dockedItems:[{
                    xtype:'toolbar'
                    ,dock: 'bottom'
                    ,style: 'background-color: green'
                    ,items:[{
                      xtype:'button'
                      ,text:'Anterior'
                      ,ui:'action'
                      ,handler:function(btn,e){
                        Ext.cq1('cardfixture').layout.setActiveItem('cardPlanillero2');
                      }
                    },'->',{
                     xtype:'button'
                     ,text: 'Guardar'
                     ,ui:'action'
                     ,handler: function (btn,e){
                       btn.up().up().mask('Espere por favor...');
                       Ext.cq1('#frmPlanilleros-'+me.equipo_id).getForm().submit({
                       method:'POST'
                       ,jsonSubmit:true
                       ,success:function(a,b){
                         Ext.Msg.show({
                          title:'Actualizado'
                         ,message: 'Se han  actualizado los datos'
                         ,buttons: Ext.Msg.OK
                         ,icon: Ext.Msg.INFO
                         });
                         Ext.each(Ext.getStore('Goleadores2').data.items,function(data){
                           data.commit();
                         });
                         Ext.each(Ext.getStore('Amonestados2').data.items,function(data){
                           data.commit();
                         });
                         Ext.each(Ext.getStore('Expulsados2').data.items,function(data){
                           data.commit();
                         });
                          btn.up().up().unmask();
                       }
                       , failure:function(a,b){
                         Ext.Msg.show({
                          title:'Error'
                           ,message: 'No se han actualizado los resultados '
                           ,buttons: Ext.Msg.OK
                           ,icon: Ext.Msg.ERROR
                         });
                          btn.up().up().unmask();
                       }
                       });
                     }
                   }]
               }]
				  }]

         ,listeners:{
           beforerender:function(btn,e){
             console.log(me.equipo_id);
             Ext.getStore('Jugadores-Equipo').load({params:{'equipo_id':me.equipo_id}});
           }
           ,activate:function(btn,e){
             console.log('ACTIVATE TAB 2');
             btn.mask('Espere por favor...');
                Ext.getStore('Jugadores-Equipo').load({params:{'equipo_id':me.equipo_id}});
                Ext.getStore('Goleadores2').load({params:{fixture_id:me.fixture_id,fecha_id:me.fecha_id,equipo_id:me.equipo_id}});
                Ext.getStore('Amonestados2').load({params:{fixture_id:me.fixture_id,fecha_id:me.fecha_id,equipo_id:me.equipo_id}});
                Ext.getStore('Expulsados2').load({params:{fixture_id:me.fixture_id,fecha_id:me.fecha_id,equipo_id:me.equipo_id}
                  ,callback: function(records, operation, success) {
                    btn.unmask();

                  }});
           }
         }
       });
      me.callParent(config);
    }
});
