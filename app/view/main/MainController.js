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
             height: '100%',
             width:  '100%',
             onEsc: Ext.emptyFn(),
             closable: false,
             bodyStyle: 'border-color:black;background:url("http://todalagringa.com.ar/Torneo/gcl_Wallpapers.jpg") no-repeat;padding:10px;background-color: black;background-size:100%;background-position: center; ',
             resizable:false
             ,xtype: 'form'
             ,itemId:'winLogin'
             ,header:{
               //title: "GCL"
                // style: 'background-color:transparent;border-color:black;padding:10px'
                 title: '<div  style="height:90"><p style="font-size:20px">GCL</p></div>'
             }
              ,layout: 'border'
              ,items:[{
                    xtype:'container'
                   ,flex:1
                   ,region: 'west'
               },{
                 xtype: 'form'
                 ,itemId:'formLog'
                 ,bodyStyle:'background-color:transparent!important;'
                   ,defaultType: 'textfield'
                   ,region: 'center'
                   ,flex:1
                   ,padding:'200 0 0 100'
                   ,items:[{
                        emptyText: 'Usuario'
                        ,itemId:'txtUsu'
                        ,name:'username'
                        ,enableKeyEvents: true
                        ,fieldLabel: '<strong style= "padding:5px;background:black;font-size:20px;color: white">USUARIO</strong>'
                        ,listeners:{
                          keypress: function(key,e){
                            if (e.keyCode==13){
                                Ext.cq1('#btnIngresar').fireEvent('click', Ext.cq1('#btnIngresar'))
                            }
                          }
                        }
                      },{
          							 name: 'password'
          							,inputType: 'password'
                        ,fieldLabel: '<strong style= "padding:18px;background:black;font-weight:bold;font-size:20px;color:white">CLAVE</strong>'
                        //,hidden:true
          							,emptyText: 'Contraseña'
                        //,padding:'20 20  20 20'
                        ,enableKeyEvents: true
          							,allowBlank: false
                        ,listeners:{
                          keypress: function(key,e){
                            if (e.keyCode==13){
                                Ext.cq1('#btnIngresar').fireEvent('click', Ext.cq1('#btnIngresar'))
                            }
                          }
                        }
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

                 },{
                   xtype:'container'
                   ,flex: 1
                   ,region: 'east'

                 },{
                   xtype:'container'
                   ,region: 'south'
                   ,xtype:'toolbar'
                  // ,style:'background-color:transparent;'
                   ,dock:'bottom'
                   ,style: 'background-color:transparent;border-color:transparent'
                   ,height:90
                   ,items:[{
                     html:'<img src="http://todalagringa.com.ar/Torneo/logo.png" border="0" width="60" height="60">'
                     ,style:'background-size:100%'
                   },'->',{
                      xtype:'button'
                     ,text:'<p style="font-size:15px;background-color: #2c8c04<  ">INGRESAR>></p>'
                     ,ui:'action'
                     ,itemId: 'btnIngresar'
                     ,style: 'background-color: #2c8c04'
                     ,listeners:{
                       click:function(btn,e){
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
                          }
                     }
                   }]
                 }]
                 ,listeners:{
                   show: function(win,e){
                     Ext.cq1('#txtUsu').focus(false,100);
                   }
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
    ,onComboboxChange:function(cmb , newValue , oldValue , e ) {
      if(cmb.namecmb == 'Equipozona'){
          Ext.getStore(cmb.namecmb).proxy.url = '/api/equipozona/'+cmb.getValue();
          Ext.getStore(cmb.namecmb).load();
      }else{
          if(cmb.namecmb=='Jugadores-Equipo'){
             Ext.getStore(cmb.namecmb).load({params:{equipo_id:cmb.getValue()}});
          }else{
              Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
              if(cmb.namecmb=='Zonas'){
                if(cmb.posiciones){
                  Ext.getStore(cmb.namecmb).filter('mostrar_posicion',true);
                }
              }
          }
       }
       Ext.defer(function(){
           switch (cmb.itemId) {
             case 'cmbTorneoP':
               Ext.cq1('#cmbCateP').select(Ext.cq1('#cmbCateP').getStore().getAt(0))
               break;
             case 'cmbCateP':
             Ext.cq1('#cmbzonaP').select(Ext.cq1('#cmbzonaP').getStore().getAt(0));
             break;
             case 'cmbTorneoS':
             Ext.cq1('#cmbcateS').select(Ext.cq1('#cmbcateS').getStore().getAt(0))
             break;
             case 'cmbTorneoS1':
             Ext.cq1('#cmbcateCa').select(Ext.cq1('#cmbcateCa').getStore().getAt(0))
             break;
             case 'cmbTorneoS2':
             Ext.cq1('#cmbcateV').select(Ext.cq1('#cmbcateV').getStore().getAt(0))
             break;
             case 'cmbTorneoR2':
             Ext.cq1('#cmbcateG').select(Ext.cq1('#cmbcateG').getStore().getAt(0))
             break;
             case 'cmbTorneoR1':
             Ext.cq1('#cmbcateVa').select(Ext.cq1('#cmbcateVa').getStore().getAt(0))
             break;
             default:
             break;
           }
       }, 1000);
    }
});
