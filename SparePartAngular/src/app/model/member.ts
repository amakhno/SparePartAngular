import { Serializable } from "./serializable";

export class Member implements Serializable<Member> {
    id: number;

    deserialize(input) {
        this.id = input.id;
        return this;
    }
}