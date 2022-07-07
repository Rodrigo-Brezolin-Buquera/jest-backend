
export class HashManagerMock {

    public async hash(text: string): Promise<string> {
        
        return "HASH";
    }

    public async compare(text: string, hash: string): Promise<boolean>{
        return true
    }

}