import React, {useState,useEffect} from 'react';
import { Table, Space, Button, Modal} from 'antd';
import getAxiosInstance from '../../api/get-axios-instance';
import DeviceView from './DeviceView';
import { EyeOutlined, EditOutlined, DeleteOutlined, SmileOutlined} from '@ant-design/icons';
import DevicesEdit from './DevicesEdit'
import '../styles.css'

const axios = getAxiosInstance();

const DevicesList = () => {  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [peripheral_device, Setperipheral_device] = useState();
  
  const { info, error, success } = Modal;
  const { Column } = Table;
 
    useEffect(() => {

      setLoading(true);

      axios.get('http://localhost:3001/peripheral_device/', {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally(()=> setLoading(false))     
      
    
    }, [])

  const Peripheral_deviceedit = dataEdit => {  
       
    if(dataEdit !=="" &&  peripheral_device !== dataEdit){
      axios.put(`http://localhost:3001/peripheral_device/${dataEdit.id}`,{ ...dataEdit}).then(() => Success())
      .catch(function (error) {console.log(error);}); 
      }
  }

  function PeripheraldView() { 
    Modal.destroyAll();    
   }

    function ForVew(viewG){
      
      info({

        title:"Peripheral Device",
        icon: <EyeOutlined />,        
        width:1400,
        className:'hidden-footer',
        closable:'true',
        content:<DeviceView PeripheraldView={PeripheraldView} viewG={viewG}/>,

      });
      
    }    

    function ForEdit(editP){
      
      Setperipheral_device(editP);

      info({

        title:"Edit Peripheral device" ,
        icon: <EditOutlined />,        
        width:1400,
        className:'hidden-footer',
        closable:'true',
        content:<DevicesEdit Peripheral_deviceedit={Peripheral_deviceedit} editP={editP} SuccessForEdit={SuccessForEdit}/>,

      });

    } 

    function ForDelete(deleteG) {
      
      error({

        title: 'Sure you want to remove this peripheral device',
        icon: <DeleteOutlined />,
        okText:'Delete',
        closable:'true',
        okButtonProps:{ghost:"true", type:"danger"},
        content: 'This peripheral device will be permanently removed from the database. This action cannot be reversed...',
        onOk() {
          axios.delete(`http://localhost:3001/peripheral_device/${deleteG.id}`).then(() => Success()).catch(function (error) {console.log(error);});
        },
                 
      });
    }
    
    function Success(){

      setLoading(true);
      axios.get('http://localhost:3001/peripheral_device/', {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally(()=> setLoading(false))

      success({

        title:"Successful operation" ,
        icon: <SmileOutlined />,        
        content:"Your operation was successful!",
        onOk: Modal.destroyAll(),

      });
    }

    function SuccessForEdit(Peripheral_deviceedit){
      ReloadForEdit(Peripheral_deviceedit)
      success({

        title:"Successful operation" ,
        icon: <SmileOutlined />,        
        content:"Your operation was successful!",
        
      });
    }

    function ReloadForEdit(Peripheral_deviceedit){      
      
      Modal.destroyAll();      
      axios.get(`http://localhost:3001/peripheral_device/` + Peripheral_deviceedit.id, {headers: {} }).then(function (result) {ForEdit(result.data);})  
      .catch(function (error) {console.log(error);})

    }
   
    return(      

        
          
      <div className="card">
            
            <div className="card-header">
            <Space size="middle">
            <Button></Button>
            </Space> 
            </div>  

        <Table dataSource={data} loading={loading} >
          <Column title="UID" dataIndex='id' rowKey='id' />
          <Column title="Vendor" dataIndex='vendor' rowKey="vendor" />
          <Column title="Date Created" dataIndex='date_created'rowKey="date_created" />             
          <Column title="Status" dataIndex='status'rowKey="status" />
          <Column title="Gateway Id" dataIndex='gatewayId'rowKey="gatewayId" />  
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
export default DevicesList;