import { Test, TestingModule } from '@nestjs/testing';
import { PersonalTransactionService } from './personal-transaction.service';

describe('PersonalTransactionService', () => {
  let service: PersonalTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalTransactionService],
    }).compile();

    service = module.get<PersonalTransactionService>(PersonalTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
