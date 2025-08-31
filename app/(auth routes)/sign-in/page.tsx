'use client';

import { login, RegisterRequestData } from '@/lib/api/clientApi';
import css from './SignIn.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';
import { ApiError } from '@/lib/api/clientApi';

const SignIn = () => {
    const router = useRouter();

    const [error, setError] = useState('');
    const setUser = useAuthStore((state) => state.setUser);


    // router.refresh()


    const handleSubmit = async (formData: FormData) => {
        try {

            const data = Object.fromEntries(formData) as RegisterRequestData
            const user = await login(data)
            console.log('Sign IN', user);
            if (user) {
                setUser(user);
                router.push('/profile');
            } else {
                setError("Invalid email or password");
            }

        } catch (error) {
            setError(
                (error as ApiError).response?.data?.error ??
                (error as ApiError).message ??
                'Oops... some error'
            )
            console.log('ERROR', error);

        }



    }

    return (
        <main className={css.mainContent}>
            <form className={css.form} action={handleSubmit}>
                <h1 className={css.formTitle}>Sign in</h1>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Log in
                    </button>
                </div>

                <p className={css.error}>{error}</p>
            </form>
        </main>

    )
}

export default SignIn;