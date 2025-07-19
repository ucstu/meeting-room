declare module "#auth-utils" {
  interface User {
    githubId: string;
  }

  interface UserSession {
    user: User;
  }
}

export {};
