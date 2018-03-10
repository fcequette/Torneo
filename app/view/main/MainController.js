/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Torneo.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onafterRender:function(panel,e){
        Ext.create('Ext.window.Window', {
              header:false,
             height: '100%',
             width:  '100%',
             bodyStyle: 'background:url("http://dario-casa.sytes.net/Torneo/gcl_Wallpapers.jpg") no-repeat;padding:10px;',
              resizable:false,
              itemId:'winLogin',
              glyph:'xe872@Linearicons',
              layout:'border',
              items: {  // Let's put an empty grid in just to illustrate fit layout
                  xtype: 'form'
                  //,width:230
                  //,bodyPadding:200
                  //,style:'background: transparent!important;'
                  ,bodyStyle: 'background:url("http://dario-casa.sytes.net/Torneo/gcl_Wallpapers.jpg") no-repeat;padding:10px;'
                 ,region:'center'
                 ,title: '<p style="font-size:17px">Gringa Champion Leage</p>'
                 ,defaultType: 'textfield'
                 ,items:[{
                      emptyText: 'Contraseña'
                      ,name:'Usuario'
                      ,padding:'200 100  500 200'
                    },{
        							 name: 'password'
        							,inputType: 'password'
        							,emptyText: 'Contraseña'
                      ,padding:'30 100  500 200'
        							,allowBlank: false
                    }]
                    ,buttons:['->',{
                      xtype:'button'
                      ,text:'<p style="font-size:17px">INGRESAR>></p>'
                     // ,margin:'30 100  500 500'
                     // ,padding:'20 10 20 10'
                     //  ,glyph:'xe872@Linearicons'
                      ,ui:'action'
                      ,handler: function(btn,e){
                         Ext.cq1('#winLogin').close();
                      }
                  }]
                }
          }).show();
    }
    ,onRender: function(btn,e){

        localStorage.setItem('cantidad-categoriasxtorneos', 3);
        localStorage.setItem('cantidad-zonasxcategorias', 5);
        localStorage.setItem('cantidad-equiposxzonas', 10);
        localStorage.setItem('cantidad-jugadoresxequipos', 13);

    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
    ,onComboboxChange:function(cmb , newValue , oldValue , e ){
      console.log('ento');
      //Ext.getStore(cmb.namecmb).removeAll();
     if(cmb.idcmb){Ext.cq1(cmb.idcmb).clearValue();}
      Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
      console.log('lalalalal');
      if(cmb.namecmb=='Zonas'){
        if(cmb.posiciones){
          Ext.getStore(cmb.namecmb).filter('mostrar_posicion',true);
        }
      }
    }
});
