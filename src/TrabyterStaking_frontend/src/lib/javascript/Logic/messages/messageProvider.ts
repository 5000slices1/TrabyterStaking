import {AllowedOriginUrls} from '$lib/javascript/Abstractions/constants/globalConstants';
import {ResponsePublicKeyMessage} from '$lib/shared/common/abstractions/messages/fromAny/responsePublicKeyMessage';
import {RequestFullScreenMessage} from '$lib/shared/common/abstractions/messages/FromEmbeddedApp/requestFullScreenMessage';
import {MessageRawData} from '$lib/shared/common/abstractions/messages/messageRawData';
//import {browser} from '$app/environment';
import {MessageType} from '$lib/shared/common/abstractions/messages/messagetype';
import {AppIdentifier} from '$lib/shared/common/abstractions/types/commonTypes';
import {CryptoUtils} from '$lib/shared/common/crypto/cryptoutils';
import {CommonMessageProvider} from '$lib/shared/common/logic/commonMessageProvider';

import type {IMessageProvider} from '$lib/shared/common/logic/commonMessageProvider';

export class MessageProvider extends CommonMessageProvider implements IMessageProvider {
    constructor(myAppIdentifier: AppIdentifier) {
        super(myAppIdentifier, AllowedOriginUrls);
    }

    async Init() {
        await super.InitAsync();
    }

    public SendFullScreenRequest(useFullScreen: boolean) {
        const message = new RequestFullScreenMessage(useFullScreen);

        this.PostMessageToParent(
            AppIdentifier.MainWebsite,
            AppIdentifier.TrabyterStaking,
            MessageType.FullScreenRequest,
            message,
            false,
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
