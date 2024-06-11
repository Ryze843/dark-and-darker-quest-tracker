const quests = [
    { name: "Find the Lost Sword", requirements: ["Sword Hilt", "Sword Blade"], completed: false, merchant: "Blacksmith" },
    { name: "Gather Magic Ingredients", requirements: ["Dragon Scale", "Phoenix Feather", "Unicorn Horn"], completed: false, merchant: "Alchemist" },
    { name: "Forge the Legendary Armor", requirements: ["Iron Ingot", "Magic Essence", "Leather Straps"], completed: false, merchant: "Armorer" }
];

const playerItems = {};

function render() {
    const merchants = {};
    quests.forEach((q, i) => merchants[q.merchant] = (merchants[q.merchant] || []).concat({ ...q, index: i }));

    const questsContainer = document.getElementById('quests');
    questsContainer.innerHTML = Object.entries(merchants).map(([merchant, quests]) => `
        <div><h3>${merchant}</h3>
            ${quests.map(q => {
        const collectedItems = q.requirements.filter(item => (playerItems[item] || 0) > 0);
        const remainingItems = q.requirements.filter(item => !collectedItems.includes(item));
        return `
                <div class="quest ${q.completed ? 'completed minimized' : ''}">
                    <h4>${q.name} - ${q.completed ? 'Completed' : 'Incomplete'}</h4>
                    <div class="details">
                        <div class="requirements">Requirements: ${remainingItems.join(', ')}</div>
                        <div>Collected: ${collectedItems.join(', ')}</div>
                        <div class="item-list">
                            ${q.requirements.map(item => `
                                <div class="item">
                                    <h4>${item}</h4>
                                    <div>Required: 1</div>
                                    <div class="item-controls">
                                        <button onclick="decreaseItem('${item}')">-</button>
                                        <span id="item-${item}">${playerItems[item] || 0}/1</span>
                                        <button onclick="increaseItem('${item}')">+</button>
                                    </div>
                                </div>`).join('')}
                        </div>
                    </div>
                    <button onclick="${q.completed ? `markQuestIncomplete(${q.index})` : `markQuestCompleted(${q.index})`}">
                        ${q.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                    </button>
                </div>`;
    }).join('')}
        </div>`).join('');
}

function increaseItem(item) {
    const requiredAmount = quests.flatMap(q => q.requirements).filter(i => i === item).length;
    playerItems[item] = Math.min((playerItems[item] || 0) + 1, requiredAmount);

    // Check if any quest can be marked as completed
    quests.forEach((quest, index) => {
        if (!quest.completed && quest.requirements.every(req => (playerItems[req] || 0) >= quests.flatMap(q => q.requirements).filter(i => i === req).length)) {
            markQuestCompleted(index);
        }
    });

    render();
}

function decreaseItem(item) {
    if (playerItems[item]) playerItems[item]--;
    render();
}

function markQuestCompleted(index) {
    const quest = quests[index];
    quest.requirements.forEach(item => {
        playerItems[item] = quests.flatMap(q => q.requirements).filter(i => i === item).length;
    });
    quest.completed = true;
    render();
}

function markQuestIncomplete(index) {
    const quest = quests[index];
    quest.requirements.forEach(item => {
        playerItems[item] = 0;
    });
    quest.completed = false;
    render();
}

document.addEventListener('DOMContentLoaded', render);
