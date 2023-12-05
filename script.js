function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        var userInputField = document.getElementById('user-input');
        var userInput = userInputField.value;

        if (userInput.trim() !== "") {
            // 处理用户输入
            processUserInput(userInput);

            // 显示用户输入
            displayUserInput(userInput);

            // 清空输入框
            userInputField.value = "";
        }
    }
}

// 用于跟踪关键词触发次数的对象
var keywordTriggerCount = {
    "关键词1": 0,
    "关键词2": 0
    // 添加更多关键词和初始计数（如果需要）
};

// 为每个关键词定义回复序列
var keywordResponses = {
    "关键词1": [
        ["关键词1的第一次回复1", "关键词1的第一次回复2"],
        ["关键词1的第二次回复1", "关键词1的第二次回复2"],
        // 添加更多回复序列
    ],
    "关键词2": [
        ["关键词2的第一次回复1", "关键词2的第一次回复2"],
        // 添加更多回复序列
    ]
    // 添加更多关键词和它们的回复序列
};

function processUserInput(userInput) {
    userInput = userInput.toLowerCase();

    if (userInput.includes('关键词1')) {
        handleKeywordResponse('关键词1');
    } else if (userInput.includes('关键词2')) {
        // 检查关键词1是否已被触发
        if (keywordTriggerCount['关键词1'] > 0) {
            handleKeywordResponse('关键词2');
        } else {
            // 如果关键词1未被触发，则发送普通回复
            sendResponses(['未触发关键词1，无法回应关键词2']);
        }
    } else {
        // 默认回复
        sendResponses(['?']);
    }
}


function handleKeywordResponse(keyword) {
    keywordTriggerCount[keyword]++;
    var count = keywordTriggerCount[keyword];
    var responses = keywordResponses[keyword];

    if (count <= responses.length) {
        sendResponses(responses[count - 1]);
    } else {
        // 当触发次数超过定义的回复序列时的默认处理
        sendResponses(['?']);
    }
}

function sendResponses(responses) {
    var totalDelay = 0;

    responses.forEach(response => {
        // 生成 1 到 3 秒之间的随机延迟
        var delay = 1000 + Math.random() * 1500;
        totalDelay += delay;

        setTimeout(function() {
            displayAiResponse(response);
            scrollToBottom();
        }, totalDelay);
    });
}


function displayUserInput(userMessage) {
    var dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.innerHTML += `<p class="user-message"><strong>&gt; YOU:</strong> ${userMessage}</p>`;
}

function displayAiResponse(aiResponse) {
    var dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.innerHTML += `<p class="ai-response"><strong>&gt; MAZE_HELPER:</strong> ${aiResponse}</p>`;
}

function scrollToBottom() {
    var dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.scrollTop = dialogueBox.scrollHeight;
}
