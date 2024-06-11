const quests = [
    {
        name: "Find the Lost Sword",
        requirements: ["Sword Hilt", "Sword Blade"],
        completed: false,
        merchant: "Blacksmith"
    },
    {
        name: "Gather Magic Ingredients",
        requirements: ["Dragon Scale", "Phoenix Feather", "Unicorn Horn"],
        completed: false,
        merchant: "Alchemist"
    },
    {
        name: "Forge the Legendary Armor",
        requirements: ["Iron Ingot", "Magic Essence", "Leather Straps"],
        completed: false,
        merchant: "Armorer"
    }
];

const playerItems = new Set();

function renderQuests() {
    const merchants = {};

    quests.forEach(quest => {
        if (!merchants[quest.merchant]) {
            merchants[quest.merchant] = [];
        }
        merchants[quest.merchant].push(quest);
    });

    const questsContainer = document.getElementById('quests');
    questsContainer.innerHTML = '';

    Object.keys(merchants).forEach(merchant => {
        const merchantDiv = document.createElement('div');
        merchantDiv.innerHTML = `<h3>${merchant}</h3>`;
        merchants[merchant].forEach((quest, index) => {
            const questElement = document.createElement('div');
            questElement.className = `quest ${quest.completed ? 'completed' : ''}`;
            questElement.innerHTML = `
                <h4>${quest.name} - ${quest.completed ? 'Completed' : 'Incomplete'}</h4>
                <div class="requirements">Requirements: ${quest.requirements.join(', ')}</div>
                <div>Collected: ${quest.requirements.filter(item => playerItems.has(item)).join(', ')}</div>
                <button onclick="markQuestCompleted(${index})" ${quest.completed ? 'disabled' : ''}>Mark as Completed</button>
            `;
            merchantDiv.appendChild(questElement);
        });
        questsContainer.appendChild(merchantDiv);
    });
}

function renderItems() {
    const items = {};
    quests.forEach(quest => {
        quest.requirements.forEach(item => {
            if (!items[item]) {
                items[item] = 0;
            }
            items[item]++;
        });
    });

    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    Object.keys(items).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <h4>${item}</h4>
            <div>Required: ${items[item]}</div>
            <div>Collected: ${playerItems.has(item) ? 'Yes' : 'No'}</div>
        `;
        itemList.appendChild(itemElement);
    });
}

function addCollectedItem() {
    const itemInput = document.getElementById('item-input');
    const item = itemInput.value.trim();
    if (item) {
        playerItems.add(item);
        itemInput.value = '';
        renderQuests();
        renderItems();
    }
}

function markQuestCompleted(index) {
    const quest = quests[index];
    if (quest.requirements.every(item => playerItems.has(item))) {
        quest.completed = true;
        renderQuests();
        renderItems();
    } else {
        alert('You don\'t have all the required items to complete this quest.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuests();
    renderItems();
});
