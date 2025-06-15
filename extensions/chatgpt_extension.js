// chatgpt_extension.js

// Bloco: Definição da função
Blockly.Blocks['define_call_chatgpt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Define função callChatGPT(prompt)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Gera a definição completa da função callChatGPT");
    this.setHelpUrl("");
  }
};

// Bloco: Chamada da função com argumento
Blockly.Blocks['call_chatgpt'] = {
  init: function() {
    this.appendValueInput("PROMPT")
        .setCheck("String")
        .appendField("Chamar callChatGPT com prompt");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Chama a função callChatGPT com um prompt");
    this.setHelpUrl("");
  }
};

// ✅ Geradores atualizados

// --- JavaScript ---
Blockly.JavaScript.forBlock['define_call_chatgpt'] = function(block, generator) {
  const code = `
async function callChatGPT(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
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
\n`;
  return code;
};

Blockly.JavaScript.forBlock['call_chatgpt'] = function(block, generator) {
  const prompt = generator.valueToCode(block, 'PROMPT', Blockly.JavaScript.ORDER_NONE) || "''";
  return `await callChatGPT(${prompt});\n`;
};

// --- Python ---
Blockly.Python.forBlock['define_call_chatgpt'] = function(block, generator) {
  const code = `
import requests
import json
import asyncio

async def call_chatgpt(prompt):
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
    data = {
        "model": "gpt-4",
        "messages": [{"role": "user", "content": prompt}]
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, data=json.dumps(data))
    if response.status_code != 200:
        raise Exception("Erro ao chamar a API do ChatGPT")
    return response.json()["choices"][0]["message"]["content"]
\n`;
  return code;
};

Blockly.Python.forBlock['call_chatgpt'] = function(block, generator) {
  const prompt = generator.valueToCode(block, 'PROMPT', Blockly.Python.ORDER_NONE) || "''";
  return `await call_chatgpt(${prompt})\n`;
};

// --- PHP ---
Blockly.PHP.forBlock['define_call_chatgpt'] = function(block, generator) {
  const code = `
function callChatGPT($prompt) {
    $headers = [
        "Content-Type: application/json",
        "Authorization: Bearer YOUR_API_KEY"
    ];
    $data = json_encode([
        "model" => "gpt-4",
        "messages" => [["role" => "user", "content" => $prompt]]
    ]);
    $ch = curl_init("https://api.openai.com/v1/chat/completions");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $response = curl_exec($ch);
    if(!$response) throw new Exception("Erro ao chamar a API do ChatGPT");
    return json_decode($response, true)["choices"][0]["message"]["content"];
}
\n`;
  return code;
};

Blockly.PHP.forBlock['call_chatgpt'] = function(block, generator) {
  const prompt = generator.valueToCode(block, 'PROMPT', Blockly.PHP.ORDER_NONE) || "''";
  return `callChatGPT(${prompt});\n`;
};

// --- Lua ---
Blockly.Lua.forBlock['define_call_chatgpt'] = function(block, generator) {
  const code = `
function callChatGPT(prompt)
  local headers = {
    ["Content-Type"] = "application/json",
    ["Authorization"] = "Bearer YOUR_API_KEY"
  }
  local data = {
    model = "gpt-4",
    messages = {{role = "user", content = prompt}}
  }
  -- Aqui você precisará implementar a chamada HTTP com alguma lib Lua
end
\n`;
  return code;
};

Blockly.Lua.forBlock['call_chatgpt'] = function(block, generator) {
  const prompt = generator.valueToCode(block, 'PROMPT', Blockly.Lua.ORDER_NONE) || "''";
  return `callChatGPT(${prompt})\n`;
};

// --- Dart ---
Blockly.Dart.forBlock['define_call_chatgpt'] = function(block, generator) {
  const code = `
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<String> callChatGPT(String prompt) async {
  final response = await http.post(
    Uri.parse('https://api.openai.com/v1/chat/completions'),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY',
    },
    body: jsonEncode({
      'model': 'gpt-4',
      'messages': [
        {'role': 'user', 'content': prompt}
      ],
    }),
  );
  if (response.statusCode != 200) {
    throw Exception('Erro ao chamar a API do ChatGPT');
  }
  final data = jsonDecode(response.body);
  return data['choices'][0]['message']['content'];
}
\n`;
  return code;
};

Blockly.Dart.forBlock['call_chatgpt'] = function(block, generator) {
  const prompt = generator.valueToCode(block, 'PROMPT', Blockly.Dart.ORDER_NONE) || "''";
  return `await callChatGPT(${prompt});\n`;
};
