"use client"
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        verifyPassword?: string;
        apiError?: string;
    }>({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        verifyPassword: "",
    });
    
    const isButtonDisabled = 
        formData.email?.trim() === "" || 
        formData.password?.trim() === "" || 
        formData.verifyPassword?.trim() === "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [id]: "", apiError: "" }));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors: { email?: string; password?: string; verifyPassword?: string } = {};
        
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }
        
        if (!formData.verifyPassword) {
            newErrors.verifyPassword = "Please verify your password";
        } else if (formData.password !== formData.verifyPassword) {
            newErrors.verifyPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (!validateForm()) return;
            // Registration logic will go here
            console.log("Registration form submitted:", formData);
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleVerifyPasswordVisibility = () => {
        setShowVerifyPassword(!showVerifyPassword);
    };

    return (
        <div className="grid w-full min-h-screen md:grid-cols-2">
            {/* Left Side - Logo Section */}
            <div className="flex flex-col items-center justify-center p-8">
                <div className="flex flex-col items-center justify-center w-full max-w-md">
                    <Image 
                        src="/logo/ShelfSearch.svg"
                        width={250}
                        height={250}
                        alt="ShelfSearch Logo"
                    />
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800">
                <div className="w-full max-w-md">
                    <h1 className="mb-2 text-2xl font-semibold">Create Account</h1>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                        Join ShelfSearch platform and discover amazing features
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                name="email"
                                className="mt-1 bg-white dark:bg-gray-950"
                                placeholder="Example@email.com" 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative mt-1">
                                <Input 
                                    id="password" 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    className='mt-1 bg-white dark:bg-gray-950'
                                    placeholder="At least 8 characters" 
                                    value={formData.password} 
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="w-4 h-4" />
                                    ) : (
                                        <EyeIcon className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="verifyPassword">Verify Password</Label>
                            <div className="relative mt-1">
                                <Input 
                                    id="verifyPassword" 
                                    type={showVerifyPassword ? "text" : "password"} 
                                    name="verifyPassword" 
                                    className='mt-1 bg-white dark:bg-gray-950'
                                    placeholder="Confirm your password" 
                                    value={formData.verifyPassword} 
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                                    onClick={toggleVerifyPasswordVisibility}
                                >
                                    {showVerifyPassword ? (
                                        <EyeOffIcon className="w-4 h-4" />
                                    ) : (
                                        <EyeIcon className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.verifyPassword && (
                                <p className="mt-1 text-xs text-red-500">{errors.verifyPassword}</p>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full text-white bg-green-500 hover:bg-green-600" 
                            disabled={isButtonDisabled}
                        >
                            Create Account
                        </Button>

                        <div className="mt-4 space-y-3 text-center">
                            <p className="text-sm">
                                Continue without registration{" "}
                                <button 
                                    type="button"
                                    onClick={() => router.push('/home')}
                                    className="font-medium text-green-500 underline hover:text-green-600"
                                >
                                    Click
                                </button>
                            </p>
                            <div className="border-t border-gray-300 dark:border-gray-600"></div>
                            <p className="text-sm">
                                Already have an account?{" "}
                                <button 
                                    type="button"
                                    onClick={() => router.push('/auth/login')}
                                    className="font-medium text-green-500 underline hover:text-green-600"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}