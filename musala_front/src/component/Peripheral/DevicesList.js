import React, {useState,useEffect} from 'react';
import { Table, Space, Button, Modal, DatePicker, notification} from 'antd';
import getAxiosInstance from '../../api/get-axios-instance';
import DeviceView from './DeviceView';
import { EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import DevicesEdit from './DevicesEdit'
import '../styles.css'
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';

const axios = getAxiosInstance();

const DevicesList = () => {  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [peripheralDevice, setPeripheralDevice] = useState();
  
  const { info, error } = Modal;
  const { Column } = Table;
 
    useEffect(() => {

      setLoading(true);

      axios.get('http://localhost:3001/peripheral_device/', {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally(()=> setLoading(false))     
      
    
    }, [])

  const peripheralDeviceEdit = dataEdit => {  
       
    if(dataEdit !=="" &&  peripheralDevice !== dataEdit){
      axios.put(`http://localhost:3001/peripheral_device/${dataEdit.id}`,{ ...dataEdit}).then(() => success())
      .catch(function (error) {console.log(error);}); 
      }
  }

  function peripheraldView() { 
    Modal.destroyAll();    
   }

    function forVew(viewG){
      
      info({

        title:"Peripheral Device",
        icon: <EyeOutlined />,        
        width:1400,
        className:'hidden-footer',
        closable:'true',
        content:<DeviceView peripheraldView={peripheraldView} viewG={viewG}/>,

      });
      
    }    

    function forEdit(editP){
      
      setPeripheralDevice(editP);

      info({

        title:"Edit Peripheral device" ,
        icon: <EditOutlined />,        
        width:1400,
        className:'hidden-footer',
        closable:'true',
        content:<DevicesEdit peripheralDeviceEdit={peripheralDeviceEdit} editP={editP}/>,

      });

    } 

    function forDelete(deleteG) {
      
      error({

        title: 'Sure you want to remove this peripheral device',
        icon: <DeleteOutlined />,
        okText:'Delete',
        closable:'true',
        okButtonProps:{ghost:"true", type:"danger"},
        content: 'This peripheral device will be permanently removed from the database. This action cannot be reversed...',
        onOk() {
          axios.delete(`http://localhost:3001/peripheral_device/${deleteG.id}`).then(() => success()).catch(function (error) {console.log(error);});
        },
                 
      });
    }
    
    function success(){

      setLoading(true);
      axios.get('http://localhost:3001/peripheral_device/', {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally(()=> setLoading(false))

      Modal.destroyAll()

      notification['success']({
        message:"Successful operation",
        description:"Your operation was successful.",              
        })
    }

    return(
      
      <div>
            
        <div className="card-header">
          <Space size="middle"><Button></Button></Space> 
        </div>  
        <div>
          
          <Table dataSource={data} loading={loading} >
            <Column title="UID" dataIndex='id' rowKey='id' />
            <Column title="Vendor" dataIndex='vendor' rowKey="vendor" />
            <Column 
            title="Date Created"
            rowKey="date_created"
            render={(data) => (
              <DatePicker bordered={false} open={false} value={moment(data.date_created, dateFormat)}/>             
               )}
              /> 
            <Column title="Status" dataIndex='status'rowKey="status" />
            <Column title="Gateway Id" dataIndex='gatewayId'rowKey="gatewayId" />  
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
export default DevicesList;