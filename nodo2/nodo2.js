import express from 'express';
import axios from 'axios';
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const nodosAdyacentes = {
    "nodo0": "http://192.168.0.3:3000/frases",
    "nodo5": "http://192.168.0.8:3000/frases",
    "nodo6": "http://192.168.0.9:3000/frases",
};

const frase = 'Frase 1: ¡Alegría, hermoso destello de los dioses,';

app.post('/frases', async (req, res) => {
    const { origen, solicitud } = req.body;
    console.log(solicitud);

    let responses = [];
    responses.push(frase);

    if (solicitud === 'todo') {
        for (const nodo in nodosAdyacentes) {
            if (nodo !== origen) {
                const response = await axios.post(nodosAdyacentes[nodo], {
                    origen: "nodo2",
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