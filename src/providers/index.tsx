'use client';

import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import AuthProvider from "./AuthProvider";

export default function Providers({ children, user }: { children: React.ReactNode, user: UserResponse }) {
  return (
      <>
          <RecoilRoot>
              <AuthProvider user={user}>
                  <Toaster position="bottom-right" />
                  {children}
              </AuthProvider>
          </RecoilRoot>
      </>
  );
}
