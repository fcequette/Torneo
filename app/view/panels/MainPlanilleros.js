
Ext.define('Torneo.view.panels.MainPlanilleros', {
  extend: 'Ext.panel.Panel'
  ,xtype: 'mainplanilleros'
  ,height:window.innerHeight-10
  ,requires: [
    'Torneo.view.panels.CardFixture',
    'Ext.layout.container.Border'
  ]
  ,items:[{
      xtype:'cardfixture'
   }]
    // ,dockedItems:[{
    //      xtype: 'toolbar'
    //      ,dock:'bottom'
    //      ,itemId:'tlbPlani'
    //      ,style: 'background-color: green'
    //      ,items:[{
    //         text:'Anterior',
    //         hidden:true,
    //         itemId:'btnAnterior',
    //         handler: function (btn,e){
    //           Ext.cq1('cardfixture').layout.setActiveItem('cardPlanillero2');
    //         }
    //      }]
    //  }]
});
