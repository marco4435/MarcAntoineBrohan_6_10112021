/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const passwordValidator = require('password-validator');

/*----------------------------------VALIDATOR----------------------------------*/

const passwordSchema = new passwordValidator();

// Password shema.
passwordSchema
.is().min(5)                                    // Longueur minimale de 5 caractères.
.is().max(100)                                  // Longueur maximale de 10 caractères.
.has().uppercase()                              // Obligation d'avoir au moins une lettre majuscule.
.has().lowercase()                              // Obligation d'avoir au moins une lettre minuscule.
.has().digits(2)                                // Obligation d'avoir au moins deux chiffres.
.has().not().spaces()                           // Interdiction des espaces.
.is().not().oneOf(['Passw0rd', 'Password123', 'Password123456', 'Love', 'noPassword']); // Liste de mots de passe interdits.

module.exports = passwordSchema;