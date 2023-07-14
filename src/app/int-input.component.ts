//this is an exeriment but it does not work XD
export class MyControl extends HTMLElement {
    #internals = this.attachInternals() as any;
    #input!: HTMLInputElement | null;
  
    static formAssociated = true;
  
    static observedAttributes = ['disabled', 'placeholder'];
  
    get form() { return this.#internals.form; }
    get name() { return this.getAttribute('name')};
    get type() { return this.localName; }
    get value() { return this.#input.value }
    set value(v : string) { this.#input.value = v }
    get validity() { return this.#internals.validity }
    get validationMessage() { return this.#internals.validationMessage; }
    get willValidate() { return this.#internals.willValidate; }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open', delegatesFocus: true });
      this.shadowRoot!.innerHTML = `
        <vaadin-integer-field
          (value-changed)="onValueChanged($event)"
          formControlName="age"
          [required]="true"
          [value]="myForm.controls['age'].value"
          [attr.step-buttons-visible]="true"
          label="Age"
          helper-text="Max 10 items"
          min="0"
          max="10"
          ngDefaultControl
        ></vaadin-integer-field>
    `;

      this.#input = this.shadowRoot.querySelector('vaadin-integer-field');
      this.#input!.addEventListener('vaadin-integer-field', () => this.#internals.setFormValue(this.value));
    }
  
    checkValidity() { return this.#internals.checkValidity(); }
  
    reportValidity() { return this.#internals.reportValidity(); }
  
    attributeChangedCallback(name: string, _oldValue: unknown, newValue: unknown) { this.#input[name] = newValue; }
  }
  
  customElements.define('my-control', MyControl);