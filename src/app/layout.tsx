"use client";
/* eslint-disable */
import { QueryClient, QueryClientProvider } from "react-query";

import { FeedbackContextProvider } from "@/context/feedbackContext";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "Easy Task",
  description: "Generated by create next app",
};

interface LayoutProps {
  types: string;
  children: ReactNode;
}

export default function RootLayout({ types, children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <FeedbackContextProvider>{children}</FeedbackContextProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
