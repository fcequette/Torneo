
Ext.define('Torneo.view.panels.MainPlanilleros', {
  //extend: 'Ext.container.Container',
  extend: 'Ext.panel.Panel'
  ,xtype: 'mainplanilleros'
  ,controller: 'mainplanilleros'
  ,requires: [
    'Torneo.view.panels.CardFixture',
    'Ext.layout.container.Border'

  ]
  ,layout:'border'
  ,scrollable: true
  //,width: 1300
  ,height: 525

  ,items:[{
       region:'center'
      ,xtype:'cardfixture'
      // ,height: 300
   },{
        region:'south'
        ,xtype: 'toolbar'
        //,dock: 'bottom'
        ,style: 'background-color: green'
        ,items:[{
          text:'Anterior',
          handler: function (btn,e){
            Ext.cq1('cardfixture').layout.setActiveItem('cardPlanillero1');
          }
        },'->',{
            text:'Siguiente',
            handler: function (btn,e){
              Ext.getStore('PartidosFecha').load({params:Ext.cq1('#cardPlanillero1').getValues()
              });
            /*  Ext.cq1('#cardPlanillero1').submit({
                success:function(su,res){
                  console.log('lo hizo',res.response.responseText);
                  Ext.cq1('cardPlanillero2').load(res.response.responseText);
                }
                ,failure:function(){
                  console.log('no lo hizo');
                }
              });*/
              Ext.cq1('cardfixture').layout.setActiveItem('cardPlanillero2');
            }
        }]
    }]
});
