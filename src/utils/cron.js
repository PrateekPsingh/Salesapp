import cron from 'node-cron';
import Order from '../models/Order.js'; // Import your Order model
import { io } from '../../server.js'; // Import the Socket.IO instance

// Schedule a cron job to run every hour
cron.schedule('0 * * * *', async () => { // Changed to run at the start of every hour
  try {
    // Calculate the total sum of the `total_amount` field for all orders
    const result = await Order.aggregate([
      {
        $group: {
          _id: null, // Group all documents
          total_orders: { $sum: 1 }, // Count total orders
          total_amount: { $sum: '$total_amount' }, // Sum of `total_amount`
        },
      },
    ]);

    // Extract the totals from the result
    const totalOrders = result[0]?.total_orders || 0;
    const totalAmount = result[0]?.total_amount || 0;

    // Prepare the summary
    const summary = {
      total_orders: totalOrders,
      total_amount: totalAmount,
      timestamp: new Date().toISOString(),
    };

    // Emit the summary to all connected Socket.IO clients
    io.emit('hourly_summary', summary);

    console.log('Hourly summary published:', summary);
  } catch (error) {
    console.error('Error generating hourly summary:', error);
  }
});