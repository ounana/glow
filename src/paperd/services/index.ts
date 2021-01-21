import { MyPaperScope } from "../PaperRoot";
import { Daub } from "./Daub";
import { Move } from "./Move";
import { Draw } from "./Draw";
import { Union } from "./Union";

export abstract class Service {
  static namespace: string
  constructor(public readonly paper: MyPaperScope) { }
  abstract destroy(): void
}

export type ServiceType =
  typeof Daub | typeof Move |
  typeof Draw | typeof Union

export const Services = new Map<string, ServiceType>()

Services.set(Daub.namespace, Daub)
Services.set(Move.namespace, Move)
Services.set(Draw.namespace, Draw)
Services.set(Union.namespace, Union)