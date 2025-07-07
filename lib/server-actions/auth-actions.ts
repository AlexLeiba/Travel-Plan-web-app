import { signIn, signOut } from '../../auth';

export async function Login({
  type = 'github',
}: {
  type: 'github' | 'google';
}) {
  await signIn(type, { redirectTo: '/' });
}
export async function Logout() {
  await signOut({ redirectTo: '/' });
}
