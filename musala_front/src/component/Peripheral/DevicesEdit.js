
import {Form, Input, Button, DatePicker, Select} from 'antd';
import { InfoCircleOutlined, } from '@ant-design/icons';
import moment from 'moment';
import '../styles.css'

const dateFormat = 'YYYY/MM/DD';

function DevicesEdit(props) { 

  const {
    Peripheral_deviceedit,
    editP,    
  } = props;
  
  const onFinish = (values) => {    
    Peripheral_deviceedit(values);
  }; 
 
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

        id:editP.id,
        vendor:editP.vendor,
        date_created:moment(editP.date_created, dateFormat),
        status:editP.status,
        gatewayId:editP.gatewayId,        
                  
      }}
        onFinish={onFinish}
              
    >
        
      
        <Form.Item name="id"></Form.Item>

        <Form.Item
          name="vendor"
          rules={[
            {
              required: true,
              message: 'Please enter a valid vendor!',
            },
          ]}
          label="Vendor"
          tooltip={{
            title: 'This is a required field',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Vendor of peripheral device" />
      </Form.Item>

      <Form.Item
          name="date_created"
          rules={[
            {
              required: true,
              message: 'Please enter a valid date!',
            },
          ]}
          label="Date Created"
          tooltip={{
            title: 'This is a required fiel',
            icon: <InfoCircleOutlined />,
          }}
        >
          <DatePicker  format={dateFormat} />
      </Form.Item>

      <Form.Item
      name="status"
      label="Status"
      rules={[
        {
          required: true,
          message: 'Please enter a valid Status!',
        },
      ]}
      tooltip={{
        title: 'This is a required fiel',
        icon: <InfoCircleOutlined />,
      }}
      >
        <Select>
          <Select.Option value="online">online</Select.Option>
          <Select.Option value="offline">offline</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="gatewayId"></Form.Item>

      <Form.Item>
        
        <Form.Item shouldUpdate>
          {() => (            
            <nav className="boxes">            
            <Button  ghost type="primary" htmlType="submit"> Submit </Button>
            </nav>             
          )}
        </Form.Item>

      </Form.Item>                

      </Form>

      </div>

    )

}

export default DevicesEdit;