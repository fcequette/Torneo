
Ext.define('Torneo.view.panels.MainPlanilleros', {
  //extend: 'Ext.container.Container',
  extend: 'Ext.panel.Panel'
  ,xtype: 'mainplanilleros'
  //,controller: 'mainplanilleros'
  ,fullscreen:true
  ,requires: [
    'Torneo.view.panels.CardFixture',
    'Ext.layout.container.Border'

  ]

  ,items:[{

      xtype:'cardfixture'
      ,height:500
   },{
        xtype: 'toolbar'
        ,itemId:'tlbPlani'
        ,style: 'background-color: green'
        ,items:[{
          text:'Anterior',
          hidden:true,
          itemId:'btnAnterior',
          handler: function (btn,e){
            Ext.cq1('cardfixture').layout.setActiveItem('cardPlanillero1');
          }
        },'->',{
            text:'Siguiente',
            itemId:'btnSiguiente',
            handler: function (btn,e){
              Ext.getStore('PartidosFecha').load({params:Ext.cq1('#cardPlanillero1').getValues()});
              Ext.cq1('cardfixture').layout.setActiveItem('cardPlanillero2');
              Ext.cq1('#btnAnterior').show();
              Ext.cq1('#btnSiguiente').hide();
            }
        }]
    }]
});
