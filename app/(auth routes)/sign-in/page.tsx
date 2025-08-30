'use client';

import { login, RegisterRequestData } from '@/lib/api/clientApi';
import css from './SignIn.module.css';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const router = useRouter();

    const handleSignIn = async (formData: FormData) => {
        const data = Object.fromEntries(formData) as RegisterRequestData
        const response = await login(data)
        console.log('Sign IN', response);
        if (response) {
            router.push('/profile');
        }
    }

    return (
        <main className={css.mainContent}>
            <form className={css.form} action={handleSignIn}>
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

                {/* <p className={css.error}>{error}</p> */}
            </form>
        </main>

    )
}

export default SignIn;