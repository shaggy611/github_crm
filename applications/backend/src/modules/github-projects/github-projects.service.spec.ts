import { Test, TestingModule } from '@nestjs/testing';
import { GithubProjectsService } from './github-projects.service';

describe('GithubProjectsService', () => {
  let service: GithubProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubProjectsService],
    }).compile();

    service = module.get<GithubProjectsService>(GithubProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
