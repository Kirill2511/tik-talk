import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({ providedIn: 'root' })
export class MockService {
  getAddresses() {
    return of([
      {
        city: 'Москва',
        street: 'Тверская',
        building: 14,
        apartment: 32,
      },
      {
        city: 'Санкт-Петербург',
        street: 'Ленина',
        building: 100,
        apartment: 30,
      },
    ]);
  }

  getRating(): Observable<number> {
    return of(3);
  }

  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'lift',
        label: 'Подъем на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false,
      },
    ]);
  }

  getSchedule(): Observable<any> {
    return of({
      timeFrom: '10:00',
      timeTo: '18:00',
      dayToPath: 3,
      timeToPath: '08:00',
      countDaySale: 10,
      numberBus: '1',
      seatDistribution: 1,
      busClass: 'Большой',
      seat: '1',
      busModel: 'МАН',
      typeSeat: '29 сидя /21 стоя',
      atp: 1,
      nameRoute: 'Маршрут 4',
      numberRoute: 1,
    });
  }
}
