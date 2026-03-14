// Source - https://stackoverflow.com/a/79874273
// Posted by Vin
// Retrieved 2026-03-14, License - CC BY-SA 4.0

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://grupo-29:grupo-29@cluster0.blryo.mongodb.net/NodeMod3Cohorte5').then(() => console.log('Conexión exitosa a MongoDB')).catch(err => console.error('Error al conectar a MongoDB', err));

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
}, { collection: 'Grupo-29' })

const SuperHero = mongoose.model('SuperHero', superheroSchema);

async function insertSuperHero() {
    const Hero = new SuperHero({
        nombreSuperHeroe: 'SpiderMan',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radiactiva',
        poderes: ['Trepar paredes', 'Sentido de araña', 'Fuerza sobrehumana', 'Agilidad'],
        aliados: ['Iron Man', 'Captain America', 'Thor'],
        enemigos: ['Duende Verde'],
        creador: 'Martin',
    });
    await Hero.save();
    console.log('Superhéroe insertado correctamente', Hero);
}

insertSuperHero();

async function updateSuperHero(SuperNombre) {
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: SuperNombre },
        { $set: { edad: 26 } }
    );
    console.log('Superhéroe actualizado correctamente', result);
}

updateSuperHero('SpiderMan');

async function deleteSuperHero(SuperNombre) {
    const result = await SuperHero.deleteOne(
        { nombreSuperHeroe: SuperNombre }
    );
    console.log('Superhéroe eliminado correctamente', result);
}

deleteSuperHero('SpiderMan');

async function findSuperHeroes() {
    const result = await SuperHero.find(
        { planetaOrigen: 'Tierra' }
    );
    console.log('Superhéroes encontrados de la tierra', result);
}

findSuperHeroes();
