import { Test, TestingModule } from '@nestjs/testing';
import { GroupTransactionService } from './group-transaction.service';

describe('TransactionService', () => {
  let service: GroupTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTransactionService],
    }).compile();

    service = module.get<GroupTransactionService>(GroupTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
