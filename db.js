const { bindActionCreators } = require('redux');
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-react-redux');

const Friends = db.define('friends', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pronouns: {
        type: Sequelize.STRING,
    },
    origin: {
        type: Sequelize.STRING,
    }
});

const syncAndSeed = async() => {
    await db.sync ({ force: true });
    await Friends.create({ name: 'Jenna', pronouns: 'she/her', origin: 'Girlfriend' });
    await Friends.create({ name: 'KT', pronouns: 'she/her', origin: 'Roomie' });
    await Friends.create({ name: 'Rohail', pronouns: 'he/him', origin: 'College' });
    await Friends.create({ name: 'Ray', pronouns: ('she/her', 'they/them'), origin: 'Sister' });
   return {
        friend: ['Jenna', 'KT', 'Rohail', 'Ray']
   }
}

module.exports = {
    syncAndSeed, 
    db,
    models: {
        Friend
    }
    }