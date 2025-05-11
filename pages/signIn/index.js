import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result.error) {
            setError(result.error);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{
                width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '10px'
            }}>
                <h1 className="">Sign In</h1>
                {error && <p className="">{error}</p>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Sign In
                </button>

            </form>
            <div className="mt-4">
                <p>Don't have an account? <a href="/signUp" >Sign Up</a></p>
            </div>
        </div>
    );
}