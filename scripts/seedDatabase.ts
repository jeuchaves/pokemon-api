import axios from 'axios';

const getRandomNumbers = (size: number): number[] => {
    const numbers: number[] = [];
    for (let i = 0; i < size; i++) {
        numbers.push(Math.floor(Math.random() * 1000) + 1);
    }
    return numbers;
};

const generatePokemons = async (size: number) => {
    console.log('Seeding database...');
    const numbers = getRandomNumbers(size);
    for (const number of numbers) {
        try {
            const response = await axios.post(
                `http://localhost:3333/pokemon/${number.toString()}`
            );
            console.log(`Pokemon #${number} salvo com sucesso.`, response.data);
        } catch (error) {
            console.error(
                `Erro ao salvar pokemon ${number}.`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (error as any).response.data
            );
        }
    }
};

const size = parseInt(process.argv[2], 10) || 10;

generatePokemons(size);
