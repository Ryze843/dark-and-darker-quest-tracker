let quests = [];
const playerItems = {};
let currentMerchant = '';

async function fetchQuestData() {
    try {
        const response = await fetch('quest_data.json');
        quests = await response.json();

        // Preprocess quest data to handle nested requirements
        quests.forEach((quest, index) => {
            let flattenedRequirements = [];
            let previousRequirement = '';

            quest.requirements.forEach(req => {
                if (req.startsWith('(')) {
                    previousRequirement += ' ' + req;
                } else {
                    if (previousRequirement) {
                        flattenedRequirements.push(previousRequirement);
                    }
                    previousRequirement = req;
                }
            });

            if (previousRequirement) {
                flattenedRequirements.push(previousRequirement);
            }

            quest.requirements = flattenedRequirements.map(req => ({
                name: req.split(' (')[0],
                count: parseInt(req.match(/\((\d+)x\)/)[1]),
                progress: 0 // Initialize progress to 0
            }));
            quest.index = index; // Add index to each quest for reference
        });

        renderMerchantButtons();
    } catch (error) {
        console.error('Error fetching quest data:', error);
    }
}

function renderMerchantButtons() {
    const merchants = {};
    quests.forEach(q => merchants[q.merchant] = true);

    const merchantButtonsContainer = document.getElementById('merchant-buttons');
    merchantButtonsContainer.innerHTML = Object.keys(merchants).map(merchant => {
        const imageName = merchant.replace(/ /g, '_') + '.png';
        return `
            <button class="merchant-button" onclick="selectMerchant('${merchant}')" style="background-image: url('images/${imageName}')"></button>
        `;
    }).join('');

    if (Object.keys(merchants).length > 0) {
        selectMerchant(Object.keys(merchants)[0]); // Select the first merchant by default
    }
}

function selectMerchant(merchant) {
    currentMerchant = merchant;
    document.querySelectorAll('.merchant-button').forEach(button => {
        button.classList.toggle('active', button.style.backgroundImage.includes(merchant.replace(/ /g, '_')));
    });
    renderQuests();
}

function renderQuests() {
    const questsContainer = document.getElementById('quests');
    const filteredQuests = quests.filter(q => q.merchant === currentMerchant);

    questsContainer.innerHTML = `<div class="quest-grid">
        ${filteredQuests.map(q => `
            <div class="quest ${q.completed ? 'completed' : ''}">
                ${q.name} - ${q.completed ? 'Completed' : 'Incomplete'}
                <div class="details" style="display: ${q.completed ? 'none' : 'block'};">
                    <div class="requirements">Requirements:</div>
                    <div class="item-list">
                        ${q.requirements.map(item => `
                            <div class="item">
                                ${item.name}
                                <div>Required: ${item.count}</div>
                                <div class="item-controls">
                                    <button onclick="decreaseItem('${q.index}', '${item.name}')">-</button>
                                    <span id="item-${q.index}-${item.name}">${item.progress}/${item.count}</span>
                                    <button onclick="increaseItem('${q.index}', '${item.name}')">+</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <button onclick="${q.completed ? `markQuestIncomplete(${q.index})` : `markQuestCompleted(${q.index})`}">
                    ${q.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                </button>
            </div>
        `).join('')}
    </div>`;
}

function increaseItem(questIndex, itemName) {
    const quest = quests[questIndex];
    const item = quest.requirements.find(req => req.name === itemName);

    if (item.progress < item.count) {
        item.progress++;
    }

    checkQuestCompletion(questIndex);
    renderQuests();
}

function decreaseItem(questIndex, itemName) {
    const quest = quests[questIndex];
    const item = quest.requirements.find(req => req.name === itemName);

    if (item.progress > 0) {
        item.progress--;
    }

    checkQuestCompletion(questIndex);
    renderQuests();
}

function checkQuestCompletion(questIndex) {
    const quest = quests[questIndex];
    if (quest.requirements.every(req => req.progress >= req.count)) {
        markQuestCompleted(questIndex);
    } else {
        markQuestIncomplete(questIndex);
    }
}

function markQuestCompleted(index) {
    const quest = quests[index];
    quest.completed = true;
    renderQuests();
}

function markQuestIncomplete(index) {
    const quest = quests[index];
    quest.completed = false;
    quest.requirements.forEach(req => {
        if (req.progress >= req.count) {
            req.progress = req.count;
        }
    });
    renderQuests();
}

document.addEventListener('DOMContentLoaded', fetchQuestData);
