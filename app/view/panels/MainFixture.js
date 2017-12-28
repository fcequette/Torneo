
Ext.define('Torneo.view.panels.MainFixture', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.panel.Panel'
    ,xtype: 'mainfixture'
    ,requires: [
        'Torneo.view.main.MainFixtureController',
    ],

    controller: 'mainfixture'
    ,scrollable:'vertical'
    ,dockedItems:[{
      dock:'top'
      //,xtype:'toolbar'
      ,items:[{
        xtype:'form'
        ,url:'http://dario-casa.sytes.net/api/fixture'
        ,itemId:'formFixture'
        ,jsonSubmit: true
        ,layout:'hbox'
        ,defaults:{
          labelAlign: 'top'
          ,margin:'0 25 0 25'
        }
        ,items:[{
              xtype:'combobox'
            ,fieldLabel:'Torneo'
            ,name:'torneo_id'
            ,store:'Torneos'
            ,displayField:'torneo_descri'
            ,valueField:'torneo_id'
            ,namecmb:'Categorias'
            ,listeners:{
              change: 'onComboboxChange'
            }
        },{
          xtype:'combobox'
          ,fieldLabel:'Categoria'
          ,store: 'Categorias'
          ,displayField:'categoria_descri'
          ,name:'categoria_id'
          ,namecmb:'Zonas'
          ,valueField:'categoria_id'
          ,namecmb:'Zonas'
          ,listeners:{
            change: 'onComboboxChange'
          }
        },{
          xtype:'combobox'
          ,fieldLabel:'Zona'
          ,store: 'Zonas'
          ,displayField:'zona_descri'
          ,valueField:'zona_id'
          ,name:'zona_id'
          ,listeners:{
            // change: function(cmb , newValue , oldValue , e ){
            //   Ext.getStore('Zonas').load({params:{param:cmb.getValue()}});
            // }
          }
        },{
          xtype:'button'
          ,text:'Fixture'
          ,ui:'action'
          ,margin: '25 0 0 25'
          ,handler: 'onFixtureClick'
        }]
        }]
   }]

    ,items:[{
      xtype: 'dataview'
      ,itemId:'dvFixture'
      ,emptyText: 'Realice una busqueda'

    ,tpl:[
      '<tpl for="fixture">',
          '<div  style="margin-bottom: 10px;font-size:15px">',
          '<p>FECHA{fecha}</p>  ',
          '<hr>',
          '<tpl for="enfrentados">',
            '<div style: "width:50%">',
              '<div style="margin-bottom: 10px;display:inline-block">',
              // '<div><img style="width:20px;height:20px" src="{imagen1}" />',
              '<div  style= "width:100px" ><span>{equipo1}</span></div>',
            '</div> ',
            '<div style="margin-bottom: 10px;display:inline-block;width:50px">VS</div>',
             '<div style="margin-bottom: 10px;display:inline-block">',
              // '<div><img style="width:20px;height:20px"src="{imagen2}" />',
              '<div style= "width:100px"><span>{equipo2}</span></div>',
            '</div>',
         '</div>',
         '<hr>',

         '</tpl>',
         '</div>',
    '</tpl>'
  ],
    itemSelector: 'div.thumb-wrap',
    emptyText: 'No images available'


    ,listeners: {
      render: function(panel){

      }
    }
    }]



 });
