import { Handler } from "express"

export const asyncHandlerWrapper = (callback: (...args: Parameters<Handler>) => Promise<unknown>): Handler => {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}
