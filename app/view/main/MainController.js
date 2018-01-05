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
            height: 300,
            width:  400,
            border:false,
            layout: 'border',
            resizable:false,
            itemId:'winLogin',
            glyph:'xe872@Linearicons',
            modal: true
            ,modal: {
              cls: 'my-modal-class'
            }
             ,style: 'background:green'
            ,items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'form',
                region:'center',
                border: false
                //iconCls: 'fa-soccer-ball-o',
//title:'<p style="font-size:25px;text-align:center">LOGIN</p>'
                //bodyPadding: 100,
                ,items:[{
                  xtype:'fieldset',
                  columnWidth: 1,
                  title: '<p style="font-size:17px">Gringa Champion Leage</p>',

                  collapsible: false,
                  defaultType: 'textfield',
                  defaults: {anchor: '100%', padding:'30 0 30 0'},
                  layout: 'anchor',
                  items:[{
                    //fieldLabel: 'Usuario'
                    emptyText: 'Contraseña'
                    ,name:'Usuario'

                  },{
                    //fieldLabel:'Contraseña'
      							 name: 'password'
      							,inputType: 'password'
      							,emptyText: 'Contraseña'
      							,allowBlank: false
                  },{
                    xtype:'button'
                    ,text:'INGRESAR'
                    ,padding:'20 10 20 10'
                     ,glyph:'xe872@Linearicons'
                    ,margin: '0 0 50 0'
                    ,handler: function(btn,e){
                       Ext.cq1('#winLogin').close();
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
      Ext.getStore(cmb.namecmb).removeAll();
      Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
    }
});
