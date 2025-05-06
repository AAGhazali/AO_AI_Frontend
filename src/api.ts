import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://ec2-3-16-207-102.us-east-2.compute.amazonaws.com"
      : "/api",
});
