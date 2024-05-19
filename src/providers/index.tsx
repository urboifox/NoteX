'use client';

import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";

export default function Providers({ children, user }: { children: React.ReactNode, user: UserResponse }) {
  return (
    <>
      <RecoilRoot>
        <AuthProvider user={user}>
          <NotificationProvider>
            <Toaster position="bottom-right" />
            {children}
          </NotificationProvider>
        </AuthProvider>
      </RecoilRoot>
    </>
  );
}
