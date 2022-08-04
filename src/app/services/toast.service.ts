import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastStateEnum } from '../core/models/toast-state.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showToastMessage(
    summary: string,
    detail: string,
    severity: ToastStateEnum,
    timeTodisaply: number = 5000
  ) {
    this.messageService.add({
      summary,
      detail,
      severity: this.getSeverity(severity),
      life: timeTodisaply,
    });
  }

  private getSeverity(severity: ToastStateEnum) {
    switch (severity) {
      case ToastStateEnum.Error:
        return 'error';
      case ToastStateEnum.Success:
        return 'success';
      default:
        return 'info';
    }
  }
}
