/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'Torneo',

    extend: 'Torneo.Application',

    requires: [
        'Torneo.view.Main'
    ],


    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    // mainView: 'Torneo.view.main.Main'
    mainView: 'Torneo.view.Main'


    //-------------------------------------------------------------------------
    // Most customizations should be made to Torneo.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
Ext.override(Ext, {
  cq1: function(selector) {
    return Ext.ComponentQuery.query(selector)[0];
  }
});
Ext.define('Torneo.overrides.grid.column.Action', {
	override: 'Ext.grid.column.Action',

	// overridden to implement
	defaultRenderer: function(v, cellValues, record, rowIdx, colIdx, store, view) {
		var me = this,
			prefix = Ext.baseCSSPrefix,
			scope = me.origScope || me,
			items = me.items,
			len = items.length,
			i = 0,
			item, ret, disabled, tooltip,glyph, glyphParts, glyphFontFamily;

		// Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
		// Assign a new variable here, since if we modify "v" it will also modify the arguments collection, meaning
		// we will pass an incorrect value to getClass/getTip
		ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';

		cellValues.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
		for (; i < len; i++) {
			item = items[i];

			disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
			tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));
			if(Ext.isFunction(item.getGlyph)){
				glyph = item.getGlyph.apply(item.scope || scope, arguments);
			}else{
				glyph = item.glyph;
			}

			// Only process the item action setup once.
			if (!item.hasActionConfiguration) {
				// Apply our documented default to all items
				item.stopSelection = me.stopSelection;
				item.disable = Ext.Function.bind(me.disableAction, me, [i], 0);
				item.enable = Ext.Function.bind(me.enableAction, me, [i], 0);
				item.hasActionConfiguration = true;
			}
			if (glyph ) {

				if (typeof glyph === 'string') {
					glyphParts = glyph.split('@');
					glyph = glyphParts[0];
					glyphFontFamily = glyphParts[1];
				} else {
					glyphFontFamily = Ext._glyphFontFamily;
				}

				ret += '<span role="button" title="' + (item.altText || me.altText) + '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-glyph ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
					' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
					' style="font-family:' + glyphFontFamily + '"' +
					(tooltip ? ' data-qtip="' + tooltip + '"' : '') + '>&#' +  glyph + ';</span>';
			} else {
				ret += '<img role="button" alt="' + (item.altText || me.altText) + '" src="' + (item.icon || Ext.BLANK_IMAGE_URL) +
					'" class="' + me.actionIconCls + ' ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
					(Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
					(tooltip ? ' data-qtip="' + tooltip + '"' : '') + ' />';
			}
		}
		return ret;
	}
});

Ext.define('Torneo.override.form.action.Submit',{
	override: 'Ext.form.action.Submit',
	doSubmit: function () {
	var me = this,
		ajaxOptions = Ext.apply(me.createCallback(), {
			url: me.getUrl(),
			method: me.getMethod(),
			headers: me.headers
		}),
		form = me.form
		,nform = me.form.owner.config.xtype
		,xform =Ext.cq1(nform)
		,jsonSubmit = me.jsonSubmit || form.jsonSubmit
		,paramsProp = jsonSubmit ? 'jsonData' : 'params'
		,formInfo;

	// For uploads we need to create an actual form that contains the file upload fields,
	// and pass that to the ajax call so it can do its iframe-based submit method.
		if (form.hasUpload()) {
			formInfo = me.buildForm();
			ajaxOptions.form = formInfo.formEl;
			ajaxOptions.isUpload = true;
		} else {
			ajaxOptions[paramsProp] = me.getParams(jsonSubmit);
		}
		var arr2 =[];
		arr2 = xform.query('grid');
			if (!Ext.isEmpty(arr2)) {
				var dataRecords= [];
				arr2.forEach(function(grid) {
					if (grid.isSubmit) {
						if (grid.submitConfig[0].type === 'Selected') { // si ña grilla tiene definido q carga un solo record
							var record = grid.getView().getSelectionModel().getSelection();
							var record2= new Object();
							grid.submitConfig[0].fields.forEach(function(field) {
	 							if (Ext.isDefined(record[0].data[field])) {
	 								record2[field] =record[0].data[field]
								}
							});
							dataRecords.push(record2);
						} else  if(grid.submitConfig[0].type === 'All') { // carga todo los record
							//var record= [];
							grid.getStore().each(function( rec ) {
								//var record= Ext.data.Record.create();
								var record = new Object();
								grid.submitConfig[0].fields.forEach(function(field) {
									if (Ext.isDefined(rec.data[field])){
										record[field] =rec.data[field]
									}
								});
								dataRecords.push(record);
							});
						}
						var ngrid = grid.name;
					//ajaxOptions.params[ngrid]= "'"+Ext.encode(dataRecords)+"'";
					if (Ext.isDefined(ajaxOptions.params)){
						ajaxOptions.params[ngrid]= Ext.encode(dataRecords);
					} else {
						ajaxOptions.jsonData[ngrid] = Ext.encode(dataRecords);
					}
						dataRecords = [];
					}
			});
		}
		//ajaxOptions.params.codemp = localStorage.getItem('CompanyActive');
		console.log('*AjaxOptions*', ajaxOptions);
 		Ext.Ajax.request(ajaxOptions);
		if (formInfo) {
 			me.cleanup(formInfo);
		}
	}
});
