import { Guard, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import { AuthController } from "../controllers/auth.controller";

@Guard()
export class RolesGuard implements CanActivate {
  canActivate(
    dataOrRequest,
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPermitController =
      context.parent.name == AuthController.name;
    return (
      isPermitController ||
      (dataOrRequest.session && dataOrRequest.session.user)
    );
  }
}
