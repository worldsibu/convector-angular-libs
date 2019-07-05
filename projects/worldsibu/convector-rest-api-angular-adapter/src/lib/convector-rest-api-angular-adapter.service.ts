import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControllerAdapter } from '@worldsibu/convector-core';

import { CONVECTOR_REST_API_URL, CONVECTOR_REST_API_ROUTES } from './tokens';
import { ConvectorRestApiParams, ConvectorRestApiRoute } from './interfaces';

@Injectable()
export class ConvectorRestApiAngularAdapterService implements ControllerAdapter {
  constructor(
    private http: HttpClient,
    @Inject(CONVECTOR_REST_API_URL)
    private url: string,
    @Inject(CONVECTOR_REST_API_ROUTES)
    private routes: ConvectorRestApiRoute[]
  ) { }

  public async invoke(
    controller: string,
    name: string,
    config: ConvectorRestApiParams = {},
    ...args: any[]
  ) {
    const routes = config.routes || this.routes;
    const url = config.url || this.url;

    const route = routes.find(r => r.function === name && r.controller === controller);

    if (!route) {
      throw new Error('No route found');
    }

    let options: any = {};

    if (args.length && route.params) {
      const objectParams = route.params.reduce((obj, key, index) => ({
        ...obj,
        [key]: args[index]
      }), {});

      if (route.verb === 'get') {
        options.params = objectParams;
      } else if (route.verb === 'post') {
        options = objectParams;
      }
    }

    return this.http[route.verb](`${url}/${route.controller}/${route.function}`, options).toPromise();
  }
}
