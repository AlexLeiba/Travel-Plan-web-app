import React from 'react';
import { Container } from '@/components/grid/Container';
import {
  CardContent,
  CardHeader,
  NewTripCard,
} from '@/components/NewTripPage/NewTripCard';
import { Spacer } from '@/components/ui/spacer';

import { NewTripForm } from '@/components/NewTripPage/NewTripForm';

function NewTripPage() {
  return (
    <Container>
      <h2>New trip</h2>
      <Spacer sm={12} md={12} lg={24} />

      <NewTripCard>
        <CardHeader>
          <h3>Create a new trip</h3>
        </CardHeader>

        <CardContent>
          <NewTripForm />
        </CardContent>
      </NewTripCard>
    </Container>
  );
}

export default NewTripPage;
