import { Entry, IEntry, ISys } from "../base";

export interface IFormFields {
  formFields: any;
}

/**
 * Form
 */
export interface IForm extends IEntry<IFormFields> {
}

export function isForm(entry: IEntry<any>): entry is IForm {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'form'
}

export class Form extends Entry<IFormFields> implements IForm {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IFormFields;

  get formFields(): any {
    return this.fields.formFields
  }

  get form_fields(): any {
    return this.fields.formFields
  }

  constructor(entry: IForm);
  constructor(id: string, fields: IFormFields);
  constructor(entryOrId: IForm | string, fields?: IFormFields) {
    super(entryOrId, 'form', fields)
  }
}
