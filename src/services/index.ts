import Auth, {
  AuthCredentialsRequest,
  AuthCredentialsResponse,
} from "./data/auth";
import User, { UserGetResponse } from "./data/user";
import Financial, { FinancialProps } from "./data/financial";
import { api } from "./api";

const Service = Object.freeze({
  Auth,
  User,
  Financial,
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
}

export { Service, ServiceProps, api };
