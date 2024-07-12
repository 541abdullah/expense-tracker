import { Test, TestingModule } from '@nestjs/testing';
import { PersonalTransactionResolver } from './personal-transaction.resolver';

describe('PersonalTransactionResolver', () => {
  let resolver: PersonalTransactionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalTransactionResolver],
    }).compile();

    resolver = module.get<PersonalTransactionResolver>(PersonalTransactionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
