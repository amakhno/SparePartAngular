import { Serializable } from './serializable';

export class MarkEditViewModel implements Serializable<MarkEditViewModel> {
    id: number;
    name: string;
    imageId: number;

    deserialize(input: apidata): MarkEditViewModel {
        this.id = input.id;
        this.imageId = input.imageId;
        this.name = input.name;
        /*this.name = new Member().deserialize(input.name);
        this.secondMember = new Member().deserialize(input.secondMember);*/

        return this;
    }
}

// tslint:disable-next-line:class-name
interface apidata {
    id: number;
    name: string;
    imageId: number;
}
