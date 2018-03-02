import { Model } from "sequelize-typescript";

export default class CustomModel<T> extends Model<T> {
  static serializeKey = Symbol("$$serialize");
  toJSON() {
    for (let key in this["dataValues"]) {
      const isDeleteProp = Reflect.getMetadata(
        CustomModel.serializeKey,
        this,
        key
      );
      if (isDeleteProp) {
        delete this["dataValues"][key];
      }

      const prop = this["dataValues"][key];
      if (prop instanceof Model) {
        this["dataValues"][key] = prop.toJSON();
      }
    }
    return super.toJSON();
  }
}
