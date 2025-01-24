import { registerEnumType } from '@nestjs/graphql';

export enum RenterApplicationStatusType {
    APPLIED = 'APPLIED',
    DECLINED = 'DECLINED',
    ACCEPTED = 'ACCEPTED',
    DELIVERED = 'DELIVERED',
    RENTED = 'RENTED',
    RETURNED = 'RETURNED',
    COMPLETED = 'COMPLETED',
}

registerEnumType(RenterApplicationStatusType, {
  name: 'RenterApplicationStatusType',
  description: 'Application status for a renter application',
  valuesMap: {
    APPLIED: {
        description: 'When a renter applied for an item.',
    },
    DECLINED: {
        description: 'When a renter application is declined.',
    },
    ACCEPTED: {
        description: 'When a renter application is accepted.',
    },
    DELIVERED: {
        description: 'When an item is delivered by a company.',
    },
    RENTED: {
        description: 'When an item is arrived at a renter.',
    },
    RETURNED: {
        description: 'When a renter returns an item back to a company.',
    },
    COMPLETED: {
        description: 'When an item is returned to a company.',
    },
  },
});