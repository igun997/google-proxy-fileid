const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.port || 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/download-file/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    console.log('Fetching file with id: ', fileId);
    try {
        const response = await axios.get(`https://drive.google.com/uc?export=view&id=${fileId}`, {
            headers: {
                Authorization: 'hsduify98asfhaiosfy89asnfiNIS',
            },
            maxRedirects: 20,
            responseType: 'arraybuffer', // to handle binary data
        });

        res.setHeader('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});
