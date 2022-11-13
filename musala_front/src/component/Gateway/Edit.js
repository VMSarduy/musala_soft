
import React, {useState,useEffect} from 'react';
import {Form, Input, Button, Modal} from 'antd';
import { InfoCircleOutlined, NodeIndexOutlined, PlusOutlined } from '@ant-design/icons';
import DeviceForm from '../Peripheral/DeviceForm';
import getAxiosInstance from '../../api/get-axios-instance';
import '../styles.css'


const axios = getAxiosInstance();

function cancel() { 
  Modal.destroyAll();    
 }

function isValidIP(str) {
  let verdad = str.split('.');
  if(verdad.length !== 4)
    return false;
  for(let i in verdad){
    if(!/^\d+$/g.test(verdad[i])
    ||+verdad[i]>255
    ||+verdad[i]<0
    ||/^[0][0-9]{1,2}/.test(verdad[i]))
      return false;
  }
  return true
}

function Edit(props) { 
  
  const {
    gatewayEdit,
    editG,
    successForEdit,
  } = props;

  const onFinish = (values) => {    
    gatewayEdit(values);
  };

  const [data, setData] = useState([]);
  const [dataValid, setDataValid] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    axios.get(`http://localhost:3001/peripheral_device/?gatewayId=${editG.id}`, {headers: {} }).then( result => setData(result.data.result))  
    .catch(function (error) {console.log(error);}).finally(()=> setLoading(false))     
    
    axios.get('http://localhost:3001/gateway/', {headers: {} }).then( result => setDataValid(result.data.result))  
    .catch(function (error) {console.log(error);}).finally()
  
  }, [editG])

  const {info} = Modal; 

  const peripheralAdd = details => {
   
    axios.post(`http://localhost:3001/peripheral_device/`,{ ...details}).then( () => successForEdit(editG))
    .catch(function (error) {console.log(error);});
    }

    function serialUnique(str) {
    
      for(let i=0; i<dataValid.length;i++){
        if(editG.serial_mumber!==str && dataValid[i].serial_mumber === str)
        return false;
      }
    
      return true
    }  
    
  function addPeripherald(){
   
    info({

      title:"Peripheral device" ,
      icon: <NodeIndexOutlined />,        
      width:1000,
      closable:'true',
      className:'hidden-footer',
      okButtonProps:{ disabled: true },
      content:<DeviceForm peripheralAdd={peripheralAdd} id={editG.id}/>,

    });

  }

    return(

      <div>

      <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 22,
      }}
      layout="vertical"
      initialValues={{ 

        id:editG.id,
        serial_mumber:editG.serial_mumber,
        human_readable_name:editG.human_readable_name,
        ipv4_address:editG.ipv4_address,           
                  
      }}
        onFinish={onFinish}
              
    >

      <Form.Item name="id"></Form.Item>
      
      <Form.Item
          name="serial_mumber"
          rules={[
            {
              required: true,
              message: 'Please enter a valid serial mumber!',
            },

            () => ({
              validator(_, value) {
                if (serialUnique(value)||value==="") {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('This serial number already exists, please use another'));
              },
            }),

          ]}
          label="Serial Number"
          tooltip={{
            title: 'This is a required field',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Correo del empleado" />
      </Form.Item>

      <Form.Item
          name="human_readable_name"
          rules={[
            {
              required: true,
              message: 'Please enter a valid name!',
            },
          ]}
          label="Readable Name"
          tooltip={{
            title: 'This is a required field',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Readable Name of Gateway" />
      </Form.Item>

      <Form.Item
          name="ipv4_address"
          rules={[
            {
              required: true,
              message: 'Please enter a valid IPv4!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (isValidIP(value)||value==="") {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('This IPv4 is not valid, please enter a valid IPv4'));
              },
            }),

          ]}
          label="IPv4 Address"
          tooltip={{
            title: 'This is a required fiel',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="IPv4 Address of Gateway" />
          
      </Form.Item>

      <Form.Item 
          label="Amount of peripheral"             
          >
          <Input disabled style={{ width: '100%' }} readOnly value={data.length} placeholder="Amount of peripheral" />
      </Form.Item>

      <Form.Item >      
        <Button type="dashed" disabled={data.length>9} loading={ loading } onClick={() => addPeripherald()}  block icon={<PlusOutlined />}>{(data.length>9) ? ('Peripherals devices full') : ('Create Peripheral device')}</Button>         
      </Form.Item>

      <br></br><br></br>
      
      <Form.Item shouldUpdate>
          {() => (            
            <nav className="boxes">
            <Button  ghost type="primary" htmlType="submit"> Submit </Button> 
            <Button  ghost type="danger" onClick={() => cancel()}>Cancel</Button>                        
            </nav>             
          )}
        </Form.Item>           

      </Form>

      </div>

    )

}

export default Edit;