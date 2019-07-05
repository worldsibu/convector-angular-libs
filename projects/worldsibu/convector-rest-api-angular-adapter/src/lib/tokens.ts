import { InjectionToken } from '@angular/core';

import { ConvectorRestApiRoute } from './interfaces';

export const CONVECTOR_REST_API_URL = new InjectionToken<string>('CONVECTOR_REST_API_URL');

export const CONVECTOR_REST_API_ROUTES = new InjectionToken<ConvectorRestApiRoute[]>('CONVECTOR_REST_API_ROUTES');
