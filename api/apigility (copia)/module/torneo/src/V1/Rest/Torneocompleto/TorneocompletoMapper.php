<?php
namespace torneo\V1\Rest\torneocompleto;

use ZF\OAuth2\Controller\AuthController;
use ZF\OAuth2\Provider\UserId\UserIdProviderInterface;
use OAuth2\Storage\Pdo;
use ZF\ApiProblem\ApiProblem;
use ZF\ApiProblem\ApiProblemResponse;
use Zend\Crypt\PublicKey\Rsa\PublicKey;
use Zend\Db\Adapter\Driver;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\Driver\ResultInterface;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Select;
use Zend\Paginator\Adapter\DbSelect;
use stdClass;
use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\Http\Response;
use Zend\Http\Response\Stream;

class torneocompletoMapper
{
  protected $adapter;
  public function __construct(AdapterInterface $adapter)
  {
    $this->adapter = $adapter;
  }

  public function fetchAll()
  {
    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('torneo');
    $selectString = $sql->getSqlStringForSqlObject($select);
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $torneo = $results->toArray();

    // print_r($cat); die();
    foreach ($torneo as $key => $row) {
      $id_torneo = $row ['torneo_id'];
      $arr_torneo [] = array(
        'text'            => utf8_encode($row ['torneo_descri']),
        'torneo_id'       => $row ['torneo_id'],
        'torneo_descri'   => utf8_encode($row ['torneo_descri']),
        'torneo_estado'   => $row ['torneo_estado'],
        "nivel"           => 1,
        'children'        => $this->buscoCategorias($id_torneo)

      );
    }
    // print_r($arr); die();

    if (!empty($arr_torneo)) {
      $json = new stdClass();
      $json->success = true;
      $json->children = $arr_torneo;
      return $json;
    }else {
      $json = new stdClass();
      $json->success = false;
      $json->torneo = "No Existen torneo.";
      return $json;
    }
  }

  function buscoCategorias($id_torneo)
  {
    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('categoria');
    $select->where(array('categoria_torneo_id' => $id_torneo));
    $selectString = $sql->getSqlStringForSqlObject($select);
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $categorias = $results->toArray();

    $arr_categorias = array();

    foreach ($categorias as $key => $row) {
      $id_categoria = $row ['categoria_id'];
      $arr_categorias [] = array(
        'text'                => utf8_encode($row ['categoria_descri']),
        'categoria_id'        => $row ['categoria_id'],
        'categoria_descri'    => utf8_encode($row ['categoria_descri']),
        'categoria_torneo_id' => $row ['categoria_torneo_id'],
        "nivel"               => 2,
        'children'            => $this->buscoZonas($id_categoria, $id_torneo)
      );
    }
    return $arr_categorias;
  }

  function buscoZonas($id_categoria, $id_torneo)
  {
    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('zona');
    $select->where(array('zona_categoria_id' => $id_categoria));
    $selectString = $sql->getSqlStringForSqlObject($select);
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $zonas = $results->toArray();

    //print_r($zonas); die();
    $arr_zonas = array();
    foreach ($zonas as $key => $row) {
      $id_zona = $row ['zona_id'];
      $arr_zonas [] = array(
        'text'              => utf8_encode($row ['zona_descri']),
        'torneo_id'         => $id_torneo,
        'zona_id'           => $row ['zona_id'],
        'zona_descri'       => utf8_encode($row ['zona_descri']),
        'zona_categoria_id' => $row ['zona_categoria_id'],
        "nivel"             => 3,
        'children'          => $this->buscoEquipos($id_zona)
      );
    }
    return $arr_zonas;
  }

  function buscoEquipos($id_zona)
  {
    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('equipo_zona');
    $select->join(array("equipo" => "equipo"),'equipo_zona.equipo_id = equipo.equipo_id',array('*'),'left');
    $select->where(array('zona_id' => $id_zona));
    $selectString = $sql->getSqlStringForSqlObject($select);
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $equipos = $results->toArray();

    $arr_equipos = array();
    foreach ($equipos as $key => $row) {
      $arr_equipos [] = array(
        "nivel"            => 4,
        'text'             => utf8_decode($row ['equipo_nombre']),
        'equipo_id'        => $row ['equipo_id'],
        'equipo_nombre'    => utf8_decode($row ['equipo_nombre']),
        'equipo_delegado'  => utf8_decode($row ['equipo_delegado']),
        'leaf'            => true
      );
    }
    return $arr_equipos;
  }

  public function fetchOne($id)
  {
  }

  public function create($data)
  {
  }

  public function delete($id)
  {
  }
}
