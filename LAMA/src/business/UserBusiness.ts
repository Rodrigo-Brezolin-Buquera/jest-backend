import { UserInputDTO, LoginInputDTO, UserRole } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserRepository } from "./UserRepository";
import {
  CustomError,
  InvalidEmail,
  InvalidName,
  InvalidPassword,
  InvalidType,
} from "../error/customError";

export class UserBusiness {
  constructor(
    private userDatabase: UserRepository,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
  ) {}

  public async createUser(user: UserInputDTO) {
    const id = this.idGenerator.generate();

    const hashPassword = await this.hashManager.hash(user.password);

    if (!user.name || !user.email || !user.password || !user.role) {
      throw new CustomError(
        400,
        'Preencha os campos "name", "email" e "password"'
      );
    }

    if (user.name.length < 4) {
      throw new InvalidName();
    }

    if (!user.email.includes("@")) {
      throw new InvalidEmail();
    }
    if (user.password.length < 6) {
      throw new InvalidPassword();
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.NORMAL  ) {
      throw new InvalidType()
    }

    await this.userDatabase.createUser(
      id,
      user.email,
      user.name,
      hashPassword,
      user.role
    );

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({ id, role: user.role });

    return accessToken;
  }

  public async getUserByEmail(user: LoginInputDTO) {
    const userFromDB = await this.userDatabase.getUserByEmail(user.email);

    const hashCompare = await this.hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    const accessToken = this.authenticator.generateToken({
      id: userFromDB.getId(),
      role: userFromDB.getRole(),
    });

    if (!hashCompare) {
      throw new Error("Invalid Password!");
    }

    return accessToken;
  }
}
