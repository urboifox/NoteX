'use client';

import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function Providers({ children, user }: { children: React.ReactNode, user: UserResponse }) {
  return (
      <>
          <RecoilRoot>
              <AuthProvider user={user}>
                  <NotificationProvider>
                      <SkeletonTheme baseColor="#222" highlightColor="#333">
                          <Toaster position="bottom-right" />
                          {children}
                      </SkeletonTheme>
                  </NotificationProvider>
              </AuthProvider>
          </RecoilRoot>
      </>
  );
}
