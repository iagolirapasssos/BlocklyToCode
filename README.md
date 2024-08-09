# BlocklyToCode

This project extends the Blockly library with custom blocks for working with dictionaries (or "maps"). It includes blocks for creating, manipulating, and querying dictionary structures in JavaScript.

## Features

- **Create Dictionary with Items**: Create dictionaries with a specified number of key-value pairs.
- **Create Empty Dictionary**: Create an empty dictionary.
- **Get Value by Key**: Retrieve values from a dictionary by key.
- **Set Value by Key**: Set values in a dictionary for given keys.
- **Get All Keys**: Retrieve all keys from a dictionary.
- **Get All Values**: Retrieve all values from a dictionary.
- **Check if Dictionary is Empty**: Check if a dictionary is empty.
- **Get Dictionary Size**: Get the number of key-value pairs in a dictionary.

## Getting Started

To use these custom Blockly blocks, follow these steps:

1. **Include Blockly Library**: Ensure you have Blockly included in your project. You can include Blockly via CDN or by downloading it from [Blockly's GitHub repository](https://github.com/google/blockly).

2. **Add Custom Blocks**: Include the custom block definitions and code generation functions provided in this repository. You can integrate them into your existing Blockly workspace setup.

3. **Configure Blockly Workspace**: Configure your Blockly workspace in your HTML and JavaScript files to include the custom toolbox and the ability to generate code from blocks.

### Example Usage

Here's an example of how you might set up a basic Blockly workspace with these custom blocks:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Blockly Dictionary Blocks</title>
  <script src="https://unpkg.com/blockly/blockly.min.js"></script>
  <script src="script.js"></script>
</head>
<body>
  <h1>Blockly Dictionary Blocks Example</h1>
  <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
  <xml id="toolbox" style="display: none">
    <category name="Dictionaries" colour="230">
      <block type="maps_create_with"></block>
      <block type="maps_create_empty"></block>
      <block type="maps_get"></block>
      <block type="maps_set"></block>
      <block type="maps_keys"></block>
      <block type="maps_values"></block>
      <block type="maps_is_empty"></block>
      <block type="maps_length"></block>
    </category>
  </xml>
  <button id="generate-code">Generate Code</button>
  <pre id="code-output"></pre>
</body>
</html>
```

```javascript
// script.js

// Configure the Blockly workspace
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
    },
    theme: Blockly.Themes.Classic
});

// Variable to store the current language
var currentLanguage = 'javascript';

// Function to generate code
function generateCode() {
    var code;
    switch(currentLanguage) {
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
    }
    document.getElementById('code-output').textContent = code;
}

// Add event listener for code generation
document.getElementById('generate-code').addEventListener('click', generateCode);

// Function to change the theme
function changeTheme(themeName) {
    if (themeName === 'dark') {
        workspace.setTheme(Blockly.Themes.Dark);
        document.body.classList.add('dark-theme');
    } else {
        workspace.setTheme(Blockly.Themes.Classic);
        document.body.classList.remove('dark-theme');
    }
}

// Add event listener for theme selector
document.getElementById('theme-select').addEventListener('change', function(event) {
    changeTheme(event.target.value);
});

// Add event listener for language selector
document.getElementById('language-select').addEventListener('change', function(event) {
    currentLanguage = event.target.value;
    generateCode();
});

// Customize block appearance
Blockly.HSV_SATURATION = 0.65;
Blockly.HSV_VALUE = 0.8;

// Resize Blockly workspace on window resize
window.addEventListener('resize', function() {
    Blockly.svgResize(workspace);
});

// Manual resizing implementation
var resizeHandle = document.getElementById('resize-handle');
var codeArea = document.querySelector('.code-area');
var isResizing = false;

resizeHandle.addEventListener('mousedown', function(e) {
    isResizing = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    if (isResizing) {
        var newHeight = window.innerHeight - e.clientY;
        codeArea.style.height = newHeight + 'px';
        Blockly.svgResize(workspace);
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
}

// Include custom block definitions here
```

## Custom Blocks

The custom blocks included in this repository are:

- **maps_create_with**: Create a dictionary with specified key-value pairs.
- **maps_create_empty**: Create an empty dictionary.
- **maps_get**: Get a value from a dictionary by key.
- **maps_set**: Set a value in a dictionary for a given key.
- **maps_keys**: Get all keys from a dictionary.
- **maps_values**: Get all values from a dictionary.
- **maps_is_empty**: Check if a dictionary is empty.
- **maps_length**: Get the number of key-value pairs in a dictionary.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust any part of this README to better fit your project's specifics or to add additional information.
