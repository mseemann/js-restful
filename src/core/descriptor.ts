
export class RestDescriptor {

    basePath: string | void;
    methods: MethodDescriptor[];

    addMethod(methodDescriptor:MethodDescriptor){
        this.methods.push(methodDescriptor);
    }
}

export class MethodDescriptor {

}