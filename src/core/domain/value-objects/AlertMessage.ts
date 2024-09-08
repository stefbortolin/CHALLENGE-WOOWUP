export class AlertMessage {
    private readonly message: string;

    private constructor(message: string) {
        if (message.length === 0) {
            throw new Error('Message cannot be empty.');
        }
        this.message = message;
    }

    public static create(message: string): AlertMessage {
        return new AlertMessage(message);
    }

    public getMessage(): string {
        return this.message;
    }
}
