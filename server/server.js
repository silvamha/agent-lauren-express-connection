import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle agent communication
app.post('/api/chat', async (req, res) => {
    try {
        console.log('Received request:', {
            agent_id: process.env.MISTRAL_AGENT_LAUREN_AGENT_ID,
            messages: req.body.messages
        });

        const response = await axios.post('https://api.mistral.ai/v1/agents/completions', {
            agent_id: process.env.MISTRAL_AGENT_LAUREN_AGENT_ID,
            messages: req.body.messages
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.MISTRAL_AGENT_LAUREN_EXPRESS_CONNECTION_API_KEY}`
            }
        });
        
        console.log('MistralAI response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });
        res.status(500).json({
            error: 'Failed to communicate with MistralAI',
            details: error.response?.data || error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log('Environment variables loaded:', {
        agent_id: process.env.MISTRAL_AGENT_LAUREN_AGENT_ID,
        api_key_length: process.env.MISTRAL_AGENT_LAUREN_EXPRESS_CONNECTION_API_KEY?.length
    });
});