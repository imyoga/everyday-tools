import { tools } from './data.js';

let filteredTools = [...tools];

function filterTools(searchText) {
    searchText = searchText.toLowerCase();
    filteredTools = tools.filter(tool => 
        tool.title.toLowerCase().includes(searchText)
    );
    renderTools();
}

function renderTools() {
    const container = document.getElementById('toolsContainer');
    container.innerHTML = '';

    filteredTools.forEach(tool => {
        const card = document.createElement('a');
        card.href = tool.url;
        card.className = 'tool-card';
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
            <div class="thumbnail">
                ${tool.icon}
            </div>
            <div class="tool-title">${tool.title}</div>
        `;

        container.appendChild(card);
    });
}

// View toggle functionality
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const toolsContainer = document.getElementById('toolsContainer');

gridViewBtn.addEventListener('click', () => {
    toolsContainer.className = 'grid-view';
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
    toolsContainer.className = 'list-view';
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
});

// Initial render
renderTools();

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    filterTools(e.target.value);
});
