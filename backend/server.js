const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Middlewares 
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
   process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

console.log("🚀 Initializing Connection to Database...");

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    directConnection: false,
    tls: true,
})
.then(() => console.log('✅ MongoDB Lead Pipeline Connected Successfully.'))
.catch((err) => {
    console.error('❌ FATAL DB CONNECTION ERROR:', err.message);
});

// Schema setup
const LeadSchema = new mongoose.Schema({
    serviceType: String,
    layoutSize: String,
    materialFinish: String,
    urgencyScope: String,
    clientName: String,
    clientPhone: String,
    clientEmail: String,
    roomType: { type: String, default: 'Kitchen' },
    ceilingType: String,
    designStyle: String,
    source: String,
    capturedAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', LeadSchema);

app.post('/api/leads/calculate', async (req, res) => {
    try {
        console.log("📥 Incoming Data:", req.body);
        
        const leadData = {
            serviceType: req.body.serviceType || '',
            layoutSize: req.body.layoutSize || '',
            materialFinish: req.body.materialFinish || '',
            urgencyScope: req.body.urgencyScope || '',
            clientName: req.body.clientName || req.body.name || '',
            clientPhone: req.body.clientPhone || req.body.phone || '',
            clientEmail: req.body.clientEmail || req.body.email || '',
            roomType: req.body.roomType || 'Kitchen',
            source: req.body.source || 'Hero Form'
        };
        
        const newLead = new Lead(leadData);
        await newLead.save();
        console.log("✅ Data Saved to Atlas!", newLead);
        res.status(201).json({ success: true, message: "Data saved successfully!" });
    } catch (error) {
        console.error("❌ Save Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

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

app.post('/api/leads/living-room', async (req, res) => {
    try {
        console.log("📥 Living Room Lead Incoming:", req.body);
        
        const livingRoomLead = new Lead({ 
            ...req.body, 
            roomType: 'Living Room',
            source: req.body.source || 'Living Room Form'
        });
        
        await livingRoomLead.save();
        console.log("✅ Living Room Data Saved to Atlas!", livingRoomLead);
        res.status(201).json({ 
            success: true, 
            message: "Living Room lead saved successfully!",
            leadId: livingRoomLead._id 
        });
    } catch (error) {
        console.error("❌ Living Room Save Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ NAYA ROUTE - PROJECTS PAGE KE LIYE
app.post('/api/leads/projects', async (req, res) => {
    try {
        console.log("📥 Projects Lead Incoming:", req.body);
        
        const projectsLead = new Lead({ 
            ...req.body,
            serviceType: 'Delivered Projects',
            roomType: 'Projects',
            clientName: req.body.name || req.body.clientName || '',
            clientPhone: req.body.phone || req.body.clientPhone || '',
            clientEmail: req.body.email || req.body.clientEmail || '',
            source: req.body.source || 'Delivered Projects Page'
        });
        
        await projectsLead.save();
        console.log("✅ Projects Data Saved to Atlas!", projectsLead);
        res.status(201).json({ 
            success: true, 
            message: "Projects lead saved successfully!",
            leadId: projectsLead._id 
        });
    } catch (error) {
        console.error("❌ Projects Save Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server spinning on port ${PORT}`);
});