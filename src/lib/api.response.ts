import { NextResponse } from "next/server";

// Helpers Response API
interface IResponse {
  message?: string;
  data?: any;
  status?: ResponseInit["status"];
}

const Response = ({ message = "Success", data, status = 200 }: IResponse) =>
  NextResponse.json(
    // response body
    {
      success: 200,
      message,
      data,
    },
    // response init
    {
      status,
    }
  );

export default Response;
