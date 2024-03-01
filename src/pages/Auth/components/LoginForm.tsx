/**
 *
 * LoginForm
 *
 */

import { Form, Button, Checkbox, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginDto } from '@/api/auth-proxies';
import { usePtcmAuthStore } from '@/stores/ptcmAuthStore';
import useAuthStore from '@/stores/authStore';
import { saveToken, getToken } from '@/utils/cookie';

export function LoginForm() {
  const login = usePtcmAuthStore(state => state.login)
  const isLoading = usePtcmAuthStore(state => state.isLoading)
  const error = usePtcmAuthStore(state => state.error)
  const isLoggedIn = usePtcmAuthStore(state => state.isLoggedIn);
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();
  

  const onFinish = async (values: LoginDto) => {
    await login(values);
    if (isLoggedIn) {
      // console.log('token is: ', token);
      // saveToken(token ? token : '');
      // const testCookie = getToken();
      // console.log('token is: ', testCookie);
      navigate('/');
    }
  };

  return (
    <Form
      layout="vertical"
      name="loginForm"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      size="middle"
      style={{ width: '100%' }}
    >
      <Form.Item
        label="Email"
        name="email"
        hasFeedback
        rules={[
          {
            type: 'email',
            message: 'Email invalid',
          },
          {
            required: true,
            message: 'Please enter password',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter password',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember</Checkbox>
      </Form.Item>
      {error && (
        <span style={{ color: 'red' }}>{error}, Please try again!</span>
      )}
      <div style={{ textAlign: 'end' }}>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            SignIn
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
