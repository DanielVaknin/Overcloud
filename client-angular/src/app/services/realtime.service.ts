import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(private socket: Socket) { }

  scanResponse = this.socket.fromEvent<string>('scan response');
}
