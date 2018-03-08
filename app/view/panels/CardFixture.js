
Ext.define('Torneo.view.panels.CardFixture', {
    extend: 'Ext.container.Container'
     ,requires: [
         'Torneo.view.panels.CardFixtureController',
         'Torneo.view.panels.FormPlanilleros1',
         'Torneo.view.panels.FormPlanilleros2'
     ]

     ,xtype:'cardfixture'
     ,controller: 'cardfixture'
     //,fullscreen:true
     ,height:900
     ,layout: 'card'
     ,items:[{
       xtype:'panel'/////////////////////////////////////////////////////////////////////////////////////////////////////////
       ,itemId:'cardPlanillero2'
       ,title: 'PLANILLEROS'
       ,items:[
         {
         xtype:'grid'
        // ,title: 'PLANILLEROS'
        ,emptyText:'No hay partidos en la fecha indicada.'
        ,height:400
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
                      var a = tab.add({
                        xtype:'formplanilleros1',
                        title:e1,
                        height:1100,
                        equipo: e1,
                        equipo_id:record.data.equipo1_id,
                        fecha_id:record.data.fecha_id,
                        fixture_id:record.data.fixture_id,
                        url:'http://dario-casa.sytes.net/api/goleadores',
                        items:[{
                          xtype: 'textfield'
                          ,name: 'fixture_id'
                          ,hidden:true
                          ,value: record.data.fixture_id
                        }]
                      });
                      var  b = tab.add ({
                          xtype:'formplanilleros2',
                          height:1200,
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
                    Ext.cq1('cardfixture').layout.setActiveItem('tercerCard');
                  }
                }]
              }
            ]
            ,store:'PartidosFecha'
       }]

                ,dockedItems:[{
                  dock:'top'
                 ,xtype:'toolbar'
                 ,items:[{
                   xtype:'form'
                  // ,layout:'fit'
                   ,bodyPadding:20
                   ,itemId:'formPlani'
                   // ,itemId:'cardPlanillero1'
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
                     ,text:'PDF SANCIONADOS'
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
            console.log('se  activo');
            Ext.cq1('#tlbPlani').hide();
           }
         }
      },{  /////////////////////////////////////////////////////////////////////////////////////////////////////////
          xtype:'container'
          ,itemId:'tercerCard'
          ,items:[{
              xtype:'tabpanel'
            ,itemId: 'cardPlanillero3'
          }]
          ,height:900
          ,scrollable:true
          ,listeners:{
            activate:function(){
              console.log('se  activo');
              Ext.cq1('#tlbPlani').show();
              Ext.cq1('#btnAnterior').show();
            }
          }
     }]
 });
