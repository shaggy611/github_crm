import {Module} from '@nestjs/common';
import {GithubService} from './github.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    providers: [GithubService,],
    imports: [HttpModule],
    exports: [GithubService]
})
export class GithubModule {
}
