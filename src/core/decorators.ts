import { User } from "src/models/user.model";
import { createParamDecorator, applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { Request } from "express";
import { GetListOptionsModel } from "./interfaces";

export const UserData = createParamDecorator(
  (data, request: Request): User => (request as any).user as User
);

export const ApiGetQuery = () =>
  applyDecorators(
    ApiQuery({ name: "search", required: false }),
    // ApiQuery({ name: "populate", required: false }),
    ApiQuery({ name: "skip", required: false, example: "0" }),
    ApiQuery({ name: "limit", required: false, example: "10" })
  );

export const GetQuery = createParamDecorator(
  (data, req: Request): GetListOptionsModel => {
    const { search, skip, limit } = req.query as any;
    return { search, skip, limit };
  }
);
