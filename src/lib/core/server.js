"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { getUserToken } from "./session";
import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeaders = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  return header;
};

export const protectedFetch = async (apiUrl) => {
  const res = await fetch(`${baseURL}/${apiUrl}`, {
    headers: await authHeaders(),
  });
  return handleProtectedStatus(res);
};

export const serverFetch = async (apiUrl) => {
  const res = await fetch(`${baseURL}/${apiUrl}`);
  return handleProtectedStatus(res);
};

export const serverFetchById = async (apiUrl) => {
  const res = await fetch(`${baseURL}/${apiUrl}`);
  return handleProtectedStatus(res);
};

export const serverMutation = async (apiUrl, data) => {
  const res = await fetch(`${baseURL}/${apiUrl}`, {
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
  const res = await fetch(`${baseURL}/${apiUrl}`, {
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
  const res = await fetch(`${baseURL}/${apiUrl}`, {
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
export const handleProtectedStatus = async(res) => {
  if (res.status === 401) {
    redirect("/auth/login");
  } else if (res.status === 403) {
    redirect("/unauthorize");
  }

  return res.json();
};
