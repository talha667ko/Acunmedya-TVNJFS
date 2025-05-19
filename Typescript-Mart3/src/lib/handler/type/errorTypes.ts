// Erreurs métier
export class BusinessError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Erreurs de validation
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Erreurs d'authentification
export class AuthorizationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Erreurs de ressource
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Erreurs de configuration
export class ConfigurationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Erreurs de base de données
export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
    }
}