/**
* This class is the controller for the main view for the application. It is specified as
* the "controller" of the Main view class.
*
* TODO - Replace this content of this view to suite the needs of your application.
*/
Ext.define('Torneo.view.trees.TreeTorneoController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.TreeTorneo'

  ////////EDITAR
  ,onEditClick:function (btn , e){
    var v = Ext.ComponentQuery.query('#botonEdit')[0].ventana

    Ext.create('Ext.window.Window', {
      title: 'Editar '+ Ext.ComponentQuery.query('#botonEdit')[0].ventana,
      height: 300,
      width: 320,
      layout: 'fit',
      modal:true,
      descri: 'torneo-descri',
      items: {  // Let's put an empty grid in just to illustrate fit layout
      xtype:'form'
      ,bodyPadding: '15px'
      ,itemId: 'formEdit'
      ,url: Ext.ComponentQuery.query('#botonEdit')[0].urlEdit
      ,items:[{
        xtype:'textfield' //TODO
        ,fieldLabel: 'idpadre'
        ,itemId: 'winEditIdPadre'
        ,name:''
        ,hidden:true
      },{
        xtype:'textfield'
        ,fieldLabel: 'Id'
        ,itemId: 'winEditId'
        ,name:''
        ,readOnly: true
        ,hidden: true
      },{
        xtype:'textfield'
        ,fieldLabel: 'Descripción'
        ,itemId: 'winEditDescri'
        ,name:''

      },{
         xtype:'textfield'
        ,name:'update'
        ,value: true
        ,hidden: true
      },{
         xtype: 'numberfield'
        ,itemId:'winEditCantidad'
        ,fieldLabel: 'Cantidad  de equipos por zona'
        ,hidden :Ext.ComponentQuery.query('#botonEdit')[0].ventana != 'Zona' ?  true : false
        ,name: 'zona_cantidad_equipos'
      },{
        xtype: 'radiogroup',
        fieldLabel: 'Estado',
        columns: 1,
        name: 'torneo_estado',
        vertical: true
        ,hidden :Ext.ComponentQuery.query('#botonEdit')[0].ventana != 'Torneo' ?  true : false
        , items: [
          {boxLabel: 'Inactivo', name:'', inputValue: '0'},
          { boxLabel: 'Activo', name:'', inputValue: '1'}
        ]
        ,itemId: 'winEditEstado'

        //,value: Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_estado
      },{
        xtype:'fieldset'
        ,hidden: Ext.ComponentQuery.query('#botonEdit')[0].ventana != 'Categoria' ?  true : false
        ,items:[{
          xtype:'container'
          ,defaults:{
            labelAlign: 'top'
            ,width: 80
          }
          ,layout:'hbox'
          ,items:[{
            xtype:'combobox'
            ,displayField:'value'
            ,fieldValue: 'opt'
            ,itemId: 'winEditJuega'
            ,name:'categoria_juega_coparevancha'
            ,fieldLabel:'Juega copa revancha?'
            ,store:Ext.create('Ext.data.Store', {
              fields: ['value', 'opt'],
              data : [
                {"value":"SI", "opt":1},
                {"value":"NO", "opt":0}
              ]
            })
            ,listeners:{
              change:function(ch){
                if(ch.getValue() == 'SI'){
                  Ext.cq1('#txtCant').show();
                }else{
                  Ext.cq1('#txtCant').hide();
                }
              }
            }
          },{
            xtype:'numberfield'
            ,fieldLabel:'Cantidad'
            ,name:'categoria_cant_a_coparevancha'
            ,itemId:'txtCant'
            ,hidden:true
            ,padding: '18 0 0 20'
          }]
        },{
          xtype:'numberfield'
          ,name:'categoria_cant_a_copacampeonato'
          ,fieldLabel:'Cantidad Torneo'
          ,name:'Cantidad'
          ,itemId:'txtCant'
          ,width: 170
          ,padding: '10 0 0 0'
        }]
      }]// A dummy empty data store
    }
    ,dockedItems:[{
      xtype: 'toolbar'
      ,dock: 'bottom'
      ,items:[{
        xtype: 'button'
        ,text: 'Cancelar'
        ,ui: 'decline'
        ,handler: function (btn,e){
          btn.up().up('window').close()
        }

      },'->',{
        xtype: 'button'
        ,text: 'Guardar Cambios'
        ,ui: 'action'
        ,handler: function (btn,e){
          btn.up().up().mask('Espere por favor...');
          Ext.ComponentQuery.query('#formEdit')[0].submit(
            {
              jsonSubmit: true
              ,method: 'POST'
              ,success: function( form, action ) {
                var values = form.getValues();
                console.log('values',values);
                if(action.result.success == true){
                  Ext.getStore('storeTorneo').reload();
                  ExpandeNode(values);
                  Ext.defer(function(){btn.up().up('window').close()},3000);
                }else{
                  Ext.Msg.show({
                     title: 'ATENCIÓN'
                    ,message: action.result.mensaje
                    ,buttons: Ext.Msg.OK
                    ,icon: Ext.Msg.WARNING
                  });
                }ExpandeNode(values);
                btn.up().up().unmask();
              }
              ,failure: function( form, action ) {

                Ext.Msg.show({
                  title: 'ATENCIÓN'
                  ,message: 'La operación no fue realizada'
                  ,buttons: Ext.Msg.OK
                  ,icon: Ext.Msg.WARNING
                });
                btn.up().up().unmask();
              }
            }
          );

        }
      }]
    }]
    ,listeners:{
      afterRender: function (win,e) {
        switch (v) {
          case 'Torneo':
          win.down('#winEditId').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_id);
          win.down('#winEditId').name = 'torneo_id';
          win.down('#winEditDescri').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_descri);
          win.down('#winEditDescri').name = 'torneo_descri';
          Ext.cq1('#winEditEstado').items.items[Ext.ComponentQuery.query('#botonEdit')[0].record.data.torneo_estado].setValue(true);
          break;

          case 'Categoria':
          console.log('qqqqqqqqqqqq',Ext.ComponentQuery.query('#botonEdit')[0].record.data)
          win.down('#winEditIdPadre').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_torneo_id);
          win.down('#winEditIdPadre').name = 'categoria_torneo_id';
          win.down('#winEditId').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_id);
          win.down('#winEditId').name ='categoria_id';
          win.down('#winEditDescri').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_descri);
          win.down('#winEditDescri').name ='categoria_descri';
          win.down('#winEditEstado').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_estado);
          win.down('#winEditEstado').name = 'categoria_estado';
          //win.down('#winEditJuega').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.categoria_estado);
         // win.down('#winEditJuega').name = 'categoria_estado';

          break;

          case 'Zona':
          win.down('#winEditIdPadre').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_categoria_id);
          win.down('#winEditIdPadre').name = 'zona_categoria_id';
          if(win.down('#winAltaIdPadre')){win.down('#winAltaIdPadre').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_categoria_id)};
          if(win.down('#winAltaIdPadre')){win.down('#winAltaIdPadre').name = 'zona_categoria_id';}
          if(win.down('#winEditId')){ win.down('#winEditId').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_id);}
          if(win.down('#winEditId')){ win.down('#winEditId').name ='zona_id';}
          if(win.down('#winEditDescri')){  win.down('#winEditDescri').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_descri);}
          if(win.down('#winEditDescri')){ win.down('#winEditDescri').name ='zona_descri';}
          if(win.down('#winEditEstado')){ win.down('#winEditEstado').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_estado);}
          if(win.down('#winEditEstado')){ win.down('#winEditEstado').name ='zona_estado';}
          if(win.down('#winEditCantidad')){win.down('#winEditCantidad').setValue(Ext.ComponentQuery.query('#botonEdit')[0].record.data.zona_cantidad_equipos);}
          break;
        }
      }
    }
  }).show();
}
/////////ELIMINAR//////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
,onDeleteClick:function (btn, e) {
  var ventana =Ext.ComponentQuery.query('#botonDelete')[0].ventana;
  Ext.create('Ext.window.Window', {
    title: 'Eliminación de '+ Ext.ComponentQuery.query('#botonDelete')[0].ventana,
    height: 250,
    width: 400,
    modal:true,

    layout: 'fit',
    items: {  // Let's put an empty grid in just to illustrate fit layout
    xtype:'form'
    ,bodyPadding: '15px'
    ,itemId:'formDelete'
    ,url: Ext.ComponentQuery.query('#botonDelete')[0].urlDelete
    ,defaults:{
      margin: '20 0 20 0'
    }
    ,items:[{
      xtype: 'label'
      ,text: 'Esta seguro de eliminarlo?'
    },{
      xtype:'textfield'
      ,fieldLabel: 'Descripción'
      ,itemId:'winDeleteDescri'
      ,readOnly: true
      ,name: ''
    },{
      xtype: 'textfield',
      fieldLabel: 'Id',
      itemId: 'winDeleteId',
      columns: 1,
      readOnly: true,
      vertical: true
      ,name: ''
      ,hidden:true
    }]// A dummy empty data store
  }
  ,dockedItems:[{
    xtype: 'toolbar'
    ,dock: 'bottom'
    ,items:[{
      xtype: 'button'
      ,text: 'Cancelar'
      ,ui: 'decline'
      ,handler: function(btn,e){
          btn.up().up('window').close();
      }
    },'->',{
      xtype: 'button'
      ,text: 'Eliminar'
      ,ui: 'action'
      ,handler: function (btn,e){
        var urlDel;
        if(Ext.ComponentQuery.query('#botonDelete')[0].ventana == 'Equipo'){
          urlDel=Ext.ComponentQuery.query('#botonDelete')[0].urlDelete;
        }else{
          urlDel=Ext.ComponentQuery.query('#botonDelete')[0].urlDelete +'/'+Ext.cq1('#winDeleteId').getValue();
        }
        btn.up().up().mask('Espere por favor...');
        Ext.ComponentQuery.query('#formDelete')[0].submit(
          {
            jsonSubmit: true
            ,method: 'DELETE'
            ,url: urlDel
            ,success: function( form, action ) {
              if(action.result.success == true){
                Ext.getStore('storeTorneo').load();
                btn.up().up('window').close();
                Ext.Msg.show({
                   title: 'Eliminado'
                  ,message: 'La eliminación se realizó correctamente'
                  ,buttons: Ext.Msg.OK
                  ,icon: Ext.Msg.INFO
                });
                console.log('ver que record pasar',Ext.ComponentQuery.query('#botonDelete')[0]);
                ExpandeNode(Ext.ComponentQuery.query('#botonDelete')[0].record);
                Ext.defer(function(){btn.up().up('window').close()},3000);

              }else{
                Ext.Msg.show({
                   title: 'ATENCIÓN'
                  ,message: action.result.mensaje
                  ,buttons: Ext.Msg.OK
                  ,icon: Ext.Msg.WARNING
                });
                btn.up().up().unmask();
              }
            }
            ,failure: function( form, action ) {

              Ext.Msg.show({
                title: 'ATENCIÓN'
                ,message: 'La operación no fue realizada'
                ,buttons: Ext.Msg.OK
                ,icon: Ext.Msg.WARNING
              });
              btn.up().up().unmask();
            }
          }
        );
      }
    }]
  }]

  ,listeners:{
    afterRender: function (win,e){
      console.log('ventana',ventana);
      switch (ventana) {
        case 'Torneo':
        win.down('#winDeleteDescri').name = 'torneo_descri';
        win.down('#winDeleteId').name = 'torneo_id';
        win.down('#winDeleteDescri').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.torneo_descri);
        win.down('#winDeleteId').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.torneo_id);
        break;

        case 'Categoria':
        win.down('#winDeleteDescri').name ='categoria_descri';
        win.down('#winDeleteId').name = 'categoria_id';
        win.down('#winDeleteDescri').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.categoria_descri);
        win.down('#winDeleteId').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.categoria_id);
        break;

        case 'Zona':
        win.down('#winDeleteDescri').name ='zona_descri';
        win.down('#winDeleteId').name ='zona_id';
        win.down('#winDeleteDescri').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.zona_descri);
        win.down('#winDeleteId').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.zona_id);
        break;

        case 'Equipo':
        win.down('#winDeleteDescri').name ='equipo_nombre';
        win.down('#winDeleteId').name ='equipo_id';
        win.down('#winDeleteDescri').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.equipo_nombre);
        win.down('#winDeleteId').setValue(Ext.ComponentQuery.query('#botonDelete')[0].record.data.equipo_id);
        break;

      }
    }
  }
}).show();


}
/// ALTAAAAAAAAAAAAAAA//////////////////
///////////////////////////////////////
////////////////////////////////////////
,onAddClick:function (btn, e) {
  console.log('llamar a ventana',Ext.ComponentQuery.query('#botonAdd')[0].ventana);
  console.log('con este record',Ext.ComponentQuery.query('#botonAdd')[0].record);
  var ventana =Ext.ComponentQuery.query('#botonAdd')[0].ventana;
  if (ventana == 'fixture'){
    var myObj = {
      torneo_id: Ext.ComponentQuery.query('#botonAdd')[0].record.data.torneo_id
      ,categoria_id:Ext.ComponentQuery.query('#botonAdd')[0].record.data.zona_categoria_id
      ,zona_id:Ext.ComponentQuery.query('#botonAdd')[0].record.data.zona_id
    };
    Ext.Ajax.request({
       url: 'http://dario-casa.sytes.net/api/fixture'
      ,jsonData: myObj
      ,callback: function( opt, success, response ) {
        var json = Ext.decode(response.responseText);
        if ( response.status === 201 ) {
          if ( json.success ) {
            Ext.Msg.show({
              title:'FIXTURE'
              ,message: 'Se ha generado el fixture correctamente '
              ,buttons: Ext.Msg.OK
              ,icon: Ext.Msg.INFO
            });
          }
        }
      }
      ,failure : function( opt, success, response ) {
        Ext.Msg.show({
          title:'Error'
          ,message: 'No se ha generado el fixture, por favor intente nuevamente '
          ,buttons: Ext.Msg.OK
          ,icon: Ext.Msg.ERROR
        });
      }
    });
  }else{/////////////////////////////////////////////////////////ALTA//////////////////////////////////////////////////////////////////////
    Ext.create('Ext.window.Window', {
      title: 'Alta de '+ Ext.ComponentQuery.query('#botonAdd')[0].ventana,
      height: 250,
      width: 320,
      modal:true,
      resizable:false,
      layout: 'fit',
      items: {
      xtype:'form'
      ,bodyPadding: '15px'
      ,itemId:'formAlta'
      ,url: Ext.ComponentQuery.query('#botonAdd')[0].urlAlta
      ,items:[
        {
          xtype:'textfield' //TODO
          ,fieldLabel: 'idpadre'
          ,itemId: 'winAltaIdPadre'
          ,name:''
          ,hidden:true
        },
        {
          xtype:'textfield'
          ,fieldLabel: 'Descripción'
          ,itemId:'winAltaDescri'
          ,name: 'torneo_descri'
          ,allowBlank: false
        },
        {
          xtype: 'numberfield'
          ,name: 'update'
          ,value: ''
          ,hidden:true
        },
        {
          fieldLabel:'Equipos en la zona'
          ,xtype: 'numberfield'
          ,hidden: Ext.ComponentQuery.query('#botonAdd')[0].ventana !='Zona'?true:false
          ,name: 'zona_cantidad_equipos'
        },{
          xtype: 'radiogroup',
          fieldLabel: 'Estado',
          itemId: 'winAltaEstado',
          columns: 1,
          vertical: true
          ,name: 'torneo_estado'
          ,hidden :Ext.ComponentQuery.query('#botonAdd')[0].ventana != 'Torneo' ?  true : false
          ,items: [
            { boxLabel: 'Activo', name: 'torneo_estado', inputValue: true, checked: true },
            { boxLabel: 'Inactivo', name: 'torneo_estado', inputValue: false}
          ]
        },{
          xtype:'fieldset'
          ,hidden: Ext.ComponentQuery.query('#botonAdd')[0].ventana != 'Categoria' ?  true : false
          ,items:[{
            xtype:'container'
            ,defaults:{
              labelAlign: 'top'
              ,width: 80
            }
            ,layout:'hbox'
            ,items:[{
              xtype:'combobox'
              ,displayField:'value'

              ,fieldValue: 'opt'
              ,fieldLabel:'Juega copa revancha?'
              ,name:'categoria_juega_coparevancha'
              //,allowBlank: false
              ,store:Ext.create('Ext.data.Store', {
                fields: ['value', 'opt'],
                data : [
                  {"value":"SI", "opt":1},
                  {"value":"NO", "opt":0}
                ]
              })
              ,listeners:{
                change:function(ch){
                  if(ch.getValue() == 'SI'){
                    Ext.cq1('#txtCant').show();
                  }else{
                    Ext.cq1('#txtCant').hide();
                  }
                }
              }
            },{
              xtype:'numberfield'
              ,fieldLabel:'Cantidad'
              ,name:'Cantidad'
              ,itemId:'txtCant'
              ,hidden:true
              ,name:"categoria_juega_coparevancha"
              ,padding: '18 0 0 20'
            }]
          },{
            xtype:'numberfield'
            ,fieldLabel:'Cantidad Torneo'
            //,allowBlank: false
            ,name:'Cantidad'
            ,itemId:'txtCant'
            ,width: 170
            ,name: "categoria_cant_a_copacampeonato"
            ,padding: '10 0 0 0'
            ,emptyText:false
          }]
        }]
      }
      ,dockedItems:[{
        xtype: 'toolbar'
        ,dock: 'bottom'
        ,items:[{
          xtype: 'button'
          ,text: 'Cancelar'
          ,ui: 'decline'
          ,handler: function(btn,e){
            btn.up().up('window').close();
          }
        },'->',{
          xtype: 'button'
          ,text: 'Guardar'
          ,ui: 'action'
          ,handler: function (btn,e) {
               if(Ext.cq1('#formAlta').isValid()) {
                btn.up().up().mask('Espere por favor...');
                Ext.ComponentQuery.query('#formAlta')[0].submit({
                    jsonSubmit: true
                    ,method: 'POST'
                    ,url: Ext.ComponentQuery.query('#botonAdd')[0].urlAlta
                    ,success: function( form, action ) {
                      var values = form.getValues();
                      console.log(values);
                      if(action.result.success == true) {
                          Ext.getStore('storeTorneo').load();
                          ExpandeNode(values);
                          Ext.defer(function(){btn.up().up('window').close()},3000);
                      }else{
                          Ext.Msg.show({
                            title: 'ATENCIÓN'
                            ,message: action.result.mensaje
                            ,buttons: Ext.Msg.OK
                            ,icon: Ext.Msg.WARNING
                          });
                          btn.up().up().unmask();
                      }
                    }
                    ,failure: function( form, action ) {
                        Ext.Msg.show({
                          title: 'ATENCIÓN'
                          ,message: 'La operación no fue realizada'
                          ,buttons: Ext.Msg.OK
                          ,icon: Ext.Msg.WARNING
                        });
                        btn.up().up().unmask();
                    }
                  }
                );
              }
          }
        }]
      }]
      ,listeners:{
        afterRender: function (win,e){
          switch (ventana) {
            case 'Torneo':
              win.down('#winAltaDescri').name = 'torneo_descri';
            break;
            case 'Categoria':
              win.down('#winAltaDescri').name ='categoria_descri';
              win.down('#winAltaEstado').name = 'categoria_estado';
              win.down('#winAltaIdPadre').setValue(Ext.ComponentQuery.query('#botonAdd')[0].record.data.torneo_id);
              win.down('#winAltaIdPadre').name = 'categoria_torneo_id';
            break;
            case 'Zona':
              win.down('#winAltaDescri').name ='zona_descri';
              win.down('#winAltaEstado').name ='zona_estado';
              win.down('#winAltaIdPadre').setValue(Ext.ComponentQuery.query('#botonAdd')[0].record.data.categoria_id);
              win.down('#winAltaIdPadre').name = 'zona_categoria_id';
            break;
            default:
              Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://dario-casa.sytes.net/api/torneo';
            break;
          }
        }
      }
    }).show();
  }
}
/* cuando clickea  algo del arbol */
//////////////////////////////////////////////////////////////////////

,onItemClick:function (est, record, item, index, e, eOpts ){
  console.log('SE EJECUTO',record.parentNode.data.zona_id);
  console.log('SE EJECUTO1',est.store.findRecord(record));

  if(record.data.leaf) {
     Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://dario-casa.sytes.net/api/equipozona/'+record.parentNode.data.zona_id+'-'+record.data.equipo_id;
     Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Equipo';
     Ext.ComponentQuery.query('#botonDelete')[0].record = record;
  }
  if(record.data.root){
    Ext.ComponentQuery.query('#botonAdd')[0].setText('');
    Ext.ComponentQuery.query('#botonAdd')[0].ventana = 'Torneo';
    Ext.ComponentQuery.query('#botonEdit')[0].record = record;
    Ext.ComponentQuery.query('#botonAdd')[0].record = record;
    Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Torneo';
    Ext.ComponentQuery.query('#botonDelete')[0].record = record;
    Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://dario-casa.sytes.net/api/torneo';
    Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://dario-casa.sytes.net/api/torneo';
    Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://dario-casa.sytes.net/api/torneo';

    //cuando clickeo un alta nivel root siempre permitir

    Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (false);
  }
  if(record.data.nivel == 1 ){
    Ext.ComponentQuery.query('#botonEdit')[0].ventana = 'Torneo';
    Ext.ComponentQuery.query('#botonEdit')[0].record = record;
    Ext.ComponentQuery.query('#botonAdd')[0].record = record;
    Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Torneo';
    Ext.ComponentQuery.query('#botonDelete')[0].record = record;
    Ext.ComponentQuery.query('#botonAdd')[0].setText('');
    Ext.ComponentQuery.query('#botonAdd')[0].ventana = 'Categoria';
    Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://dario-casa.sytes.net/api/torneo';
    Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://dario-casa.sytes.net/api/categoria';
    Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://dario-casa.sytes.net/api/torneo';

    //cuando clickeo un alta nivel 1 siempre permitir
    Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (false);

  }
  if(record.data.nivel == 2){
    console.log('categoria',record);
    Ext.ComponentQuery.query('#botonEdit')[0].ventana = 'Categoria';
    Ext.ComponentQuery.query('#botonDelete')[0].record = record;
    Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Categoria';
    Ext.ComponentQuery.query('#botonEdit')[0].record = record;
    Ext.ComponentQuery.query('#botonAdd')[0].setText('');
    Ext.ComponentQuery.query('#botonAdd')[0].ventana = 'Zona';
    Ext.ComponentQuery.query('#botonAdd')[0].record = record;
    Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://dario-casa.sytes.net/api/categoria';
    Ext.ComponentQuery.query('#botonAdd')[0].urlAlta = 'http://dario-casa.sytes.net/api/zona';
    Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://dario-casa.sytes.net/api/categoria';

    //cuando clickeo un alta nivel 2 siempre permitir
    Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (false);

  }
  if(record.data.nivel == 3){
    console.log('esteesrecord',record);
    Ext.ComponentQuery.query('#botonEdit')[0].ventana = 'Zona';
    Ext.ComponentQuery.query('#botonEdit')[0].record = record;
    Ext.ComponentQuery.query('#botonDelete')[0].record = record;
    Ext.ComponentQuery.query('#botonAdd')[0].record = record;
    Ext.ComponentQuery.query('#botonDelete')[0].ventana = 'Zona';
    Ext.ComponentQuery.query('#botonAdd')[0].setText('<a style="color:#FFF">Crear Fixture</a>');
    Ext.ComponentQuery.query('#botonAdd')[0].ventana = 'fixture';
    Ext.ComponentQuery.query('#botonEdit')[0].urlEdit = 'http://dario-casa.sytes.net/api/zona';
     Ext.ComponentQuery.query('#botonDelete')[0].urlDelete = 'http://dario-casa.sytes.net/api/zona';

    /* Validacion para fixture*/
    if(record.childNodes.length != record.data.zona_cantidad_equipos) {
        console.log ('Deshabilitar alta');
        Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (true);
    }else{
         console.log('Permitir alta');
         Ext.ComponentQuery.query('#botonAdd')[0].setDisabled (false);
    }
  }
}
});
/*
expande el nodo editado o agregado
*/
function ExpandeNode(record){
  console.log('expandednode',record);
  if(record.categoria_torneo_id){
    Ext.defer(function(){Ext.getStore('storeTorneo').getRootNode().findChild('torneo_id', record.categoria_torneo_id, true).expand();},2000);
  }
  if(record.zona_categoria_id){
    Ext.defer(function(){Ext.getStore('storeTorneo').getRootNode().findChild('categoria_id', record.zona_categoria_id, true).expand();},2000);
  }

}
