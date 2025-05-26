import express from 'express';
import axios from 'axios';
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const nodosAdyacentes = {
    "nodo1": "http://192.168.0.4:3000/frases",
    "nodo2": "http://192.168.0.5:3000/frases",
};

const frase = 'Frase 2: hija del Elíseo!';

app.post('/frases', async(req, res) => {
    const { origen, solicitud } = req.body;

    let responses = [];
    responses.push(frase);

    if (solicitud === 'todo') {
        for (const nodo in nodosAdyacentes) {
            if (nodo !== origen) {
                const response = await axios.post(nodosAdyacentes[nodo], {
                    origen: "nodo0",
                    solicitud: solicitud
                });

                responses.push(response.data);
            }
        }
    }

    const flatResponses = responses.flat().filter(Boolean);

    res.status(200).json(flatResponses);
});

app.listen(3000);