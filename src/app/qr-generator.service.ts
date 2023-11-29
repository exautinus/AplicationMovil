// qr-generator.service.ts
import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root',
})
export class QrGeneratorService {
  constructor() {}

  generateQRCodeUrl(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(data, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  }
}
