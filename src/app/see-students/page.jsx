import baseUrl from '@/lib/axios';
import StudentList from '@/myComponents/StudentManagment/StudentList';
import React from 'react'

export const dynamic = "force-dynamic";

export default async function StudentData(props) {

  const searchParams = await props.searchParams;

  const res = await baseUrl.get('/students', {
    params: searchParams
  })

  const { data } = res?.data

  // console.log(data);

  return (
    <div>
      <StudentList
        data={data}
        searchParams={searchParams}
      />
    </div>
  )
}
