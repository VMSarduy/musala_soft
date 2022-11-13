import React, { useState} from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import './styles.css'

function LoginForm(props) {  
  const {
    Login,
    error,    
  } = props;
  const [details, SetDetails] = useState({email:"", password:""});
  const onFinish = (values) => {
    
    Login(details);     
  };

    return (
      
      <div>
      <br></br>
      <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 22,
      }}
      layout="vertical"      
      onFinish={onFinish}
              
    >
       {(error !== "") ? (<div>{error}</div>) : ""}
               
        <Form.Item     
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter a valid email!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} 
            type="email"
            placeholder="Email"
            onChange={e => SetDetails({...details, email: e.target.value})} value={details.email}
            />
        </Form.Item>
        
        <Form.Item        
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter a valid password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={e => SetDetails({...details, password: e.target.value})} value={details.password}
          />
        </Form.Item>   
        
        <Form.Item shouldUpdate>
          {() => (            
            <nav className="boxes">
            <Button ghost type="primary" htmlType="submit"> Loging </Button>             
            </nav>             
          )}
        </Form.Item>  

      </Form>
      </div>
        
       
    );
  };
export default LoginForm;