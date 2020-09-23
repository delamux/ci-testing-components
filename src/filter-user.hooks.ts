import * as React from 'react';
import { getUsersByFilter } from './api';

export const useFilterUsers = (initialFilter: string) => {
  const [users, setUsers] = React.useState<string[]>([]);
  const [filter, setFilter] = React.useState<string>(initialFilter);

  React.useEffect(() => {
    getUsersByFilter(filter).then((newUsers) => {
      setUsers(newUsers);
    });
  }, [filter]);

  return {
    users,
    setFilter,
  };
};
