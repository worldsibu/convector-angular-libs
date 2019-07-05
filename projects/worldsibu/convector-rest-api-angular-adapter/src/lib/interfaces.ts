import { ConvectorController } from '@worldsibu/convector-core';

export interface ConvectorRestApiRoute {
	function: string;
	verb: string;
  controller: string;
  params?: string[];
}

export interface ConvectorRestApiParams {
  url?: string;
  routes?: ConvectorRestApiRoute[];
}
