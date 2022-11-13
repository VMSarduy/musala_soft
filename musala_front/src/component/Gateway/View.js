import React, { useState} from 'react';
import {Form, Input, Radio, Button, Modal} from 'antd';
import DevicesFilter from '../Peripheral/DevicesFilter';
import '../styles.css'

function cancel() { 
  Modal.destroyAll();    
}  

function View(props) { 
  
  const {
    gatewayView,
    viewG,    
  } = props;

    
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };
  
    const onFinish = (values) => {
      gatewayView(values);
    };  
  
      return(
        
        <div><br></br><br></br>

        <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 22,
        }}
        layout="vertical"
        initialValues={{          
          size: componentSize,
          id:viewG.id,
          serial_mumber:viewG.serial_mumber,          
          human_readable_name:viewG.human_readable_name,          
          ipv4_address:viewG.ipv4_address,
          peripheral_device:viewG.peripheral_device,         
        }}

        onFinish={onFinish}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        
      >
        <Form.Item  label="Form size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
          
        <Form.Item 
            name="serial_mumber"            
            label="Serial Number"             
          >
            <Input disabled style={{ width: '100%' }} readOnly  placeholder="Serial Number of Gateway" />
        </Form.Item>
  
        <Form.Item
            name="human_readable_name"
            label="Readable Name"
            >
            <Input disabled style={{ width: '100%' }} readOnly placeholder="Readable Name of Gateway" />
        </Form.Item>
  
        <Form.Item
            name="ipv4_address"
            label="IPv4 Address"
            >
            <Input disabled style={{ width: '100%' }} readOnly placeholder="IPv4 Address of Gateway" />
        </Form.Item>             
  
        <Form.Item >      
        <DevicesFilter dataR={viewG}/>         
       </Form.Item>

       <Form.Item shouldUpdate>
                     
            <nav className="boxes">
            <Button  ghost type="danger" onClick={() => cancel()}>Cancel</Button>                      
            </nav>             
        
        </Form.Item>

        </Form>        
        </div>

        
        
      )
  
  }
 
export default View;