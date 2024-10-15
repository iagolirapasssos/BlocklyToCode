// chatgpt_extension.js
async function callChatGPT(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // Insira sua chave API aqui
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        }),
    });

    if (!response.ok) {
        throw new Error('Erro ao chamar a API do ChatGPT');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Exemplo de uso da função
callChatGPT('Como posso melhorar meu código?').then(response => {
    console.log('Resposta do ChatGPT:', response);
}).catch(error => {
    console.error('Erro:', error);
});

