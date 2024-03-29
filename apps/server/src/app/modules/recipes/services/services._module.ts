import { Module } from '@nestjs/common';

import { PaprikaService } from './paprika._service';
import { RecipesService } from './recipes._service';

import { ProvidersModule } from './providers/providers._module';
import { SharedModule } from '@modules/shared/shared._module';

const imports = [SharedModule, ProvidersModule];

// const services = [PageService, PaprikaService, RecipesService];
const services = [PaprikaService, RecipesService];

@Module({
  imports: imports,
  providers: services,
  exports: [ProvidersModule, ...services],
})
export class ServicesModule {}
