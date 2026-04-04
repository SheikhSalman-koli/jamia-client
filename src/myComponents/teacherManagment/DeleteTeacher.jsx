'use client'

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import baseUrl from "@/lib/axios";
import { useUserRole } from "@/hooks/userRole";

export default function DeleteTeacherButton({ teacherId, teacherName }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {role} = useUserRole()

  if(role === 'user') return null

  const handleDelete = async () => {
    // 1. Ask for confirmation
    const confirmDelete = window.confirm(`${teacherName}-এর তথ্য কি মুছে ফেলতে চান?`);
    
    if (!confirmDelete) return;

    setLoading(true);
    try {
      // 2. Call your API
      const res = await baseUrl.delete(`/teachers/delete/${teacherId}`);

      if (res.status === 200) {
        alert("সফলভাবে মুছে ফেলা হয়েছে!");
          router.push('/teacher-list')
        
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert(error.response?.data?.message || "মুছে ফেলতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="w-full flex justify-end">
     <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
      title="Delete Student"
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Trash2 className="h-5 w-5" />
      )}
    </button>
   </div>
  );
}