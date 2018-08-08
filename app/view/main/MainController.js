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
             bodyStyle: 'background:url("http://todalagringa.com.ar/Torneo/gcl_Wallpapers.jpg") no-repeat;padding:10px;background-size:100%;background-position: center; ',
              resizable:false,
              itemId:'winLogin',
              glyph:'xe872@Linearicons',
              layout:'border',
              items: {  // Let's put an empty grid in just to illustrate fit layout
                  xtype: 'form'
                  ,itemId:'formLog'
                  ,width:230
                  //,bodyPadding:200
                  //,style:'background: transparent!important;'
                  ,bodyStyle: 'background-color: transparent;padding:10px;background-size:1300px;'
                 ,region:'center'
                 ,title: '<p style="font-size:15px">GCL</p>'
                 ,defaultType: 'textfield'
                 ,items:[{
                      emptyText: 'Usuario'
                      ,name:'username'
                      ,padding:'200 100  500 300'
                    },{
        							 name: 'password'
        							,inputType: 'password'
        							,emptyText: 'Contraseña'
                      ,padding:'30 100  500 500'
        							,allowBlank: false
                    },{
        							 xtype: 'hiddenfield'
        							,name: 'grant_type'
        							,value: 'password'
        						},{
        							 xtype: 'hiddenfield'
        							,name: 'client_id'
        							,value: 'testclient'
        						},{
        							 xtype: 'hiddenfield'
        							,name: 'client_secret'
        							,value: 'frutill4s'
        						}
                  ]
                  ,dockedItems:[
                  //   {
                  //   xtype:'toolbar'
                  //   //,style:'background-color:transparent;'
                  //   ,dock:'top'
                  //   ,items:[{
                  //     xtype:'button'
                  //     ,text:'<p style="font-size:15px">Gringa Champion Leage</p>'
                  //     ,ui:'action'
                  //   },'->',{
                  //     html:'<img src="http://todalagringa.com.ar/Torneo/logo.png" border="0" width="50" height="50">'
                  //   }]
                  // },
                  {
                    xtype:'toolbar'
                    ,style:'background-color:transparent;'
                    ,dock:'bottom'

                    ,items:[{
                      html:'<img src="http://todalagringa.com.ar/Torneo/logo.png" border="0" width="30" height="30">'
                      ,style:'background-size:100%'
                    },'->',{
                      xtype:'button'
                      ,text:'<p style="font-size:15px">INGRESAR>></p>'
                      ,ui:'action'

                      ,handler: function(btn,e){
                        var form = Ext.ComponentQuery.query('#formLog')[0];
                        jsonData = form.getValues();
                        jsonData.username = jsonData.username.toLowerCase();
                        var myJson = jsonData;
                         Ext.Ajax.request({
                            url: '/api/oauth'
                           ,method: 'POST'
                           ,headers: {
                             'Content-Type' : 'application/json'
                           }
                           ,jsonData: myJson
                           ,callback: function( opt, success, response ) {
                             var json = Ext.decode(response.responseText);
                             if ( json.status == 401 ) {
                               Ext.Msg.alert('ERROR', 'Combinación de usuario y clave inválido', function() {
                                 //me.view.down('#loginCard textfield[inputType="password"]').focus(true, 100);
                               });
                               return false;
                             }
                             if ( response.status == 200 ) {
                               //guardo acces token y refresh token
                               localStorage.setItem('EPW-AccessToken', json.access_token);
                               localStorage.setItem('EPW-RefreshTOKEN', json.refresh_token);
                               localStorage.setItem('EPW-ExpireOAUTH', json.expires_in);
                               var today= new Date();//fecha actual
                               var expiration = json.expires_in-600; // tomo el token y le resto lo que deseo restar de tiempo
                               var dateExpiration = Ext.Date.add( today, Ext.Date.SECOND, expiration);//fecha actual mas expiracion
                               localStorage.setItem('EPW-DateExpiration',dateExpiration); // guardo en localStorage
                               // busco los datos del usuario
                               //Cierro la ventana de login
                               Ext.cq1('#winLogin').close();

                             } else {
                               Ext.Msg.alert('ERROR', 'Usuario o Contraseña incorrectos', function() {
                                 //me.view.down('#loginCard textfield[inputType="password"]').focus(true, 100);
                               });
                              // me.view.down('#loginCard').setActiveItem(0);
                             }
                           }
                           ,failure: function( form, action ) {
                             Ext.Msg.alert('ERROR', 'Problemas de conexión', function() {
                             //  me.view.down('#loginCard textfield[inputType="password"]').focus(false, 100);
                             });
                           }
                         });
                         /////
                      }
                    }]
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
      if(cmb.namecmb == 'Equipozona'){
        Ext.getStore(cmb.namecmb).proxy.url = '/api/equipozona/'+cmb.getValue();
         Ext.getStore(cmb.namecmb).load();
      }else{
        // if(cmb.idcmb){Ext.cq1(cmb.idcmb).clearValue();}
          if(cmb.namecmb=='Jugadores-Equipo'){
             Ext.getStore(cmb.namecmb).load({params:{equipo_id:cmb.getValue()}});
          }else{
            Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
            console.log('lalalalal');
            if(cmb.namecmb=='Zonas'){
              if(cmb.posiciones){
                Ext.getStore(cmb.namecmb).filter('mostrar_posicion',true);
              }
            }
          }

        }
    }
});
