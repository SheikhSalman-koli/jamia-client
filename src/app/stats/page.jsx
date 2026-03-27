import baseUrl from '@/lib/axios'
import StudentAnalytics from '@/myComponents/StudentManagment/StudentStats';
import React from 'react'

export const dynamic = "force-dynamic";

export default async function Stats() {

    const res =await baseUrl.get('/students/student/stats')

    const {data} = res?.data

    // console.log(data);
 
  return (
    <div>
        <StudentAnalytics 
          stats={data}
        />
    </div>
  )
}
