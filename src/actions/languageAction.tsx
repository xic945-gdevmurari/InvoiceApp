import I18n from 'react-native-i18n';
import {LANGUAGE} from './types';

export const updateLanguage = (language: string) => async (dispatch: any) => {
  console.log('langiuaeg:', language);

  I18n.locale = language;
  dispatch({
    type: LANGUAGE,
    payload: language,
  });
};
