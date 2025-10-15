import Button from '../components/ui/Button'
import Input from '../components/ui/Input'


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loginSchema } from '../validate/UserValidate';

function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend validation with Zod
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const message = result.error.issues.map((err) => err.message).join(', \n');
            toast.error(message);
            return;
        }

        // Submit data to backend
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
                formData,
                { withCredentials : true }
            );
            console.log(response);
            if (response) {
                toast.success('Signed In Successfully!');
                setFormData({ email: '', password: '' });
                navigate('/dashboard');
            }
        } catch (error: any) {
            console.error('Unexpected error:', error);
            console.log(error)
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="md:px-12 md:py-8 w-screen min-h-screen bg-[#F2F2F2]">
            {/* Logo */}
            <div className="px-4 py-4 md:px-10">
                <img
                    className="h-10 md:w-24 md:h-12"
                    src="./public/images/logo.png"
                    alt="Logo"
                />
            </div>

            <div className="flex justify-center flex-col">
                {/* Heading */}
                <div className="md:pt-10 pt-8 flex justify-center">
                    <h1 className="md:text-6xl text-4xl text-[#3B3B3B] font-neogrotesk-regular">
                        ADMIN LOGIN
                    </h1>
                </div>

                {/* Description */}
                <div className="flex justify-center">
                    <p className="font-neogrotesk-regular text-[#8E8888] md:mt-4 mt-2 px-2 md:px-[440px] text-center">
                        <span className="block text-[9px] md:text-base">
                            Access the Nuvée Admin Dashboard to manage products, users, and orders efficiently.
                            
                        </span>
                    </p>
                </div>

                {/* Form */}
                <div className="flex justify-center md:mt-8 mt-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="text-xs md:text-base h-10 w-72 md:px-10 px-4 md:h-16 md:w-[550px]"
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="text-xs md:text-base h-10 w-72 md:px-10 px-4 md:h-16 md:w-[550px]"
                        />
                        <h1 className='text-[#3B3B3B] font-neogroteskessalt-light underline'>Forgot Password</h1>
                        <Button
                            type="submit"
                            name="LOGIN"
                            className="mt-3 text-[10px] md:text-base h-10 w-36 px-4 md:px-10 md:h-16 md:w-[200px]"
                        />
                    </form>
                </div>

                {/* Footer */}
               
            </div>
        </div>
    );
}

export default AdminLogin;


















