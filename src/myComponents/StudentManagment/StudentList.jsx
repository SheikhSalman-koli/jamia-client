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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function StudentList({ students }) {
  return (
    <div className="container mx-auto py-4 px-4">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold ">
          🎓 ছাত্র তালিকা
        </h2>
        <p className="text-sm text-muted-foreground">
          মোট ছাত্র: {students?.length || 0}
        </p>
      </div>

      {/* Empty State */}
      {!students?.length && (
        <div className="text-center py-10 text-slate-500">
          কোনো ছাত্র পাওয়া যায়নি
        </div>
      )}

      {/* -------- Desktop Table -------- */}
      <div className="hidden md:block rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead className="w-20">ছবি</TableHead>
              <TableHead>নাম</TableHead>
              <TableHead>বিভাগ</TableHead>
              <TableHead>জামাত</TableHead>
              <TableHead className="text-right">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students?.map((student) => (
              <TableRow
                key={student._id}
                className="hover:bg-slate-50 transition"
              >
                {/* Image */}
                <TableCell>
                  <div className="relative h-11 w-11 rounded-full overflow-hidden border">
                    <Image
                      src={student?.image || "/placeholder-user.png"}
                      alt={student?.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>

                {/* Name */}
                <TableCell className="font-semibold">
                  {student.name}
                </TableCell>

                {/* Department */}
                <TableCell>
                  <span className="px-2 py-1 rounded text-xs font-medium">
                    {student.department}
                  </span>
                </TableCell>

                {/* Class */}
                <TableCell>
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                    {student.class}
                  </span>
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Link href={`/student-details/${student._id}`}>
                    <Button
                      size="sm"
                      className="gap-2 rounded-full px-4"
                    >
                      <Eye className="h-4 w-4" />
                      বিস্তারিত
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* -------- Mobile Card -------- */}
     <div className="grid grid-cols-2 gap-4 md:hidden">
  {students?.map((student) => (
    <Card
      key={student._id}
      className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition p-0"
    >
      <CardContent className="p-0">
        
        {/* 🔥 Full Width Image */}
        <div className="relative w-full h-40">
          <Image
            src={student?.image || "/placeholder-user.png"}
            alt={student?.name}
            fill
            className="object-cover"
          />
        </div>

        {/* 🔽 Info Section */}
        <div className="p-3 space-y-2">
          
          {/* Name */}
          <h3 className="font-bold text-sm leading-tight">
            {student.name}
          </h3>

          {/* Department + Class */}
          <div className="flex flex-wrap gap-1 text-[11px]">
            <span className="px-2 py-0.5 rounded">
              {student.department}
            </span>

            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
              {student.class}
            </span>
          </div>

          {/* Blood */}
          <p className="text-[11px] text-slate-500">
            🩸{" "}
            <span className="font-bold text-red-600">
              {student.bloodGroup || "N/A"}
            </span>
          </p>

          {/* Button */}
          <Link href={`/student-details/${student._id}`}>
            <Button size="sm" className="w-full rounded-full mt-2 text-xs">
              সকল তথ্য দেখুন...
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