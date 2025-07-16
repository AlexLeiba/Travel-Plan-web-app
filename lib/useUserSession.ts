import { useSession } from 'next-auth/react';

export function useUserSession() {
  const { data } = useSession();
  if (!data?.user || !data.user.email) {
    return null;
  }
  return data.user;
}
