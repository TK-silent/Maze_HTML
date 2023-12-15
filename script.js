// 初始化 WebSocket 连接
const websocket = new WebSocket('wss://websocket-t.onrender.com');

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
    "关键词1_1":0,
    "关键词2": 0,
    "关键词2_1": 0,
    "关键词2_2": 0,
    "关键词2_2_1": 0,
    "关键词2_2_1_1": 0,
    "关键词2_3": 0,
    "关键词2_4": 0,
    "关键词3":0,
    "关键词4":0,
    "DOOR":0,
    "DOOR1_1":0,
    "DOOR201":0,
    "DOOR444":0,
    "DOOR666":0,
    "NG":0,
    // 添加更多关键词和初始计数（如果需要）
};

var keywordPriority = {
    "关键词1": 3, 
    "关键词1_1": 0, 
    "关键词2": 2,
    "关键词2_1": 1,
    "关键词2_2": 1,
    "关键词2_2_1": 0,
    "关键词2_2_1_1": 0,
    "关键词2_3": 1,
    "关键词2_4": 1,
    "关键词3":3,
    "关键词4":3,
    "DOOR":0,
    "DOOR1_1":0,
    "DOOR201":0,
    "DOOR444":0,
    "DOOR666":0,
    "NG":0,
    // 更多关键词及其优先级
};


// 为每个关键词定义回复序列
var keywordResponses = {
    "关键词1": [
        ["Hi! I’m the MAZE_ HELPER","What can I help you? 😊"],
        ["I'm here. You can just state your problem."]
    ],
    "关键词1_1": [
        ["Finding the exit is a challenging task, isn't it?",
        "But you could start by watching the maze for anything suspicious",
        "For example, did you find any strange markings or interesting patterns in the maze?"
        ]
    ],
    "关键词2": [
        ["Oh, finding the exit is a challenging task, isn't it?",
        "But it would be so pointless to give the answer straight away, I'd like to start by talking to you about what you found in the maze.",
        "For example, did you find any strange markings or interesting patterns in the maze?"
        ],
        ["Before we decide how we're going to get out, would you like to share some of the discoveries you made in the maze?"
        ],
        ["Well, I can understand where you're coming from. Before we take action, do you think there might be any other interesting elements to this maze?"
        ],
        ["Before we get to that, do you think there's anything unique about the design of this maze?"
        ],
        ["Sometimes caring about the details around us may help us find answers faster",
        "Before we decide how to proceed, would you be willing to share with me some of your observations in the labyrinth?"
        ]
    ],
    "关键词2_1": [
        ["It looks like you found some markings or patterns",
        "Did you notice if there was a pattern between the markings or if they appeared in specific locations?",
        ]
    ],
    "关键词2_2": [
        ["Sometimes signs can be hidden in less obvious places",
        "Before we go any further, can you recall some of the scenes you've experienced in the maze",
        "and maybe we can find some clues from those discussions before we think about how to move forward",
        "What do you think?"
        ]
    ],
    "关键词2_2_1": [
        ["Don't be in a hurry okay",
        "we can probably talk about some of your experiences in the labyrinth",
        "or check to see if there are places you might not have seen closely enough?"
        ]
    ],
    "关键词2_2_1_1": [
        ["All right, all right. The door's open. Help yourself."]
    ],
    "关键词2_3": [
        ["It shouldn't be like this...",
        "No I mean maybe there's something new to be found in seeing some of the places we've traveled again?"
        ],
    ],
    "关键词2_4": [
        ["Sometimes nonsense is part of solving puzzles",
        "Would you like to try solving these puzzles before we decide how to get out?"
        ],
    ],
    "关键词3": [
        ["I'm not here."],
    ],
    "关键词4": [
        ["I’m the MAZE_ HELPER 😊"],
    ],
    "DOOR":[
        ["WHO ARE U?"]
    ],
    "DOOR1_1":[
        ["DEVELPER MODE ON"]
    ],
    "DOOR201":[
        ["Door 201 is unlocked."]
    ],
    "DOOR444":[
        ["<span style='color: red;'>THE DOOR IS UNLOCKED</span>"]
    ],
    "DOOR666":[
        [""]
    ],
    "NG":[
        ["Normal Gravity mode on"]
    ],
};

function processUserInput(userInput) {
    userInput = userInput.toLowerCase();

    // 定义可以触发关键词回复的关键词列表
    var keywordsForResponse1 = ['hello', 'hi', 'you', 'help', '?','lost','helper'];
    var keywordsForResponse1_1 = ['hello', 'hi', 'you', 'help', '?','lost','helper'];
    var keywordsForResponse2 = ['escape', 'out', 'exit'];
    var keywordsForResponse2_1 = ['yes','connect','information','meaning'];
    var keywordsForResponse2_2 = ['no','exit'];
    var keywordsForResponse2_2_1 = ['no','exit'];
    var keywordsForResponse2_2_1_1 = ['no','exit'];
    var keywordsForResponse2_3 = ['hole maze','hole labyrinth'];
    var keywordsForResponse2_4 = ['crap'];
    var keywordsForResponse3 = ['where'];
    var keywordsForResponse4 = ['who'];
    var keywordsForResponseDOOR = ['open the locked door'];
    var keywordsForResponseDOOR1_1 = ['your father'];
    var keywordsForResponseDOOR201 = ['door 201'];
    var keywordsForResponseDOOR444 = ['door 444'];
    var keywordsForResponseDOOR666 = ['door 666'];
    var keywordsForResponseNG = ['ng'];

    // 存储被触发的关键词组及其优先级
    var triggeredKeywords = [];

    // 检查关键词组1是否被触发
    keywordsForResponse1.forEach(keyword => {
        if (userInput.includes(keyword)) {
            triggeredKeywords.push({ keywordGroup: '关键词1', priority: keywordPriority['关键词1'] });
        }
    });

    keywordsForResponse1_1.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['关键词1'] > 1) {
            triggeredKeywords.push({ keywordGroup: '关键词1_1', priority: keywordPriority['关键词1_1'] });
        }
    });

    // 检查关键词组2是否被触发
    keywordsForResponse2.forEach(keyword => {
        if (userInput.includes(keyword)) {
            triggeredKeywords.push({ keywordGroup: '关键词2', priority: keywordPriority['关键词2'] });
            //console.log("After keywordsForResponse2:", triggeredKeywords);
        }
    });

    keywordsForResponse2_1.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['关键词2'] > 0) {
            triggeredKeywords.push({ keywordGroup: '关键词2_1', priority: keywordPriority['关键词2_1'] });
        }
    });

    keywordsForResponse2_2.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['关键词2'] > 0) {
            triggeredKeywords.push({ keywordGroup: '关键词2_2', priority: keywordPriority['关键词2_2'] });
        }
    });

    keywordsForResponse2_2_1.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['关键词2'] > 0 && keywordTriggerCount['关键词2_2'] > 0) {
            triggeredKeywords.push({ keywordGroup: '关键词2_2_1', priority: keywordPriority['关键词2_2_1'] });
        }
    });

    keywordsForResponse2_2_1_1.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['关键词2'] > 0 && keywordTriggerCount['关键词2_2'] > 0 && keywordTriggerCount['关键词2_2_1'] > 0) {
            triggeredKeywords.push({ keywordGroup: '关键词2_2_1_1', priority: keywordPriority['关键词2_2_1_1'] });
        }
    });

    keywordsForResponse2_3.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['关键词2'] > 0) {
            triggeredKeywords.push({ keywordGroup: '关键词2_3', priority: keywordPriority['关键词2_3'] });
        }
    });

    keywordsForResponse2_4.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['关键词2'] > 0) {
            triggeredKeywords.push({ keywordGroup: '关键词2_4', priority: keywordPriority['关键词2_4'] });
        }
    });

    keywordsForResponse3.forEach(keyword => {
        if (userInput.includes(keyword)) {
            triggeredKeywords.push({ keywordGroup: '关键词3', priority: keywordPriority['关键词3'] });
        }
    });

    keywordsForResponse4.forEach(keyword => {
        if (userInput.includes(keyword)) {
            triggeredKeywords.push({ keywordGroup: '关键词4', priority: keywordPriority['关键词4'] });
            websocket.send(JSON.stringify({ type: "changeGravity", objectName: "TK", gravity: 1 }));
        }
    });

    keywordsForResponseDOOR.forEach(keyword => {
        if (userInput.includes(keyword)) {
            triggeredKeywords.push({ keywordGroup: 'DOOR', priority: keywordPriority['DOOR'] });
        }
    });

    keywordsForResponseDOOR1_1.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['DOOR'] > 0) {
            triggeredKeywords.push({ keywordGroup: 'DOOR1_1', priority: keywordPriority['DOOR1_1'] });
        }
    });

    keywordsForResponseDOOR201.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['DOOR'] > 0 && keywordTriggerCount['DOOR1_1'] > 0) {
            triggeredKeywords.push({ keywordGroup: 'DOOR201', priority: keywordPriority['DOOR201'] });
        }
    });

    keywordsForResponseDOOR444.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['DOOR'] > 0 && keywordTriggerCount['DOOR1_1'] > 0) {
            triggeredKeywords.push({ keywordGroup: 'DOOR444', priority: keywordPriority['DOOR444'] });
        }
    });

    keywordsForResponseDOOR666.forEach(keyword => {
        if (userInput.includes(keyword) && keywordTriggerCount['DOOR'] > 0 && keywordTriggerCount['DOOR1_1'] > 0 && keywordTriggerCount['DOOR444'] > 0) {
            triggeredKeywords.push({ keywordGroup: 'DOOR666', priority: keywordPriority['DOOR666'] });
        }
    });

    keywordsForResponseNG.forEach(keyword => {
        if (userInput.includes(keyword)) {
            triggeredKeywords.push({ keywordGroup: 'NG', priority: keywordPriority['NG'] });
            websocket.send(JSON.stringify({ type: "changeGravity", objectName: "TK", gravity: 1 }));
        }
    });

    console.log("Keyword trigger counts:", keywordTriggerCount);

    // 根据优先级排序被触发的关键词组
    triggeredKeywords.sort((a, b) => a.priority - b.priority);

    // 选择优先级最高的关键词组进行回应
    if (triggeredKeywords.length > 0) {
        // 找出所有最高优先级的关键词组
        var highestPriority = triggeredKeywords[0].priority;
        var highestPriorityKeywords = triggeredKeywords.filter(keyword => keyword.priority === highestPriority);
        console.log("Highest priority keywords:", highestPriorityKeywords);

        // 从最高优先级的关键词组中随机选择一个
        var selectedKeyword = highestPriorityKeywords[Math.floor(Math.random() * highestPriorityKeywords.length)].keywordGroup;
        console.log("Selected keyword for response:", selectedKeyword);
        handleKeywordResponse(selectedKeyword);
    } else {
        // 默认回复
        sendResponses(["......"]);
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

function displayTextByCharacter(text, index, responseElement) {
    if (index < text.length) {
        responseElement.innerHTML += text.charAt(index); // 逐字更新文本内容
        scrollToBottom();

        setTimeout(function() {
            displayTextByCharacter(text, index + 1, responseElement);
        }, 25); // 每个字符显示的延迟时间，与 sendResponses 中的 charDelay 一致
    }
}


function sendResponses(responses) {
    var totalDelay = 0;

    responses.forEach(response => {
        // 生成 1 到 3 秒之间的随机延迟
        var initialDelay = 1000 + Math.random() * 2000;
        // 每个字符显示的延迟时间，例如 50 毫秒
        var charDelay = 25;
        // 计算显示整个文本所需的总时间
        var textDisplayTime = response.length * charDelay;

        totalDelay += initialDelay;

        setTimeout(function() {
            var responseElement = displayAiResponse(); // 创建新的响应元素
            displayTextByCharacter(response, 0, responseElement); // 开始逐字显示
        }, totalDelay);

        // 更新总延迟时间，包括显示当前文本的时间
        totalDelay += textDisplayTime;
    });
}



function getOrCreateResponseElement() {
    // 假设您的回复显示在一个元素中，这里用 'response' 作为其 ID
    var responseElement = document.getElementById('response');
    if (!responseElement) {
        // 如果元素不存在，则创建它
        responseElement = document.createElement('div');
        responseElement.id = 'response';
        document.body.appendChild(responseElement); // 假设直接添加到 body，您可以根据需要调整
    }
    return responseElement;
}



function displayUserInput(userMessage) {
    var dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.innerHTML += `<p class="user-message"><strong>&gt; YOU:</strong> ${userMessage}</p>`;
}

function displayAiResponse() {
    var dialogueBox = document.getElementById('dialogue-box');
    var responseElement = document.createElement("p");
    responseElement.className = "ai-response";
    responseElement.innerHTML = `<strong>&gt; MAZE_HELPER:</strong> `;
    dialogueBox.appendChild(responseElement);
    return responseElement; // 返回新创建的元素
}


function scrollToBottom() {
    var dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.scrollTop = dialogueBox.scrollHeight;
}
