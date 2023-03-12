import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';



interface SearchProps {
  handleOnSearch: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchInput = ({handleOnSearch}: SearchProps) => {
  const theme = useMantineTheme();
  return (
    <TextInput
      onChange={handleOnSearch}
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          {theme.dir === 'ltr' ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search article"
      rightSectionWidth={42}
    />
  );
}

export default SearchInput