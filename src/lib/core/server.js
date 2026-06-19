'use server'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;



// export const serverFetch = async(apiUrl) =>{
//   const res = await fetch(`${baseURL}/${apiUrl}`)
//   // console.log(res);
//   return res.json()
// }
export const serverFetchById = async(apiUrl) =>{
  const res = await fetch(`${baseURL}/${apiUrl}`)
  // console.log(res);
  return res.json()
}


export const serverMutation = async (apiUrl, data) => {
  const res = await fetch(`${baseURL}/${apiUrl}`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
export const serverUpdate = async (apiUrl, UpdateData) => {
  console.log(apiUrl);
  const res = await fetch(`${baseURL}/${apiUrl}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(UpdateData),
  });
  console.log(res);
  return res.json();
};