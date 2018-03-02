import "reflect-metadata";
import CustomModel from "./custom.model";

export default function NoJSON() {
  return Reflect.metadata(CustomModel.serializeKey, true);
}
