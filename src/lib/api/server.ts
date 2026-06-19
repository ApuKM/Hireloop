import { getUserToken } from "@/utils/sessions/sessions";
import { redirect } from "next/navigation";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

export const AuthHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();
  const header: Record<string, string> = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

const HandleStatusCode = (res: Response) => {
  if(res.status === 401){
    redirect("/unauthorized")
  }
  else if(res.status === 403){
    redirect("/forbidden")
  }
  return res.json()
}

export const MutateData = async <T>(path: string, data: T, method = "POST") => {
  const res = await fetch(`${serverUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeader()),
    },
    body: JSON.stringify(data),
  });
  return HandleStatusCode(res);
};

export const ServerFetch = async (path: string) => {
  // console.log("URL check:", serverUrl)
  const res = await fetch(`${serverUrl}${path}`);
  return res.json();
};

export const ProtectedFetch = async (path: string) => {
  const res = await fetch(`${serverUrl}${path}`, {
    headers: { ...(await AuthHeader()) },
  });
  return HandleStatusCode(res);
};
