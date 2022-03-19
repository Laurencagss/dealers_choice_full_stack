const { bindActionCreators } = require('redux');
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers-choice-full-stack');

const Things = db.define('things', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
}
});

const syncAndSeed = async() => {
    await db.sync ({ force: true });
    await Things.create({ name: 'pompadour' });
    await Things.create({ name: 'shaved-head' });
    await Things.create({ name: 'leg-hair' });
    await Things.create({ name: 'patches' });
    await Things.create({ name: 'mismatch' });

   return {
        thing: ['pompadour', 'shaved-head', 'leg-hair', 'mismatch', 'patches']
   }
}

module.exports = {
    syncAndSeed, 
    db,
    models: {
       Thing
    }
    }