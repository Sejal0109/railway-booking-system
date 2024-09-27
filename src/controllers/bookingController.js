const prisma = require('../prismaClient');

// Book a Seat (JWT protected)
const bookSeat = async (req, res) => {
    const { trainId } = req.body;

    // const userId = req.user.userId;

    // const train = await prisma.train.findUnique({
    //     where: { id: trainId }
    // });

    // if (train.availableSeats <= 0) {
    //     return res.status(400).json({ message: 'No seats available' });
    // }

    // const booking = await prisma.booking.create({
    //     data: {
    //         userId,
    //         trainId,
    //         status: "Confirmed"
    //     }
    // });

    // await prisma.train.update({
    //     where: { id: trainId },
    //     data: { availableSeats: train.availableSeats - 1 }
    // });

    // res.json(booking);

    try {
        // Start a transaction
        const bookingTransaction = await prisma.$transaction(async (prisma) => {
            // Find the train with available seats
            const train = await prisma.train.findUnique({
                where: { id: trainId },
            });

            if (!train || train.availableSeats <= 0) {
                return res.status(400).json({ message: 'No available seats to book.' });
            }

            // Create the booking
            const booking = await prisma.booking.create({
                data: {
                    userId: req.user.userId, // Assuming userId is stored in the token
                    trainId: train.id,
                    status: 'Confirmed', // or 'Booked' based on your requirements
                },
            });

            // Update the train's available seats
            const updatedTrain = await prisma.train.update({
                where: { id: train.id },
                data: {
                    availableSeats: train.availableSeats - 1,
                },
            });

            return booking; // Return the created booking
        });

        res.status(201).json(bookingTransaction);
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.status(500).json({ message: 'Server error while creating booking' });
    }

};

// Get Booking Details (JWT protected)
const getBookingDetails = async (req, res) => {
    const bookingId = parseInt(req.params.bookingId);

    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
            User: { // Include user data
                select: { name: true } // Specify the fields to retrieve
            },
            Train: { // Include train data
                select: { source: true, destination: true } // Specify the fields to retrieve
            }
        }
    });

    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
};

module.exports = { bookSeat, getBookingDetails };
