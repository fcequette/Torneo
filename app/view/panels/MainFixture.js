
Ext.define('Torneo.view.panels.MainFixture', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.grid.Panel'
    ,xtype: 'mainfixture'
    ,controller:'mainfixture'
    ,requires: [
        'Torneo.view.main.MainFixtureController',
    ]
    ,title: 'FIXTURE'
    ,features: [{ftype:'grouping'}]
    ,columns:[
       { text: 'Equipo 1  ', dataIndex: 'equipo1', flex:2,align:'center'},
       { text: '   ', dataIndex: 'fixture_goles_eq1',flex: 1,align:'center'},
       //{ text: 'VS',  value: 'VS',dataIndex: 'vs', width: '50px' ,align:'center'},
       { text: 'Equipo 2  ', dataIndex: 'equipo2', flex: 2 ,align:'center'},
       { text: '   ', dataIndex: 'fixture_goles_eq2', flex: 1,align:'center'},
       { text: 'Turno'
          ,align:'center'
          ,dataIndex: 'turno_id'
          ,flex:2
          ,hidden:true
       },
       { text: 'Cancha'
          ,align:'center'
          ,dataIndex: 'cancha_id'
          ,flex:2
          ,hidden:true
       },{
          text: 'Cancha'
          ,align:'center'
          ,dataIndex: 'cancha_descri'
          ,flex:2
      },{
         text: 'Turno'
         ,flex: 2
         ,align:'center'
         ,dataIndex:'turno_descri'
       },
       {
         xtype:'actioncolumn'
         ,width:50
         ,items:[{
           text:'Editar'
           ,glyph: 'xe613@Linearicons'
            //,iconCls: 'x-fa fa-cog'
           ,handler:function(grid, rowIndex, colIndex) {
               var record = grid.getStore().getAt(rowIndex);
               Ext.create('Ext.window.Window', {
                 // title: 'EDITAR '+record.data.equipo1+' VS '+record.data.equipo2 ,
                  height: 200,
                  width: 350,
                  layout: 'fit',
                  modal:true,
                  items: {  // Let's put an empty grid in just to illustrate fit layout
                     xtype:'form'
                     ,url:'http://dario-casa.sytes.net/api/cargarturnos'
                     ,bodyPadding:15
                     ,itemId:'formTurnos'
                     ,items:[{
                       xtype:'textfield'
                       ,name:'fixture_id'
                       ,value: record.data.fixture_id
                       ,hidden:true
                     },{
                       xtype:'combobox'
                       ,fieldLabel:'Turno'
                       ,store: 'Turnos'
                       ,displayField:'turno_descri'
                       ,valueField:'turno_id'
                       ,name:'turno_id'
                       ,itemId:'cmbTurno'
                       //,defaultValue: record.data.turno_id
                       //,value: turno
                     },{
                       xtype:'combobox'
                       ,fieldLabel:'Cancha'
                       ,store: 'Canchas'
                       ,displayField:'cancha_descri'
                       ,valueField:'cancha_id'
                       ,name:'cancha_id'
                       ,itemId:'cmbCancha'
                       ,defaultValue: record.data.cancha_id
                       //,value: fecha
                     }]
                   }
                   ,buttons:[{
                     text:'Cancelar',
                     ui:'decline'
                     ,handler:function(btn,e){
                       btn.up().up('window').close();
                     },
                   },'->',{
                     text:'Guardar',
                     ui:'action',
                     handler:function(btn,e){
                       Ext.cq1('#formTurnos').submit({
                         jsonSubmit:true
                         ,success:function(r,a){
                           console.log('lo  hizo');
                           Ext.Msg.show({
                              title:'Guardado'
                             ,message: 'Se ha cargado el turno  y cancha correctamente '
                             ,buttons: Ext.Msg.OK
                             ,icon: Ext.Msg.INFO
                           });
                           btn.up().up('window').close();
                           Ext.getStore('Fixture').reload(); //TODO los parmetros
                         }
                         ,failure:function(r,a){
                           console.log('no  lo  hizo');
                           Ext.Msg.show({
                              title:'Error'
                             ,message: 'No se ha cargado el turno y  la  cancha correctamente '
                             ,buttons: Ext.Msg.OK
                             ,icon: Ext.Msg.ERROR
                           });

                         }
                       });
                     }
                   }]
                   ,listeners:{
                     beforerender:function(win,e){
                       console.log(Ext.getStore('Fixture'));
                       //console.log(Ext.getStore('Fixture').findRecord('fixture_id',fixture_id));
                       win.setTitle(record.data.equipo1+' VERSUS '+record.data.equipo2 );
                     }
                     ,afterrender:function(win,e){

                       console.log('lelelellele',Ext.cq1('#cmbTurno'),record);
                       Ext.cq1('#cmbTurno').setValue(record.data.turno);
                       Ext.cq1('#cmbCancha').setValue(record.data.cancha);
                     }
                   }
                 }).show();
            }
          }]
        }]
       ,store:'Fixture'
//     controller: 'mainfixture'
   ,scrollable:true
   ,height:620

    ,dockedItems:[{
      dock:'top'
      ,xtype:'toolbar'
      ,items:[{
        xtype:'form'
        ,url:'http://dario-casa.sytes.net/api/fixture'
        ,itemId:'formFixture'
        ,jsonSubmit: true
        ,layout:'hbox'
        ,defaults:{
          labelAlign: 'top'
          ,margin:'0 25 0 25'
        }
        ,items:[{
              xtype:'combobox'
            ,fieldLabel:'Torneo'
            ,name:'torneo_id'
            ,store:'Torneos'
            ,displayField:'torneo_descri'
            ,valueField:'torneo_id'
            ,namecmb:'Categorias'
            ,idcmb:'#cmbCate'
            ,listeners:{
              change: 'onComboboxChange'
            }
        },{
          xtype:'combobox'
          ,fieldLabel:'Categoria'
          ,store: 'Categorias'
          ,displayField:'categoria_descri'
          ,name:'categoria_id'
          ,namecmb:'Zonas'
          ,idcmb:'#cmbZona'
          ,itemId:'cmbCate'
          ,valueField:'categoria_id'
          ,namecmb:'Zonas'
          ,listeners:{
            change: 'onComboboxChange'
          }
        },{
          xtype:'combobox'
          ,fieldLabel:'Zona'
          ,store: 'Zonas'
          ,displayField:'zona_descri'
          ,valueField:'zona_id'
          ,name:'zona_id'
          ,itemId:'cmbZona'
          ,namecmb:'Fechas'
          ,idcmb:'#cmbFechaPdf'
          ,listeners:{
            change: 'onComboboxChange'
          }
        },{
          xtype:'button'
          ,text:'Ver'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler: 'onFixtureClick'
        },{
          xtype:'button'
          ,itemId:'btnPdfHorario'
          ,glyph:'xf1c1@Fontawesome'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler: 'onPdfClick'
        }]
     }]

   },{
          xtype:'toolbar'
         ,dock:'bottom'
         ,items:['->',{
           xtype:'button'
           ,ui: 'action'
           ,text:'CERRAR FASE'
           ,handler:function(btn,e){
             var val=Ext.cq1('#formFixture').getValues();
             console.log('estos son val',val);
             console.log('este es el otro val',Ext.getStore('Fixture').getData().items[0].data.fixture_fase_id);
             val.fase_id=Ext.getStore('Fixture').getData().items[0].data.fixture_fase_id;

             console.log(val);
             Ext.Ajax.request({
                url: 'http://dario-casa.sytes.net/api/cierrafase'
               ,jsonData: val
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

                   }else{

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
                   ,message: 'Problemas de conexion'
                   ,buttons: Ext.Msg.OK
                   ,icon: Ext.Msg.ERROR
                 });

               }
             });
           }
         }]
    }]
});
