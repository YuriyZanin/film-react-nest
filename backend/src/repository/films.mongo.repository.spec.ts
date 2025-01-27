import { Test, TestingModule } from '@nestjs/testing';
import { FilmsMongoRepository } from './films.mongo.repository';

describe('FilmsMongoRepository', () => {
  let provider: FilmsMongoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsMongoRepository],
    }).compile();

    provider = module.get<FilmsMongoRepository>(FilmsMongoRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
