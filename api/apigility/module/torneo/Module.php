<?php
namespace torneo;

use ZF\Apigility\Provider\ApigilityProviderInterface;

class Module implements ApigilityProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return [
            'ZF\Apigility\Autoloader' => [
                'namespaces' => [
                    __NAMESPACE__ => __DIR__ . '/src',
                ],
            ],
        ];
    }

    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'torneo\V1\Rest\Torneo\TorneoMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Torneo\TorneoMapper($adapter2);
              },
                'torneo\V1\Rest\Categoria\CategoriaMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Categoria\CategoriaMapper($adapter2);
              },
                'torneo\V1\Rest\Zona\ZonaMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Zona\ZonaMapper($adapter2);
              },
                'torneo\V1\Rest\Equipo\EquipoMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Equipo\EquipoMapper($adapter2);
              },
                'torneo\V1\Rest\Equipozona\EquipozonaMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Equipozona\EquipozonaMapper($adapter2);
              },
                'torneo\V1\Rest\Fixture\FixtureMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Fixture\FixtureMapper($adapter2);
                },
                'torneo\V1\Rest\Torneocompleto\TorneocompletoMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Torneocompleto\TorneocompletoMapper($adapter2);
                },
                'torneo\V1\Rest\Reglas\ReglasMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Reglas\ReglasMapper($adapter2);
                },
                'torneo\V1\Rest\Jugador\JugadorMapper' => function ($sm2) {
                $adapter2 = $sm2->get('Zend\Db\Adapter\Adapter');
                return new \torneo\V1\Rest\Jugador\JugadorMapper($adapter2);
                },
              )
            );
    }
}
