import { Inject, Component } from "@nestjs/common";
import axios from "axios";
import config from "../config";
import * as querystring from "querystring";
import { Func } from "continuation-local-storage";

@Component()
export class QueueService {
  private static readonly CHECK_INTERVAL: number = 200;
  private requestsQueue: Object[] = [];

  private _isInit: boolean = false;
  get isInit(): boolean {
    return this._isInit;
  }

  public requestHandleFunction: (req: Object) => Promise<any>;
  private intervalId: number;
  //инициализуруем обработчик и очередь
  public init(
    requestHandleFunction: (req: Object) => Promise<any>
  ): void {
    this.requestHandleFunction = requestHandleFunction;
    this.intervalId = setInterval(
      this.checkQueue.bind(this),
      QueueService.CHECK_INTERVAL
    );
    this._isInit = true;
  }

  public clear() {
    clearInterval(this.intervalId);
  }
  // добавляем запрос в очередь
  public addRequest(req: Object): void {
    this.requestsQueue.push(req);
  }

  private queueHandling: boolean = false;
  //если есть данные для запросов делаем их, и затем отвечаем клиентам
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
