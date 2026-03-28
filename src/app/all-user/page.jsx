import baseUrl from '@/lib/axios';
import UserList from '@/myComponents/userManagment/UserList';
import React from 'react'
export const dynamic = "force-dynamic";

export default async function page() {

    const res = await baseUrl.get('/users'); 
const { data } = res.data;

// console.log(data);
  return (
    <div>
        <UserList 
        users={data}
        />
    </div>
  )
}
