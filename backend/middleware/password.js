/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const passwordValidator = require('password-validator');

/*----------------------------------MIDDLEWARE----------------------------------*/

const passwordSchema = new passwordValidator();

// Password shema.
passwordSchema
.is().min(5)                                    // Minimum length 5
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', 'Password123456', 'Love', 'noPassword']); // Blacklist password

module.exports = passwordSchema;