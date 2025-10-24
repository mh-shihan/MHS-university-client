/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from 'antd';
import { type FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { verifyToken } from '../utils/verifyToken';
import { useAppDispatch } from '../redux/hooks';
import { setUser, type TUser } from '../redux/features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import ReuseableForm from '../components/form/ReuseableForm';
import ReuseableInput from '../components/form/ReuseableInput';

type TUserInfo = {
  id: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const from = location.state?.from?.pathname || '/dashboard';

  // const { register, handleSubmit } = useForm({
  //   defaultValues: { id: 'A-0001', password: 'admin123' },
  // });

  const defaultValues = {
    userId: 'A-0001',
    password: 'admin123',
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging...');
    try {
      const userInfo: TUserInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success('Logged In Successfully!', { id: toastId, duration: 2000 });

      navigate(from, { replace: true });
    } catch (err) {
      toast.error('Something went wrong!', {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <ReuseableForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <ReuseableInput type="text" name="userId" label="ID" />
        <ReuseableInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </ReuseableForm>
    </Row>
  );
};

export default Login;
