Ext.define('Torneo.view.login.MainController', {
	//  extend : 'Ext.app.ViewController'
  //
	// ,requires : [
	// 	 'Ext.window.MessageBox'
	// ]
  //
	// ,alias : 'controller.main'
  //
	// /**
	//  * Usamos este metodo para hacer autofocus en el campo de usuario
	//  * @param {Ext.panel.Panel} this
	//  */
	// ,onFormRender: function( panel ) {
	// 	if ( isDebugging ) console.info('main.MainController', 'onFormRender', panel);
	// 	var me = this,
	// 		start = new Date().getTime();
  //
	// 	panel.down('textfield').focus(false, 100);
	// 	if ( isDebugging ) console.info('main.MainController', 'onFormRender', 'Execution time: ' + (new Date().getTime() - start) + 'ms');
	// }
  //
	// /**
	//  * Metodo que valida con el back-end los datos del formulario de login y da la bienvenida al usuario, dandole la opcion de elegir el ambiente donde  iniciara el sistema
	//  * @param {Ext.button.Button} this
	//  * @param {Event} e The event object
	//  */
	// ,onLoginClick: function( btn, e ) {
	// 	if ( isDebugging ) console.info('main.MainController', 'onLoginClick', btn, e);
	// 	var me = this,
	// 		start = new Date().getTime();
  //
	// 	var form = Ext.ComponentQuery.query('#formLog')[0];
	// 	jsonData=form.getValues();
	// 	jsonData.username = jsonData.username.toLowerCase();
	// 	var myJson =jsonData;
	// 	me.view.down('#loginCard').setActiveItem(1);
	// 	Ext.Ajax.request({
	// 		 url: '/api/oauth'
	// 		,method: 'POST'
	// 		,headers: {
	// 			'Content-Type' : 'application/json'
	// 		}
	// 		,jsonData: myJson
	// 		,callback: function( opt, success, response ) {
	// 			var json = Ext.decode(response.responseText);
	// 			if ( json.status == 401 ) {
	// 				Ext.Msg.alert('ERROR', 'Combinación de usuario y clave inválido', function() {
	// 					me.view.down('#loginCard textfield[inputType="password"]').focus(true, 100);
	// 				});
	// 				return false;
	// 			}
	// 			if ( response.status == 200 ) {
	// 				//guardo acces token y refresh token
	// 				localStorage.setItem('EPW-AccessToken', json.access_token);
	// 				localStorage.setItem('EPW-RefreshTOKEN', json.refresh_token);
	// 				localStorage.setItem('EPW-ExpireOAUTH', json.expires_in);
	// 				var today= new Date();//fecha actual
	// 				var expiration = json.expires_in-600; // tomo el token y le resto lo que deseo restar de tiempo
	// 				var dateExpiration = Ext.Date.add( today, Ext.Date.SECOND, expiration);//fecha actual mas expiracion
	// 				localStorage.setItem('EPW-DateExpiration',dateExpiration); // guardo en localStorage
	// 				// busco los datos del usuario
	// 				Ext.Ajax.request({
	// 					 url: '/api/profile/data'
	// 					,method: 'POST'
	// 					,headers: {
	// 						 'Content-Type' : 'application/json'
	// 						,'Authorization': 'Bearer '+localStorage.getItem('EPW-AccessToken')
	// 					}
	// 					,callback: function( opt, success, response ) {
	// 						var json = Ext.decode(response.responseText);
  //
	// 						if ( !success ) {
	// 							Ext.Msg.alert('ERROR', 'El servidor no responde. Intentar nuevamente...', function() {
	// 								me.view.down('#loginCard textfield[inputType="password"]').focus(false, 100);
	// 							});
	// 							return false;
	// 						}
  //
	// 						if ( json.success == true ) {
	// 							var json = Ext.decode(response.responseText);
	// 							localStorage.setItem('EPW-UserID',json.userid);
	// 							localStorage.setItem('EPW-UserNAME',json.username);
	// 							localStorage.setItem('EPW-UserFIRST',json.firstname);
	// 							localStorage.setItem('EPW-UserLAST',json.lastname);
	// 							localStorage.setItem('EPW-UserSEX',json.sex);
	// 							localStorage.setItem('CompanyActive',json.companyActive);
	// 							localStorage.setItem('EPW-UserADMINWEB',json.adminweb);
	// 							localStorage.setItem('EPW-UserCHGPASS',json.chgpass);
	// 							me.view.down('#loginCard combobox').getStore().loadData(json.ambientes);
	// 							if (me.view.down('#loginCard combobox').getStore().count()==1){
	// 								me.view.down('#loginCard combobox').hide();
	// 								me.view.down('#loginCard combobox').setValue(me.view.down('#loginCard combobox').getStore().getData().items[0].data.value);
	// 								me.view.down('#loginCard #btnContinuar').focus(false, 100);
	// 							}else if (me.view.down('#loginCard combobox').getStore().count()==3) {
	// 								me.view.down('#loginCard combobox').setValue(1);
	// 								me.view.down('#loginCard combobox').focus(false, 100);
	// 							}else {
	// 								me.view.down('#loginCard combobox').setValue(me.view.down('#loginCard combobox').getStore().getData().items[0].data.value);
	// 								me.view.down('#loginCard combobox').focus(false, 100);;
	// 							}
	// 							me.view.down('#loginCard').setActiveItem(2);
	// 						} else {
	// 							Ext.Msg.alert('ERROR', 'Problemas de conexión', function() {
	// 								me.view.down('#loginCard textfield[inputType="password"]').focus(false, 100);
	// 							});
	// 							me.view.down('#loginCard').setActiveItem(0);
	// 						}
	// 					}
	// 					,failure: function(form, action) {
	// 						Ext.Msg.alert('ERROR', 'Problemas de conexión', function() {
	// 							me.view.down('#loginCard textfield[inputType="password"]').focus(false, 100);
	// 						});
	// 						me.view.down('#loginCard').setActiveItem(0);
	// 					}
	// 				});
	// 			} else {
	// 				Ext.Msg.alert('ERROR', 'Usuario o Contraseña incorrectos', function() {
	// 					me.view.down('#loginCard textfield[inputType="password"]').focus(true, 100);
	// 				});
	// 				me.view.down('#loginCard').setActiveItem(0);
	// 			}
	// 		}
	// 		,failure: function( form, action ) {
	// 			Ext.Msg.alert('ERROR', 'Problemas de conexión', function() {
	// 				me.view.down('#loginCard textfield[inputType="password"]').focus(false, 100);
	// 			});
	// 			me.view.down('#loginCard').setActiveItem(0);
	// 		}
	// 	});
	// 	if ( isDebugging ) console.info('main.MainController', 'onLoginClick', 'Execution time: ' + (new Date().getTime() - start) + 'ms');
	// }
	// /**
	//  * Metodo que invita a crear un ticket en JIRA Service Desk
	//  * @param {Ext.button.Button} this
	//  * @param {Event} e The event object
	//  */
	// ,onForgetClick: function ( btn , e ) {
	// 	if ( isDebugging ) console.info('main.MainController', 'onForgetClick', btn, e);
	// 	var me = this,
	// 		start = new Date().getTime();
  //
	// 		window.showCollectorDialog();
  //
	// 	if ( isDebugging ) console.info('main.MainController', 'onForgetClick', 'Execution time: ' + (new Date().getTime() - start) + 'ms');
	// }
	// /**
	//  * Metodo que inicia la aplicacion en el ambiente escogido por el usuario
	//  * @param {Ext.button.Button} this
	//  * @param {Event} e The event object
	//  */
	// ,onLoginModuloClick : function ( btn , e ) {
	// 	if ( isDebugging ) console.info('main.MainController', 'onLoginModuloClick', btn, e);
	// 	var me = this,
	// 		start = new Date().getTime();
	// 	localStorage.setItem( 'EPW-UserAMBIENTE', btn.up().down('#cmbAmbiente').value );
	// 	localStorage.setItem('EPW-Logged', true);
	// 	Ext.ComponentQuery.query('#loginCard')[0].setActiveItem(1);
	// 	location.href = '../app/index.html';
	// 	if ( isDebugging ) console.info('main.MainController', 'onLoginModuloClick', 'Execution time: ' + (new Date().getTime() - start) + 'ms');
	// }
	// /**
	//  * Metodo que cierra la sesion de usuario poniendo al localStorage en false
	//  * @param {Ext.button.Button} this
	//  * @param {Event} e The event object
	//  */
	// ,onSalirClick: function( btn , e ) {
	// 	if ( isDebugging ) console.info('main.MainController', 'onSalirClick', btn, e);
	// 	var me = this,
	// 		start = new Date().getTime();
	// 	localStorage.setItem('EPW-Logged', false);
	// 	location.href = '../login/index.html';
	// 	if ( isDebugging ) console.info('main.MainController', 'onSalirClick', 'Execution time: ' + (new Date().getTime() - start) + 'ms');
	// }
	// /**
	// * Metodo que ejecuta el botón cuando se hace enter
	// * @param {Ext.form.field.Base} fields
	// * @param {Event} e The event object
	// */
	// ,specialKeyLogin: function(field,e) {
	// 	if ( isDebugging ) console.info('main.MainController', 'specialKeyLogin', field,e);
	// 		var me = this,
	// 			start = new Date().getTime();
	// 		if (e.getKey() == e.ENTER) {
	// 			field.up().down('#btnIngresar').getEl().dom.click();
	// 		}
	// 	if ( isDebugging ) console.info('main.MainController', 'keypressLogin', 'Execution time: ' + (new Date().getTime() - start) + 'ms');
	// }
	// /**
	// * Metodo que maneja el Block Máyus en el login
	// * @param {Ext.form.field.Text} me
	// * @param {Event} e The event object
	// */
	// ,keypressLogin: function (me,e) {
	// 	if ( isDebugging ) console.info('main.MainController', 'keypressLogin', me,e);
	// 		var me = this,
	// 			start = new Date().getTime();
  //
	// 		var ev = e ? e : window.event;
	// 		if (!ev) {
	// 			return;
	// 		}
	// 		var targ = ev.target ? ev.target : ev.srcElement;
	// 		var which = -1;
	// 		if (ev.which) {
	// 			which = ev.which;
	// 		} else if (ev.keyCode) {
	// 			which = ev.keyCode;
	// 		}
	// 		var shift_status = false;
	// 		if (ev.shiftKey) {
	// 			shift_status = ev.shiftKey;
	// 		} else if (ev.modifiers) {
	// 			shift_status = !!(ev.modifiers & 4);
	// 		}
	// 		if (((which >= 65 && which <= 90) && !shift_status) || ((which >= 97 && which <= 122) && shift_status)) {
	// 			Ext.ComponentQuery.query('#lblMayus')[0].show();
	// 		} else {
	// 			Ext.ComponentQuery.query('#lblMayus')[0].hide();
	// 		}
	// 	if ( isDebugging ) console.info('main.MainController', 'keypressLogin', 'Execution time: ' + (new Date().getTime() - start) + 'ms');
	// }
	// /**
	//  * Metodo que asigna la foto de perfil del usuario de acuerdo al sexo
	//  * @param {Ext.container.Container} this
	//  */
	// ,activateCard1: function(cnt) {
	// 	if ( isDebugging ) console.info('main.MainController', 'activateCard1', cnt);
	// 	var me = this,
	// 		start = new Date().getTime();
	// 	cnt = cnt.down('#userDataTpl');
	// 	var sexo = localStorage.getItem( 'EPW-UserSEX' );
	// 	if ( sexo == 'F' ) {
	// 		cnt.setData({
	// 			 cls: 'female'
	// 			,nameusuario: localStorage.getItem( 'EPW-UserFIRST' )
	// 			,saludo: 'Bienvenida'
	// 		});
	// 	}
	// 	else if( sexo == 'M' ) {
	// 		cnt.setData({
	// 			 cls: 'male'
	// 			,nameusuario: localStorage.getItem( 'EPW-UserFIRST' )
	// 			,saludo: 'Bienvenido'
	// 		});
	// 	}
	// 	else {
	// 		cnt.setData({
	// 			 cls: 'unknown'
	// 			,nameusuario: localStorage.getItem( 'EPW-UserFIRST' )
	// 			,saludo: 'Bienvenido'
	// 		});
	// 	}
  //
	// 	if ( isDebugging ) console.info('main.MainController', 'activateCard1', 'Execution time: ' + (new Date().getTime() - start) + 'ms');
	// }
});
