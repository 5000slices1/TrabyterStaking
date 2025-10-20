import crypto from 'crypto';

import {CryptoUtils} from '../../crypto/cryptoutils';
import {MessageType} from './messagetype';

export class MessageRawData {
    public MessageId: string;
    public Type: MessageType;
    public data: string;
    public Sender: string = '';
    public EncryptedKey?: string;
    public Iv?: string;
    public IsDataEncrypted: boolean = false;

    constructor(type: MessageType, data: string, messageId: string | null = null, senderId?: string) {
        if (senderId != null) {
            this.Sender = senderId;
        }
        if (messageId !== null) {
            const uniqueIdentifier = crypto.randomUUID();
            this.MessageId = uniqueIdentifier;
        } else {
            this.MessageId = messageId ? messageId : '';
        }

        this.Type = type;
        this.data = data;
    }

    public async GetInternalDataStringAsync(): Promise<string> {
        if (this.IsDataEncrypted == false) {
            return this.data;
        } else {
            var tempJson: string = await CryptoUtils.DecryptStringAsync(
                this.EncryptedKey ? this.EncryptedKey : '',
                this.Iv ? this.Iv : '',
                this.data,
            );
            return tempJson;
        }
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public static fromString(jsonString: string): MessageRawData {
        try {
            const result: MessageRawData = JSON.parse(jsonString);
            return result;
        } catch (e) {
            console.error('Error parsing MessageData from string:', e);
            return new MessageRawData(MessageType.Unknown, '', '');
        }
    }
}
