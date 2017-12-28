Ext.define('Torneo.view.login.Main', {
	 extend: 'Ext.container.Viewport'
	,xtype: 'login-main'
	,itemId: 'mainLog'

	,cls: 'viewportLogin'

	,requires: [
		//  'EPWL.view.main.MainController'
		// ,'EPWL.view.main.MainModel'
		// ,'Ext.form.Panel'
		// ,'Ext.data.JsonStore'
	]

	// ,controller: 'main'
	// ,viewModel: {
	// 	type: 'main'
	// }

	// CONFIG
	,initComponent: function(config) {
		var me = this;

		Ext.apply(me, {
			items: [{
				 xtype: 'panel'
				,height: 435
				,width: 300
				,layout: 'vbox'
				,cls: 'loginPanel'
				,style:'background:green!important;'
				,items: [{
					 xtype: 'displayfield'
					,cls: 'login-encabezado'
					,value: 'Gringa Champion Leage<a data-toggle="tooltip" title="{VERSION}"class="login-encabezado-pro"></a>'
					,width: '100%'
					,height: 100
				},{
					 xtype: 'container'
					//,flex: 1
					,width:300
					,layout: 'card'
					,itemId: 'loginCard'
					,items: [{
						 xtype: 'form'
						,itemId: 'formLog'
						,style:'background:green'
						,defaults:{
							listeners: {
								specialkey: function(field, e){
									if (e.getKey() == e.ENTER) {
										field.up().down('#btnIngresar').getEl().dom.click();
									}
								}
							}
						}
						,items: [{
							 xtype: 'textfield'
							,cls: 'login-lbl-label'
							,name: 'username'
							,emptyText: 'Usuario'
							,allowBlank: false
							,margin: '30 27 15 27'
							,focusCls: 'login-lbl-label'
						},{
							 xtype: 'textfield'
							,cls: 'login-lbl-label'
							,name: 'password'
							,inputType: 'password'
							,emptyText: 'Contraseña'
							,allowBlank: false
							,margin: '0 27 5 27'
							,height: 100
							,focusCls: 'login-lbl-label'
							,enableKeyEvents: 'true'
							,listeners:[{
								specialkey: 'specialKeyLogin'
							},{
								keypress:'keypressLogin'
							}]
						},{
							 xtype: 'container'
							,height: 10
							,items:[{
								xtype: 'label'
								,text: 'ATENCIÓN: Mayúscula activada.'
								,itemId:'lblMayus'
								,style: 'color:#e6e218'
								,margin: '5 48 5 48'
								,padding: '0 0 0 5'
								,hidden: true
							}]
						},{
							 xtype: 'hiddenfield'
							,name: 'grant_type'
							,value: 'password'
						},{
							 xtype: 'hiddenfield'
							,name: 'client_id'
							,value: 'eternumpro'
						},{
							 ui: 'loginButton'
							,cls: 'login-btn-ingresar'
							,xtype: 'button'
							,itemId: 'btnIngresar'
							,text: 'INGRESAR >'
							,handler: function(btn,e){
								Ext.cq1('#firstCard').layout.setActiveItem('firstcard2');
							}
							,scale: 'large'
							,margin: '20 27 60 27'
						},{
							 xtype: 'label'
							,html: '<hr class="loginLinea">'
						},{
							 xtype: 'button'
							,ui: 'declinelogin'
							,text: '<p style="cursor: pointer;color:#fff; font-size:14px;margin-top: 15px;">¿Olvidaste tu contraseña?</p>'
							,width: 300
							,handler: 'onForgetClick'
						}]
					},{
						 xtype: 'container'
						,width: 300
						,html:'<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div><br><div class="login-card-espere" style="padding-left:0;text-align:center;">Espere por favor...</div>'
					},{
						 xtype: 'container'
						,margin: '10 0 0 0'
						,defaults: {
							listeners: {
								specialkey: function(field, e){
									if (e.getKey() == e.ENTER) {
										field.up().down('#btnContinuar').getEl().dom.click();
									}
								}
							}
						}
						,items: [{
							 xtype: 'container'
							,cls: 'login-foto'
							,itemId: 'userDataTpl'
							,tpl: [
								 '<img class="login-picture {cls}" src="{picture}" />'
								,'</br>'
								,'<p class="login-saludo">{saludo} {nameusuario}</p>'
							]
							,width: 300
							,heigth: 150
						},{
							 xtype: 'container'
							,height: 55
							,items:[{
								xtype: 'combobox'
								,baseCls: 'login-cbx-ambiente'
								,itemId:'cmbAmbiente'
								,emptyText: 'Elegir Ambiente...'
								,margin: '0 27 15 27'
								,displayField: 'text'
								,valueField: 'value'
								,queryMode: 'local'
								,editable: false
								,typeAhead: false
								//,readOnly: true
								,height: 50
								,listConfig: {
									cls: 'login-cbx-ambiente-opciones'
								}
								,store: {
									type: 'json'
									,fields: [{
										name: 'text'
										,type: 'string'
									},{
										name: 'value'
										,type: 'int'
									}]
								}
							}]
						},{
							 ui: 'loginButton'
							,cls: 'login-btn-ingresar'
							,itemId:'btnContinuar'
							,xtype: 'button'
							,text: 'CONTINUAR >'
							,handler: 'onLoginModuloClick'
							,scale: 'large'
							,margin: '0 27 5 27'
						},{
							 xtype: 'label'
						}]
						,listeners:{
							activate: 'activateCard1'
						}
					}]
				}]
			}]
		});

		me.callParent(config);
	}

	,listeners: {
		//	render: 'onFormRender'
	}
});
