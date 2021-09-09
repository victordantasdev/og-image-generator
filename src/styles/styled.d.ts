import 'styled-components';
import { light } from './themes';

export type Themes = typeof light;

declare module 'styled-components' {
  export interface DefaultTheme extends Themes { }
}
