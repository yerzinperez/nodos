import express from 'express';
import axios from 'axios';
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const arbolNodos = {
    "nodo0": "http://192.168.0.3:3000/frases",
    "nodo1": "http://192.168.0.4:3000/frases",
    "nodo2": "http://192.168.0.5:3000/frases",
    "nodo3": "http://192.168.0.6:3000/frases",
    "nodo4": "http://192.168.0.7:3004/frases",
    "nodo5": "http://192.168.0.8:3000/frases",
    "nodo6": "http://192.168.0.9:3000/frases",
    "nodo7": "http://192.168.0.10:3000/frases"
};

app.get('/frases/:nodo/:solicitud', async (req, res) => {
    const nodo = req.params.nodo;
    const solicitud = req.params.solicitud;

    if (!arbolNodos[nodo]) {
        res.status(404).send('Nodo no encontrado.');
        return;
    }

    const url = arbolNodos[nodo];
    const response = await axios.post(url, {
        origen: "middleware",
        solicitud: solicitud
    });

    // Ordenar el array basado en el número de frase
    const sortedResponses = response.data.sort((a, b) => {
        const numeroA = parseInt(a.match(/Frase (\d+):/)[1]);
        const numeroB = parseInt(b.match(/Frase (\d+):/)[1]);
        return numeroA - numeroB;
    });

    // Luego eliminamos el prefijo
    const cleanResponses = sortedResponses.map(frase =>
        frase.replace(/Frase \d+: /, '')
    );

    res.status(200).json(cleanResponses);
});

app.listen(3000);