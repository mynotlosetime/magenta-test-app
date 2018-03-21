import { Inject, Component } from "@nestjs/common";
import axios from "axios";
import config from "../config";
import * as querystring from "querystring";
import { Func } from "continuation-local-storage";

@Component()
export class QueueService {
  private static readonly CHECK_INTERVAL: number = 200;
  private requestsQueue: Object[] = [];
  private requestHandleFunction: (req: Object) => Promise<any>;

  private isInit: boolean = false;

  public init(
    requestHandleFunction: (req: Object) => Promise<any>
  ): void {
    this.requestHandleFunction = requestHandleFunction;
    setInterval(
      this.checkQueue.bind(this),
      QueueService.CHECK_INTERVAL
    );
    this.isInit = true;
  }

  public addRequest(req: Object): void {
    if (!this.isInit) {
      throw Error("Service is not init");
    }
    this.requestsQueue.push(req);
  }

  //если есть данные для запросов делаем их, и затем отвечаем клиентам
  private queueHandling: boolean = false;

  private async checkQueue(): Promise<any> {
    if (!this.requestsQueue.length || this.queueHandling) return;

    const handlingQueuePart: Object[] = this.requestsQueue.slice();
    this.requestsQueue.length = 0;

    this.queueHandling = true;
    for (let i = 0; i < handlingQueuePart.length; i++) {
      const req: Object = handlingQueuePart[i];
      await this.requestHandleFunction(req);
    }
    this.queueHandling = false;
  }
}
