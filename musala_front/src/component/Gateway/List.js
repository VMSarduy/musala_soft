import React, {useState,useEffect} from 'react';
import { Table, Space, Button, Modal, notification } from 'antd';
import getAxiosInstance from '../../api/get-axios-instance';
import View from './View';
import { EyeOutlined, EditOutlined, DeleteOutlined, GatewayOutlined, AppstoreAddOutlined} from '@ant-design/icons';
import Create from '../Gateway/Create'
import Edit from '../Gateway/Edit'
import '../styles.css'

const axios = getAxiosInstance();

const List = () => {  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gateway, setGateway] = useState();
  
  const { info, error } = Modal;
  const { Column } = Table;
 
    useEffect(() => {

      setLoading(true);

      axios.get('http://localhost:3001/gateway/', {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally(()=> setLoading(false))     
      
    
    }, [])
  
  const gatewayCreate = details => { 
    
    if(details !=="" &&  details !== []  ){
     
      axios.post('http://localhost:3001/gateway/', { ...details}).then(() => success())
      .catch(function (error) {console.log(error);}); 
    }
  }

  const gatewayEdit = dataEdit => {  
       
    if(dataEdit !=="" &&  gateway !== dataEdit &&  gateway !== [] ){
      axios.put(`http://localhost:3001/gateway/${dataEdit.id}`,{ ...dataEdit}).then(() => success())
      .catch(function (error) {console.log(error);}); 
      }
  }

  function gatewayView() { 
    Modal.destroyAll();    
   }

    function forCreate(){

      info({

        title:"New Gateway" ,
        icon: <GatewayOutlined />, 
        width:1000,
        closable:'true',
        className:'hidden-footer',        
        content:<Create gatewayCreate={gatewayCreate}/>,

      });
      
    }

    function forVew(viewG){
      
      info({

        title:"Gateway",
        icon: <EyeOutlined />,        
        width:1400,
        className:'hidden-footer',
        closable:'true',                
        content:<View gatewayView={gatewayView} viewG={viewG}/>,

      });
      
    }    

    function forEdit(editG){
      
      setGateway(editG);

      info({

        title:"Edit Gateway" ,
        icon: <EditOutlined />,        
        width:1400,
        className:'hidden-footer',
        closable:'true',
        content:<Edit gatewayEdit={gatewayEdit} editG={editG} successForEdit={successForEdit}/>,

      });

    } 

    function forDelete(deleteG) {
      
      error({

        title: 'Sure you want to remove this Gateway',
        icon: <DeleteOutlined />,
        okText:'Delete',
        closable:'true',
        okButtonProps:{ghost:"true", type:"danger"},
        content: 'This Gateway will be permanently removed from the database. This action cannot be reversed...',
        onOk(){axios.delete(`http://localhost:3001/gateway/${deleteG.id}`).then(() => success()).catch(function (error) {console.log(error);});},
                 
      });
    }
    
    function success(){
      
      setLoading(true);
      axios.get('http://localhost:3001/gateway/', {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally( ()=> setLoading(false))
      
      Modal.destroyAll()

      notification['success']({
        message:"Successful operation",
        description:"Your operation was successful.",              
        })
    }

    function successForEdit(gatewayEdit){     
      
      Modal.destroyAll()

      axios.get(`http://localhost:3001/gateway/` + gatewayEdit.id, {headers: {} }).then(function (result) {forEdit(result.data);})  
      .catch(function (error) {console.log(error);})

      notification['success']({
        message:"Successful operation",
        description:"Your operation was successful.",              
        })           
    } 
   
    return(      
          
      <div className="card">

        <div className="card-header">
          <Space size="middle">
            <Button type="primary" ghost icon={<AppstoreAddOutlined />}  onClick={() => forCreate()}>Add Gateway</Button>                  
          </Space> 
        </div>

        <div >         

          <Table dataSource={data} loading={loading} >
            <Column title="Serial Number" dataIndex='serial_mumber' rowKey='serial_mumber' />
            <Column title="Readable Name" dataIndex='human_readable_name' rowKey="human_readable_name" />
            <Column title="IPv4 Address" dataIndex='ipv4_address'rowKey="ipv4_address" />             
            <Column
              title="Action"
              rowKey="action"
              render={(data) => (
            <Space size="middle">
              <Button  icon={<EyeOutlined />}   onClick={() => forVew(data)}></Button>                                          
              <Button  icon={<EditOutlined />}   onClick={() => forEdit(data)}></Button>                                            
              <Button  icon={<DeleteOutlined />}  onClick={() => forDelete(data)}></Button>            
            </Space>
        )}
            />    
          </Table>

        </div>          
      </div>
    );
}
export default List;