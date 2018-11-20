import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'findLanguageFromKey'})
export class FindLanguageFromKeyPipe implements PipeTransform {
    private languages: any = {
        'en': { name: 'English' },
        'ru': { name: 'Русский' }
    };
    transform(lang: string): string {
        return this.languages[lang].name;
    }
}
