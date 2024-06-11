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

const playerItems = {};

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
    
