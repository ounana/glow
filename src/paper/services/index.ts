import { Daub } from "./Daub";
import { Move } from "./Move";
import { Draw } from "./Draw";
import { Union } from "./Union";

export abstract class Service {
  static namespace: string
  constructor(public readonly paper: paper.PaperScope) { }
  abstract destroy(): void
}

export type ServiceType = Daub | Move | Draw | Union
export class ServiceCore {
  Services = [Daub, Move, Draw, Union]
  service: ServiceType | null = null
  serviceName: string | null = null
  constructor(public readonly paper: paper.PaperScope) { }

  getService(name: string) {
    return this.Services.find(s => s.namespace === name)
  }
  registerService(name: string) {
    //verification service is Repeat
    if (name === this.serviceName) {
      throw new Error('The service has not changed!')
    }
    //cancellation service
    if (this.service) {
      this.service.destroy()
      this.service = null
    }
    //switch service
    const service = this.getService(name)
    if (!service) throw new Error('This service not is exist!')
    this.service = new service(this.paper)
    this.serviceName = service.namespace
  }
}