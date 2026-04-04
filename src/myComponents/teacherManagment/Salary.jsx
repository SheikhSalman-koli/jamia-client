'use client'
import { CardContent } from '@/components/ui/card'
import { useUserRole } from '@/hooks/userRole'
import { CreditCard } from 'lucide-react'
import React from 'react'

export default function Salary({ teacherSalary }) {
    const { role } = useUserRole()
    return (
        <div>
            {
                role !== 'user' && (
                    <CardContent className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-slate-500" />
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">মাসিক বেতন</p>
                            <p className="font-semibold text-slate-900">{teacherSalary} ৳</p>
                        </div>
                    </CardContent>
                ) 

            }
        </div>
    )
}
