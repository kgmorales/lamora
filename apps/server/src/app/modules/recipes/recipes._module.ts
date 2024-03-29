import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

//* Controllers
import { ControllersModule } from './controllers/controllers._module';

//* Middleware
import { BooleanConversionMiddleware } from './middleware/boolean-conversion._middleware';

//* Services
import { ServicesModule } from './services/services._module';

const imports = [ControllersModule, ServicesModule];

@Module({
  imports,
})
export class RecipesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //? BOOLEAN CONVERSION FROM STRING
    consumer.apply(BooleanConversionMiddleware).forRoutes('recipes/filter');
  }
}
