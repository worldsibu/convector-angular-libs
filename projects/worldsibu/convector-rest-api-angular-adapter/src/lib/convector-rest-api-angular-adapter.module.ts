import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  ClientFactory,
  ConvectorController,
  ControllerAdapter
} from '@worldsibu/convector-core';

import { ConvectorRestApiParams } from './interfaces';
import { CONVECTOR_REST_API_ROUTES, CONVECTOR_REST_API_URL } from './tokens';
import {
  ConvectorRestApiAngularAdapterService
} from './convector-rest-api-angular-adapter.service';

export function controllerFactory(
  controller: new (config?: any) => ConvectorController<any>,
  adapter: ControllerAdapter
) {
  return ClientFactory(controller, adapter);
}

@NgModule({
  imports: [HttpClientModule]
})
export class ConvectorRestApiAngularAdapterModule {
  public static forRoot(params: ConvectorRestApiParams): ModuleWithProviders {
    return {
      ngModule: ConvectorRestApiAngularAdapterModule,
      providers: [
        {
          provide: CONVECTOR_REST_API_URL,
          useValue: params.url
        },
        {
          provide: CONVECTOR_REST_API_ROUTES,
          useValue: params.routes
        },
        ConvectorRestApiAngularAdapterService
      ]
    };
  }

  public static perController(controller: (new (config?: any) => ConvectorController<any>)): ModuleWithProviders {
    return {
      ngModule: ConvectorRestApiAngularAdapterModule,
      providers: [
        {
          provide: controller,
          useFactory: controllerFactory.bind(null, controller),
          deps: [ConvectorRestApiAngularAdapterService]
        }
      ]
    };
  }
}
