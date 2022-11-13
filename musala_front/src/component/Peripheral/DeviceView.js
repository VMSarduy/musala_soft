import React, { useState} from 'react';
import { Form, Input, DatePicker, InputNumber, Radio} from 'antd';
import moment from 'moment';
import '../styles.css'

const dateFormat = 'YYYY/MM/DD';

function DeviceView(props) {

  const {
    peripheraldView,
    viewG,    
  } = props;

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };

  const onFinish = values => {
    peripheraldView(values);    
  };

  
  return ( 

    
    
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
      vendor:viewG.vendor,
      date_created:moment(viewG.date_created, dateFormat),
      status:viewG.status, 
      gatewayId:viewG.gatewayId,
    }} 
    onFinish={onFinish}
    onValuesChange={onFormLayoutChange}
    size={componentSize}>      
      
      
      <Form.Item  label="Form size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>     

        <Form.Item
          name="id"
          label="UID"
          >
          <InputNumber  disabled style={{ width: '100%' }} readOnly placeholder="UID of peripheral device" />
      </Form.Item>

      <Form.Item
          name="vendor"            
          label="Vendor"           
        >
          <Input  disabled style={{ width: '100%' }} readOnly placeholder="Vendor of peripheral device" />
      </Form.Item>    

      <Form.Item
          name="date_created"
          label="Date Created"            
        >
          <DatePicker disabled={true} format={dateFormat} />
      </Form.Item>

      <Form.Item
          name="status"            
          label="Status"           
        >
          <Input  disabled style={{ width: '100%' }} readOnly placeholder="Status of peripheral device" />
      </Form.Item>

      <Form.Item name="gatewayId"></Form.Item>
      
      </Form>
    
  );
}

export default DeviceView;
 


