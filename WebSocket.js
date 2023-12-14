var ws;

        function connectWebSocket() {
            // 替换为您的 WebSocket 服务器地址
            ws = new WebSocket('wss://websocket-qxuo.onrender.com');

            ws.onopen = function() {
                console.log('Connected to WebSocket server');
                // 连接打开后的处理
            };

            ws.onmessage = function(e) {
                console.log('Message received: ' + e.data);
                // 处理从服务器接收的消息
            };

            ws.onerror = function(error) {
                console.log('WebSocket Error: ' + error);
            };
        }

        function sendMessage(message) {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(message);
            }
        }
        window.onload = connectWebSocket;