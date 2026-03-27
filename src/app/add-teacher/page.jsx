"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserRole } from "@/hooks/userRole";
import baseUrl from "@/lib/axios";
import { uploadToCloudinary } from "@/lib/imageHoster";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuCamera, LuImage, LuX } from "react-icons/lu";


export default function TeacherForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm({
        defaultValues: {
            status: "সক্রিয়",
            joiningDate: new Date().toISOString().split("T")[0],
        },
    });

    const [preview, setPreview] = useState(null);

    const cameraRef = useRef(null);
    const galleryRef = useRef(null);

    const { session } = useUserRole()

    const onSubmit = async (data) => {
        try {
            let imageUrl = "";

            if (data.image && data.image.length > 0) {
                const file = data.image[0];
                imageUrl = await uploadToCloudinary(file)
            }

            const finalData = {
                ...data,
                image: imageUrl,
                addedBy: session?.user?.name,
                joiningDate: new Date().toISOString().split("T")[0]
            };

              await baseUrl.post("/teachers", finalData);
            // console.log(finalData);
            alert("শিক্ষকের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে");
            reset();
            setPreview(null)
        } catch (error) {
            console.error("Error saving teacher:", error);
            alert("তথ্য সংরক্ষণে সমস্যা হয়েছে");
        }
    };

    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="container mx-auto py-10 p-4">
            <Card className="max-w-4xl mx-auto shadow-md">
                <CardHeader className="bg-slate-50 border-b m-3">
                    <CardTitle className="text-2xl text-center text-slate-800 font-bold">
                        শিক্ষক নিবন্ধন ফরম
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit, (err) => console.log('onSubmit', err))} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* 1. শিক্ষকের নাম */}
                        <div className="space-y-2">
                            <Label>শিক্ষকের নাম</Label>
                            <Input
                                {...register("name", { required: "নাম দিতে হবে" })}
                                placeholder="শিক্ষকের পূর্ণ নাম লিখুন"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name?.message}</p>}
                        </div>

                        {/* 2. পিতার নাম */}
                        <div className="space-y-2">
                            <Label>পিতার নাম</Label>
                            <Input
                                {...register("fatherName", { required: "পিতার নাম দিতে হবে" })}
                                placeholder="পিতার নাম লিখুন"
                            />
                            {errors.fatherName && <p className="text-red-500 text-xs">{errors.fatherName?.message}</p>}
                        </div>

                        {/* 3. পদবী ও বিভাগ */}
                        <div className="space-y-2">
                            <Label>পদবী</Label>
                            <Select onValueChange={(v) => setValue("designation", v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="পদবী নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="প্রধান শিক্ষক">প্রধান শিক্ষক</SelectItem>
                                    <SelectItem value="সহকারী শিক্ষক">সহকারী শিক্ষক</SelectItem>
                                    <SelectItem value="মুহাদ্দিস">মুহাদ্দিস</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...register("designation", { required: "পদবী আবশ্যক" })} />
                        </div>

                        <div className="space-y-2">
                            <Label>বিভাগ</Label>
                            <Input {...register("department", { required: "বিভাগ আবশ্যক" })} placeholder="যেমন: কিতাব বা হিফজ" />
                        </div>

                        {/* 4. ফোন ও এনআইডি */}
                        <div className="space-y-2">
                            <Label>ফোন নম্বর </Label>
                            <Input
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                {...register("phone", { required: "ফোন নম্বর আবশ্যক" })}
                                placeholder="ফোন নাম্বার ইংরেজিতে লিখুন" />
                        </div>

                        <div className="space-y-2">
                            <Label>এনআইডি (NID)</Label>
                            <Input type="number" {...register("nid", { required: "NID আবশ্যক" })} />
                        </div>

                        {/* 5. ছবি আপলোড (আপনার ডিজাইন অনুযায়ী) */}
                        <div className="md:col-span-2 space-y-3">
                            <Label>শিক্ষকের ছবি</Label>
                            <div className="flex gap-3 items-center border border-slate-200 p-2 rounded-xl bg-slate-50/50">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 gap-2 bg-white"
                                    onClick={() => cameraRef.current?.click()}
                                >
                                    <LuCamera /> ছবি তুলুন
                                </Button>
                                <p className="text-slate-400 text-sm">অথবা</p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 gap-2 bg-white"
                                    onClick={() => galleryRef.current?.click()}
                                >
                                    <LuImage /> গ্যালারি
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

                            {/* Preview Section */}
                            {preview && (
                                <div className="relative w-fit mt-2">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                        onClick={() => setPreview(null)}
                                    >
                                        <LuX size={14} />
                                    </Button>
                                    <div className="overflow-hidden rounded-xl border-2 border-slate-200">
                                        <Image src={preview} alt="preview" width={120} height={120} className="object-cover w-28 h-28" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 6. বেতন ও তারিখ */}
                        <div className="space-y-2">
                            <Label>বেতন (নির্ধারিত)</Label>
                            <Input type="number" {...register("salary")} placeholder="টাকার পরিমাণ" />
                        </div>

                        {/* <div className="space-y-2">
                            <Label>যোগদানের তারিখ</Label>
                            <Input type="date" {...register("joiningDate")} />
                        </div> */}

                        {/* 7. ঠিকানাসমূহ */}
                        <div className="md:col-span-2 space-y-2">
                            <Label>বর্তমান ঠিকানা</Label>
                            <Input {...register("temporaryAddress")} placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label>স্থায়ী ঠিকানা</Label>
                            <Input {...register("permanentAddress")} placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" />
                        </div>

                        {/* 3. status */}
                        <div className="space-y-2 w-full">
                            <Label>স্ট্যাটাস</Label>
                            <Select onValueChange={(v) => setValue("category", v)}>
                                <SelectTrigger className='w-full px-2'><SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" /></SelectTrigger>
                                <SelectContent className='w-full px-2'>
                                    <SelectItem value="সক্রিয়">সক্রিয়</SelectItem>
                                    <SelectItem value="নিস্ক্রিয়">নিস্ক্রিয়</SelectItem>
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...register("status", { required: "ক্যাটাগরি আবশ্যক" })} />
                        </div>

                        {/* 3. category */}
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

                        {/* Submit Button */}
                        <div className="md:col-span-2 pt-4">
                            <Button type="submit" className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                                {isSubmitting ? "সংরক্ষণ করা হচ্ছে..." : "শিক্ষক নিবন্ধন নিশ্চিত করুন"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}