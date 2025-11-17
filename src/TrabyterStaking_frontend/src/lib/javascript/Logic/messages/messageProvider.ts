import { ModelUsersIdentity } from '$lib/javascript/Abstractions/Identity/ModelUsersIdentity';
import { ResponsePublicKeyMessage } from '$lib/shared/common/abstractions/messages/fromAny/responsePublicKeyMessage';
import { RequestFullScreenMessage } from '$lib/shared/common/abstractions/messages/FromEmbeddedApp/requestFullScreenMessage';
import { MessageCommon } from '$lib/shared/common/abstractions/messages/messageCommon.js';
import { MessageRawData } from '$lib/shared/common/abstractions/messages/messageRawData';
//import {browser} from '$app/environment';
import { MessageType } from '$lib/shared/common/abstractions/messages/messagetype';
import { AppIdentifier } from '$lib/shared/common/abstractions/types/commonTypes';
import { CryptoUtils } from '$lib/shared/common/crypto/cryptoutils';
import { CommonMessageProvider } from '$lib/shared/common/logic/commonMessageProvider';
import
    {
        AllowedOriginUrls,
        AppIdentifierToUrl,
    } from '$lib/shared/common/security/trustedAppRegistry.js';

import { MainClass } from '../MainClass';

import type { IMessageProvider } from '$lib/shared/common/logic/commonMessageProvider';
import type { ResponseWalletStatusMessage } from '$lib/shared/common/abstractions/messages/fromAny/ResponseWalletStatusMessage';
export class MessageProvider extends CommonMessageProvider implements IMessageProvider
{
    constructor(myAppIdentifier: AppIdentifier)
    {
        super(myAppIdentifier, AllowedOriginUrls, AppIdentifierToUrl);
    }

    async Init()
    {
        await super.InitAsync();
    }

    public async SendFullScreenRequest(useFullScreen: boolean)
    {
        const message = new RequestFullScreenMessage(useFullScreen);

        // Ensure we have keys before sending encrypted message
        if (!this.hasKeysFor(AppIdentifier.MainWebsite))
        {
            console.warn('Keys not available for MainWebsite. Requesting keys...');
            await this.SendPublicKeyRequest(AppIdentifier.MainWebsite);

            // Wait for key exchange
            const success = await this.waitForKeyExchange(AppIdentifier.MainWebsite, 5000);
            if (!success)
            {
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
        messageId: string | null
    ): Promise<void>
    {
        try
        {
            console.log('sourceIdentifier:', sourceIdentifier);
            console.log('targetIdentifier:', targetIdentifier);
            console.log('messageId:', messageId);

            if (targetIdentifier !== this.MyAppIdentifier)
            {
                return;
            }

            console.log('MessageType:', messageType);
            console.log('MessageData as json string:');
            console.log(messageDataAsJsonString);

            if (messageType === MessageType.ResponseWalletStatus)
            {
                const walletStatusMessage: ResponseWalletStatusMessage =
                    MessageCommon.fromString<ResponseWalletStatusMessage>(messageDataAsJsonString)!;

                // Handle ResponseWalletStatus message
                console.log('Handling ResponseWalletStatus message');
                MainClass.update((instance) =>
                {
                    // Update properties
                    instance.UsersIdentity.IsConnected = walletStatusMessage.IsConnected;
                    instance.UsersIdentity.AccountPrincipalText = walletStatusMessage.PrincipalText;
                    instance.UsersIdentity.Name = walletStatusMessage.WalletName;
                    instance.UsersIdentity.AccountId = walletStatusMessage.AccountId;

                    // Return the same instance - Svelte will detect the change because update() was called
                    return instance;
                });
                return;

            }
        } catch (e)
        {
            console.error('Error processing received message:', e);
        }
    }
}
