/* Modules */
import { NgModule } from "@angular/core";
import { environment as env } from "../../environments/environment";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  AuthModule,
  AuthHttpInterceptor,
  HttpMethod,
} from "@auth0/auth0-angular";

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          {
            uri: "/api/owners*",
            httpMethod: HttpMethod.Get,
            tokenOptions: {
              audience: env.auth.audience,
              scope: "get:owners",
            },
          },
          // {
          //   uri: "/api/owners*",
          //   httpMethod: HttpMethod.Post,
          //   tokenOptions: {
          //     audience: env.auth.audience,
          //     scope: "create:owner",
          //   },
          // },
          {
            uri: "/api/owners*",
            httpMethod: HttpMethod.Put,
            tokenOptions: {
              audience: env.auth.audience,
              scope: "update:owner",
            },
          },
          // {
          //   uri: "/api/owners*",
          //   httpMethod: HttpMethod.Delete,
          //   tokenOptions: {
          //     audience: env.auth.audience,
          //     scope: "delete:owner",
          //   },
          // },
        ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
})
export class CustomAuthModule {}
