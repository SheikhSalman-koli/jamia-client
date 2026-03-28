

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MapPin, CreditCard, User, GraduationCap, Droplet } from "lucide-react";
import baseUrl from "@/lib/axios";

export default async function StudentDetails({ params }) {

    const { id } = await params
    const res = await baseUrl.get(`/students/${id}`)
    const post = res?.data

    const student = post?.data

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Back Button */}
            <Link href="/see-students">
                <Button variant="ghost" className="mb-6 gap-2">
                    <ArrowLeft className="h-4 w-4" /> তালিকায় ফিরে যান
                </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Profile Picture & Basic Info */}
                <Card className="lg:col-span-1 shadow-sm">
                    <CardContent className="pt-8 flex flex-col items-center">
                        <div className="relative h-48 w-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl mb-4">
                            <Image
                                src={student?.image}
                                alt={student?.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">{student?.name} <span className="text-xl font-bold text-slate-800">({student?.type})</span></h1>
                        <p className="text-slate-500 mb-4">{student?.class} | {student?.department}</p>
                        <Badge className="px-4 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-100 border-none">
                            {student?.status}
                        </Badge>

                        <div className="w-full mt-8 space-y-4 border-t pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span>{student?.phone}</span>
                                </div>

                                {/* Call Button */}
                                <a
                                    href={`tel:${student?.phone}`}
                                    className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition"
                                >
                                    📞 Call
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <Droplet className="h-4 w-4 text-red-500" />
                                <span>রক্তের গ্রুপ: <span className="font-bold">{student?.bloodGroup}</span></span>
                            </div>
                            
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Detailed Information */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Section 1: Academic & Status */}
                    <Card className="shadow-sm">
                        <CardHeader className="bg-slate-50/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-primary" /> শিক্ষাগত তথ্য
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            <div>
                                <Label className="text-slate-400">বিভাগ</Label>
                                <p className="font-semibold text-slate-700">{student?.department}</p>
                            </div>
                            <div>
                                <Label className="text-slate-400">জামাত/শ্রেণী</Label>
                                <p className="font-semibold text-slate-700">{student?.class}</p>
                            </div>
                            <div>
                                <Label className="text-slate-400">ক্যাটাগরি</Label>
                                <p className="font-semibold text-slate-700">{student?.category}</p>
                            </div>
                            <div>
                                <Label className="text-slate-400">নির্ধারিত খোরাকী/ফি</Label>
                                <p className="font-semibold text-slate-700 text-blue-600">{student?.definedFee} টাকা</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 2: Personal & Guardian Info */}
                    <Card className="shadow-sm">
                        <CardHeader className="bg-slate-50/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" /> ব্যক্তিগত ও অভিভাবকের তথ্য
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            <div>
                                <Label className="text-slate-400">পিতার নাম</Label>
                                <p className="font-semibold text-slate-700">{student?.fatherName}</p>
                            </div>
                            <div>
                                <Label className="text-slate-400">ছাত্রের NID/জন্ম নিবন্ধন</Label>
                                <p className="font-semibold text-slate-700">{student?.nid}</p>
                            </div>
                            <div>
                                <Label className="text-slate-400">পিতার NID</Label>
                                <p className="font-semibold text-slate-700">{student?.fatherNid}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 3: Addresses */}
                    <Card className="shadow-sm">
                        <CardHeader className="bg-slate-50/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" /> ঠিকানা
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div>
                                <Label className="text-slate-400">স্থায়ী ঠিকানা</Label>
                                <p className="text-slate-700">{student?.permanentAddress}</p>
                            </div>
                            <div className="pt-2 border-t">
                                <Label className="text-slate-400">অস্থায়ী ঠিকানা</Label>
                                <p className="text-slate-700">{student?.temporaryAddress}</p>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}

// ছোট হেল্পার কম্পোনেন্ট (যদি অলরেডি না থাকে)
function Label({ children, className }) {
    return <span className={`text-xs uppercase tracking-wider font-medium ${className}`}>{children}</span>;
}