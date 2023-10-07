// Clase Vehiculo
export class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        if (id > 0 && modelo !== '' && anoFab > 1885 && velMax > 0) {
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
        } else {
        throw new Error('Los datos del vehículo son inválidos.');
        }
    }

    toString() {
        return `ID: ${this.id}, Modelo: ${this.modelo}, Año de Fabricación: ${this.anoFab}, Velocidad Máxima: ${this.velMax}`;
    }
}
  
// Clase Aereo hereda de Vehiculo
export class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        super(id, modelo, anoFab, velMax);
        if (altMax > 0 && autonomia > 0) {
        this.altMax = altMax;
        this.autonomia = autonomia;
        } else {
        throw new Error('Los datos del vehículo aéreo son inválidos.');
        }
    }
}
  
// Clase Terrestre hereda de Vehiculo
export class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
    super(id, modelo, anoFab, velMax);
    if (cantPue >= -1 && cantRue > 0) {
    this.cantPue = cantPue;
    this.cantRue = cantRue;
    } else {
    throw new Error('Los datos del vehículo terrestre son inválidos.');
    }
    }
}
