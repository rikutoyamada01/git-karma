"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { ProfileView, UserProfileData } from "@/components/dashboard/views/ProfileView";

export default function PublicUserProfilePage() {
  const params = useParams<{ username: string }>();
  const username = params?.username || "guest";

  const mockUser: UserProfileData = useMemo(
    () => ({
      id: `mock-${username}`,
      name: username,
      username,
      image: `https://github.com/${username}.png`,
      karma: 1200,
      _count: {
        transactionsSent: 12,
        transactionsReceived: 34,
      },
    }),
    [username]
  );

  return (
    <div className="min-h-screen bg-background text-brand-text flex flex-col">
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <ProfileView initialUser={mockUser} editable={false} />
      </main>
    </div>
  );
}
