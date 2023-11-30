export const useEstados = () => {
  const getData = async () => {
    const estados = await fetch('http://localhost:3000/api/estados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    return await estados.json();
  };
  return {
    getData
  };
};
