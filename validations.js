import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Emailul introdus este gresit!').isEmail(),
    body('password', 'Parola trebuie sa aiba minim 5 caractere!').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Emailul introdus este gresit!').isEmail(),
    body('password', 'Parola trebuie sa aiba minim 5 caractere!').isLength({ min: 5 }),
    body('fullName', 'Numele trebuie sa fie format din minim 3 litere!').isLength({ min: 3 }),
    body('avatarUrl', 'Linkul la avatar este gresit!').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Introduceti titlul postarii').isLength({ min: 3 }).isString(),
    body('text', 'Introduceti textul postarii').isLength({ min: 10 }).isString(),
    body('tags', 'Formatul tagurilor este incorect').optional().isString(),
    body('imageUrl', 'Linkul la avatar este gresit!').optional().isString(),
];