import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './mysql-database.provider';

@Global()
@Module({
    imports: [...DatabaseProvider],
    exports: [...DatabaseProvider],
})
export class DatabaseModule {}
