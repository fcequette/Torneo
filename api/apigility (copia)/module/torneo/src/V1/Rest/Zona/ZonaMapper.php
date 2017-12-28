<?php
namespace torneo\V1\Rest\zona;

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

class zonaMapper
{
    protected $adapter;
    public function __construct(AdapterInterface $adapter)
    {
        $this->adapter = $adapter;
    }

    public function fetchAll()
    {
      $categoria_id = $_GET["param"];

      $sql = new Sql($this->adapter);
      $select = $sql->select();
      $select->from('zona');
      $select->where(array('zona_categoria_id' => $categoria_id));
      $selectString = $sql->getSqlStringForSqlObject($select);
      $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
      $zonas = $results->toArray();

      // print_r($cat); die();
      foreach ($zonas as $key => $row) {
        $arr [] = array(
            'zona_id'           => $row ['zona_id'],
            'zona_descri'       => $row ['zona_descri'],
            'zona_categoria_id' => $row ['zona_categoria_id']
        );
      }

      // print_r($arr); die();

      if (!empty($arr)) {
        $json = new stdClass();
        $json->success = true;
        $json->categorias = $arr;
    		return $json;
      }else {
        $json = new stdClass();
        $json->success = false;
        $json->categorias = "No Existe la Zona.";
    		return $json;
      }
    }

    public function fetchOne($id)
    {
      echo "fetchone"; die;
    }

    public function create($data)
    {
      if ( $data->update == 'true') {
        // echo "ACTUALIZA";
        return $this->actualiza($data);
      }else {
        // echo "CREA";
        return $this->crea($data);
      }
    }

    public function crea($data)
    {
      try {
          $dataInsert = array(
              "zona_descri"       => utf8_decode($data->zona_descri),
              "zona_categoria_id" => $data->zona_categoria_id
          );
          $sql = new Sql($this->adapter);
          $insert = $sql->insert();
          $insert->into('zona');
          $insert->values($dataInsert);
          $insertString = $sql->getSqlStringForSqlObject($insert);
          $results = $this->adapter->query($insertString, Adapter::QUERY_MODE_EXECUTE);
          $json = new stdClass();
          $json->success = true;
          return $json;
        } catch (Exception $e) {
          $json = new stdClass();
          $json->success = false;
          $json->mensaje = "No se pudo ingresar la zona.";
          return $json;
        }
    }

    public function actualiza($data)
    {
      try {
          $id = $data->zona_id;
          $sql = new Sql($this->adapter);
          $update = $sql->update();
          $update->table('zona');
          $update->set(array(
            "zona_descri"       => utf8_decode($data->zona_descri),
            "zona_categoria_id" => $data->zona_categoria_id,
            "zona_id"           => $data->zona_id
          ));
          $update->where->equalTo("zona_id", $id);
          $updateString = $sql->getSqlStringForSqlObject($update);
          $this->adapter->query($updateString, Adapter::QUERY_MODE_EXECUTE);
          $json = new stdClass();
          $json->success = true;
          return $json;
        } catch (Exception $e) {
          $json = new stdClass();
          $json->success = false;
          $json->mensaje = "No se pudo actualizar el registro.";
          return $json;
        }
    }

    public function delete($id)
    {
      try {
        $sql = new Sql($this->adapter);
        $select = $sql->select();
        $select->from('zona');
        $select->where('zona_id = '.$id);
        $selectString = $sql->getSqlStringForSqlObject($select);
        $results = $this->adapter->query($selectString, Adapter::QUERY_MODE_EXECUTE);
        $categoria = $results->toArray();

        if (!empty($categoria)) {
          $sql = new Sql($this->adapter);
          $delete = $sql->delete();
          $delete->from('zona');
          $delete->where(array(
              'zona_id' => $id
          ));
          $deleteString = $sql->getSqlStringForSqlObject($delete);
          //echo $deleteString; die;
          $results = $this->adapter->query($deleteString, Adapter::QUERY_MODE_EXECUTE);
          $oResponse = new Response();
          $response = new stdClass;
          $response->success = true;
          $response->mensaje = "Zona eliminada.";
          $oResponse->setContent(json_encode($response));
          return $oResponse;
        }else{
          $oResponse = new Response();
          $response = new stdClass;
          $response->success = false;
          $response->mensaje = "La zona no puede ser eliminada.";
          $oResponse->setContent(json_encode($response));
          return $oResponse;
        }
      } catch (Exception $e) {
        $json = new stdClass();
        $json->success = false;
        $json->mensaje = "No se pudo eliminar el zona.";
        return $json;
      }
    }

}
