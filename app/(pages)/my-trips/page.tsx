import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Container } from '@/components/grid/Container';
import { getServerSession } from 'next-auth';
import React from 'react';

export async function MyTripsPage() {
  const session = await getServerSession(authOptions);

  return <Container>MyTripsPage</Container>;
}

export default MyTripsPage;
