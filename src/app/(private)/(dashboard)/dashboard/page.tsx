import React from 'react';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  return (
    <section className=" h-screen w-screen bg-slate-800  ">
      <div className="h-full bg-amber-50 text-black md:container md:mx-auto  m-auto overflow-hidden ">
        <br /> {session?.image}
        <br /> {session?.data_expirar_token}
        <br /> {session?.email}
        <br />
        {session?.email}
      </div>
    </section>
  );
};
export default Dashboard;
