import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const userId = 1;

const getUserResponse = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  city: "Gwenborough",
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
};

const getUserUpdateResponse = {
  id: 1,
  name: "John Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  city: "Gwenborough",
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
};

const getCreateUserResponse = {
  id: 3,
  name: "Clementine Bauch",
  username: "Samantha",
  email: "Nathan@yesenia.net",
  city: "Gwenborough",
  phone: "1-463-123-4447",
  website: "ramiro.info",
};

const getUserListResponse = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    city: "Gwenborough",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "ervin@april.biz",
    city: "Gwenborough",
    phone: "1-770-736-8031",
    website: "elvis.com",
  },
];

const mockNetWorkResponse = () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`/users/?id=${userId}`).reply(200, [getUserResponse]);
  mock.onGet(`/users/`).reply(200, getUserListResponse);
  mock.onPost(`/users/`).reply(200, getCreateUserResponse);
  mock.onPut(`/users/${userId}`).reply(200, getUserUpdateResponse);
  mock.onDelete(`/users/${userId}`).reply(200);
};

export {
  mockNetWorkResponse,
  getUserResponse,
  getUserUpdateResponse,
  getCreateUserResponse,
  getUserListResponse,
  userId,
};
