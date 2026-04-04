import baseUrl from '@/lib/axios'
import TeacherList from '@/myComponents/teacherManagment/TeacherList';
import React from 'react'

export default async function page() {

  const res = await baseUrl.get('/teachers')

  const { data } = res?.data
  // console.log(data);

  return (
    <div>
      <TeacherList
        teachers={data}
      />
    </div>
  )
}
