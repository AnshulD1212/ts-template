import { Router } from "express";

import { Policy } from "../policies";

export const router = Router();

interface IRouteOptions {
  endpoint: string;
  policies?: Policy[]
}

export function GET(options: IRouteOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    router.get(options.endpoint, target[propertyKey]);
  };
}

export function POST(options: IRouteOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    router.post(options.endpoint, target[propertyKey]);
  };
}

export function PUT(options: IRouteOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    router.put(options.endpoint, target[propertyKey]);
  };
}

export function PATCH(options: IRouteOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    router.patch(options.endpoint, target[propertyKey]);
  };
}

export function DELETE(options: IRouteOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    router.delete(options.endpoint, target[propertyKey]);
  };
}
