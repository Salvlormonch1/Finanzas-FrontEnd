export class SignUpRequest {
    constructor(email, username, password) {
        this.username = username;
        this.email = email
        this.password = password;
    }
}