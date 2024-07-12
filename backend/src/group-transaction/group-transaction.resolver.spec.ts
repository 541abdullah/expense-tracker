import { Test, TestingModule } from '@nestjs/testing';
import { GroupTransactionResolver } from './group-transaction.resolver';

describe('TransactionResolver', () => {
  let resolver: GroupTransactionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTransactionResolver],
    }).compile();

    resolver = module.get<GroupTransactionResolver>(GroupTransactionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
