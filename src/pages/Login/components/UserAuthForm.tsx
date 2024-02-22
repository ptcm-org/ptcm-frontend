import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

// Services
import { loginService } from '@/services';

// Constants
import { API } from '@/constants/api';

// stores
import useAuthStore from '@/stores/authStore';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface LoginData {
  email: string;
  password: string;
}
interface loginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const { login } = useAuthStore();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data: loginResponse = await loginService.post(API.LOGIN, loginData);

      if (data) {
        login(data.accessToken, data.user);

        toast({
          title: 'Login success',
        });

        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: error.message,
          description: 'There was a problem with your request.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              name="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
