import {toTitleCase} from '../functions'

export default class User {
  _firstName: string
  _lastName: string
  _emailAddress: string
  _role: string

  constructor(
    firstName: string,
    lastName: string,
    emailAddress: string,
    role: string //admin || user
  ) {
    this._firstName = toTitleCase(firstName),
    this._lastName = toTitleCase(lastName),
    this._emailAddress = emailAddress,
    this._role = role
  }
  
  /* ----------------- Methods ---------------- */
  fullName() {
    return `${this._firstName} ${this._lastName}`
  }

  isAdmin() {
    return this._role === 'admin'
  }

  isUser() {
    return this._role === 'user'
  }
}