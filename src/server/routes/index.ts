import { Router } from 'express';
import { PokemonController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá, DEV!');
});

// Pokemon
router.post(
    '/pokemon/:name',
    PokemonController.createValidation,
    PokemonController.create
);

export { router };
