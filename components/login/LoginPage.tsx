"use client"
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const LoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{
        userName?: string;
        password?: string;
        apiError?: string;
    }>({});
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        rememberMe: false,
    });
    const isButtonDisabled = formData.userName?.trim() === "" || formData.password?.trim() === "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [id]: "", apiError: "" }));
    };

    const validateForm = () => {
        const newErrors: { userName?: string; password?: string } = {};
        if (!formData.userName) newErrors.userName = "Username is required";
        if (formData.userName && formData.userName.length < 3) newErrors.userName = "Username must be at least 3 characters long";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password && formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (!validateForm()) return;
            // Authentication logic will go here
            console.log("Form submitted:", formData);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800">
                <div className="w-full max-w-md">
                    <h1 className="mb-2 text-2xl font-semibold">Log In</h1>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                        Welcome to ShelfSearch platform, Log In as member to experience
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="userName">Email</Label>
                            <Input 
                                id="userName" 
                                type="text" 
                                name="userName"
                                className="mt-1 bg-white dark:bg-gray-950"
                                placeholder="Example@email.com" 
                                value={formData.userName} 
                                onChange={handleChange} 
                            />
                            {errors.userName && (
                                <p className="mt-1 text-xs text-red-500">{errors.userName}</p>
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    className='bg-white dark:bg-gray-950'
                                    checked={formData.rememberMe}
                                    onCheckedChange={(checked) => 
                                        setFormData({
                                            ...formData,
                                            rememberMe: checked === true
                                        })
                                    }
                                />
                                <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                                    Remember me
                                </Label>
                            </div>
                            <a href="#" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                                Forgot Password?
                            </a>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full text-white bg-green-500 hover:bg-green-600" 
                            disabled={isButtonDisabled}
                        >
                            Log In
                        </Button>

                        <div className="mt-4 text-center">
                            <p className="text-sm">
                                Continue without login{" "}
                                <a href="/home" className="font-medium text-green-500 hover:text-green-600">
                                    Click
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}