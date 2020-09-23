import Axios from 'axios';

interface User {
  name: string;
}

const url = 'https://jsonplaceholder.typicode.com/users?name_like=';

export const getUsersByFilter = (filter: string) =>
  Axios.get(`${url}${filter}`).then(({ data }) =>
    data.map((user: User) => user.name)
  );
