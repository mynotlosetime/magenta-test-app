import { Inject, Component } from "@nestjs/common";
import axios from "axios";
import config from "../config";
import * as querystring from "querystring";
import { Func } from "continuation-local-storage";

/**
 * QueueService - сервис для отправки запросов очередями
 */
@Component()
export class QueueService {
  /** Константа интервал проверки очереди запросов. */
  private static readonly CHECK_INTERVAL: number = 200;

  /** Очередь запросов - массив произвольных обьектов*/
  private requestsQueue: Object[] = [];

  private _isInit: boolean = false;
  get isInit(): boolean {
    return this._isInit;
  }

  /**
   * Функция которая будет вызываться для обработки каждого запроса.
   * @param req обьект запроса из очереди.
   * @return промис с любым значением.
   */
  public requestHandleFunction: (req: Object) => Promise<any>;

  private intervalId: number;
  /**
   * Инициализация сервиса, запуск обработки очереди {@link requestsQueue}.
   * @param requestHandleFunction функция обработчик зарпосов.
   */
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

  /**
   * Добавление запроса в очередь
   * @param req произвальный обьект запроса который затем будет передан
   * в {@link requestHandleFunction} функцию обработчик
   */
  public addRequest(req: Object): void {
    this.requestsQueue.push(req);
  }

  private queueHandling: boolean = false;
  /**
   * Проверка очереди, если в очереди есть запросы, последовательно
   * обрабатываем их вызывая функцию обработчик {@link requestHandleFunction}.
   */
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
