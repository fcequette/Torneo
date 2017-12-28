<?php
namespace torneo\V1\Rest\equipozona;

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

class equipozonaMapper
{
  protected $adapter;
  public function __construct(AdapterInterface $adapter)
  {
    $this->adapter = $adapter;
  }

  public function fetchAll()
  {

  }

  public function fetchOne($id)
  {
    echo "fetchone"; die;
  }

  public function create($data)
  {
    if ( $data->update == 'true') {
      // echo "ACTUALIZA"; die;
      return $this->actualiza($data);
    }else {
      // echo "CREA"; die;
      return $this->crea($data);
    }
  }

  public function crea($data)
  {
    try {
      $dataInsert = array(
        "equipo_id"  => $data->equipo_id,
        "zona_id"    => $data->zona_id
      );
      $sql = new Sql($this->adapter);
      $insert = $sql->insert();
      $insert->into('equipo_zona');
      $insert->values($dataInsert);
      $insertString = $sql->getSqlStringForSqlObject($insert);

      $results = $this->adapter->query($insertString, Adapter::QUERY_MODE_EXECUTE);
      $json = new stdClass();
      $json->success = true;
      return $json;
    } catch (Exception $e) {
      $json = new stdClass();
      $json->success = false;
      $json->mensaje = "No se pudo realizar la operacion.";
      return $json;
    }
  }

  public function actualiza($data)
  {
    //-----
  }

  public function delete($id)
  {
    try {
      $sql = new Sql($this->adapter);
      $select = $sql->select();
      $select->from('equipo_zona');
      $select->where('equipo_id = '.$id);
      $selectString = $sql->getSqlStringForSqlObject($select);
      $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
      $equipo = $results->toArray();

      if (!empty($equipo)) {
        $sql = new Sql($this->adapter);
        $delete = $sql->delete();
        $delete->from('equipo_zona');
        $delete->where(array(
          'equipo_id' => $id
        ));
        $deleteString = $sql->getSqlStringForSqlObject($delete);
        //echo $deleteString; die;
        $results = $this->adapter->query($deleteString, Adapter::QUERY_MODE_EXECUTE);
        $oResponse = new Response();
        $response = new stdClass;
        $response->success = true;
        $response->mensaje = "Equipo eliminado.";
        $oResponse->setContent(json_encode($response));
        return $oResponse;
      }else{
        $oResponse = new Response();
        $response = new stdClass;
        $response->success = false;
        $response->mensaje = "El equipo no puede ser eliminado.";
        $oResponse->setContent(json_encode($response));
        return $oResponse;
      }
    } catch (Exception $e) {
      $json = new stdClass();
      $json->success = false;
      $json->mensaje = "No se pudo eliminar el equipo.";
      return $json;
    }
  }
}
