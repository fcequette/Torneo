Ext.define('Torneo.view.main.MainFixtureController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainfixture',


    onComboboxChange:function(cmb , newValue , oldValue , e ){
      console.log('lalala',Ext.cq1(cmb.idcmb));
      if(Ext.cq1(cmb.idcmb)){Ext.cq1(cmb.idcmb).clearValue();}
      //Ext.getStore(cmb.namecmb).removeAll();
      console.log(cmb.namecmb);
      Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
    }
    ,onPdfClick: function(btn,e){
      console.log('hola');
      Ext.create('Ext.window.Window', {
        title: 'Generar reporte',
        modal:true,
        height: 250,
        width: 520,
        items:[{
          xtype:'form'
          ,bodyPadding:30
          ,items:[{
              xtype:'label'
            ,text:'Fixture Completo'
          },{
             xtype:'button'
            ,margin:'0 0 0 30'
            ,text:'Generar'
            ,ui:'action'
            //,glyph:'xf1c1@Fontawesome'
            ,handler:function(btn,e){
              var myObj = Ext.cq1('#formFixture').getValues();
              var myObj2 = {
                categoria_id: myObj.categoria_id,
                torneo_id:myObj.torneo_id,
                zona_id:myObj.zona_id,
                reporte:'horarios',
              }
              Ext.Ajax.request({
                 url: 'http://dario-casa.sytes.net/api/reporte'
                ,jsonData: myObj2
                ,callback: function( opt, success, response ) {
                  var json = Ext.decode(response.responseText);
                  if ( response.status === 201 ) {
                    if ( json.success ) {
                      OpenInNewTabWinBrowser(json.url)
                        function OpenInNewTabWinBrowser(url) {
                          var win = window.open(url, '_blank');
                          win.focus();
                        }
                        btn.up('window').close();
                    }
                  }
                }
                ,failure : function( opt, success, response ) {
                  Ext.Msg.show({
                    title:'Error'
                    ,message: 'No se ha generado el reporte, por favor intente nuevamente '
                    ,buttons: Ext.Msg.OK
                    ,icon: Ext.Msg.ERROR
                  });
                }
              });
            }
          }]
        },{
          xtype:'form'
          ,height:300
          ,bodyPadding:30
          ,layout:'hbox'
          ,items:[{
              xtype:'combobox'
              ,fieldLabel: 'Fecha'
              ,displayField:'fecha_descri'
              ,valueField:'fecha_id'
              ,name:'fecha_id'
              ,itemId:'cmbFechaPdf'
              ,store: 'Fechas'
          },{
            xtype:'textfield'
            ,value:'Horarios'
            ,name:'Reporte'
            ,hidden:true
          },{
            xtype:'button'
            ,margin:'2 0 0 10'
            ,text:'Generar'
            //,glyph:'xf1c1@Fontawesome'
            ,ui:'action'
            ,handler:function(btn,e){
              var myObj = Ext.cq1('#formFixture').getValues();
              var myObj2 = {
                categoria_id: myObj.categoria_id,
                torneo_id:myObj.torneo_id,
                zona_id:myObj.zona_id,
                reporte:'horarios',
                fecha_id:Ext.cq1('#cmbFechaPdf').getValue()
              }
              Ext.Ajax.request({
                 url: 'http://dario-casa.sytes.net/api/reporte'
                ,jsonData: myObj2
                ,callback: function( opt, success, response ) {
                  var json = Ext.decode(response.responseText);
                  if ( response.status === 201 ) {
                    if ( json.success ) {
                      OpenInNewTabWinBrowser(json.url)
                        function OpenInNewTabWinBrowser(url) {
                          var win = window.open(url, '_blank');
                          win.focus();
                        }
                        btn.up('window').close();
                    }
                  }
                }
                ,failure : function( opt, success, response ) {
                  Ext.Msg.show({
                    title:'Error'
                    ,message: 'No se ha generado el reporte, por favor intente nuevamente '
                    ,buttons: Ext.Msg.OK
                    ,icon: Ext.Msg.ERROR
                  });
                }
              });
            }
          }]
        }]
       // ,dockedItems:[{
       //      xtype:'toolbar',
       //      dock:'botton',
       //      items:['->',{
       //        text:'Generar'
       //      }]
       //  }]
    }).show();
  }
    ,onGuardarTurnosClick:function(btn,e){
      console.log('entro gi');
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
    }
    ,onFixtureClick:function(btn,e){
      var val = Ext.cq1('#formFixture').getForm().getValues();
      console.log('ver',val);

		Ext.getStore('Fixture').load({params: val});

 /*       Ext.cq1('#formFixture').getForm().submit({
           url: 'http://dario-casa.sytes.net/api/fixture?torneo_id='+val.torneo_id+'&categoria_id='+val.categoria_id+'&zona_id='+val.zona_id
          ,method: 'GET'
          ,success: function( form, action ) {
            if(action.result.success == true){
              if(!action.result.mensaje){
               // var panel= Ext.cq1('#dvFixture');
                //panel.update(action.result);
              }else{
                alert(action.result.mensaje);
              }

            }else{
              Ext.Msg.show({
                 title: 'AtenciÃ³n'
                ,message: action.result.mensaje
                ,buttons: Ext.Msg.OK
                ,icon: Ext.Msg.WARNING
              });
            }
          }
          ,failure: function( form, action ) {

            Ext.Msg.show({
               title: 'AtenciÃ³n'
              ,message: 'La operaciÃ³n no fue realizada'
              ,buttons: Ext.Msg.OK
              ,icon: Ext.Msg.WARNING
            });
          }
        });*/
      }
    // });

  //       var panel= Ext.cq1('#dvFixture'),
  //         data={
  //       success:true,
  //       fixture:
  //         [{
  //
  //
  //       fecha:'1'
  //       ,enfrentados:[
  //           { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-drawing.png', equipo1:'Lagartos',equipo2:'Perros',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png' },
  //           { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-data.png', equipo1:'Fenix' ,equipo2:'Talento',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png'},
  //           { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-html5.png', equipo1:'Submarino' ,equipo2:'Dama juana',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png'},
  //           { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-perf.png', equipo1:'Kilometro',equipo2:'Isotopos',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png' }
  //       ]
  //     },{
  //
  //     fecha:'2'
  //
  //     ,enfrentados:[
  //         { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-drawing.png', equipo1:'Tintardi',equipo2:'Aspirinetas',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png' },
  //         { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-data.png', equipo1:'Bahia' ,equipo2:'Blanqitos',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png'},
  //         { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-html5.png', equipo1:' km 45' ,equipo2:'el equipo',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png'},
  //         { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-perf.png', equipo1:'miramar',equipo2:'Dragones',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png' }
  //     ]
  //   },{
  //
  //   fecha:'3'
  //
  //   ,enfrentados:[
  //       { turno:'',cancha:'', imagen1:'http://www.sencha.com/img/20110215-feat-drawing.png', equipo1:'Tintardi',equipo2:'Aspirinetas',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png' },
  //       { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-data.png', equipo1:'Bahia' ,equipo2:'Blanqitos',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png'},
  //       { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-html5.png', equipo1:' km 45' ,equipo2:'el equipo',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png'},
  //       { turno:'',cancha:'',imagen1:'http://www.sencha.com/img/20110215-feat-perf.png', equipo1:'miramar',equipo2:'Dragones',imagen2:'http://www.sencha.com/img/20110215-feat-drawing.png' }
  //   ]
  // }]};
  //      panel.update(data);
  //    // }
    //}
  });
