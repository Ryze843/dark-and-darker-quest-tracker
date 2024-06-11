const quests = [
    {
        name: "Find the Lost Sword",
        requirements: ["Sword Hilt", "Sword Blade"],
        completed: false
    },
    {
        name: "Gather Magic Ingredients",
        requirements: ["Dragon Scale", "Phoenix Feather", "Unicorn Horn"],
        completed: false
    },
    {
        name: "Forge the Legendary Armor",
        requirements: ["Iron Ingot", "Magic Essence", "Leather Straps"],
        completed: false
    }
];

const playerItems = new Set();

function renderQuests() {
    const questsContainer = document.getElementById('quests');
    questsContainer.innerHTML = '';
    quests.forEach((quest, index) => {
        const questElement = document.createElement('div');
        questElement.className = `quest ${quest.completed ? 'completed' : ''}`;
        questElement.innerHTML = `
            <h3>${quest.name} - ${quest.completed ? 'Completed' : 'Incomplete'}</h3>
            <div class="requirements">Requirements: ${quest.requirements.join(', ')}</div>
            <div>Collected: ${quest.requirements.filter(item => playerItems.has(item)).join(', ')}</div>
            <button onclick="markQuestCompleted(${index})" ${quest.completed ? 'disabled' : ''}>Mark as Completed</button>
        `;
        questsContainer.appendChild(questElement);
    });
}

function addCollectedItem() {
    const itemInput = document.getElementById('item-input');
    const item = itemInput.value.trim();
    if (item) {
        playerItems.add(item);
        itemInput.value = '';
        renderQuests();
    }
}

function markQuestCompleted(index) {
    const quest = quests[index];
    if (quest.requirements.every(item => playerItems.has(item))) {
        quest.completed = true;
        renderQuests();
    } else {
        alert('You don\'t have all the required items to complete this quest.');
    }
}

document.addEventListener('DOMContentLoaded', renderQuests);
