import {
  Container,
  Group,
  Burger,
} from '@mantine/core';
import SearchInput from '../../base/search-input/SearchInput';
import { useDisclosure } from '@mantine/hooks';
import ProfileMenu from '../../base/profile-menu';
import useStyles from './HeaderCss'

interface HeaderTabsProps {
  user: { name: string; image: string };
}

const Header =({ user,}: HeaderTabsProps) => {
  const { classes, theme } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <SearchInput />

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color={theme.white}
          />

          <ProfileMenu user={user}/>
        </Group>
      </Container>
      
    </div>
  );
}

export default Header