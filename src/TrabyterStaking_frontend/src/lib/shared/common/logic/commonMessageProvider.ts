import {RequestPublicKeyMessage} from '$lib/shared/common/abstractions/messages/fromAny/requestPublicKeyMessage';
import {RequestFullScreenMessage} from '$lib/shared/common/abstractions/messages/FromEmbeddedApp/requestFullScreenMessage';
import {MessageRawData} from '$lib/shared/common/abstractions/messages/messageRawData';
//import {browser} from '$app/environment';
import {MessageType} from '$lib/shared/common/abstractions/messages/messagetype';
import {AppIdentifier} from '$lib/shared/common/abstractions/types/commonTypes';

import {CryptoUtils} from '../crypto/cryptoutils';

export class CommonMessageProvider {
    /// Sends a message to the parent window without using encryption
    PostMessageToParent<T>(
        targetIdentifier: AppIdentifier,
        sourceIdentifier: AppIdentifier,
        messageType: MessageType,
        messageData: T,
        messageId: string | null = null,
    ) {
        try {
            var messageAsString: string = JSON.stringify(messageData);
            var messageRawData: MessageRawData = new MessageRawData(
                targetIdentifier,
                sourceIdentifier,
                messageType,
                messageAsString,
                messageId,
            );

            // Send a message to the parent
            //console.log('MessageProvider.SendMessageToHost', messageType, messageData);
            //var messageDataString: string = messageData.toString();
            //console.log('MessageProvider.SendMessageToHost string:', messageType, messageDataString);

            window.parent.postMessage({type: messageType, data: messageRawData.toString()}, '*');
        } catch (e) {
            console.error('Error sending message to host:', e);
        }
    }

    // Sends a public key request message to the parent window
    public SendPublicKeyRequest(targetIdentifier: AppIdentifier, sourceIdentifier: AppIdentifier) {
        console.log('MessageProvider.SendPublicKeyRequest');

        var message = new RequestPublicKeyMessage();

        // Send to parent only
        if (targetIdentifier === AppIdentifier.MainWebsite) {
            this.PostMessageToParent(
                targetIdentifier,
                sourceIdentifier,
                MessageType.PublicKeyRequest,
                message.toString(),
            );
        } else {
            console.error('SendPublicKeyRequest: Unsupported target identifier:', targetIdentifier);
        }
    }

    // PostMessageEncryptedToParent<T>(messageType: MessageType, messageData: T, id: string | null = null) {
    //     try {
    //         var messageRawData: MessageRawData = CryptoUtils.EncryptAndReturnAsRawMessageAsync(
    //             messageData,
    //             messageType,
    //             id,
    //         );

    //         window.parent.postMessage({type: messageType, data: messageRawData.toString()}, '*');
    //     } catch (e) {
    //         console.error('Error sending message to host:', e);
    //     }
    // }
}
