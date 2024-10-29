import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DADATA_TOKEN } from './token';
import { map } from 'rxjs';
import { DadataSuggestion } from '../interfaces/dadata.interface';

@Injectable({
  providedIn: 'root',
})
export class DadataService {
  #http = inject(HttpClient);
  #apiUrl =
    'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  getSuggestions(query: string) {
    return this.#http
      .post<{ suggestions: DadataSuggestion[] }>(
        this.#apiUrl,
        { query },
        {
          headers: {
            Authorization: `Token ${DADATA_TOKEN}`,
          },
        }
      )
      .pipe(
        map((res) => {
          return res.suggestions;
          /*return Array.from(
            new Set(
              res.suggestions.map((suggestion: DadataSuggestion) => {
                return suggestion.data.city;
              })
            )
          );*/
        })
      );
  }
}
