const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Middlewares
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

console.log("🚀 Initializing Connection to Database...");

// UPDATED: Robust Database Connection with Timeout handling
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    directConnection: false,
    tls: true,
})
.then(() => console.log('✅ MongoDB Lead Pipeline Connected Successfully.'))
.catch((err) => {
    console.error('❌ FATAL DB CONNECTION ERROR:', err.message);
});

// Schema setup - Isme roomType add kiya sirf
const LeadSchema = new mongoose.Schema({
    serviceType: String,
    layoutSize: String,
    materialFinish: String,
    urgencyScope: String,
    clientName: String,
    clientPhone: String,
    roomType: { type: String, default: 'Kitchen' }, // ← SIRF YE LINE ADD KI
    capturedAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', LeadSchema);

// API Route - Purana wala same hai
app.post('/api/leads/calculate', async (req, res) => {
    try {
        console.log("📥 Incoming Data:", req.body);
        const newLead = new Lead(req.body);
        await newLead.save();
        console.log("✅ Data Saved to Atlas!");
        res.status(201).json({ success: true, message: "Data saved successfully!" });
    } catch (error) {
        console.error("❌ Save Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// NAYA: SIRF BEDROOM KE LIYE ROUTE ADD KIYA - Baaki sab untouched
app.post('/api/leads/bedroom', async (req, res) => {
    try {
        console.log("📥 Bedroom Lead Incoming:", req.body);
        const bedroomLead = new Lead({ ...req.body, roomType: 'Bedroom' });
        await bedroomLead.save();
        console.log("✅ Bedroom Data Saved to Atlas!");
        res.status(201).json({ success: true, message: "Bedroom lead saved successfully!" });
    } catch (error) {
        console.error("❌ Bedroom Save Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server spinning on port ${PORT}`);
});