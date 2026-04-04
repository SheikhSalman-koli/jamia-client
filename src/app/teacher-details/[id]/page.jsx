import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    User,
    CreditCard,
    Fingerprint,
    Home
} from "lucide-react";
import baseUrl from "@/lib/axios";
import Salary from "@/myComponents/teacherManagment/Salary";
import DeleteTeacherButton from "@/myComponents/teacherManagment/DeleteTeacher";

export default async function TeacherDetails({ params }) {
    const { id } = await params;

    const res = await baseUrl.get(`/teachers/${id}`)

    const { data } = res?.data

    const teacher = data || {};



    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            {/* Navigation */}
            <Link href="/teacher-list">
                <Button variant="ghost" className="mb-6 gap-2 text-slate-600 hover:text-slate-900">
                    <ArrowLeft className="h-4 w-4" /> তালিকায় ফিরে যান
                </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Essential Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="overflow-hidden border-none shadow-md bg-white pt-0">
                        <div className="h-24 bg-linear-to-r from-slate-900 to-slate-700" />
                        <CardContent className="relative pt-0 flex flex-col items-center">
                            <div className="relative -mt-12 h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100">
                                <Image
                                    src={teacher?.image}
                                    alt={teacher?.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="text-center mt-4 w-full">
                                <h2 className="text-2xl font-bold text-slate-900">{teacher?.name}</h2>
                                <p className="text-blue-600 font-semibold">{teacher?.designation}</p>
                                <div className="flex justify-center gap-2 mt-3">
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-full px-4">
                                        {teacher?.status}
                                    </Badge>
                                    <Badge variant="outline" className="rounded-full">
                                        {teacher?.category}
                                    </Badge>
                                </div>
                            </div>

                            <div className="w-full mt-8 space-y-4 border-t pt-6 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <Phone className="h-4 w-4 text-primary" />
                                        <span>{teacher?.phone}</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <a href={`tel:${teacher?.phone}`} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition">
                                            📞 Call
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                        <Briefcase className="h-4 w-4 text-orange-600" />
                                    </div>
                                    <span className="font-medium">{teacher?.department}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Detailed Records */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Employment & Identity */}
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader className="border-b bg-slate-50/30">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5 text-slate-700" /> ব্যক্তিগত ও পেশাগত তথ্য
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                            <InfoItem label="পিতার নাম" value={teacher?.fatherName} />
                            <InfoItem label="জাতীয় পরিচয়পত্র (NID)" value={teacher?.nid} icon={<Fingerprint className="h-3 w-3" />} />
                           <Salary teacherSalary={teacher?.salary} />
                            <InfoItem label="যোগদানের তারিখ" value={formatDate(teacher?.joiningDate)} icon={<Calendar className="h-3 w-3" />} />
                            <InfoItem label="তথ্য প্রদানকারী" value={teacher?.addedBy} className="md:col-span-2" />
                        </CardContent>
                    </Card>

                    {/* Addresses */}
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader className="border-b bg-slate-50/30">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-slate-700" /> ঠিকানাসমূহ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                    <Home className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">বর্তমান ঠিকানা</p>
                                    <p className="text-slate-700 mt-1 leading-relaxed">{teacher?.temporaryAddress}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 pt-6 border-t">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <MapPin className="h-5 w-5 text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">স্থায়ী ঠিকানা</p>
                                    <p className="text-slate-700 mt-1 leading-relaxed">{teacher?.permanentAddress}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>

            <DeleteTeacherButton
            teacherId={teacher?._id} 
            teacherName={teacher?.name}
            />
        </div>
    );
}

// Helper component for clean grid items
function InfoItem({ label, value, icon, className = "" }) {
    return (
        <div className={className}>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                {icon} {label}
            </p>
            <p className="text-slate-900 font-semibold">{value || "প্রযোজ্য নয়"}</p>
        </div>
    );
}