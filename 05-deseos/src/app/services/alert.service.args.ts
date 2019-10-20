export class AlertArgs {
    headerTitle: string;
    inputName: string;
    inputValue: string;
    inputPlaceholder: string;
    btnOkText: string;
    btnOkHandler: (data: any) => void;
    btnCancelHandler: (data: any) => void;
}
