import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Signed out successfully" });

  res.cookies.set({
    name: "auth_token",
    value: "",
    path: "/",
    expires: new Date(0),
    httpOnly: true,
  });

  return res;
}
