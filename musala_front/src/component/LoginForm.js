import React, { useState} from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import './styles.css'
function LoginForm({Login, error}) {  
  
  const [details, SetDetails] = useState({email:"", password:""});
  const onFinish = (values) => {
    
    Login(details);     
  };

    return (
      
      <div>
        
        <br></br>
        
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}      
     >
       {(error !== "") ? (<div className='App'>{error}<br></br></div>) : ""}
               
        <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
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
           onChange={e => SetDetails({...details, email: e.target.value})} value={details.email}/>
        </Form.Item>
        
        <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
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
        
        <Form.Item shouldUpdate
        wrapperCol={{
          offset: 4,
          span: 16,
        }}>
          {() => (            
            <nav className="boxes">
            <Button   type="primary" htmlType="submit"> Loging </Button>             
            </nav>             
          )}
        </Form.Item>  

      </Form>
      </div>
        
       
    );
  };
export default LoginForm;