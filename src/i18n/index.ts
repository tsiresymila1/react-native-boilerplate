import {I18n} from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import frl from './fr.json';
import enl from './en.json';


export const i18n = new I18n({
    fr: frl,
    en: enl,
})
i18n.enableFallback = true;
let data = RNLocalize.getLocales();
i18n.defaultLocale = data[0].languageCode || 'fr';
