import { Attribute } from "./attribute.interface";
import { Validation } from "./validation.interface";

export interface Field {
  id: string;
  type?: string;
  caption: string;
  placeholder?:  string;
  stereotype?: string;
  description?: string;
  theme?: string;
  class?: string;
  validations: Validation[];
  attributes?: Attribute[];
}
  

  
