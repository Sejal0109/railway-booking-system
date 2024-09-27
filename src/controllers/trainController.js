const prisma = require('../prismaClient');

// Add Train (Admin Only)
const addTrain = async (req, res) => {
    const { name, source, destination, totalSeats } = req.body;

    const train = await prisma.train.create({
        data: { name, source, destination, totalSeats, availableSeats: totalSeats }
    });

    res.json(train);
};

// Get Trains (Search Trains for Users)
const getTrains = async (req, res) => {
    const { source, destination } = req.query;

    const trains = await prisma.train.findMany({
        where: {
            source:source,
            destination:destination
        }
    });

    res.json(trains);
};

module.exports = { addTrain, getTrains };
