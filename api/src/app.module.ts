import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EmployeesModule } from './employees/employees.module';
import { CompaniesModule } from './companies/companies.module';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    EmployeesModule,
    CompaniesModule,
  ]
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
