import { registerEnumType } from '@nestjs/graphql';

export enum ItemCategory {
    FURNITURE = 'FURNITURE',
    MUSIC = 'MUSIC',
    TOOL = 'TOOL',
}

registerEnumType(ItemCategory, {
  name: 'ItemCategory',
  description: 'The item types',
  valuesMap: {
    FURNITURE: {
      description: 'Any furniture.',
    },
    MUSIC: {
      description: 'Anything related to music such as instruments, scores, etc.',
    },
    TOOL: {
      description: 'Any tools.',
    },
  },
});