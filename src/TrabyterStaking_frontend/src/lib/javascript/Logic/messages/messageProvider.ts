import {MessageFullScreenRequestMessage} from '$lib/javascript/Abstractions/messages/messageData/FullScreen/messageFullScreenRequestMessage';
import {MessageRawData} from '$lib/javascript/Abstractions/messages/messageRawData';
//import {browser} from '$app/environment';
import {MessageType} from '$lib/javascript/Abstractions/messages/messagetype';

export class MessageProvider {
    async Init() {
        window.addEventListener('message', async (event) => await this.MessageReceived(event));
    }
    SendMessageToHost(messageType: MessageType, messageValue: string, id: string | null = null) {
        try {
            var messageData = new MessageRawData(messageType, messageValue, id);

            // Send a message to the parent
            console.log('MessageProvider.SendMessageToHost', messageType, messageData);
            var messageDataString: string = messageData.toString();
            console.log('MessageProvider.SendMessageToHost string:', messageType, messageDataString);
            window.parent.postMessage({type: messageType, data: messageData.toString()}, '*');
        } catch (e) {
            console.error('Error sending message to host:', e);
        }
    }

    SendFullScreenRequest(useFullScreen: boolean) {
        const message = new MessageFullScreenRequestMessage(useFullScreen);
        var messageAsString: string = message.toString();
        console.log('MessageProvider.SendFullScreenRequest string: ', messageAsString);
        this.SendMessageToHost(MessageType.FullScreenRequest, message.toString());
    }

    async MessageReceived(event: MessageEvent) {
        try {
            console.log('MessageProvider.MessageReceived', event);

            // Validate the origin of the message
            if (event.origin !== window.origin) {
                console.warn('Received message from unknown origin:', event.origin);
                return;
            }
            // if (event.data.type === 'REQUEST_DATA') {
            //     // Respond with custom data
            //     event.source.postMessage({ type: 'RESPONSE_DATA', requestId: event.data.requestId, payload: 'your data' }, event.origin);
            // }
            event.data.data;
            const messageData = MessageRawData.fromString(event.data.data);
            console.log('Parsed MessageData:', messageData);
        } catch (e) {
            console.error('Error processing received message:', e);
        }
    }
}
