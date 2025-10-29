import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { signupSchema } from '../validate/UserValidate';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
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
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const message = result.error.issues.map((err) => err.message).join(', \n');
      toast.error(message);
      return;
    }

    // Submit data to backend
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        formData
      );

      if (response) {
        toast.success('Account Created successfully!');
        setFormData({ username: '', email: '', password: '' });
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="md:px-12 md:py-8 w-screen min-h-screen bg-[#F2F2F2]">
      {/* Logo */}
      <div className="px-4 py-4 md:px-10">
        <img
          className="h-10 md:w-24 md:h-12"
          src="https://res.cloudinary.com/djbawwbzi/image/upload/v1761751553/logo_zidtnt.png"
          alt="Logo"
        />
      </div>

      <div className="flex justify-center flex-col">
        {/* Heading */}
        <div className="md:pt-10 pt-8 flex justify-center">
          <h1 className="md:text-6xl text-4xl text-[#3B3B3B] font-neogrotesk-regular">
            SIGN UP
          </h1>
        </div>

        {/* Description */}
        <div className="flex justify-center">
          <p className="font-neogrotesk-regular text-[#8E8888] md:mt-4 mt-2 px-2 md:px-[440px] text-center">
            <span className="block text-[9px] md:text-base">
              By accessing your Nuvée Account you can track and manage your orders
              and also save multiple addresses.
            </span>
          </p>
        </div>

        {/* Form */}
        <div className="flex justify-center md:mt-8 mt-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
            <Input
              type="text"
              name="username"
              placeholder="FULLNAME"
              value={formData.username}
              onChange={handleChange}
              className="text-xs md:text-base h-10 w-72 md:px-10 px-4 md:h-16 md:w-[550px]"
            />
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
            <Button
              type="submit"
              name="SIGNUP"
              className="mt-3 text-[10px] md:text-base h-10 w-36 px-4 md:px-10 md:h-16 md:w-[200px]"
            />
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center flex-col mt-2 md:mt-4">
          <h1 className="text-[#8E8888] md:text-base text-[10px] font-neogrotesk-regular">
            Have an Account Already?
          </h1>
          <h1 className="underline md:text-base text-xs font-neogroteskessalt-light cursor-pointer" onClick={()=>navigate("/login")}>
            Login
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Signup;
