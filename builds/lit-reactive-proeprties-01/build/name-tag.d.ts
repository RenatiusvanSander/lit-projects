import { LitElement } from "lit";
declare class NameTag extends LitElement {
    name?: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'name-tag': NameTag;
    }
}
export {};
//# sourceMappingURL=name-tag.d.ts.map