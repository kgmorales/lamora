import { Module } from '@nestjs/common';

import { PrismaService } from './prisma._service';

// import { PageService } from './page._service';
// import { RecipesService } from './recipes._service';

// import { ProvidersModule } from './providers/providers._module';

// const imports = [ProvidersModule];

// const services = [PageService, PaprikaService, RecipesService];
const services = [PrismaService];

@Module({
  // imports: imports,
  providers: [...services],
  exports: [...services],
})
export class ServicesModule {}
