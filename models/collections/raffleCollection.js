'use strict';
const Database = require('../../libs/database');
const Raffle = require('../raffle');

class RaffleCollection {
    constructor() {
        this.connection = null;
        this.collection = [];
    }

    async init() {
        this.connection = await new Database();
    }

     async load(raffleId) {
        if(this.connection === null) {
            await this.init();
        }
        this.collection = [];

        if(raffleId) {
            return this;
        } else {
            this.connection.query("SELECT * FROM raffle_entity", function (err, result, fields) {
                if (err) throw err;

                result.forEach(raffleData => {
                    let raffle = new Raffle(raffleData);
                    this.collection.push(raffle);
                });
                console.log(this.collection);
            }.bind(this));
            return this;
        }
    }
}

module.exports = RaffleCollection;