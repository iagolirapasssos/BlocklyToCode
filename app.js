const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());
//app.use(express.static('static'));
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/execute', async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: 'Code and language are required' });
    }

    try {
        const result = await executeCodeExternally(code, language);
        res.json({ output: result });
    } catch (error) {
        console.error('Execution error:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

async function executeCodeExternally(code, language) {
    const apiEndpoint = 'https://emkc.org/api/v2/piston/execute';

    const languageVersions = {
        javascript: '18.15.0', // Node.js
        python: '3.10.0',
        php: '8.2.3',
        lua: '5.4.4',
        dart: '2.19.6'
    };

    const selectedVersion = languageVersions[language];
    if (!selectedVersion) {
        throw new Error('Unsupported language or version');
    }

    const requestBody = {
        language: language,
        version: selectedVersion,
        files: [
            {
                name: 'main',
                content: code
            }
        ],
        stdin: '',
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1
    };

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(apiEndpoint, requestBody, { headers });

        const { run } = response.data;
        if (run.stderr) {
            throw new Error(run.stderr);
        }
        return run.output || 'Code executed successfully, but no output was produced.';
    } catch (error) {
        console.error('API error:', error.response?.data || error.message);
        throw new Error('Execution failed: ' + (error.response?.data?.message || error.message));
    }
}



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
