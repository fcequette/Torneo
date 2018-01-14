Ext.define('Torneo.model.Fixtures', { //entidad
	 extend: 'Ext.data.Model'


		,fields: [
		{name: 'equipo1'}
		,{name: 'equipo2'}
		,{name: 'vs' ,defaultValue:'VS'}
		,{name: 'imagen1'}
		,{name: 'imagen2'}

	]


	//,identifier: 'sequential'
});
