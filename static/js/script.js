const codeArea = document.querySelector('.code-area');
const resizeHandle = document.getElementById('resize-handle');
const blocklyDiv = document.getElementById('blocklyDiv');
const container = document.querySelector('.container');


let isResizing = false;

// Configuração do workspace Blockly
var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true,
    trashcan: true,
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
    }
});


// Mapa id → cor original
const originalColors = {};

// Grava cor original de um bloco (se ainda não tiver)
function recordOriginalColor(block) {
  if (block && !originalColors[block.id]) {
    originalColors[block.id] = block.getColour();
  }
}

// Inicializa cores originais dos blocos já existentes
workspace.getAllBlocks().forEach(recordOriginalColor);

// Cada vez que um bloco é criado, registra sua cor original
workspace.addChangeListener(evt => {
  if (evt.type === Blockly.Events.BLOCK_CREATE) {
    evt.ids.forEach(id => {
      const b = workspace.getBlockById(id);
      recordOriginalColor(b);
    });
  }
});

window.addEventListener('load', function() {
    const savedXml = localStorage.getItem('blocklyWorkspace');
    if (savedXml) {
        const xml = Blockly.utils.xml.textToDom(savedXml);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
});

// Função para gerar e formatar o código
function generateCode() {
    var language = document.getElementById('language-select').value;
    var code;

    switch (language) {
        case 'javascript':
            code = Blockly.JavaScript.workspaceToCode(workspace);
            break;
        case 'python':
            code = Blockly.Python.workspaceToCode(workspace);
            break;
        case 'php':
            code = Blockly.PHP.workspaceToCode(workspace);
            break;
        case 'lua':
            code = Blockly.Lua.workspaceToCode(workspace);
            break;
        case 'dart':
            code = Blockly.Dart.workspaceToCode(workspace);
            break;
        default:
            code = Blockly.JavaScript.workspaceToCode(workspace);
            break;
    }

    var formattedCode = `<pre><code class="${language}">` + escapeHtml(code) + '</code></pre>';
    document.getElementById('code-output').innerHTML = formattedCode;

    const codeElement = document.querySelector('#code-output code');

    // Primeiro: aplicar o highlight
    hljs.highlightElement(codeElement);

    // Depois: adicionar a numeração de linha
    addLineNumbers(codeElement);

}


// Função para escapar caracteres HTML
function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

function addLineNumbers(codeElement) {
    const lines = codeElement.innerText.split('\n');

    let newHtml = '';
    lines.forEach((line, index) => {
        const lineNumberHtml = `<span class="line-number">${index + 1}</span>`;
        const escapedLine = escapeHtml(line); // Mantém segurança em HTML
        newHtml += `<div class="code-line">${lineNumberHtml}${escapedLine}</div>`;
    });

    codeElement.innerHTML = newHtml;
}


// Adicionar evento de clique ao botão de gerar código
document.getElementById('generate-code').addEventListener('click', generateCode);

// Personalização da aparência dos blocos
Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;

// Função para mudar o tema
function changeTheme() {
    const themeSelect = document.getElementById('theme-select');
    const selectedTheme = themeSelect.value;

    // Remove temas existentes
    document.body.classList.remove('dark-theme');

    // Adiciona tema selecionado
    if (selectedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Adicionar evento de alteração ao seletor de tema
document.getElementById('theme-select').addEventListener('change', changeTheme);

// Função para carregar e adicionar blocos personalizados
// Função para mostrar o botão de upload e ocultar os blocos carregados
function onCategoryClick(event) {
    const loadedExtensionsDiv = document.getElementById('loaded-extensions');
    const uploadButton = document.getElementById('upload-user-extensions');

    // Mostra o botão de upload
    uploadButton.style.display = 'block';
    loadedExtensionsDiv.innerHTML = ''; // Limpa blocos carregados ao clicar na categoria
}

// Adiciona evento de clique à categoria User Extensions
const extensionInput = document.getElementById('extensionInput');

Blockly.getMainWorkspace().registerButtonCallback('sendExtension', function() {
    extensionInput.click();
});

function getBlocksFromScript(scriptContent) {
    const blockTypes = [];
    const blockDefRegex = /Blockly\.Blocks\['(.*?)'\]/g;
    let match;
    while ((match = blockDefRegex.exec(scriptContent)) !== null) {
        blockTypes.push(match[1]);
    }
    return blockTypes;
}

function registerExtension(scriptContent) {
    const extensionRegex = /Blockly\.Extensions\.register\('(.*?)',\s*function\s*\(\)\s*{([\s\S]*?)}\);/g;
    let match;
    while ((match = extensionRegex.exec(scriptContent)) !== null) {
        const extensionName = match[1];
        const extensionCode = match[2];
        try {
            eval(`Blockly.Extensions.register('${extensionName}', function() {${extensionCode}});`);
        } catch (error) {
            console.error(`Error registering extension ${extensionName}:`, error);
        }
    }
}

function registerGenerators(scriptContent) {
    function createAndRegisterGenerator(language, blockType, generatorCode) {
        if (!Blockly[language]) {
            Blockly[language] = {};
        }
        try {
            eval(`Blockly.${language}['${blockType}'] = function(block) {${generatorCode}};`);
        } catch (error) {
            console.error(`Error registering ${language} generator for block: ${blockType}`, error);
        }
    }

    const generatorRegex = /Blockly\.(\w+)\['(.*?)'\]\s*=\*\s*function\s*\(block\)\s*{([\s\S]*?)};/g;
    let match;
    while ((match = generatorRegex.exec(scriptContent)) !== null) {
        const language = match[1];
        createAndRegisterGenerator(language, match[2], match[3]);
    }

    // Removido o suporte para a linguagem Arduino
    const languages = ['Python', 'JavaScript', 'Lua', 'PHP', 'Dart']; // Apenas linguagens nativas do Blockly
    languages.forEach(language => {
        const generatorRegex = new RegExp(`Blockly\\.${language}\\['(.*?)'\\]\\s*=\\s*function\\s*\\(block\\)\\s*{([\\s\\S]*?)};`, 'g');
        let match;
        while ((match = generatorRegex.exec(scriptContent)) !== null) {
            createAndRegisterGenerator(language, match[1], match[2]);
        }
    });
}

extensionInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const scriptContent = e.target.result;
            
            try {
                (new Function(scriptContent))();

                registerExtension(scriptContent);
                registerGenerators(scriptContent);

                const scriptName = file.name.split('.')[0];
                const newCategory = document.createElement('category');
                newCategory.setAttribute('name', `${scriptName}`);
                newCategory.setAttribute('colour', '160');
                newCategory.setAttribute('id', `ext-${scriptName}`); // Id único pra facilitar remoção


                const blocks = getBlocksFromScript(scriptContent);
                blocks.forEach(block => {
                    const blockNode = document.createElement('block');
                    blockNode.setAttribute('type', block);
                    newCategory.appendChild(blockNode);
                });

                const extensionsCategory = document.getElementById('extensionsCategory');
                const sendExtensionButton = extensionsCategory.querySelector('button');
                extensionsCategory.insertBefore(newCategory, sendExtensionButton.nextSibling);

                
                const loadedExtensionsDiv = document.getElementById('loaded-extensions');


                const extensionDiv = document.createElement('div');
                extensionDiv.textContent = scriptName;
                extensionDiv.style.display = 'inline-block';
                extensionDiv.style.margin = '5px';
                extensionDiv.style.padding = '5px';
                extensionDiv.style.backgroundColor = '#f39c12';
                extensionDiv.style.color = '#fff';
                extensionDiv.style.borderRadius = '5px';

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '🧽';
                deleteBtn.style.marginLeft = '8px';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.background = '#e74c3c';
                deleteBtn.style.color = '#fff';
                deleteBtn.style.border = 'none';
                deleteBtn.style.borderRadius = '3px';

                deleteBtn.addEventListener('click', () => {
                    newCategory.remove();
                    extensionDiv.remove();
                    workspace.updateToolbox(document.getElementById('toolbox'));
                });

                extensionDiv.appendChild(deleteBtn);
                loadedExtensionsDiv.appendChild(extensionDiv);
    
workspace.updateToolbox(document.getElementById('toolbox'));

                alert("Extension loaded and registered successfully!");
            } catch (error) {
                console.error("Error loading extension:", error);
                alert("Error loading extension:", error);
            }
        };
        reader.readAsText(file);
    }
});

function refreshVariables(workspace) {
    const variables = Blockly.Variables.allUsedVarModels(workspace);
    variables.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar as variáveis alfabeticamente

    workspace.getAllBlocks().forEach(block => {
        if (typeof block.updateVariableFieldDropdown === 'function') {
            block.updateVariableFieldDropdown();
        }
    });

    if (workspace.toolbox_) {
        workspace.toolbox_.refreshSelection();
    }
}

let isCoolingDown = false; // Flag de controle do cooldown
const cooldownTime = 5000; // Tempo de cooldown em milissegundos (5 segundos)

async function executeCode() {
    if (isCoolingDown) {
        alert('Please wait before running again. ⏰');
        return;
    }

    const language = document.getElementById('language-select').value;

    // Gerar o código baseado na linguagem selecionada
    let code;
    switch (language) {
        case 'javascript':
            code = Blockly.JavaScript.workspaceToCode(workspace);
            break;
        case 'python':
            code = Blockly.Python.workspaceToCode(workspace);
            break;
        case 'php':
            code = Blockly.PHP.workspaceToCode(workspace);
            break;
        case 'lua':
            code = Blockly.Lua.workspaceToCode(workspace);
            break;
        case 'dart':
            code = Blockly.Dart.workspaceToCode(workspace);
            break;
        default:
            code = Blockly.JavaScript.workspaceToCode(workspace); // Fallback para JavaScript
            break;
    }

    const languageVersions = {
        javascript: '18.15.0',
        python: '3.10.0',
        php: '8.2.3',
        lua: '5.4.4',
        dart: '2.19.6'
    };
    const selectedVersion = languageVersions[language] || '*';

    const outputDiv = document.getElementById('code-output');
    outputDiv.innerHTML = '<p>Executing code...</p>';

    // Substituir inputs por prompts de navegador
    if (language === 'python') {
        code = code.replace(/input\(['"](.*?)['"]\)/g, function(match, p1) {
            const userInput = prompt(p1);
            return `'${userInput}'`;
        });
    }
    else if (language === 'javascript') {
        code = code.replace(/prompt\(['"](.*?)['"]\)/g, function(match, p1) {
            const userInput = prompt(p1);
            return JSON.stringify(userInput);
        });
    }
    else if (language === 'php') {
        code = code.replace(/readline\(['"](.*?)['"]\)/g, function(match, p1) {
            const userInput = prompt(p1);
            return `'${userInput}'`;
        });
    }
    else if (language === 'lua') {
        code = code.replace(/io\.read\(\)/g, function() {
            const userInput = prompt("Lua Input:");
            return `"${userInput}"`;
        });
    }
    else if (language === 'dart') {
        code = code.replace(/stdin\.readLineSync\(\)/g, function() {
            const userInput = prompt("Dart Input:");
            return `"${userInput}"`;
        });
    }




    const requestBody = {
        language: language,
        version: selectedVersion,
        files: [{ name: 'main', content: code }],
        stdin: '',
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1
    };

    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Execution failed');
        }

        const output = result.run ? result.run.output : 'No output';
      //outputDiv.innerHTML = `<pre><code class="execution-result">${escapeHtml(output)}</code></pre>`;
        outputDiv.innerHTML = `<pre><code class="language-${language}">${escapeHtml(output)}</code></pre>`;

        hljs.highlightElement(outputDiv.querySelector('code'));

        outputDiv.scrollTop = outputDiv.scrollHeight;

    } catch (error) {
        console.error('Error executing code:', error);
        outputDiv.innerHTML = `<p class="error">Error: ${escapeHtml(error.message)}</p>`;
    }


    // Ativar cooldown após a execução
    startCooldown();
}

// Função para iniciar o cooldown
function startCooldown() {
    isCoolingDown = true;
    setTimeout(() => {
        isCoolingDown = false;
    }, cooldownTime);
}


// Função para salvar blocos em XML
function saveBlocks() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToPrettyText(xml);
    const blob = new Blob([xmlText], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'blocks.xml';
    a.click();

    URL.revokeObjectURL(url); // Limpar o URL criado
}

// Função para carregar blocos a partir de XML
function loadBlocks(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const xmlText = e.target.result;
        const xml = Blockly.utils.xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xml, workspace);
    };
    reader.readAsText(file);
}

// Permitir arrastar e soltar arquivos XML para a tela
function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const xmlText = e.target.result;

        try {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "text/xml");

            if (xml.documentElement.nodeName === "parsererror") {
                throw new Error("Erro ao analisar o XML.");
            }

            Blockly.Xml.clearWorkspaceAndLoadFromXml(xml.documentElement, workspace);
        } catch (error) {
            console.error("Erro ao carregar o XML:", error);
            alert("O arquivo XML não é válido.");
        }
    };
    reader.readAsText(file);
}


/**
 * Busca todos os blocos cujo tipo ou texto interno contenha o termo (case-insensitive),
 * e colore-os de amarelo. Os demais voltam à cor original.
 */
function searchBlocks() {
  const term = document.getElementById('block-search').value.trim().toLowerCase();
  workspace.getAllBlocks().forEach(block => {
    // Verifica tipo
    let match = block.type.toLowerCase().includes(term);

    // Verifica textos em cada campo do bloco
    block.inputList.forEach(input =>
      input.fieldRow.forEach(field => {
        const txt = field.getText && field.getText();
        if (!match && txt && txt.toLowerCase().includes(term)) {
          match = true;
        }
      })
    );

    // Aplica destaque ou restaura
    if (term && match) {
      block.setColour(60);       // amarelo (HDR: 60°)
    } else {
      // restaura cor original
      const orig = originalColors[block.id];
      if (orig != null) block.setColour(orig);
    }
  });
}

/** Restaura todos os blocos à cor original e limpa o campo de busca */
function clearSearch() {
  document.getElementById('block-search').value = '';
  workspace.getAllBlocks().forEach(block => {
    const orig = originalColors[block.id];
    if (orig != null) block.setColour(orig);
  });
}


// Prevenir comportamento padrão de arrastar e soltar
document.body.addEventListener('dragover', (event) => event.preventDefault());
document.body.addEventListener('drop', handleFileDrop);

// Adicionar eventos para os botões
document.getElementById('save-blocks').addEventListener('click', saveBlocks);
document.getElementById('load-blocks').addEventListener('click', () => {
    document.getElementById('file-input').click();
});
document.getElementById('file-input').addEventListener('change', loadBlocks);

document.body.addEventListener('dragenter', () => {
    document.getElementById('blocklyDiv').classList.add('dragging');
});

document.body.addEventListener('dragleave', () => {
    document.getElementById('blocklyDiv').classList.remove('dragging');
});

// Add event listener for the Execute Code button
document.getElementById('execute-code').addEventListener('click', executeCode);

// Função para redimensionar o Blockly junto com a code-area
function resizeBlockly() {
    blocklyDiv.style.height = '100%';
    Blockly.svgResize(workspace);
    Blockly.svgResize(workspace); // Atualiza o Blockly para refletir o novo tamanho
}

resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    const containerWidth = container.offsetWidth;
    const newWidth = containerWidth - e.clientX;

    // Limita largura entre 100px e 60% da largura total
    if (newWidth > 150 && newWidth < containerWidth * 0.6) {
        codeArea.style.width = `${newWidth}px`;
        blocklyDiv.style.width = `${containerWidth - newWidth - resizeHandle.offsetWidth}px`;
        Blockly.svgResize(workspace);
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
});


// Garante que o Blockly redimensione ao carregar a página
window.addEventListener('load', resizeBlockly);
window.addEventListener('resize', resizeBlockly); // Redimensiona em caso de alteração de janela


workspace.addChangeListener(function() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToPrettyText(xml);
    localStorage.setItem('blocklyWorkspace', xmlText);
});


document.getElementById('search-blocks').addEventListener('click', searchBlocks);
document.getElementById('clear-search').addEventListener('click', clearSearch);
