export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      rol
      avatarUrl
      description
    }
  }
`;


export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
        email
        rol
        avatarUrl
        description
				id
			}
		}
	}
`;