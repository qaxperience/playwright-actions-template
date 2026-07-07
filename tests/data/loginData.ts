export type Credentials = { user: string; pass: string };

export type LoginData = {
  valid: Credentials;
  emptyUser: Credentials;
  emptyPass: Credentials;
  emptyBoth: Credentials;
  invalidUser: Credentials;
  wrongPass: Credentials;
  messages: {
    emptyUser: string;
    emptyPass: string;
    invalidCredentials: string;
    success: string;
  };
};

export const loginData: LoginData = {
  valid:       { user: 'qa',    pass: 'xperience' },
  emptyUser:   { user: '',      pass: 'senha123'  },
  emptyPass:   { user: 'qa',    pass: ''          },
  emptyBoth:   { user: '',      pass: ''          },
  invalidUser: { user: 'teste', pass: 'teste'     },
  wrongPass:   { user: 'qa',    pass: 'teste'     },
  messages: {
    emptyUser:          'Informe o seu nome de usuário!',
    emptyPass:          'Informe a sua senha secreta!',
    invalidCredentials: 'Oops! Credenciais inválidas :(',
    success:            'Suas credenciais são válidas :)',
  },
};
