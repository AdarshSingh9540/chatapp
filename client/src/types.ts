// src/types.ts
// src/types.ts
export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string; // Ensure this is included
  email: string;
  color: number;
  profileSetup: boolean;
  image?: string; // Optional field for image
}

  
  export interface AuthSlice {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
  }
  
  export interface AppState extends AuthSlice {}
  