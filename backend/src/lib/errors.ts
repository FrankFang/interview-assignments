export class IdOutOfRangeError extends Error {
  constructor(id: number) {
    super(`Id ${id} is out of range`)
  }
}

export class DatabaseConnectionError extends Error {
  constructor(err?: any) {
    err && console.error(err)
    super('Database connection error')
  }
}

export class UnknownError extends Error {
  constructor() {
    super('Unknown error')
  }
}
