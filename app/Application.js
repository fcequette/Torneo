/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Torneo.Application', {
    extend: 'Ext.app.Application',

    name: 'Torneo',

    stores: [
      'Fixture'
      ,'Torneos'
      ,'Categorias'
      ,'Zonas'
      ,'Equipozona'
      ,'Jugadores'
      ,'Equipos'
      ,'Jugadores-Equipo'
      ,'Goleadores'
      ,'Goleadores2'
      ,'Fechas'
      ,'PartidosFecha'
      ,'Amonestados'
      ,'Amonestados2'
      ,'Expulsados'
      ,'Expulsados2'
      ,'Turnos'
      ,'Canchas'
      ,'Posiciones'
      ,'Usuario'
      ,'Valla'
      ,'Sancionados'
      ,'Vuelven'
      ,'Capilla'
      ,'Golea'
        // TODO: add global / shared stores here
    ],

    launch: function () {
        // TODO - Launch the application
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
