'use client';

import { RegisterRequestData, register } from '@/lib/api/clientApi';
import css from './SignUp.module.css';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const router = useRouter();
    const handleSignUp = async (formData: FormData) => {
        const data = Object.fromEntries(formData) as RegisterRequestData
        const response = await register(data)
        console.log('REGISTER', response);
        if (response) {
            router.push('/profile');
        }
    }

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} action={handleSignUp}>
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
                        Register
                    </button>
                </div>

                <p className={css.error}>Error</p>
            </form>
        </main>

    )
}

export default SignUp;