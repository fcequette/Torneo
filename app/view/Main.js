Ext.define('Torneo.view.Main', {
	 extend: 'Ext.panel.Panel'
	,xtype:'firstCard'
	//,cls: 'viewportLogin'
	,requires: [
		 'Torneo.view.login.Main'
		,'Torneo.view.main.Main'
		//,'Torneo.view.main.List'
	]

	// CONFIG
	,layout:'card'
	,items:[{
				// xtype: 'login-main'
				xtype: 'app-main'
				//xtype: 'mainlist'
				,itemId:'firstcard1'
	},{
		//xtype: 'app-main'
			//xtype: 'login-main'
		//,hidden:true
		//,itemId:'firstcard2'
	}]
	,listeners:{
		 render:function(panel,e){
			 // 	Ext.cq1('#firstCard').layout.setActiveItem('firstcard1');panel.setActiveItem(1);
			 //panel.setActiveItem(1);
		 }
	}
});
