import {ResponsePublicKeyMessage} from '$lib/shared/common/abstractions/messages/fromAny/responsePublicKeyMessage';
import {RequestFullScreenMessage} from '$lib/shared/common/abstractions/messages/FromEmbeddedApp/requestFullScreenMessage';
import {MessageRawData} from '$lib/shared/common/abstractions/messages/messageRawData';
//import {browser} from '$app/environment';
import {MessageType} from '$lib/shared/common/abstractions/messages/messagetype';
import {AppIdentifier} from '$lib/shared/common/abstractions/types/commonTypes';
import {CryptoUtils} from '$lib/shared/common/crypto/cryptoutils';
import {CommonMessageProvider} from '$lib/shared/common/logic/commonMessageProvider';
import {AllowedOriginUrls, AppIdentifierToUrl} from '$lib/shared/common/security/trustedAppRegistry.js';

import type {IMessageProvider} from '$lib/shared/common/logic/commonMessageProvider';

export class MessageProvider extends CommonMessageProvider implements IMessageProvider {
    constructor(myAppIdentifier: AppIdentifier) {
        super(myAppIdentifier, AllowedOriginUrls, AppIdentifierToUrl);
    }

    async Init() {
        await super.InitAsync();
    }

    public async SendFullScreenRequest(useFullScreen: boolean) {
        const message = new RequestFullScreenMessage(useFullScreen);

        // Ensure we have keys before sending encrypted message
        if (!this.hasKeysFor(AppIdentifier.MainWebsite)) {
            console.warn('Keys not available for MainWebsite. Requesting keys...');
            await this.SendPublicKeyRequest(AppIdentifier.MainWebsite);

            // Wait for key exchange
            const success = await this.waitForKeyExchange(AppIdentifier.MainWebsite, 5000);
            if (!success) {
                console.error('Failed to obtain keys for MainWebsite. Cannot send encrypted message.');
                return;
            }
        }

        this.PostMessageToParent(
            AppIdentifier.MainWebsite,
            AppIdentifier.TrabyterStaking,
            MessageType.FullScreenRequest,
            message,
            true, // Always encrypted
        );
    }

    public async MessageReceived(
        targetIdentifier: AppIdentifier,
        sourceIdentifier: AppIdentifier,
        messageType: MessageType,
        messageDataAsJsonString: string,
    ): Promise<void> {
        try {
            console.log('sourceIdentifier:', sourceIdentifier);
            console.log('targetIdentifier:', targetIdentifier);

            if (targetIdentifier !== this.MyAppIdentifier) {
                return;
            }

            console.log('MessageType:', messageType);
            console.log('MessageData as json string:');
            console.log(messageDataAsJsonString);
        } catch (e) {
            console.error('Error processing received message:', e);
        }
    }
}
