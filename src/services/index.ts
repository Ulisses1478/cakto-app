import { api } from "./api";
import Auth, {
  AuthCredentialsRequest,
  AuthCredentialsResponse,
} from "./data/auth";
import Financial, { FinancialProps } from "./data/financial";
import { Pix, PixEnums, PixProps } from "./data/pix";
import User, { UserGetResponse } from "./data/user";

const Service = Object.freeze({
  Auth,
  User,
  Financial,
  Pix,
});

interface ServiceProps {
  Auth: {
    CredentialsRequest: AuthCredentialsRequest;
    CredentialsResponse: AuthCredentialsResponse;
  };
  User: {
    Get: UserGetResponse;
  };
  Financial: FinancialProps;
  Pix: PixProps;
}

export const ServiceEnums = {
  Pix: PixEnums,
};

export { Service, ServiceProps, api };
