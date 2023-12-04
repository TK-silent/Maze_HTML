function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        var userInputField = document.getElementById('user-input');
        var userInput = userInputField.value; // 获取输入框的值

        if (userInput.trim() !== "") {
            var aiResponse = processUserInput(userInput);

            // 显示用户输入
            displayUserInput(userInput);

            // 清空输入框
            userInputField.value = "";

            // 延迟回复
            // 延迟回复
        setTimeout(function() {
            displayAiResponse(aiResponse);

            // 滚动到对话框底部
            var dialogueBox = document.getElementById('dialogue-box');
            dialogueBox.scrollTop = dialogueBox.scrollHeight;
        }, 1000 + Math.random() * 1000); // 随机延迟 1 到 2 秒

        }
    }
}

function processUserInput(userInput) {
    if (userInput.toLowerCase().includes('关键词1')) {
        return '关键词1的回复';
    } else if (userInput.toLowerCase().includes('关键词2')) {
        return '关键词2的回复';
    } else {
        return '?';
    }
}

function displayUserInput(userMessage) {
    var dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.innerHTML += `<p><strong>YOU:</strong> ${userMessage}</p>`;
}

function displayAiResponse(aiResponse) {
    var dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.innerHTML += `<p><strong>MAZE_HELPER:</strong> ${aiResponse}</p>`;
}
