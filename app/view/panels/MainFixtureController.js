Ext.define('Torneo.view.main.MainFixtureController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.mainfixture',


    onComboboxChange:function(cmb , newValue , oldValue , e ){
      Ext.getStore(cmb.namecmb).removeAll();
      Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
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
