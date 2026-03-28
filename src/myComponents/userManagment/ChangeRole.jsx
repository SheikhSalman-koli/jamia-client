"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import baseUrl from "@/lib/axios";

export default function RoleSelector({ userEmail, currentRole }) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(currentRole);

  const handleRoleChange = async (newRole) => {
    setLoading(true);
    try {
      // আপনার ব্যাকএন্ড অনুযায়ী: query-তে email এবং body-তে data
      const response = await baseUrl.patch(`/users/update-role?email=${userEmail}`, {
        role: newRole,
      });

      if (response.data.success) {
        setRole(newRole);
        alert(`রোল সফলভাবে ${newRole} এ পরিবর্তন করা হয়েছে`);
      }
    } catch (error) {
      console.error(error);
      toast.error("রোল পরিবর্তন করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {loading && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
      <Select
        disabled={loading}
        value={role}
        onValueChange={handleRoleChange}
      >
        <SelectTrigger className="w-[140px] h-8 text-xs font-medium">
          <SelectValue placeholder="রোল সিলেক্ট করুন" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="super-admin">Super Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}