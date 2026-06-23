"use server";

import { getUserToken } from "./session";
import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is missing");
}
export const authHeaders = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  return header;
};
// Protected Fetch----------------------------------------------
export const protectedFetch = async (apiUrl) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${apiUrl}`, {
    headers: await authHeaders(),
  });

  
  return handleProtectedStatus(res);
};

export const serverFetch = async (apiUrl) => {
  return await protectedFetch(apiUrl);
};



export const serverFetchById = async (apiUrl) => {
  return await protectedFetch(apiUrl);
};

export const serverMutation = async (apiUrl, data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${apiUrl}`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      ...(await authHeaders()),
    },
    body: JSON.stringify(data),
  });

  return handleProtectedStatus(res);
};

export const serverUpdate = async (apiUrl, UpdateData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${apiUrl}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      ...(await authHeaders()),
    },
    body: JSON.stringify(UpdateData),
  });
  return handleProtectedStatus(res);
};

export const serverDelete = async (apiUrl) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${apiUrl}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      ...(await authHeaders()),
    },
    // body: JSON.stringify(UpdateData),
  });
  return handleProtectedStatus(res);
};

// handle user authentication -------------------------------------------
export const handleProtectedStatus = async (res) => {
  
  if (res.status === 401) {
    redirect("/auth/login");
  } else if (res.status === 403) {
    redirect("/unauthorize");
  }
  return res.json();
};
