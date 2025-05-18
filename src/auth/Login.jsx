import { useEffect, useState } from 'react';
import './login.css'; // make sure this is scoped correctly
import { supabase } from '../../SupabaseClient';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';  // Import Google icon from react-icons


const Login = () => {
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUp = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            console.error('Google sign-in error:', error.message);
        };
    }

    useEffect(() => {
        if (session) {
            navigate('/');
        }
    }, [session, navigate]);
    // Set background image only on login mount
    useEffect(() => {
        const bgDiv = document.querySelector('.pizza-bg');
        const primaryUrl = 'https://pngimg.com/uploads/pizza/pizza_PNG44010.png';
        const fallbackUrl = 'https://www.pngall.com/wp-content/uploads/2016/04/Pizza-PNG.png';

        const img = new Image();
        img.src = primaryUrl;
        img.onload = () => {
            if (bgDiv) bgDiv.style.backgroundImage = `url('${primaryUrl}')`;
        };
        img.onerror = () => {
            if (bgDiv) bgDiv.style.backgroundImage = `url('${fallbackUrl}')`;
        };

        return () => {
            // Cleanup background when component unmounts
            if (bgDiv) bgDiv.style.backgroundImage = 'none';
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({ email, password });
    };
    const signUpWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            console.error('Google sign-in error:', error.message);
        }
    }
    return (
        <div className="login-page-container relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
            {/* Background only for login page */}
            <div className="pizza-bg absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10 z-0" />

            <div className="relative w-full max-w-md z-10">
                <div className="crystal-form bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-lg">Pizza Paradise</h1>
                        <p className="text-gray-800 text-lg mt-2">Login to savor your pizza!</p>
                    </div>


                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="mt-1 w-full px-4 py-2 bg-white bg-opacity-70 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="mt-1 w-full px-4 py-2 bg-white bg-opacity-70 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                            />
                        </div>
                        <button
                            onClick={signUp}
                            className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 flex items-center justify-center space-x-4 shadow-md transition-all"
                            type='button'
                        >
                            <FaGoogle size={24} className="text-blue-600" /> {/* Google logo */}
                            <span className="font-semibold text-base">Sign in with Google</span>
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition font-semibold shadow-lg text-lg"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6">
                        {/* First row with "Don't have an account?" and "Sign Up" */}
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-800">
                                Dont have an account?{' '}
                            </p>
                            <a href="/signup" className="text-gray-900 hover:underline font-medium">
                                Sign Up
                            </a>
                        </div>

                        {/* Second row with "Forgot Password?" aligned to the right */}
                        <div className="mt-2 flex justify-end">
                            <p className="text-sm text-gray-800">
                                <a href="/forgot-password" className="text-gray-900 hover:underline">
                                    Forgot Password?
                                </a>
                            </p>
                        </div>
                    </div>


                </div>

                {/* Animated Pizza Wheel */}
                <div className="flex justify-center mt-6">
                    <div className="w-28 h-28 relative pizza-wheel">
                        <div
                            className="absolute inset-0 flex items-center justify-center pizza-slice"
                            style={{ transform: 'rotate(315deg)' }}
                        >
                            <span className="text-4xl">🍕</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
