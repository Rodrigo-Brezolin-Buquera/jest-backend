import { UserBusiness } from "../../src/business/UserBusiness";

import { UserDatabaseMock } from "../database/userDatabaseMock";
import { AuthenticatorMock } from "../services/AuthenticatorMock";
import { HashManagerMock } from "../services/HashManagerMock";
import { IdGeneratorMock } from "../services/IdGeneratorMock";

const userBusiness = new UserBusiness(
  new UserDatabaseMock(),
  new HashManagerMock(),
  new AuthenticatorMock(),
  new IdGeneratorMock()
);

describe("testes signup", () => {
  test("situação de sucesso", async () => {
    expect.assertions;
    try {
      const input = {
        name: "Matheus Lima Ribeiro",
        email: "matheus2@gmail.com",
        password: "654321",
        role: "ADMIN",
      };
      const token = await userBusiness.createUser(input);
      expect(token).toBeDefined();
    } catch (error) {}
  });

  test("nome vazio", async () => {
    expect.assertions;
    try {
      const input = {
        name: "",
        email: "matheus2@gmail.com",
        password: "654321",
        role: "ADMIN",
      };
      const token = await userBusiness.createUser(input);
    } catch (error: any) {
      expect(error.message).toBe(
        'Preencha os campos "name", "email" e "password"'
      );
    }
  });

  test("email vazio", async () => {
    expect.assertions;
    try {
      const input = {
        name: "gregh",
        email: "",
        password: "654321",
        role: "ADMIN",
      };
      const token = await userBusiness.createUser(input);
    } catch (error: any) {
      expect(error.message).toBe(
        'Preencha os campos "name", "email" e "password"'
      );
    }
  });

  test("password vazio", async () => {
    expect.assertions;
    try {
      const input = {
        name: "gregh",
        email: "email@email,com",
        password: "",
        role: "ADMIN",
      };
      const token = await userBusiness.createUser(input);
    } catch (error: any) {
      expect(error.message).toContain(
        'Preencha os campos "name", "email" e "password"'
      );
    }
  });

  test("role vazio", async () => {
    expect.assertions;
    try {
      const input = {
        name: "gregh",
        email: "email@email,com",
        password: "4872gfg",
        role: "",
      };
      const token = await userBusiness.createUser(input);
    } catch (error: any) {
      expect(error.message).toContain('Preencha os campos "name", "email" e "password"');
    }
  });

  test("email inválido", async () => {
    expect.assertions;
    try {
      const input = {
        name: "gregh",
        email: ",com",
        password: "4872gfg",
        role: "ADMIN",
      };
      const token = await userBusiness.createUser(input);
    } catch (error: any) {
      expect(error.message).toContain("Email inválido");
    }
  });

  test("nome muito curto", async () => {
    expect.assertions;
    try {
      const input = {
        name: "1",
        email: "email@email,com",
        password: "4872gfg",
        role: "ADMIN",
      };
      const token = await userBusiness.createUser(input);
    } catch (error: any) {
      expect(error.message).toContain(
        "Nome inválido"
      );
    }
  });

  test("senha muito curta", async () => {
    expect.assertions;
    try {
      const input = {
        name: "NAME",
        email: "email@email,com",
        password: "1",
        role: "ADMIN",
      };
      const token = await userBusiness.createUser(input);
    } catch (error: any) {
      expect(error.message).toContain(
        "Senha inválida"
      );
    }
  });

  test("tipo inválido", async () => {
    expect.assertions;
    try {
      const input = {
        name: "NAME",
        email: "email@email,com",
        password: "1r2r34sfds",
        role: "12",
      };
      const token = await userBusiness.createUser(input);
    } catch (error: any) {
      expect(error.message).toContain(
        'Tipo inválido'
      );
    }
  });
});

describe("teste login",async () => {
    
})