import { toTitleCase } from '../functions/index.js';
export default class User {
    constructor(firstName, lastName, emailAddress, role //admin || user
    ) {
        this._firstName = toTitleCase(firstName),
            this._lastName = toTitleCase(lastName),
            this._emailAddress = emailAddress,
            this._role = role;
    }
    /* ----------------- Methods ---------------- */
    fullName() {
        return `${this._firstName} ${this._lastName}`;
    }
    isAdmin() {
        return this._role === 'admin';
    }
    isUser() {
        return this._role === 'user';
    }
}
//# sourceMappingURL=User.js.map