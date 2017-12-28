<?php
return [
    'service_manager' => [
        'factories' => [
            \torneo\V1\Rest\Torneo\TorneoResource::class => \torneo\V1\Rest\Torneo\TorneoResourceFactory::class,
            \torneo\V1\Rest\Categoria\CategoriaResource::class => \torneo\V1\Rest\Categoria\CategoriaResourceFactory::class,
            \torneo\V1\Rest\Zona\ZonaResource::class => \torneo\V1\Rest\Zona\ZonaResourceFactory::class,
            \torneo\V1\Rest\Equipo\EquipoResource::class => \torneo\V1\Rest\Equipo\EquipoResourceFactory::class,
            \torneo\V1\Rest\Equipozona\EquipozonaResource::class => \torneo\V1\Rest\Equipozona\EquipozonaResourceFactory::class,
            \torneo\V1\Rest\Fixture\FixtureResource::class => \torneo\V1\Rest\Fixture\FixtureResourceFactory::class,
            \torneo\V1\Rest\Torneocompleto\TorneocompletoResource::class => \torneo\V1\Rest\Torneocompleto\TorneocompletoResourceFactory::class,
            \torneo\V1\Rest\Reglas\ReglasResource::class => \torneo\V1\Rest\Reglas\ReglasResourceFactory::class,
            \torneo\V1\Rest\Jugador\JugadorResource::class => \torneo\V1\Rest\Jugador\JugadorResourceFactory::class,
        ],
    ],
    'router' => [
        'routes' => [
            'torneo.rest.torneo' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/torneo[/:torneo_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Torneo\\Controller',
                    ],
                ],
            ],
            'torneo.rest.categoria' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/categoria[/:categoria_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Categoria\\Controller',
                    ],
                ],
            ],
            'torneo.rest.zona' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/zona[/:zona_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Zona\\Controller',
                    ],
                ],
            ],
            'torneo.rest.equipo' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/equipo[/:equipo_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Equipo\\Controller',
                    ],
                ],
            ],
            'torneo.rest.equipozona' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/equipozona[/:equipozona_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Equipozona\\Controller',
                    ],
                ],
            ],
            'torneo.rest.fixture' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/fixture[/:fixture_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Fixture\\Controller',
                    ],
                ],
            ],
            'torneo.rest.torneocompleto' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/torneocompleto[/:torneocompleto_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Torneocompleto\\Controller',
                    ],
                ],
            ],
            'torneo.rest.reglas' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/reglas[/:reglas_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Reglas\\Controller',
                    ],
                ],
            ],
            'torneo.rest.jugador' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/jugador[/:jugador_id]',
                    'defaults' => [
                        'controller' => 'torneo\\V1\\Rest\\Jugador\\Controller',
                    ],
                ],
            ],
        ],
    ],
    'zf-versioning' => [
        'uri' => [
            0 => 'torneo.rest.torneo',
            1 => 'torneo.rest.categoria',
            2 => 'torneo.rest.zona',
            3 => 'torneo.rest.equipo',
            4 => 'torneo.rest.equipozona',
            5 => 'torneo.rest.fixture',
            6 => 'torneo.rest.torneocompleto',
            7 => 'torneo.rest.reglas',
            8 => 'torneo.rest.jugador',
        ],
    ],
    'zf-rest' => [
        'torneo\\V1\\Rest\\Torneo\\Controller' => [
            'listener' => \torneo\V1\Rest\Torneo\TorneoResource::class,
            'route_name' => 'torneo.rest.torneo',
            'route_identifier_name' => 'torneo_id',
            'collection_name' => 'torneo',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Torneo\TorneoEntity::class,
            'collection_class' => \torneo\V1\Rest\Torneo\TorneoCollection::class,
            'service_name' => 'torneo',
        ],
        'torneo\\V1\\Rest\\Categoria\\Controller' => [
            'listener' => \torneo\V1\Rest\Categoria\CategoriaResource::class,
            'route_name' => 'torneo.rest.categoria',
            'route_identifier_name' => 'categoria_id',
            'collection_name' => 'categoria',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Categoria\CategoriaEntity::class,
            'collection_class' => \torneo\V1\Rest\Categoria\CategoriaCollection::class,
            'service_name' => 'categoria',
        ],
        'torneo\\V1\\Rest\\Zona\\Controller' => [
            'listener' => \torneo\V1\Rest\Zona\ZonaResource::class,
            'route_name' => 'torneo.rest.zona',
            'route_identifier_name' => 'zona_id',
            'collection_name' => 'zona',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Zona\ZonaEntity::class,
            'collection_class' => \torneo\V1\Rest\Zona\ZonaCollection::class,
            'service_name' => 'zona',
        ],
        'torneo\\V1\\Rest\\Equipo\\Controller' => [
            'listener' => \torneo\V1\Rest\Equipo\EquipoResource::class,
            'route_name' => 'torneo.rest.equipo',
            'route_identifier_name' => 'equipo_id',
            'collection_name' => 'equipo',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Equipo\EquipoEntity::class,
            'collection_class' => \torneo\V1\Rest\Equipo\EquipoCollection::class,
            'service_name' => 'equipo',
        ],
        'torneo\\V1\\Rest\\Equipozona\\Controller' => [
            'listener' => \torneo\V1\Rest\Equipozona\EquipozonaResource::class,
            'route_name' => 'torneo.rest.equipozona',
            'route_identifier_name' => 'equipozona_id',
            'collection_name' => 'equipozona',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Equipozona\EquipozonaEntity::class,
            'collection_class' => \torneo\V1\Rest\Equipozona\EquipozonaCollection::class,
            'service_name' => 'equipozona',
        ],
        'torneo\\V1\\Rest\\Fixture\\Controller' => [
            'listener' => \torneo\V1\Rest\Fixture\FixtureResource::class,
            'route_name' => 'torneo.rest.fixture',
            'route_identifier_name' => 'fixture_id',
            'collection_name' => 'fixture',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Fixture\FixtureEntity::class,
            'collection_class' => \torneo\V1\Rest\Fixture\FixtureCollection::class,
            'service_name' => 'fixture',
        ],
        'torneo\\V1\\Rest\\Torneocompleto\\Controller' => [
            'listener' => \torneo\V1\Rest\Torneocompleto\TorneocompletoResource::class,
            'route_name' => 'torneo.rest.torneocompleto',
            'route_identifier_name' => 'torneocompleto_id',
            'collection_name' => 'torneocompleto',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Torneocompleto\TorneocompletoEntity::class,
            'collection_class' => \torneo\V1\Rest\Torneocompleto\TorneocompletoCollection::class,
            'service_name' => 'torneocompleto',
        ],
        'torneo\\V1\\Rest\\Reglas\\Controller' => [
            'listener' => \torneo\V1\Rest\Reglas\ReglasResource::class,
            'route_name' => 'torneo.rest.reglas',
            'route_identifier_name' => 'reglas_id',
            'collection_name' => 'reglas',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Reglas\ReglasEntity::class,
            'collection_class' => \torneo\V1\Rest\Reglas\ReglasCollection::class,
            'service_name' => 'reglas',
        ],
        'torneo\\V1\\Rest\\Jugador\\Controller' => [
            'listener' => \torneo\V1\Rest\Jugador\JugadorResource::class,
            'route_name' => 'torneo.rest.jugador',
            'route_identifier_name' => 'jugador_id',
            'collection_name' => 'jugador',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \torneo\V1\Rest\Jugador\JugadorEntity::class,
            'collection_class' => \torneo\V1\Rest\Jugador\JugadorCollection::class,
            'service_name' => 'jugador',
        ],
    ],
    'zf-content-negotiation' => [
        'controllers' => [
            'torneo\\V1\\Rest\\Torneo\\Controller' => 'HalJson',
            'torneo\\V1\\Rest\\Categoria\\Controller' => 'HalJson',
            'torneo\\V1\\Rest\\Zona\\Controller' => 'HalJson',
            'torneo\\V1\\Rest\\Equipo\\Controller' => 'HalJson',
            'torneo\\V1\\Rest\\Equipozona\\Controller' => 'HalJson',
            'torneo\\V1\\Rest\\Fixture\\Controller' => 'HalJson',
            'torneo\\V1\\Rest\\Torneocompleto\\Controller' => 'HalJson',
            'torneo\\V1\\Rest\\Reglas\\Controller' => 'HalJson',
            'torneo\\V1\\Rest\\Jugador\\Controller' => 'HalJson',
        ],
        'accept_whitelist' => [
            'torneo\\V1\\Rest\\Torneo\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Categoria\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Zona\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Equipo\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Equipozona\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Fixture\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Torneocompleto\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Reglas\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Jugador\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
        ],
        'content_type_whitelist' => [
            'torneo\\V1\\Rest\\Torneo\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Categoria\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Zona\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Equipo\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Equipozona\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Fixture\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Torneocompleto\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Reglas\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
            'torneo\\V1\\Rest\\Jugador\\Controller' => [
                0 => 'application/vnd.torneo.v1+json',
                1 => 'application/json',
            ],
        ],
    ],
    'zf-hal' => [
        'metadata_map' => [
            \torneo\V1\Rest\Torneo\TorneoEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.torneo',
                'route_identifier_name' => 'torneo_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Torneo\TorneoCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.torneo',
                'route_identifier_name' => 'torneo_id',
                'is_collection' => true,
            ],
            \torneo\V1\Rest\Categoria\CategoriaEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.categoria',
                'route_identifier_name' => 'categoria_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Categoria\CategoriaCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.categoria',
                'route_identifier_name' => 'categoria_id',
                'is_collection' => true,
            ],
            \torneo\V1\Rest\Zona\ZonaEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.zona',
                'route_identifier_name' => 'zona_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Zona\ZonaCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.zona',
                'route_identifier_name' => 'zona_id',
                'is_collection' => true,
            ],
            \torneo\V1\Rest\Equipo\EquipoEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.equipo',
                'route_identifier_name' => 'equipo_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Equipo\EquipoCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.equipo',
                'route_identifier_name' => 'equipo_id',
                'is_collection' => true,
            ],
            \torneo\V1\Rest\Equipozona\EquipozonaEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.equipozona',
                'route_identifier_name' => 'equipozona_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Equipozona\EquipozonaCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.equipozona',
                'route_identifier_name' => 'equipozona_id',
                'is_collection' => true,
            ],
            \torneo\V1\Rest\Fixture\FixtureEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.fixture',
                'route_identifier_name' => 'fixture_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Fixture\FixtureCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.fixture',
                'route_identifier_name' => 'fixture_id',
                'is_collection' => true,
            ],
            \torneo\V1\Rest\Torneocompleto\TorneocompletoEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.torneocompleto',
                'route_identifier_name' => 'torneocompleto_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Torneocompleto\TorneocompletoCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.torneocompleto',
                'route_identifier_name' => 'torneocompleto_id',
                'is_collection' => true,
            ],
            \torneo\V1\Rest\Reglas\ReglasEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.reglas',
                'route_identifier_name' => 'reglas_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Reglas\ReglasCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.reglas',
                'route_identifier_name' => 'reglas_id',
                'is_collection' => true,
            ],
            \torneo\V1\Rest\Jugador\JugadorEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.jugador',
                'route_identifier_name' => 'jugador_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \torneo\V1\Rest\Jugador\JugadorCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'torneo.rest.jugador',
                'route_identifier_name' => 'jugador_id',
                'is_collection' => true,
            ],
        ],
    ],
];
