import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import { Profile } from "../profile/profile.entity";
import * as crypto from "crypto";
import NoJSON from "../../../common/nojson.decorator";
import CustomModel from "../../../common/custom.model";

@Table({
  tableName: "users"
})
export class User extends CustomModel<User> {
  @Column email: string;

  @NoJSON()
  @Column
  salt: string;

  @NoJSON()
  @ForeignKey(() => Profile)
  @Column
  profileId: number;

  @BelongsTo(() => Profile)
  profile: Profile;

  @NoJSON()
  @Column
  set password(plainPassword: string) {
    this.salt = Math.random() + "";
    this.setDataValue(
      "password",
      this.encryptPassword(plainPassword)
    );
  }
  get password(): string {
    return this.getDataValue("password");
  }

  public checkPassword(testPassword: string): boolean {
    const hashedPassword = this.encryptPassword(testPassword);
    return hashedPassword == this.password;
  }

  private encryptPassword(plainPassword: string): string {
    return crypto
      .createHmac("sha1", this.salt)
      .update(plainPassword)
      .digest("hex");
  }
}

export const userProviders = [
  {
    provide: "UsersRepository",
    useValue: User
  }
];
