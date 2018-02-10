
Ext.define('Torneo.view.panels.CardFixture', {
    extend: 'Ext.container.Container'
     //extend: 'Ext.panel.Panel'
     ,requires: [
         'Torneo.view.panels.CardFixtureController',
         'Torneo.view.panels.FormPlanilleros1',
         'Torneo.view.panels.FormPlanilleros2'
     ]

     ,xtype:'cardfixture'
     ,controller: 'cardfixture'
     ,fullscreen:true
     ,layout: 'card'
     ,items:[{/////////////////////////////////////////////////////////////////////////////////////////////////////////
       dockedItems:[{
         dock:'top'
        ,xtype:'toolbar'
        ,items:[{
          xtype:'form'
         // ,layout:'fit'
          ,bodyPadding:20
          ,itemId:'cardPlanillero1'
          ,url:'http://dario-casa.sytes.net/api/partidosfecha'
          ,jsonSubmit:true
          ,defaults:{
            style:'padding:0px 15px',
            // width:200
            labelAlign:'top'
          }
          ,layout:'hbox'
          ,items:[{
            xtype:'combobox'
            ,fieldLabel:'Torneo'
            ,name:'torneo_id'
            ,store:'Torneos'
            ,displayField:'torneo_descri'
            ,valueField:'torneo_id'
            ,namecmb:'Categorias'
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
            ,listeners:{
              change: 'onComboboxChange'
            }
          },{
            xtype: 'combobox'
            ,fieldLabel: 'Fecha'
            ,displayField:'fecha_descri'
            ,valueField:'fecha_id'
            ,name:'fecha_id'
            ,store: 'Fechas'
          },{
            xtype:'button'
            ,text:'Planilleros'
            ,handler: 'onPlanillerosClick'
            ,ui:'action'
            ,margin:'25 0 0 0'
            ,padding: 5
            //,hidden:true
          }]
          ,listeners:{
            activate:function(){
              console.log('se  activo');
              Ext.cq1('#btnAnterior').hide();
              Ext.cq1('#btnSiguiente').show();
            }
          }
        }]
       }]
           ,xtype:'grid'
           ,itemId:'cardPlanillero2'
           ,title: 'Fecha'
           ,columns: [
              { text: 'Equipo 1  ', dataIndex: 'equipo1', flex:1,align:'center'},
              { text: 'VS',  value: 'VS', dataIndex: 'vs',width: '50px' ,align:'center' },
              { text: 'Equipo 2  ', dataIndex: 'equipo2', flex: 1 ,align:'center'},
              {
                xtype:'actioncolumn'
              ,width:50
              ,items:[{
                text:'ver'
                ,glyph: 'xe6a5@Linearicons'
                ,handler:function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(rowIndex);
                        console.log('holllllla',record.data);
                        var e1 = record.data.equipo1;
                        var e2 = record.data.equipo2;
                        var tab = Ext.cq1('#cardPlanillero3');
                        tab.removeAll();
                        console.log(tab);
                         var a =tab.add({
                            xtype:'formplanilleros1',
                            height:'100%',
                            title:e1,
                            equipo: e1,
                            equipo_id:record.data.equipo1_id,
                            fecha_id:record.data.fecha_id,
                            fixture_id:record.data.fixture_id,
                            url:'http://dario-casa.sytes.net/api/goleadores',
                            items:[{
                               xtype: 'textfield'
                              ,name: 'fixture_id'
                             // ,value: '1'
                              ,hidden:true
                              ,value: record.data.fixture_id
                            }]

                          });
                         var  b = tab.add ({
                                xtype:'formplanilleros2',
                                title:e2,
                                equipo: e2,
                                equipo_id:record.data.equipo2_id,
                                fecha_id:record.data.fecha_id,
                                fixture_id:record.data.fixture_id,
                                url:'http://dario-casa.sytes.net/api/goleadores',
                                items:[{
                                   xtype: 'textfield'
                                  ,name: 'fixture_id'
                                 // ,value: '1'
                                  ,hidden:true
                                  ,value: record.data.fixture_id
                                }]
                          });
                        a.show();
                         Ext.cq1('cardfixture').layout.setActiveItem('cardPlanillero3');
                }
              },{
                text:'Cerrar'

              }]}
           ]

           // ,emptyText: 'Realice una busqueda'
            ,store:'PartidosFecha'
           // ,compiled: true
           // ,trackOver: true
           //
           // ,itemSelector:'div.flo'

      },{  /////////////////////////////////////////////////////////////////////////////////////////////////////////
         xtype:'tabpanel'
         ,itemId: 'cardPlanillero3'
         // ,scrollable:true
         ,listeners:{
           activate:function(){
             console.log('se  activo');
             Ext.cq1('#tlbPlani').hide();
            }
          }
     }]
 });
