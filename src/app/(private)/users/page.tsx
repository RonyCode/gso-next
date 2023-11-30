import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

const Users = async () => {
  const session = await getServerSession(authOptions);

  // if (!session?.status?.authorized) {
  //   redirect('/login');
  // }

  return (
    <>
      <section>
        <div>
          <h1>Essa página é protegida</h1>
          <h2>Logado no sistema como:</h2>
          <p>{session?.cod_usuario}</p>
          <p>{session?.nome}</p>
          <p>{session?.email}</p>
        </div>
      </section>
    </>
  );
};
export default Users;
