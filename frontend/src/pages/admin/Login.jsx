import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setError('');
    try {
      await login(values.email, values.password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 dark:bg-maroon-deep">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg dark:bg-maroon"
      >
        <h1 className="font-heading text-2xl text-maroon dark:text-cream">
          Admin Login
        </h1>
        <p className="mt-1 text-sm text-maroon-deep/60 dark:text-cream/60">
          Rakhi Store dashboard
        </p>

        <label
          htmlFor="email"
          className="mt-6 block text-sm font-medium text-maroon-deep dark:text-cream"
        >
          Email
          <input
            id="email"
            type="email"
            autoComplete="username"
            {...register('email', { required: true })}
            className="mt-1 w-full rounded-lg border border-beige bg-cream px-3 py-2 text-maroon-deep focus:border-saffron focus:outline-none dark:border-maroon-deep dark:bg-maroon-deep dark:text-cream"
          />
        </label>

        <label
          htmlFor="password"
          className="mt-4 block text-sm font-medium text-maroon-deep dark:text-cream"
        >
          Password
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: true })}
            className="mt-1 w-full rounded-lg border border-beige bg-cream px-3 py-2 text-maroon-deep focus:border-saffron focus:outline-none dark:border-maroon-deep dark:bg-maroon-deep dark:text-cream"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg bg-saffron px-4 py-2 font-medium text-white transition hover:bg-saffron-light disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
