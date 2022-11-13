import React, {useState,useEffect} from 'react';
import { Table, Space, Button, Modal, DatePicker} from 'antd';
import getAxiosInstance from '../../api/get-axios-instance';
import DeviceView from './DeviceView';
import { EyeOutlined, EditOutlined, DeleteOutlined, SmileOutlined,} from '@ant-design/icons';
import DevicesEdit from './DevicesEdit'
import View from '../Gateway/View';
import '../styles.css'
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';

const axios = getAxiosInstance();

const DevicesFilter = (props) => {  
  const {dataR} = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [peripheral_device, Setperipheral_device] = useState();
  
  const { info, error, success } = Modal;
  const { Column } = Table;
 
    useEffect(() => {

      setLoading(true);

      axios.get(`http://localhost:3001/peripheral_device/?gatewayId=${dataR.id}`, {headers: {} }).then( result => setData(result.data.result))  
      .catch(function (error) {console.log(error);}).finally(()=> setLoading(false))     
      
    
    }, [dataR])

  const Peripheral_deviceedit = dataEdit => {  
       
    if(dataEdit !=="" &&  peripheral_device !== dataEdit){
      axios.put(`http://localhost:3001/peripheral_device/${dataEdit.id}`,{ ...dataEdit}).then(() => Success(dataR))
      .catch(function (error) {console.log(error);}); 
      }
  }

  function PeripheraldView() { 
    Modal.destroyAll();    
   }

   function GatewayView() { 
    Modal.destroyAll();    
   }

   function ForVewF(viewG){
      
    info({

      title:"Gateway",
      icon: <EyeOutlined />,        
      width:1400,
      className:'hidden-footer',
      closable:'true',                
      content:<View GatewayView={GatewayView} viewG={viewG}/>,

    });
    
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
        content:<DevicesEdit Peripheral_deviceedit={Peripheral_deviceedit} editP={editP} />,

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
          axios.delete(`http://localhost:3001/peripheral_device/${deleteG.id}`).then(() => Success(dataR)).catch(function (error) {console.log(error);});
        },
                 
      });
    }
    
    function Success(gateway){

      setLoading(true);
      axios.get(`http://localhost:3001/gateway/` + gateway.id, {headers: {} }).then(result => ForVewF(result.data))  
        .catch(function (error) {console.log(error);});

      success({

        title:"Successful operation" ,
        icon: <SmileOutlined />,        
        content:"Your operation was successful!",
        onOk: Modal.destroyAll(),

      });
    }
     
   
    return(
      
      <div className="card">
        
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
export default DevicesFilter;