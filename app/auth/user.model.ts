export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() { // is a special type of property, we cant overwrite it (we can use user.token)
    // checking if this token does not exists or if token is expired ie if token date is smaller than current date
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
