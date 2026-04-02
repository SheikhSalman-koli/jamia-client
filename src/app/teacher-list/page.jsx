import baseUrl from '@/lib/axios'
import React from 'react'

export default async function page() {

      const res = await baseUrl.get('/teachers')

  const { data } = res?.data
  console.log(data);

  return (
    <div>page</div>
  )
}
