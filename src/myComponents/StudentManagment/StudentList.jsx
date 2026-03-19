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
            className="overflow-hidden border shadow-sm hover:shadow-md transition rounded-xl"
          >
            <CardContent className="">
              
              {/* Top Section */}
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden border shrink-0">
                  <Image
                    src={student?.image || "/placeholder-user.png"}
                    alt={student?.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-lg">
                    {student.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded">
                      {student.department}
                    </span>

                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-semibold">
                      {student.class}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                <p className="text-xs text-slate-500">
                  রক্তের গ্রুপ:{" "}
                  <span className="font-bold text-red-600">
                    {student.bloodGroup || "N/A"}
                  </span>
                </p>

                <Link href={`/student-details/${student._id}`} className="w-32">
                  <Button
                    size="sm"
                    className="w-full rounded-full"
                  >
                    সব তথ্য...
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