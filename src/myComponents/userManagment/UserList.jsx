"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserCog, Mail, Calendar } from "lucide-react";
import RoleSelector from "./ChangeRole";


export default function UserList({ users }) {
  const [searchTerm, setSearchTerm] = useState("");

  // ফ্রন্টএন্ডে কুইক সার্চ ফিল্টার
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 p-3">
      {/* সার্চ এবং টাইটেল সেকশন */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserCog className="text-blue-600" /> ইউজার ম্যানেজমেন্ট
          </h2>
          <p className="text-sm text-slate-500">মোট ইউজার: {users?.length || 0} জন</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="নাম বা ইমেইল দিয়ে খুঁজুন..."
            className="pl-9 bg-slate-50 border-none focus-visible:ring-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ইউজার টেবিল */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[250px]">ইউজার ইনফো</TableHead>
              <TableHead>যোগদানের তারিখ</TableHead>
              <TableHead>বর্তমান রোল</TableHead>
              <TableHead className="text-right">অ্যাকশন (রোল পরিবর্তন)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{user.name}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('bn-BD') : "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <RoleSelector
                        userEmail={user.email} 
                        currentRole={user.role} 
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                  কোনো ইউজার পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// রোল অনুযায়ী আলাদা কালার ব্যাজ
function RoleBadge({ role }) {
  const styles = {
    "super-admin": "bg-red-100 text-red-700 border-red-200",
    "admin": "bg-blue-100 text-blue-700 border-blue-200",
    "user": "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <Badge className={`${styles[role] || styles.user} capitalize shadow-none border font-medium`}>
      {role}
    </Badge>
  );
}