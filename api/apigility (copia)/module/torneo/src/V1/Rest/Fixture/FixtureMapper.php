<?php
namespace torneo\V1\Rest\fixture;

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

class fixtureMapper
{
  protected $adapter;
  public function __construct(AdapterInterface $adapter)
  {
    $this->adapter = $adapter;
  }

  public function fetchAll()
  {
    $torneo_id    = $_GET["torneo_id"];
    $categoria_id = $_GET["categoria_id"];
    $zona_id      = $_GET["zona_id"];

    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('fixture');
    $select->where(array('fixture_torneo_id' => $torneo_id, 'fixture_categoria_id' => $categoria_id, 'fixture_zona_id' => $zona_id));
    $select->order(array('fixture_torneo_id', 'fixture_categoria_id', 'fixture_zona_id', 'fixture_fecha', 'fixture_cancha_id', 'fixture_turno_id'));
    $selectString = $sql->getSqlStringForSqlObject($select);
    //echo "$selectString"; die;
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $fixture = $results->toArray();

    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('equipo_zona');
    $select->where(array('zona_id' => $zona_id));
    $selectString = $sql->getSqlStringForSqlObject($select);
    //echo "$selectString"; die;
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $cant_equipos = $results->toArray();

//    $cant_partidos = floor(count($cant_equipos)/2);

    // print_r($fixture); die;

//    $i=1;
    $ban = 0;
    $ban2 = 0;
    foreach ($fixture as $key => $row) {
      // $fecha = 'fecha '.$row ['fixture_fecha'];
      // $arr_fixt [$fecha]['enfrentados'] = $this->PartidosXfechaXzona($torneo_id, $categoria_id, $zona_id, $row ['fixture_fecha']);

      // $arr_fixt ['fecha'][] = $row ['fixture_fecha'];
      // $arr_fixt ['enfrentados'] = $this->PartidosXfechaXzona($torneo_id, $categoria_id, $zona_id, $row ['fixture_fecha']);

      $ban = $row ['fixture_fecha'];

      if($ban != $ban2){
        $arr_fixt [] = array(
          'fecha'       => $row ['fixture_fecha'],
          'enfrentados' => $this->PartidosXfechaXzona($torneo_id, $categoria_id, $zona_id, $row ['fixture_fecha'])
        );
        $ban2 = $ban;
      }
    }

    if(!empty($arr_fixt)){
      $json = new stdClass();
      $json->success = true;
      $json->fixture = $arr_fixt;
      return $json;
    }else{
      $json = new stdClass();
      $json->success = true;
      $json->mensaje = "La zona no tiene Fixture generado";
      return $json;
    }

  }

  function PartidosXfechaXzona($torneo_id, $categoria_id, $zona_id, $fecha){
    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('fixture');
    $select->where(array(
      'fixture_torneo_id' => $torneo_id,
      'fixture_categoria_id' => $categoria_id,
      'fixture_zona_id' => $zona_id,
      'fixture_fecha' => $fecha,
    ));
    $select->order(array('fixture_torneo_id', 'fixture_categoria_id', 'fixture_zona_id', 'fixture_fecha', 'fixture_cancha_id', 'fixture_turno_id'));
    $selectString = $sql->getSqlStringForSqlObject($select);
    //echo "$selectString"; die;
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $fixture = $results->toArray();
    //print_r($fixture); die;

    foreach ($fixture as $key => $row) {
      $arr_fixture [] = array(
        'fixture_id'           => $row ['fixture_id'],
        'fixture_torneo_id'    => $row ['fixture_torneo_id'],
        'fixture_categoria_id' => $row ['fixture_categoria_id'],
        'fixture_zona_id'      => $row ['fixture_zona_id'],
        'fixture_fecha'        => $row ['fixture_fecha'],
        'equipo1'              => $this->nombre_equipo($row ['fixture_equipo_id1']),
        'imagen1'              => "",
        'equipo2'              => $this->nombre_equipo($row ['fixture_equipo_id2']),
        'imagen2'              => "",
        'fixture_fase_id'      => $row ['fixture_fase_id'],
        'cancha'               => $row ['fixture_cancha_id'],
        "turno"                => $row ['fixture_equipo_id1'],
      );
    }
    return $arr_fixture;
  }

  function nombre_equipo($equipo_id){
    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('equipo');
    $select->where(array('equipo_id' => $equipo_id));
    $selectString = $sql->getSqlStringForSqlObject($select);
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $equipo = $results->toArray();
    if (!empty($equipo[0]['equipo_nombre'])) {
      $eq = utf8_encode($equipo[0]['equipo_nombre']);
      return $eq;
    }else {
      $eq = "LIBRE";
      return $eq;
    }

  }

  public function fetchOne($id)
  {
  }

  public function create($data)
  {
    $fixture = $this->buscoFixture($data);
    if (!empty($fixture)) {
      $this->eliminoFixture($data);
    }
    $zona_id = $data->zona_id;
    $arr_equipos = $this->buscoEquipos($zona_id);
    $this->main($arr_equipos, $data);
  }

  public function eliminoFixture($data)
  {
    $torneo_id    = $data->torneo_id;
    $categoria_id = $data->categoria_id;
    $zona_id      = $data->zona_id;
    try {
      $sql = new Sql($this->adapter);
      $delete = $sql->delete();
      $delete->from('fixture');
      $delete->where(array('fixture_torneo_id' => $torneo_id, 'fixture_categoria_id' => $categoria_id, 'fixture_zona_id' => $zona_id));
      $deleteString = $sql->getSqlStringForSqlObject($delete);
      $results = $this->adapter->query($deleteString, Adapter::QUERY_MODE_EXECUTE);
    } catch (Exception $e) {
      $json = new stdClass();
      $json->success = false;
      $json->mensaje = "No se pudo eliminar el fixture.";
      return $json;
    }
  }

  function buscoFixture($data)
  {
    $torneo_id    = $data->torneo_id;
    $categoria_id = $data->categoria_id;
    $zona_id      = $data->zona_id;

    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('fixture');
    $select->where(array('fixture_torneo_id' => $torneo_id, 'fixture_categoria_id' => $categoria_id, 'fixture_zona_id' => $zona_id));
    $selectString = $sql->getSqlStringForSqlObject($select);
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $fixture = $results->toArray();
    return $fixture;
  }

  function main($arr_equipos, $data) {
    $e = count($arr_equipos);
    $this->show_fixtures($this->nums(intval($e)), $arr_equipos, $data);
    //die;
  }

  function nums($n) {
    $ns = array();
    for ($i = 1; $i <= $n; $i++) {
      $ns[] = $i;
    }
    return $ns;
  }

  function show_fixtures($names, $arr_equipos, $data) {
    $teams = sizeof($names);

    // Si el número impar de equipos agrega un "ghost"(libre).
    $ghost = false;
    if ($teams % 2 == 1) {
      $teams++;
      $ghost = true;
    }

    // Genera los dispositivos usando el algoritmo cíclico.
    $totalRounds = $teams - 1;
    $matchesPerRound = $teams / 2;
    $rounds = array();
    for ($i = 0; $i < $totalRounds; $i++) {
      $rounds[$i] = array();
    }
    //    echo "\n 2";
    //    print_r($rounds);

    for ($round = 0; $round < $totalRounds; $round++) {
      for ($match = 0; $match < $matchesPerRound; $match++) {
        $home = ($round + $match) % ($teams - 1);
        $away = ($teams - 1 - $match + $round) % ($teams - 1);

        // El último equipo se queda en el mismo lugar mientras los otros giran a su alrededor.
        if ($match == 0) {
          $away = $teams - 1;
        }

        if(!empty($this->team_name($away + 1, $names, $arr_equipos, $data))){
          $t = " vs " .$this->team_name($away + 1, $names, $arr_equipos, $data);
        }else{
          $t = '';
        }
        $rounds[$round][$match] = $this->team_name($home + 1, $names, $arr_equipos, $data) . $t;
      }
    }
    // Muestro el fixture
    for ($i = 0; $i < sizeof($rounds); $i++) {
      //print "FECHA " . ($i + 1) . "\n";
      foreach ($rounds[$i] as $r) {
        $ee = explode("vs", $r);
        //echo $ee[0] . " VS";
        //echo $ee[1] . "\n";

        $dataInsert = array(
          "fixture_torneo_id" => $data->torneo_id,
          "fixture_categoria_id" => $data->categoria_id,
          "fixture_zona_id" => $data->zona_id,
          "fixture_fecha" => ($i+1),
          "fixture_equipo_id1" => $ee[0],
          "fixture_equipo_id2" => $ee[1],
          "fixture_fase_id" => "1",
          "fixture_cancha_id" => "1",
          "fixture_turno_id" => "1"
        );
        $sql = new Sql($this->adapter);
        $insert = $sql->insert();
        $insert->into('fixture');
        $insert->values($dataInsert);
        $insertString = $sql->getSqlStringForSqlObject($insert);
        // echo $insertString; die;
        $results = $this->adapter->query($insertString, Adapter::QUERY_MODE_EXECUTE);
      }
      // print "\n";
    }

    if ($ghost) {
      print "Matches against team " . $teams . " are byes.";
    }
  }

  function team_name($num, $names, $arr_equipos, $data) {
    //    print_r($arr_equipos); die;

    $i = $num - 1;
    if (sizeof($names) > $i && strlen(trim($names[$i])) > 0) {
      //        return trim($names[$i]);
      return $arr_equipos[trim($names[$i])];
    } else {
      if(isset($arr_equipos[$num])){
        $p = $arr_equipos[$num];
      }else{
        $p = " Libre ";
      }
      return $p;
    }
  }

  function buscoEquipos($zona_id)
  {
    $sql = new Sql($this->adapter);
    $select = $sql->select();
    $select->from('equipo_zona');
    $select->join(array("equipo" => "equipo"),'equipo_zona.equipo_id = equipo.equipo_id',array('*'),'left');
    $select->where(array('zona_id' => $zona_id));
    $selectString = $sql->getSqlStringForSqlObject($select);
    $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
    $equipos = $results->toArray();

    $i = 1;
    foreach ($equipos as $key => $row) {
      $arr_equipos [$i] = $row ['equipo_id'];
      $i++;
    }
    return $arr_equipos;
  }

  public function delete($id)
  {
  }
}
