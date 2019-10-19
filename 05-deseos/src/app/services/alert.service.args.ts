export class AlertArgs {
    header: string;
    inputName: string;
    value: string;
    btnOkText: string;
    handler: (data: any) => void;
}
