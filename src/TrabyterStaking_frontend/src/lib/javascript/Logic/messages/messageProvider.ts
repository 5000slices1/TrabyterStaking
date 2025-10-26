import {ResponsePublicKeyMessage} from '$lib/shared/common/abstractions/messages/fromAny/responsePublicKeyMessage';
import {RequestFullScreenMessage} from '$lib/shared/common/abstractions/messages/FromEmbeddedApp/requestFullScreenMessage';
import {MessageRawData} from '$lib/shared/common/abstractions/messages/messageRawData';
//import {browser} from '$app/environment';
import {MessageType} from '$lib/shared/common/abstractions/messages/messagetype';
import {AppIdentifier} from '$lib/shared/common/abstractions/types/commonTypes';
import {CryptoUtils} from '$lib/shared/common/crypto/cryptoutils';
import {CommonMessageProvider} from '$lib/shared/common/logic/commonMessageProvider';

export class MessageProvider extends CommonMessageProvider {
    async Init() {
        window.addEventListener('message', async (event) => await this.MessageReceived(event));
    }

    public SendFullScreenRequest(useFullScreen: boolean) {
        const message = new RequestFullScreenMessage(useFullScreen);

        this.PostMessageToParent(
            AppIdentifier.MainWebsite,
            AppIdentifier.TrabyterStaking,
            MessageType.FullScreenRequest,
            message.toString(),
        );
    }

    public async TestingEncryptedMessage() {
        console.log('MessageProvider.TestingEncryptedMessage');
        let publicKey = CryptoUtils.dicPublicKeys.TrabyterStaking;
        if (!publicKey) {
            console.error('TrabyterStaking public key not found');
            return;
        }
        var jsonPublicKey: string = await CryptoUtils.publicKeyToJwkString(publicKey);
        console.log('TestingEncryptedMessage - public key as JWK string:', jsonPublicKey);

        let messageType: MessageType = MessageType.PublicKeyResponse;
        const message = new ResponsePublicKeyMessage(AppIdentifier.TrabyterStaking, jsonPublicKey);

        var messageRawData: MessageRawData =
            await CryptoUtils.EncryptAndReturnAsRawMessageAsync<ResponsePublicKeyMessage>(
                AppIdentifier.TrabyterStaking,
                AppIdentifier.TrabyterStaking,
                publicKey,
                messageType,
                message,
            );

        // Now decrypt the message to verify
        var internalJsonString: string = await messageRawData.GetInternalDataStringAsync();
        console.log('Decrypted internal JSON string:', internalJsonString);

        const originalMessage: ResponsePublicKeyMessage = JSON.parse(internalJsonString);
        console.log('Original Message after decryption:', originalMessage);
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
            if (!event.data || !event.data.type || !event.data.data) {
                console.warn('Received malformed message:', event.data);
                return;
            }
            // if (event.data.type === MessageType.FullScreenRequest) {
            //     const messageData = MessageRawData.fromString<RequestFullScreenMessage>(event.data.data);
            //     console.log('Parsed MessageData:', messageData);
            //     return;
            // }
        } catch (e) {
            console.error('Error processing received message:', e);
        }
    }
}
