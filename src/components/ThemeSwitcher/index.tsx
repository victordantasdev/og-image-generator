import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Switch from 'react-switch';
import { Moon, Sun } from '../../../public/icons/SwichIcons';

interface Props {
  toggleTheme(): void;
}

const ThemeSwitcher: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);

  return (
    <Switch
      onChange={toggleTheme}
      checked={theme.title === 'dark'}
      checkedIcon={<Sun />}
      uncheckedIcon={<Moon />}
      onColor={theme.primary}
      offColor={theme.secondary}
    />
  );
};

export default ThemeSwitcher;
