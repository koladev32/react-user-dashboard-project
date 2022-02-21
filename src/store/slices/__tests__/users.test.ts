import reducer, {
    initialState,
    findUserById,
    fetchUsers
  } from "../user";
  import axios from "axios";
  import MockAdapter from "axios-mock-adapter";
  import { store } from "../..";
  
  const userId = 1;
  
  const getUserResponse = {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "city": "Gwenborough",
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org"
  };

  const getUserListResponse = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "city": "Gwenborough",
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org"
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "ervin@april.biz",
        "city": "Gwenborough",
        "phone": "1-770-736-8031",
        "website": "elvis.com"
  }
  ]
  
  
  const mockNetWorkResponse = () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`/users/?id=${userId}`).reply(200, getUserResponse);
    mock.onGet(`/users/`).reply(200, getUserListResponse);
  }
  
  
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
      })
  
      it("Shoudl be able to fetch the user object", async () => {
        const result = await store.dispatch(findUserById(userId));
  
        const user = result.payload;
  
        expect(result.type).toBe("users/findUserById/fulfilled");
        expect(user).toEqual(getUserResponse);
  
        const state = store.getState().users;
  
        expect(state.users).toEqual([getUserResponse]);
      })
      
  }); 


    /**
   * Testing the findUserById thunk
   */
  
     describe("List all users", () => {
        beforeAll(() => {
          mockNetWorkResponse();
        })
    
        it("Shoudl be able to fetch the user list", async () => {
          const result = await store.dispatch(fetchUsers());
    
          const users = result.payload;
    
          expect(result.type).toBe("users/fetchUsers/fulfilled");
          expect(users).toEqual(getUserListResponse);
    
          const state = store.getState().users;
    
          expect(state.users).toEqual(getUserListResponse);
        })
        
    }); 