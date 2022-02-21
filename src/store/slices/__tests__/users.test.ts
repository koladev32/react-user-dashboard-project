import reducer, { initialState, findUserById, fetchUsers, addUser, updateUser, deleteUser } from "../user";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { store } from "../..";

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
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "city": "Gwenborough",
    "phone": "1-463-123-4447",
    "website": "ramiro.info"
  }

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
  mock.onGet(`/users/?id=${userId}`).reply(200, getUserResponse);
  mock.onGet(`/users/`).reply(200, getUserListResponse);
  mock.onPost(`/users/`).reply(200, getCreateUserResponse);
  mock.onPut(`/users/${userId}`).reply(200, getUserUpdateResponse);
  mock.onDelete(`/users/${userId}`).reply(200);
};

/**
 * Testing the initial state
 */

test("Should return initial state", () => {
  expect(
    reducer(undefined, {
      type: undefined,
    })
  ).toEqual(initialState);
});

/**
 * Testing the findUserById thunk
 */

describe("User List state tests", () => {
  beforeAll(() => {
    mockNetWorkResponse();
  });

  it("Shoudl be able to fetch the user object", async () => {
    const result = await store.dispatch(findUserById(userId));

    const user = result.payload;

    expect(result.type).toBe("users/findUserById/fulfilled");
    expect(user).toEqual(getUserResponse);

    const state = store.getState().users;

    expect(state.users).toEqual([getUserResponse]);
  });
});

/**
 * Testing the findUserById thunk
 */

describe("List all users", () => {
  beforeAll(() => {
    mockNetWorkResponse();
  });

  it("Shoudl be able to fetch the user list", async () => {
    const result = await store.dispatch(fetchUsers());

    const users = result.payload;

    expect(result.type).toBe("users/fetchUsers/fulfilled");
    expect(users).toEqual(getUserListResponse);

    const state = store.getState().users;

    expect(state.users).toEqual(getUserListResponse);
  });
});


/**
 * Testing the createUser thunk
 */

 describe("Create a new user", () => {
    beforeAll(() => {
      mockNetWorkResponse();
    });
  
    it("Should be able to create a new user", async () => {
      // Saving previous state
      const previousState = store.getState().users;

      const previousUsers = [
          ...previousState.users
      ];
      previousUsers.push(getCreateUserResponse);

      // Dispatching the action

      const result = await store.dispatch(addUser(getCreateUserResponse));
  
      const user = result.payload;

      expect(result.type).toBe("users/addUser/fulfilled");
      expect(user).toEqual(getCreateUserResponse);
  
      const state = store.getState().users;
  
      expect(state.users).toEqual(previousUsers);
    });
  });
  
  /**
 * Testing the updateUser thunk
 */

 describe("Update a user", () => {
    beforeAll(() => {
      mockNetWorkResponse();
    });
  
    it("Should be able to update a user", async () => {
      // Saving previous user
      const previousUserState = await store.dispatch(findUserById(userId));

      const previousUser = previousUserState.payload;
    
      expect(previousUserState.type).toBe("users/findUserById/fulfilled");

      // Dispatching the action

      const result = await store.dispatch(updateUser(getUserUpdateResponse));
      const user = result.payload;

      expect(result.type).toBe("users/updateUser/fulfilled");
    
      expect(user).toEqual(getUserUpdateResponse);
      expect(user).not.toEqual(previousUser);
      });
  });
  

   /**
 * Testing the deleteUser thunk
 */

 describe("Delete a user", () => {
    beforeAll(() => {
      mockNetWorkResponse();
    });
  
    it("Should be able to delete a user", async () => {
      // Saving previous state
      const previousState = store.getState().users;

      const previousUsers = [
          ...previousState.users
      ];

      // Dispatching the action

      const result = await store.dispatch(deleteUser(getUserResponse));
  
      const user = result.payload;

      expect(result.type).toBe("users/deleteUser/fulfilled");
      expect(user).toEqual(getUserResponse);
  
      const state = store.getState().users;
  
      expect(state.users).not.toEqual(previousUsers);
      expect(state.users).toEqual(previousUsers.filter(user => user.id !== getUserResponse.id));
      });
  });
