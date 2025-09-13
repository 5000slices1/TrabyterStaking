//import {browser} from '$app/environment';
import {MessageType} from '$lib/javascript/Abstractions/messages/messagetype';

export function SendMessageToHost(messageType: MessageType, messageValue: string) {
    //if (browser) {
    try {
        // Send a message to the parent
        window.parent.postMessage({type: messageType, data: messageValue}, '*');
    } catch (e) {
        console.error('Error sending message to host:', e);
    }
    //}
}
