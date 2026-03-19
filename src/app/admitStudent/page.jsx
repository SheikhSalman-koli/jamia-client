"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/axios";
import baseUrl from "@/lib/axios";

export default function AdmitStudent() {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            tutionFee: 4000,
            status: 'active'
        }
    });

    const onSubmit = async (data) => {
       

        try {
              await baseUrl.post("/students", data);
            alert("ছাত্রের ভর্তি সফল হয়েছে!");
            reset()
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "ভর্তি প্রক্রিয়ায় সমস্যা হয়েছে। NID চেক করুন।");
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="max-w-4xl mx-auto shadow-md">
                <CardHeader className="bg-slate-50 border-b m-3">
                    <CardTitle className="text-2xl text-center text-slate-800 font-bold">ছাত্র ভর্তি ফরম</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* 1. নাম */}
                        <div className="space-y-2">
                            <Label>ছাত্রের নাম *</Label>
                            <Input {...register("name", { required: "নাম দিতে হবে" })} placeholder="ছাত্রের নাম" />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        {/* 2. পিতার নাম */}
                        <div className="space-y-2">
                            <Label>পিতার নাম *</Label>
                            <Input {...register("fatherName", { required: "পিতার নাম দিতে হবে" })} placeholder="পিতার নাম লিখুন" />
                            {errors.fatherName && <p className="text-red-500 text-xs">{errors.fatherName.message}</p>}
                        </div>

                        {/* 3. জামাত (Class) */}
                        <div className=" space-y-2">
                            <Label>জামাত</Label>
                            <Select onValueChange={(v) => setValue("class", v)}>
                                <SelectTrigger className='w-full px-2'><SelectValue placeholder="জামাত নির্বাচন করুন" /></SelectTrigger>
                                <SelectContent className='w-full px-2'>
                                    <SelectItem value="৪র্থ শ্রেণী">৪র্থ শ্রেণী</SelectItem>
                                    <SelectItem value="মিযান">মিযান</SelectItem>
                                    <SelectItem value="নাহবেমীর">নাহবেমীর</SelectItem>
                                    <SelectItem value="হিফজ">হিফজ বিভাগ</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...register("class", { required: "জামাত আবশ্যক" })} />
                        </div>

                        {/* 4. ফোন */}
                        <div className="space-y-2">
                            <Label>ফোন নম্বর *</Label>
                            <Input {...register("phone", { required: "ফোন নম্বর আবশ্যক" })} placeholder="হোয়াট’স অ্যাপ হলে ভালো হয়" />
                        </div>

                        {/* 5. ছবির লিঙ্ক */}
                        <div className="space-y-2">
                            <Label>ছবির লিঙ্ক (Image URL) *</Label>
                            <Input {...register("image", { required: "ছবির লিঙ্ক আবশ্যক" })} placeholder="https://..." />
                        </div>

                        {/* 6. ব্লাড গ্রুপ */}
                        <div className="md:col-span-2 space-y-2">
                            <Label>রক্তের গ্রুপ (Blood Group)</Label>
                            <Select onValueChange={(v) => setValue("bloodGroup", v)}>
                                <SelectTrigger className='w-full px-2'>
                                    <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent className='w-full px-2'>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* React Hook Form-এ ভ্যালু পাঠানোর জন্য হিডেন ইনপুট */}
                            <input type="hidden" {...register("bloodGroup")} />
                        </div>

                        {/* 8. নির্ধারিত ফি (Defined Fee) */}
                        <div className="space-y-2">
                            <Label>নির্ধারিত ফি *</Label>
                            <Input type="number" {...register("definedFee", { required: "ফি নির্ধারণ করুন" })} placeholder="যেমন: ৩০০০" />
                            {errors.definedFee && <p className="text-red-500 text-xs">{errors.definedFee.message}</p>}
                        </div>

                        {/* 9. স্টুডেন্ট এনআইডি (NID) */}
                        <div className="space-y-2">
                            <Label>ছাত্রের এনআইডি / জন্ম নিবন্ধন *</Label>
                            <Input type="number" {...register("nid", { required: "NID আবশ্যক" })} />
                        </div>

                        {/* 10. পিতার এনআইডি (Father NID) */}
                        <div className="space-y-2">
                            <Label>পিতার এনআইডি *</Label>
                            <Input type="number" {...register("fatherNid", { required: "পিতার NID আবশ্যক" })} />
                        </div>

                        {/* 11. ক্যাটাগরি */}
                        <div className="space-y-2 w-full">
                            <Label>ক্যাটাগরি *</Label>
                            <Select onValueChange={(v) => setValue("category", v)}>
                                <SelectTrigger className='w-full px-2'><SelectValue placeholder="নির্বাচন করুন" /></SelectTrigger>
                                <SelectContent className='w-full px-2'>
                                    <SelectItem value="আবাসিক">আবাসিক</SelectItem>
                                    <SelectItem value="অনাবাসিক">অনাবাসিক</SelectItem>
                                    <SelectItem value="এতিম">এতিম / অসহায়</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...register("category", { required: "ক্যাটাগরি আবশ্যক" })} />
                        </div>

                        {/* 12. স্ট্যাটাস (ডিফল্ট active) */}
                        <div className="space-y-2">
                            <Label>স্ট্যাটাস</Label>
                            <Select onValueChange={(v) => setValue("status", v)} defaultValue="active">
                                <SelectTrigger className='w-full px-2'><SelectValue /></SelectTrigger>
                                <SelectContent className='w-full px-2'>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...register("status")} />
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <Button type="submit" className="w-full h-12 bg-emerald-600" disabled={isSubmitting}>
                                {isSubmitting ? "ভর্তি প্রসেস হচ্ছে..." : "ছাত্র ভর্তি নিশ্চিত করুন"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}