import { HttpModule, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Module({
  imports: [HttpModule],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
