import React, {useState,useEffect} from 'react';
import { Table, Space, Button, Modal} from 'antd';
import getAxiosInstance from '../../api/get-axios-instance';
import View from './View';
import { EyeOutlined, EditOutlined, DeleteOutlined, SmileOutlined, GatewayOutlined, AppstoreAddOutlined} from '@ant-design/icons';
import Create from '../Gateway/Create'
import Edit from '../Gateway/Edit'
import '../styles.css'

const axios = getAxiosInstance();

const List = () => {  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gateway, Setgateway] = useState();
  
  const { info, error, success } = Modal;
  const { Column } = Table;
 
    useEffect(() => {

      setLoading(true);

      axios.get('http://localhost:3001/gateway/', {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally(()=> setLoading(false))     
      
    
    }, [])
  
  const Gateway = details => { 
    
    if(details !=="" &&  details !== []  ){
     
      axios.post('http://localhost:3001/gateway/', { ...details}).then(() => Success())
      .catch(function (error) {console.log(error);}); 
    }
  }

  const Gatewayedit = dataEdit => {  
       
    if(dataEdit !=="" &&  gateway !== dataEdit &&  gateway !== [] ){
      axios.put(`http://localhost:3001/gateway/${dataEdit.id}`,{ ...dataEdit}).then(() => Success())
      .catch(function (error) {console.log(error);}); 
      }
  }

  function GatewayView() { 
    Modal.destroyAll();    
   }

    function ForCreate(){

      info({

        title:"New Gateway" ,
        icon: <GatewayOutlined />, 
        width:1000,
        closable:'true',
        className:'hidden-footer',        
        content:<Create Gateway={Gateway}/>,

      });
      
    }

    function ForVew(viewG){
      
      info({

        title:"Gateway",
        icon: <EyeOutlined />,        
        width:1400,
        className:'hidden-footer',
        closable:'true',                
        content:<View GatewayView={GatewayView} viewG={viewG}/>,

      });
      
    }    

    function ForEdit(editG){
      
      Setgateway(editG);

      info({

        title:"Edit Gateway" ,
        icon: <EditOutlined />,        
        width:1400,
        className:'hidden-footer',
        closable:'true',
        content:<Edit Gatewayedit={Gatewayedit} editG={editG} SuccessForEdit={SuccessForEdit}/>,

      });

    } 

    function ForDelete(deleteG) {
      
      error({

        title: 'Sure you want to remove this Gateway',
        icon: <DeleteOutlined />,
        okText:'Delete',
        closable:'true',
        okButtonProps:{ghost:"true", type:"danger"},
        content: 'This Gateway will be permanently removed from the database. This action cannot be reversed...',
        onOk(){axios.delete(`http://localhost:3001/gateway/${deleteG.id}`).then(() => Success()).catch(function (error) {console.log(error);});},
                 
      });
    }
    
    function Success(){

      setLoading(true);
      axios.get('http://localhost:3001/gateway/', {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally( ()=> setLoading(false))

      success({

        title:"Successful operation" ,
        icon: <SmileOutlined />,        
        content:"Your operation was successful!",
        onOk: Modal.destroyAll(),

      });
    }

    function SuccessForEdit(Gatewayedit){
      ReloadForEdit(Gatewayedit)
      success({

        title:"Successful operation" ,
        icon: <SmileOutlined />,        
        content:"Your operation was successful!",
      });
    }

    function ReloadForEdit(Gatewayedit){      
      Modal.destroyAll();
      
      axios.get(`http://localhost:3001/gateway/` + Gatewayedit.id, {headers: {} }).then(function (result) {ForEdit(result.data);})  
      .catch(function (error) {console.log(error);})      

    }
   
    return(      
          
      <div className="card">
            
            <div className="card-header">
            <Space size="middle">
            <Button type="primary" ghost icon={<AppstoreAddOutlined />}  onClick={() => ForCreate()}>Add Gateway</Button>                  
            </Space> 
            </div>        

        <Table dataSource={data} loading={loading} >
          <Column title="Serial Number" dataIndex='serial_mumber' rowKey='serial_mumber' />
          <Column title="Readable Name" dataIndex='human_readable_name' rowKey="human_readable_name" />
          <Column title="IPv4 Address" dataIndex='ipv4_address'rowKey="ipv4_address" />             
          <Column
            title="Action"
            rowKey="action"
            render={(data) => (
          <Space size="middle">
            <Button  icon={<EyeOutlined />}   onClick={() => ForVew(data)}></Button>                                          
            <Button  icon={<EditOutlined />}   onClick={() => ForEdit(data)}></Button>                                            
            <Button  icon={<DeleteOutlined />}  onClick={() => ForDelete(data)}></Button>            
          </Space>
      )}
          />    
        </Table> 

        
                
      </div>    
      
    );

   

}
export default List;