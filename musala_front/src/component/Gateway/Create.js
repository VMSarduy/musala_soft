import {Form, Input, Button, Modal} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import '../styles.css'

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

function Create(props) {    
const {gatewayCreate} = props;

const onFinish = (values) => {    
  gatewayCreate(values);
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
       
      }}
      onFinish={onFinish}
      
    >     

      <Form.Item
          name="serial_mumber"
          rules={[
            {
              required: true,
              message: 'Please enter a valid serial mumber!',
            },
          ]}
          label="Serial Number"
          tooltip={{
            title: 'This is a required field',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Serial Number of gateway" />
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
          <Input placeholder="Readable Name of gateway" />
      </Form.Item>

      <Form.Item
          name="ipv4_address"
          rules={[
            {
              required: true,
              message: 'Please enter a valid IPv4!',
            },
            () => ({
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
          <Input placeholder="IPv4 Address of gateway" />
          
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

export default Create;