import { registerEnumType } from '@nestjs/graphql';

export enum ApplicationStatus {
    APPLIED = 'APPLIED',
    DECLINED = 'DECLINED',
    ACCEPTED = 'ACCEPTED',
}

registerEnumType(ApplicationStatus, {
  name: 'ApplicationStatus',
  description: 'Owner application status for an item',
  valuesMap: {
    APPLIED: {
      description: 'When an owner applied to publish an item.',
    },
    DECLINED: {
      description: 'When an owner application is declined.',
    },
    ACCEPTED: {
      description: 'When an owner application is accepted',
    },
  },
});