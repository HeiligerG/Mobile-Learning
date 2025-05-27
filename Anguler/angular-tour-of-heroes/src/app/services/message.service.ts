import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _messages = signal<string[]>([]);
  
  messages = this._messages.asReadonly();

  add(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const formattedMessage = `[${timestamp}] ${message}`;
    
    this._messages.update(messages => [...messages, formattedMessage]);
    
    setTimeout(() => {
      this.remove(this._messages().indexOf(formattedMessage));
    }, 5000);
  }

  clear(): void {
    this._messages.set([]);
  }

  remove(index: number): void {
    this._messages.update(messages => 
      messages.filter((_, i) => i !== index)
    );
  }

  addSuccess(message: string): void {
    this.add(`✅ ${message}`);
  }

  addError(message: string): void {
    this.add(`❌ ${message}`);
  }

  addWarning(message: string): void {
    this.add(`⚠️ ${message}`);
  }

  addInfo(message: string): void {
    this.add(`ℹ️ ${message}`);
  }
}