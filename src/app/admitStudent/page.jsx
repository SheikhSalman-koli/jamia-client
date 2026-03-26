"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import baseUrl from "@/lib/axios";
import { uploadToCloudinary } from "@/lib/imageHoster";
import Image from "next/image";
import { LuX, LuCamera, LuImage } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { useUserRole } from "@/hooks/userRole";


export default function AdmitStudent() {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            tutionFee: 4000
        }
    });

    const classesByDept = {
        "মক্তব বিভাগ": ["শিশু শ্রেণী", "১ম শ্রেণী", "২য় শ্রেণী", "৩য় শ্রেণী"],
        "হিফজ বিভাগ": ["হিফজ খানা"],
        "কিতাব বিভাগ": ["৪র্থ শ্রেণী", "তাইসির", "মিযান", "নাহবেমীর", "হেদায়াতুন্নাহু", "কাফিয়া", "শরহে বেকায়া", "জালালাইন", "মেশকাত", "দাওরা"]
    };

    const [preview, setPreview] = useState(null);
    const [selectedDept, setSelectedDept] = React.useState("");

    const cameraRef = useRef(null);
    const galleryRef = useRef(null);

    const { session } = useUserRole()

    const onSubmit = async (data) => {
        console.log('triggered');
        try {
            let imageUrl = "";

            if (data.image && data.image.length > 0) {
                const file = data.image[0];
                imageUrl = await uploadToCloudinary(file);
            }

            const finalData = {
                ...data,
                image: imageUrl,
                status: 'সক্রিয়',
                addedBy: session?.user?.name,
                createdAt: new Date().toISOString()
            };
            console.log(finalData);
            // save to DB
            await baseUrl.post("/students", finalData);
            alert("ভর্তি সফল হয়েছে!");
            reset()
            setPreview(null)
        } catch (error) {
            console.error("Error:", error);
            alert(error.response?.data?.message || "ভর্তি প্রক্রিয়ায় সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
    };

    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };



    return (
        <div className="container mx-auto py-10 p-4 ">
            <Card className="max-w-4xl mx-auto shadow-md">
                <CardHeader className="bg-slate-50 border-b m-3">
                    <CardTitle className="text-2xl text-center text-slate-800 font-bold">ভর্তি ফরম</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit, (err) => console.log('onSubmit', err))} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* 1. নাম */}
                        <div className="space-y-2">
                            <Label>ছাত্রের নাম</Label>
                            <Input {...register("name", { required: "নাম দিতে হবে" })} placeholder="ছাত্রের নাম লিখুন" />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        {/* 2. পিতার নাম */}
                        <div className="space-y-2">
                            <Label>পিতার নাম</Label>
                            <Input {...register("fatherName", { required: "পিতার নাম দিতে হবে" })} placeholder="পিতার নাম লিখুন" />
                            {errors.fatherName && <p className="text-red-500 text-xs">{errors.fatherName.message}</p>}
                        </div>

                        {/* 3. জামাত (Class) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                            {/* বিভাগ নির্বাচন */}
                            <div className="space-y-2">
                                <Label>বিভাগ</Label>
                                <Select
                                    onValueChange={(v) => {
                                        setSelectedDept(v);
                                        setValue("department", v, { shouldValidate: true }); // এটিই আসল সমাধান
                                        setValue("class", ""); // বিভাগ বদলালে ক্লাস ক্লিয়ার হবে
                                    }}
                                >
                                    <SelectTrigger className='w-full px-2'>
                                        <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                                    </SelectTrigger>
                                    <SelectContent className='px-2'>
                                        <SelectItem value="মক্তব বিভাগ">মক্তব বিভাগ</SelectItem>
                                        <SelectItem value="হিফজ বিভাগ">হিফজ বিভাগ</SelectItem>
                                        <SelectItem value="কিতাব বিভাগ">কিতাব বিভাগ</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* হিডেন ইনপুট যা ডাটা কালেক্ট করবে */}
                                <input
                                    type="hidden"
                                    {...register("department", { required: "বিভাগ নির্বাচন করা আবশ্যক" })}
                                />

                                {errors.department && (
                                    <p className="text-red-500 text-xs mt-1 animate-pulse">
                                        {errors.department.message}
                                    </p>
                                )}
                            </div>

                            {/* জামাত নির্বাচন (বিভাগের ওপর নির্ভরশীল) */}
                            <div className="space-y-2">
                                <Label>জামাত</Label>
                                <Select
                                    disabled={!selectedDept} // বিভাগ সিলেক্ট না করা পর্যন্ত এটি বন্ধ থাকবে
                                    onValueChange={(v) => setValue("class", v)}
                                >
                                    <SelectTrigger className='w-full px-2'>
                                        <SelectValue placeholder={selectedDept ? "জামাত নির্বাচন করুন" : "আগে বিভাগ সিলেক্ট করুন"} />
                                    </SelectTrigger>
                                    <SelectContent className='px-2'>
                                        {selectedDept && classesByDept[selectedDept].map((cls) => (
                                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" {...register("class", { required: "জামাত আবশ্যক" })} />
                                {errors.class && <p className="text-red-500 text-xs">{errors.class.message}</p>}
                            </div>
                        </div>

                        {/* 4. ফোন */}
                        <div className="space-y-2">
                            <Label>ফোন নম্বর </Label>
                            <Input
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                {...register("phone", { required: "ফোন নম্বর আবশ্যক" })}
                                placeholder="ফোন নাম্বার ইংরেজিতে লিখুন" />
                        </div>

                        {/* 5. ছবির লিঙ্ক */}
                        <div className="space-y-2">
                            <Label>ছবি আপলোড করুন</Label>

                            {/* Buttons */}
                            <div className="flex gap-3 items-center border border-slate-200 p-1 rounded-xl">
                                <div className="flex gap-3 items-center">
                                      <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 gap-2"
                                    onClick={() => cameraRef.current?.click()}
                                >
                                    <LuCamera /> ছবি তুলুন
                                </Button>

                                <p>অথবা</p>
                                </div>
                              

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 gap-2"
                                    onClick={() => galleryRef.current?.click()}
                                >
                                    <LuImage /> গ্যালারি থেকে বাছুন
                                </Button>
                            </div>

                            {/* 🔒 Hidden Inputs (NO register এখানে) */}

                            {/* Camera */}
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                ref={cameraRef}
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setValue("image", [file]); // ✅ RHF manually set
                                        handleImagePreview(e);
                                    }
                                }}
                            />

                            {/* Gallery */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={galleryRef}
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setValue("image", [file]); // ✅ RHF manually set
                                        handleImagePreview(e);
                                    }
                                }}
                            />

                            {/* Preview */}
                            {preview && (
                                <div className="relative w-fit"> {/* কন্টেইনারকে relative রাখা হয়েছে */}
                                    <Button
                                        type='button'
                                        variant='outline'
                                        size='icon'
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                        onClick={() => setPreview(null)}
                                    >
                                        <span className="text-[10px]"><LuX /></span>
                                    </Button>
                                    <div className="overflow-hidden rounded-2xl border-2 border-slate-200">
                                        <Image
                                            src={preview}
                                            alt="preview"
                                            width={100}
                                            height={100}
                                            className="object-cover border"
                                        />
                                    </div>
                                </div>
                            )}
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
                            <Label>নির্ধারিত ফি</Label>
                            <Input type="number" {...register("definedFee", { required: "খোরাকী নির্ধারণ করুন" })} placeholder="মাও:গিয়াস উদ্দীন বা মাও:আবুল হাসান কর্তৃক নির্ধারিত পরিমাণ" />
                            {errors.definedFee && <p className="text-red-500 text-xs">{errors.definedFee.message}</p>}
                        </div>

                        {/* 9. স্টুডেন্ট এনআইডি (NID) */}
                        <div className="space-y-2">
                            <Label>ছাত্রের এনআইডি / জন্ম নিবন্ধন</Label>
                            <Input type="number" {...register("nid", { required: "NID আবশ্যক" })} />
                        </div>

                        {/* 10. পিতার এনআইডি (Father NID) */}
                        <div className="space-y-2">
                            <Label>পিতার এনআইডি</Label>
                            <Input type="number" {...register("fatherNid", { required: "পিতার NID আবশ্যক" })} />
                        </div>

                        {/* 11. ক্যাটাগরি */}
                        <div className="space-y-2 w-full">
                            <Label>ক্যাটাগরি</Label>
                            <Select onValueChange={(v) => setValue("category", v)}>
                                <SelectTrigger className='w-full px-2'><SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" /></SelectTrigger>
                                <SelectContent className='w-full px-2'>
                                    <SelectItem value="আবাসিক">আবাসিক</SelectItem>
                                    <SelectItem value="অনাবাসিক">অনাবাসিক</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...register("category", { required: "ক্যাটাগরি আবশ্যক" })} />
                        </div>

                        {/* 11. ধরন */}
                        <div className="space-y-2 w-full">
                            <Label>ধরন</Label>
                            <Select onValueChange={(v) => setValue("type", v)}>
                                <SelectTrigger className='w-full px-2'><SelectValue placeholder="ধরন নির্বাচন করুন" /></SelectTrigger>
                                <SelectContent className='w-full px-2'>
                                    <SelectItem value="আবাসিক">নতুন</SelectItem>
                                    <SelectItem value="অনাবাসিক">পুরাতন</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...register("type", { required: "ক্যাটাগরি আবশ্যক" })} />
                        </div>

                        {/* 12.স্থায়ী ঠিকানা */}
                        <div className="space-y-2">
                            <Label>স্থায়ী ঠিকানা</Label>
                            <Input {...register("permanentAddress")} placeholder="ছাত্রের স্থায়ী ঠিকানা লিখুন" />
                        </div>

                        {/* 12.অস্থায়ী ঠিকানা */}
                        <div className="space-y-2">
                            <Label>অস্থায়ী ঠিকানা</Label>
                            <Input {...register("temporaryAddress")} placeholder="ছাত্রের অস্থায়ী ঠিকানা লিখুন" />
                        </div>


                        <div className="md:col-span-2 pt-4">
                            <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                                {isSubmitting ? "ভর্তি-কার্যক্রম সম্পন্ন হচ্ছে..." : "ভর্তি নিশ্চিত করুন"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
}