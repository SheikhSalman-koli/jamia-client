import baseUrl from '@/lib/axios';
import StudentList from '@/myComponents/StudentManagment/StudentList';
import React from 'react'

export default async function StudentData() {

  const res = await baseUrl.get('/students')

  const {data} = res?.data

  // console.log(data);

  return (
    <div>
      <StudentList 
      students={data}
      />
    </div>
  )
}
