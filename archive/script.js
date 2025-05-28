import { tools, groupedTools, toolCategories } from './data.js';

let filteredTools = [...tools];
let filteredCategories = [...toolCategories];
let activeCategory = null;

function filterTools(searchText) {
    activeCategory = null;
    searchText = searchText.toLowerCase();
    filteredTools = tools.filter(tool => 
        tool.title.toLowerCase().includes(searchText) || 
        tool.type.toLowerCase().includes(searchText) ||
        tool.description.toLowerCase().includes(searchText)
    );
    
    // Filter categories and their tools based on search
    filteredCategories = toolCategories.map(category => {
        return {
            name: category.name,
            tools: category.tools.filter(tool => 
                tool.title.toLowerCase().includes(searchText) || 
                category.name.toLowerCase().includes(searchText) ||
                tool.description.toLowerCase().includes(searchText)
            )
        };
    }).filter(category => category.tools.length > 0);
    
    renderCategories();
    renderTools();
}

function filterByCategory(categoryName) {
    activeCategory = categoryName;
    document.getElementById('searchInput').value = ''; // Clear search input
    
    if (categoryName === 'All') {
        filteredCategories = [...toolCategories];
    } else {
        filteredCategories = toolCategories.filter(category => category.name === categoryName);
    }
    
    renderCategories();
    renderTools();
}

function renderCategories() {
    const categoriesContainer = document.getElementById('categoriesNav');
    if (!categoriesContainer) return;
    
    categoriesContainer.innerHTML = '';
    
    // Add "All" category button
    const allButton = document.createElement('button');
    allButton.className = 'category-btn' + (activeCategory === null || activeCategory === 'All' ? ' active' : '');
    allButton.textContent = 'All';
    allButton.addEventListener('click', () => filterByCategory('All'));
    categoriesContainer.appendChild(allButton);
    
    // Add category buttons
    toolCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn' + (activeCategory === category.name ? ' active' : '');
        button.textContent = category.name;
        button.addEventListener('click', () => filterByCategory(category.name));
        categoriesContainer.appendChild(button);
    });
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
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add rows for each category group
    filteredCategories.forEach(category => {
        // Add group header row
        const groupHeaderRow = document.createElement('tr');
        groupHeaderRow.className = 'group-header';
        groupHeaderRow.innerHTML = `
            <td colspan="3">${category.name} (${category.tools.length})</td>
        `;
        tbody.appendChild(groupHeaderRow);
        
        // Add rows for each tool in this category
        category.tools.forEach(tool => {
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
    });
    
    table.appendChild(tbody);
    container.appendChild(table);
}

// Initial render
renderCategories();
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
