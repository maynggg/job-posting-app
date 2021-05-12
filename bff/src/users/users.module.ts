import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [HttpModule, CompaniesModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
