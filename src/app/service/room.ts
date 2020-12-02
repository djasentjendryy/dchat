import { Message } from './message';

export class Room {
    participant: string[];
    messages: Message[];

    constructor(participant: string[], message: Message[]){}
}