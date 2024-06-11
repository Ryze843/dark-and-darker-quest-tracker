const quests = [
    { name: "Find the Lost Sword", requirements: ["Sword Hilt", "Sword Blade"], completed: false, merchant: "Blacksmith" },
    { name: "Gather Magic Ingredients", requirements: ["Dragon Scale", "Phoenix Feather", "Unicorn Horn"], completed: false, merchant: "Alchemist" },
    { name: "Forge the Legendary Armor", requirements: ["Iron Ingot", "Magic Essence", "Leather Straps"], completed: false, merchant: "Armorer" }
];

const playerItems = {};

function render() {
    const merchants = {};
    quests.forEach(q => merchants[q.merchant] = (merchants[q.merchant] || []).concat(q));
    
    const questsContainer = document.getElementById('quests');
    questsContainer.innerHTML = Object.entries(merchants).map(([merchant, quests]) => `
        <div><h3>${merchant}</h3>
            ${quests.map((q, i) => `
                <div class="quest ${q.completed ? 'completed' : ''}">
                    <h4>${q.name} - ${q.completed ? 'Completed' : 'Incomplete'}</h4>
                    <div class="requirements">Requirements: ${q.requirements.join(', ')}</div>
                    <div>Collected: ${q.requirements.filter(item => playerItems[item] > 0).join(', ')}</div>
                    <button onclick="markQuestCompleted(${i})" ${q.completed ? 'disabled' : ''}>Mark as Completed</button>
                </div>`).join('')}
        </div>`).join('');

    const items = quests.flatMap(q => q.requirements).reduce((acc, item) => (acc[item] = (acc[item] || 0) + 1, acc), {});
    
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = Object.entries(items).map(([item, count]) => `
        <div class="item">
            <h4>${item}</h4>
            <div>Required: ${count}</div>
            <div class="item-controls">
                <button onclick="decreaseItem('${item}')">-</button>
                <span id="item-${item}">${playerItems[item] || 0}/${count}</span>
                <button onclick="increaseItem('${item}')">+</button>
            </div>
        </div>`).join('');
}

function increaseItem(item) {
    const requiredAmount = quests.flatMap(q => q.requirements).filter(i => i === item).length;
    playerItems[item] = Math.min((playerItems[item] || 0) + 1, requiredAmount);
    render();
}

function decreaseItem(item) {
    if (playerItems[item]) playerItems[item]--;
    render();
}

function markQuestCompleted(index) {
    const quest = quests[index];
    if (quest.requirements.every(item => (playerItems[item] || 0) >= quests.flatMap(q => q.requirements).filter(i => i === item).length)) {
        quest.completed = true;
        render();
    } else {
        alert('You don\'t have all the required items to complete this quest.');
    }
}

document.addEventListener('DOMContentLoaded', render);
