const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`📦 MongoDB bağlantısı başarılı: ${conn.connection.host}`);
    
    // Bağlantı hatalarını dinle
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB bağlantı hatası:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB bağlantısı kesildi');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB bağlantısı kapatıldı');
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 