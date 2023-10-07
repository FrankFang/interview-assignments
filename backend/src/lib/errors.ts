export class IdOutOfRangeError extends Error {
  constructor(id: number) {
    super(`Id ${id} is out of range`)
  }
}
