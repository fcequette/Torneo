
Ext.define('Torneo.view.panels.CardFixture', {
    extend: 'Ext.container.Container'
     ,requires: [
         'Torneo.view.panels.CardFixtureController',
         'Torneo.view.panels.FormPlanilleros1',
         'Torneo.view.panels.FormPlanilleros2'
     ]

     ,xtype:'cardfixture'
     ,controller: 'cardfixture'
     ,height:window.innerHeight-10
     ,layout: 'card'
     ,items:[{
       xtype:'panel'/////////////////////////////////////////////////////////////////////////////////////////////////////////
       ,itemId:'cardPlanillero2'
       ,title: 'PLANILLEROS'
       ,items:[{
         xtype:'grid'
        ,emptyText:'No hay partidos en la fecha indicada.'
        ,height:window.innerHeight-10
        ,columns: [
          { text: 'Equipo 1  ', dataIndex: 'equipo1', flex:1,align:'center'},
          { text: 'VS',  value: 'VS', dataIndex: 'vs',width: '50px' ,align:'center' },
          { text: 'Equipo 2  ', dataIndex: 'equipo2', flex: 1 ,align:'center'},
          { xtype:'actioncolumn'
            ,width:50
            ,items:[{
                  text:'Ausente'
                  ,glyph: 'xe9a0@Linearicons'
                  ,handler:function(grid, rowIndex, colIndex) {
                     rec = grid.getStore().getAt(rowIndex);
                     console.log('este es record',rec);
                    Ext.create('Ext.window.Window', {
                      width:400,
                      //height:300,
                      modal:true,
                      title: 'Hay un equipo ausente?',
                      items:[{
                        xtype:'form'
                        ,bodyPadding:15
                        ,flex:1
                        ,items:[{
                          xtype:'combobox',
                          fieldLabel:'E. Ausente:'
                        }]
                        ,dockedItems:[{
                          xtype:'toolbar',
                          dock:'bottom',
                          items:['->',{
                            text:'Marcar como ausente'
                          }]
                        }]
                      }]


                    }).show();
                  }
                }]
          },
          { xtype:'actioncolumn'
            ,width:50
            ,items:[{
                  text:'ver'
                  ,tooltip:'cargar datos'
                  ,glyph: 'xe6a5@Linearicons'
                  ,handler:function(grid, rowIndex, colIndex) {
                      var record = grid.getStore().getAt(rowIndex);
                      console.log('holllllla',record.data);
                      var e1 = record.data.equipo1;
                      var e2 = record.data.equipo2;
                      var tab = Ext.cq1('#cardPlanillero3');
                      tab.removeAll();
                      console.log(tab);
                      var a = tab.add({
                        xtype:'formplanilleros1',
                        title:e1,
                        layout:'fit',
                        equipo: e1,
                        equipo_id:record.data.equipo1_id,
                        fecha_id:record.data.fecha_id,
                        fixture_id:record.data.fixture_id,
                        url:'/api/goleadores',
                        items:[{
                          xtype: 'textfield'
                          ,name: 'fixture_id'
                          ,hidden:true
                          ,value: record.data.fixture_id
                        }]
                      });
                      var  b = tab.add ({
                          xtype:'formplanilleros2'
                          ,layout:'fit'
                         , title:e2,
                          equipo: e2,
                          equipo_id:record.data.equipo2_id,
                          fecha_id:record.data.fecha_id,
                          fixture_id:record.data.fixture_id,
                          url:'/api/goleadores',
                          items:[{
                             xtype: 'textfield'
                            ,name: 'fixture_id'
                            ,hidden:true
                            ,value: record.data.fixture_id
                          }]
                    });
                    a.show();
                    Ext.cq1('cardfixture').layout.setActiveItem('tercerCard');
                  }
              }]
            },{
                xtype:'actioncolumn'
                ,width:50
                ,items:[{
                    text:'Cerrar'
                    ,tooltip:'Cerrar partido'

                    ,glyph: 'xe787@Linearicons'
                    ,handler:function(grid, rowIndex, colIndex) {

                      Ext.Msg.confirm("ATENCIÓN", "Se cerrará el partido", function(btnText){
                          if(btnText === "yes"){
                            // Ext.Msg.alert("ATENCIÓN", "You have confirmed 'Si'.");
                            grid.mask('Espere por favor..');
                            var record = grid.getStore().getAt(rowIndex);
                            var myObj = {
                               fixture_id: record.data.fixture_id
                            }
                            Ext.Ajax.request({
                               url: '/api/cierropartido'
                              ,jsonData: myObj
                              ,jsonSubmit:true
                              ,callback: function( opt, success, response ) {
                                var json = Ext.decode(response.responseText);
                                if ( response.status === 201 ) {
                                  if ( json.success ) {
                                    Ext.Msg.show({
                                       title:'Correcto'
                                      ,message: json.msg
                                      ,buttons: Ext.Msg.OK
                                      ,icon: Ext.Msg.INFO
                                    });
                                    grid.unmask();

                                  }else{
                                    Ext.Msg.show({
                                       title:'Error'
                                      ,message: json.msg
                                      ,buttons: Ext.Msg.OK
                                      ,icon: Ext.Msg.ERROR
                                    });
                                    grid.unmask();
                                  }
                                }
                              }
                              ,failure : function( opt, success, response ) {
                                Ext.Msg.show({
                                   title:'Error'
                                  ,message: 'Problemas de conexion'
                                  ,buttons: Ext.Msg.OK
                                  ,icon: Ext.Msg.ERROR
                                });

                              }
                            });
                          }
                      }, this);

                    }
                  }]
              }]
            ,store:'PartidosFecha'
       }]

        ,dockedItems:[{
          dock:'top'
         ,xtype:'toolbar'
         ,items:[{
           xtype:'form'
           ,bodyPadding:20
           ,itemId:'formPlani'
           ,url:'/api/partidosfecha'
           ,jsonSubmit:true
           ,defaults:{
             style:'padding:0px 15px',
             labelAlign:'top'
           }
           ,layout:'hbox'
           ,items:[{
             xtype:'combobox'
             ,fieldLabel:'Torneo'
             ,name:'torneo_id'
             ,store:'Torneos'
             ,itemId:'cmbTorneoPl'
             ,displayField:'torneo_descri'
             ,valueField:'torneo_id'
             ,namecmb:'Categorias'
             ,idcmb:'#cmbcatePl'
             ,listeners:{
               change: 'onComboboxChange'
             }
           },{
             xtype:'combobox'
             ,fieldLabel:'Categoria'
             ,store: 'Categorias'
             ,displayField:'categoria_descri'
             ,name:'categoria_id'
             ,valueField:'categoria_id'
             ,namecmb:'Zonas'
             ,itemId:'cmbcatePl'
             ,idcmb:'#cmbZonaPl'
             ,listeners:{
               change: 'onComboboxChange'
             }
           },{
             xtype:'combobox'
             ,fieldLabel:'Zona'
             ,store: 'Zonas'
             ,namecmb:'Fechas'
             ,displayField:'zona_descri'
             ,valueField:'zona_id'
             ,name:'zona_id'
             ,itemId:'cmbZonaPl'
             ,idcmb:'#cmbFechaPl'

             ,listeners:{
               change: 'onComboboxChange'
             }
           },{
             xtype: 'combobox'
             ,fieldLabel: 'Fecha'
             ,displayField:'fecha_descri'
             ,valueField:'fecha_id'
             ,name:'fecha_id'
             ,itemId:'cmbFechaPl'
             ,store: 'Fechas'
           },{
             xtype:'button'
             ,text:'Ver'
             ,handler: 'onPlanillerosClick'
             ,ui:'action'
             ,margin:'25 0 0 0'
             ,padding: 5
             //,hidden:true
           },{
             xtype:'button'
            // ,text:'PDF SANCIONADOS'
             ,glyph:'xf1c1@Fontawesome'
             ,handler: 'onPdfSancionasosClick'
             ,ui:'action'
             ,margin:'25 0 0 20'
             ,padding: 5
             //,hidden:true
           }
           ]
         }]
        }]
        ,listeners:{
          activate:function(){
            console.log('se  activo card 1');
           }
         }
      },{  ///////////////////////////////////////////////CARD-2//////////////////////////////////////////////////////////
          xtype:'container'
          ,itemId:'tercerCard'
          ,height: window.innerHeight
          ,items:[{
            xtype:'tabpanel'
            ,itemId: 'cardPlanillero3'
			,listeners:{
				beforetabchange: function(tabPanel, newCard, oldCard, eOpts) {
				console.log('Entra******************************************');
                    var tp = tabPanel;
				 var val= false;
				 var val2= false;
				 Ext.each(Ext.getStore('Goleadores2').data.items,function(data){
               console.log('dataaa',data);
                 if(data.dirty==true){

					 val2=true;
				   }
				 });
				 Ext.each(Ext.getStore('Amonestados2').data.items,function(data){
				   if(data.dirty==true){
					 val2=true;
				   }
				 });
				 Ext.each(Ext.getStore('Expulsados2').data.items,function(data){
				   if(data.dirty==true){
					 val2=true;
				   }
				 });
				Ext.each(Ext.getStore('Goleadores').data.items,function(data){
               console.log('dataaa',data);
                 if(data.dirty==true){

					 val=true;
				   }
				 });
				 Ext.each(Ext.getStore('Amonestados').data.items,function(data){
				   if(data.dirty==true){
					 val=true;
				   }
				 });
				 Ext.each(Ext.getStore('Expulsados').data.items,function(data){
				   if(data.dirty==true){
					 val=true;
				   }
				 });
					 if(val||val2){
						Ext.Msg.show({
							title: 'GUARDAR LOS CAMBIOS',
							msg: 'Antes de salir, ¿Guardar los cambios?',
							buttons: Ext.Msg.YESNOCANCEL,
							icon: Ext.Msg.QUESTION,
							fn: function(buttonId, text, opt) {
								if (buttonId === 'cancel') {
									return;
								}
								// We're going to change tab here regardless
								// of save/nosave
								if (buttonId === 'yes') {
									// do save
									if(val){
										console.log('P1');
										Ext.cq1('#saveP1').fireEvent('click',Ext.cq1('#saveP1'));
									}else{
										console.log('P2');
										Ext.cq1('#saveP2').fireEvent('click',Ext.cq1('#saveP2'));
									}
								}

								tp.suspendEvents(false); // turn off events
								tp.setActiveTab(newCard);
								tp.resumeEvents();

							}
						});

						return false;
					}
				}
			}
          }]
          //,fullscreen:true
          ,layout:'fit'
          ,scrollable:true
          ,listeners:{
            activate:function(){
              console.log('se  activo card 2');
            }

          }
     }]
 });
