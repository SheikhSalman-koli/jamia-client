"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Phone, Briefcase, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";


export default function TeacherList({ teachers, searchParams }) {
//   const { teachers } = data || {};

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header & Total */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-950">
          👨‍🏫 শিক্ষক তালিকা
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          মোট শিক্ষক: {teachers?.length || 0} জন
        </p>
      </div>

      {/* Filters (Assuming you have one) */}
     

      {/* Empty State */}
      {!teachers?.length && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">কোনো শিক্ষকের তথ্য পাওয়া যায়নি</p>
        </div>
      )}

      {/* -------- Desktop Table Layout (lg screens) -------- */}
      <div className="hidden lg:block rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white ">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-20 pl-6">ছবি</TableHead>
              <TableHead>নাম ও পদবী</TableHead>
              <TableHead>বিভাগ</TableHead>
              <TableHead>মোবাইল</TableHead>
              <TableHead>স্ট্যাটাস</TableHead>
              <TableHead className="text-right pr-6">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers?.map((teacher) => (
              <TableRow key={teacher._id} className="hover:bg-slate-50/50 transition border-b border-slate-100 last:border-0">
                <TableCell className="pl-6 py-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner">
                    <Image
                      src={teacher.image || "/placeholder-user.png"}
                      alt={teacher.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-extrabold text-base text-slate-950">{teacher.name}</div>
                  <div className="text-xs text-blue-700 font-semibold mt-0.5">{teacher.designation}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-semibold bg-slate-100/70 text-slate-800 text-[11px] rounded-full">
                    {teacher.department}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-semibold text-slate-700">
                  {teacher.phone}
                </TableCell>
                <TableCell>
                  <Badge className={cn("text-[11px] font-bold rounded-full",
                    teacher.status === "সক্রিয়" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800"
                  )}>
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Link href={`/teacher-details/${teacher._id}`}>
                    <Button size="sm" variant="outline" className="gap-2 rounded-full px-5 text-slate-700 border-slate-200 hover:bg-slate-50">
                      <Eye className="h-4 w-4" /> বিস্তারিত
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* -------- Mobile Card Layout (lg screens) -------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:hidden">
        {teachers?.map((teacher) => (
          <Card key={teacher._id} className="overflow-hidden rounded-2xl border border-slate-100 shadow-md bg-white py-0">
            <CardContent className="p-0 relative">
              
              {/* Cover Photo */}
              <div className="w-full h-24 bg-slate-950 relative overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dobtto17a/image/upload/v1773827388/madrasha-logo_nyskjk.jpg" // Placeholder cover or from data if available
                  alt="Cover"
                  fill
                  className="object-cover opacity-60"
                />
              </div>

              {/* Profile Image (Overlapping Cover) */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                  <Image
                    src={teacher.image || "/placeholder-user.png"}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="p-5 pt-16 flex flex-col items-center text-center">
                <h3 className="font-extrabold text-lg text-slate-950 leading-tight truncate w-full">
                  {teacher.name}
                </h3>
                <p className="text-sm text-blue-700 font-semibold mt-1 truncate w-full">
                  {teacher.designation}
                </p>
                <Badge variant="secondary" className="mt-3 font-semibold bg-slate-100 text-slate-800 text-[11px] rounded-full px-3 py-0.5">
                  {teacher.department}
                </Badge>

                {/* Quick Info Grid */}
                {/* <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3 mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                  <div className="flex items-center gap-2 justify-center col-span-2">
                    <Phone className="h-3.5 w-3.5 text-blue-600" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Briefcase className="h-3.5 w-3.5 text-orange-600" />
                    <span>{teacher.category}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <UserCheck className="h-3.5 w-3.5 text-green-600" />
                    <Badge variant="outline" className={cn("text-[10px] px-2 py-0 h-5 font-bold rounded-full",
                      teacher.status === "সক্রিয়" ? "border-green-100 bg-green-50 text-green-800" : "border-red-100 bg-red-50 text-red-800"
                    )}>
                      {teacher.status}
                    </Badge>
                  </div>
                </div> */}

                <Link href={`/teacher-details/${teacher._id}`} className="block mt-6 w-full">
                  <Button variant="default" size="sm" className="w-full rounded-full text-xs">
                    বিস্তারিত দেখুন...
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}