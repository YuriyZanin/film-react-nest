import { Test, TestingModule } from '@nestjs/testing';
import { FilmsPostgresRepository } from '../repository/films.postgres.repository';

describe('FilmsPostgresRepository', () => {
  let provider: FilmsPostgresRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsPostgresRepository],
    }).compile();

    provider = module.get<FilmsPostgresRepository>(FilmsPostgresRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
