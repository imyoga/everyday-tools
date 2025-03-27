import { tools } from './data.js';

let filteredTools = [...tools];

function filterTools(searchText) {
    searchText = searchText.toLowerCase();
    filteredTools = tools.filter(tool => 
        tool.title.toLowerCase().includes(searchText) || 
        tool.type.toLowerCase().includes(searchText) ||
        tool.description.toLowerCase().includes(searchText)
    );
    renderTools();
}

function getUniqueTypes() {
    return [...new Set(tools.map(tool => tool.type))];
}

function renderTools() {
    const container = document.getElementById('toolsContainer');
    container.innerHTML = '';
    
    // Create table
    const table = document.createElement('table');
    table.className = 'tools-table';
    
    // Add table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Description</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // Group tools by type
    const toolsByType = {};
    const uniqueTypes = getUniqueTypes();
    
    uniqueTypes.forEach(type => {
        toolsByType[type] = filteredTools.filter(tool => tool.type === type);
    });
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add rows for each type group
    uniqueTypes.forEach(type => {
        const toolsOfType = toolsByType[type];
        
        if (toolsOfType.length > 0) {
            // Add group header row
            const groupHeaderRow = document.createElement('tr');
            groupHeaderRow.className = 'group-header';
            groupHeaderRow.innerHTML = `
                <td colspan="3">${type} (${toolsOfType.length})</td>
            `;
            tbody.appendChild(groupHeaderRow);
            
            // Add rows for each tool in this group
            toolsOfType.forEach(tool => {
                const row = document.createElement('tr');
                row.className = 'tool-row';
                row.onclick = () => window.open(tool.url, '_blank', 'noopener,noreferrer');
                
                row.innerHTML = `
                    <td>
                        <div class="tool-icon">${tool.icon}</div>
                    </td>
                    <td>${tool.title}</td>
                    <td>${tool.description}</td>
                `;
                
                tbody.appendChild(row);
            });
        }
    });
    
    table.appendChild(tbody);
    container.appendChild(table);
}

// Initial render
renderTools();

// fit two emojis in the tool-icon div
document.querySelectorAll('.tool-icon').forEach(icon => {
    if (icon.textContent.length > 2) {
        console.log(icon.textContent);
        icon.style.fontSize = '1rem';
    }
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    filterTools(e.target.value);
});
