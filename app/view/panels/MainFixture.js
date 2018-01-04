
Ext.define('Torneo.view.panels.MainFixture', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.panel.Panel'
    ,xtype: 'mainfixture'
    ,requires: [
        'Torneo.view.main.MainFixtureController',
    ],

    controller: 'mainfixture'
    ,scrollable:'vertical'
    ,height:500
    ,dockedItems:[{
      dock:'top'
      //,xtype:'toolbar'
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
          ,listeners:{
            // change: function(cmb , newValue , oldValue , e ){
            //   Ext.getStore('Zonas').load({params:{param:cmb.getValue()}});
            // }
          }
        },{
          xtype:'button'
          ,text:'Fixture'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler: 'onFixtureClick'
        }]
        }]
   },{
          xtype:'toolbar'
         ,dock:'bottom'
         ,items:['->',{
           xtype:'button'
           ,ui: 'action'
           ,text:'Guardar Horarios'
           ,handler:function(btn,e){
             var data = Ext.cq1('#dvFixture').getData();
             var Horarios = [];
             data.fixture.forEach(function(element) {
             data.fixture.forEach(function(element) {
                  element.enfrentados.forEach(function(ele){
                    console.log('fixture_id',ele.fixture_id);
                    var x = document.getElementsByName("horario-"+ele.fixture_id);
                    var horario = x[0].value;
                    var fixture_id =ele.fixture_id;
                      Horarios.push({
                            turno: horario,
                          fixture_id: fixture_id
                      });
                  });
                });
              });
console.log('holaaaa',JSON.stringify(Horarios));
              Ext.Ajax.request ({
                  url: 'http://dario-casa.sytes.net/api/fixture',
                 // method: 'POST',
                  jsonData:{
                    datos:JSON.stringify(Horarios),
                  }
                  ,headers:{
                   'Content-Type': 'application/json'
                  }
                  ,callback: function( opt, success, response ) {

                      console.log(response.responseText);
                  },
                  failure: function(response)
                  {
                      console.log(response.responseText);
                  }

              });
           }
         }]
    }]

    ,items:[{
      xtype: 'dataview'
      ,itemId:'dvFixture'
      ,emptyText: 'Realice una busqueda'
      ,width:'800px'
      ,style:'margin-left:300px;margin-right:600px;'
      ,useComponents: true


    ,tpl:[
      '<tpl for="fixture">',
          '<div  style="margin-bottom: 10px;font-size:15px">',
          '<p style="font-weight: bold;background-color: #2c8c04;line-height: 32px;text-align: center;">FECHA{fecha}</p>  ',
          '<hr>',
          '<tpl for="enfrentados">',
            '<div style: "width:1500px">',
              '<div style="margin-bottom: 10px;display:inline-block">',
               //'<div><img style="width:20px;height:20px" src="{imagen1}" />',
              '<div  style= "width:150px" ><span>{equipo1}</span></div>',
            '</div> ',
            '<div style="font-weight:bold;margin-bottom: 10px;display:inline-block;width:50px">VS</div>',
             '<div style="margin-bottom: 10px;display:inline-block">',
              //'<div><img style="width:20px;height:20px"src="{imagen2}" />',
              '<div style= "width:150px"><span>{equipo2}</span></div>',
            '</div>',
            '<div style="display:inline-block;padding-left:50px;"><a style="font-weight:bold">TURNO </a>{turno_descri} EN <a style="font-weight:bold">CANCHA </a>{cancha}<input style=" margin-left:50px;background-color: #2c8c04;cursor:pointer;border-color: #2c8c04;color: black;border: 0;padding: 5px;font-weight: bold;width: 50px;"type="button" value="Editar" onclick="onEditarTurnosClick("{equipo1}","{equipo2}")">',
         '</div>',
         // '<div><input style="background-color: #2c8c04;cursor:pointer;border-color: #2c8c04;color: black;border: 0;padding: 10px;font-weight: bold;width: 137px;"type="button" value="Editar"></div>',

         '<hr>',

         '</tpl>',
         '</div>',
          '<div style="margin-left:150px;"><input style="background-color: #2c8c04;cursor:pointer;border-color: #2c8c04;color: black;border: 0;padding: 10px;font-weight: bold;width: 137px;"type="button" value="Guardar Turnos" onclick="onGuardarTurnosClick({fecha})"></div>',
    '</tpl>'
  ],

    itemSelector: 'div.thumb-wrap',
    emptyText: 'No images available'


    // ,listeners: {
    //   render: function(panel){
    //
    //   }
    // }
  }]



 });
 function  onGuardarTurnosClick(fecha){
  console.log('entro gi');
    var data = Ext.cq1('#dvFixture').getData();
    var Horarios = [];
    //data.fixture.forEach(function(element) {
    data.fixture.forEach(function(element) {
      console.log('este',fecha);
      console.log('yeste',element.fecha);
      if(fecha == element.fecha){
         element.enfrentados.forEach(function(ele){
           console.log('fixture_id',ele.fixture_id);
           var x = document.getElementsByName("horario-"+ele.fixture_id);
           console.log(x,x[0]);
           var horario = x[0].value;
           var fixture_id =ele.fixture_id;
             Horarios.push({
                   turno: horario,
                 fixture_id: fixture_id
             });
         });
       }
       });
     //});
     Ext.Ajax.request ({
         url: 'http://dario-casa.sytes.net/api/fixture',
        // method: 'POST',
         jsonData:{
           datos:JSON.stringify(Horarios),
         }
         ,headers:{
          'Content-Type': 'application/json'
         }
         ,callback: function( opt, success, response ) {

             console.log(response.responseText);
         },
         failure: function(response)
         {
             console.log(response.responseText); function  onGuardarTurnosClick(fecha){
               console.log('entro gi');
                 var data = Ext.cq1('#dvFixture').getData();
                 var Horarios = [];
                 //data.fixture.forEach(function(element) {
                 data.fixture.forEach(function(element) {
                   console.log('este',fecha);
                   console.log('yeste',element.fecha);
                   if(fecha == element.fecha){
                      element.enfrentados.forEach(function(ele){
                        console.log('fixture_id',ele.fixture_id);
                        var x = document.getElementsByName("horario-"+ele.fixture_id);
                        console.log(x,x[0]);
                        var horario = x[0].value;
                        var fixture_id =ele.fixture_id;
                          Horarios.push({
                                turno: horario,
                              fixture_id: fixture_id
                          });
                      });
                    }
                    });
                  //});
                  Ext.Ajax.request ({
                      url: 'http://dario-casa.sytes.net/api/fixture',
                     // method: 'POST',
                      jsonData:{
                        datos:JSON.stringify(Horarios),
                      }
                      ,headers:{
                       'Content-Type': 'application/json'
                      }
                      ,callback: function( opt, success, response ) {

                          console.log(response.responseText);
                      },
                      failure: function(response)
                      {
                          console.log(response.responseText);
                      }

                  });
             }
         }

     });
}
function onEditarTurnosClick(e1,e2){
  Ext.create('Ext.window.Window', {
     title: 'EDITAR',
     height: 250,
     width: 400,
     layout: 'fit',
     items: {  // Let's put an empty grid in just to illustrate fit layout
        xtype:'form'
        ,bodyPadding:15
        ,items:[{
          xtype:'combobox'
          ,fieldLabel:'Turno'
          //,value: turno
        },{
          xtype:'combobox'
          ,fieldLabel:'Cancha'
          //,value: fecha
        }]
      }
    }).show();
}
