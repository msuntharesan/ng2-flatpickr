import * as tslib_1 from "tslib";
var Ng2FlatpickrComponent_1;
import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
if (typeof window !== 'undefined') {
    require('flatpickr');
}
let Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = class Ng2FlatpickrComponent {
    constructor() {
        this._tabindex = 0;
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: (selectedDates) => { this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.addClass = "";
        this.hideButton = false;
        this.propagateChange = (_) => { };
    }
    get tabindex() { return this._tabindex; }
    set tabindex(ti) { this._tabindex = Number(ti); }
    ///////////////////////////////////
    writeValue(value) {
        this.propagateChange(value);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    ///////////////////////////////////
    setDateFromInput(date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    }
    setAltInputPlaceholder(placeholder) {
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    }
    ngAfterViewInit() {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    }
    ngOnChanges(changes) {
        if (this.flatpickrElement.nativeElement
            && this.flatpickrElement.nativeElement._flatpickr) {
            if (changes.hasOwnProperty('setDate')
                && changes['setDate'].currentValue) {
                this.setDateFromInput(changes['setDate'].currentValue);
            }
            if (this.config.altInput
                && changes.hasOwnProperty('placeholder')
                && changes['placeholder'].currentValue) {
                this.setAltInputPlaceholder(changes['placeholder'].currentValue);
            }
        }
    }
};
tslib_1.__decorate([
    ViewChild('flatpickr', {
        static: true
    }),
    tslib_1.__metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "flatpickrElement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "config", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], Ng2FlatpickrComponent.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], Ng2FlatpickrComponent.prototype, "addClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "setDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [Number])
], Ng2FlatpickrComponent.prototype, "tabindex", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], Ng2FlatpickrComponent.prototype, "hideButton", void 0);
Ng2FlatpickrComponent = Ng2FlatpickrComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'ng2-flatpickr',
        template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input *ngIf="!hideButton" class="ng2-flatpickr-input {{ addClass }}" [placeholder]="placeholder" [tabindex]="tabindex" type="text" data-input>
			<ng-content></ng-content>
		</div>
		`,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => Ng2FlatpickrComponent_1),
                multi: true
            }
        ]
    })
], Ng2FlatpickrComponent);
export { Ng2FlatpickrComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQWlCLFVBQVUsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt6RSxJQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBQztJQUM3QixPQUFPLENBQUUsV0FBVyxDQUFFLENBQUM7Q0FDMUI7QUFrQkQsSUFBYSxxQkFBcUIsNkJBQWxDLE1BQWEscUJBQXFCO0lBaEJsQztRQW1CVSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWYsNEJBQXVCLEdBQXFCO1lBQ25ELElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLElBQUk7WUFDaEIsUUFBUSxFQUFFLENBQUUsYUFBa0IsRUFBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxhQUFhLENBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekUsQ0FBQztRQVdGLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFVdEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWNuQixvQkFBZSxHQUFHLENBQUUsQ0FBTSxFQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFzQ3BDLENBQUM7SUF4REMsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLFFBQVEsQ0FBRSxFQUFVLElBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDO0lBSzlELG1DQUFtQztJQUVuQyxVQUFVLENBQUUsS0FBUztRQUNwQixJQUFJLENBQUMsZUFBZSxDQUFFLEtBQUssQ0FBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQkFBZ0IsQ0FBRSxFQUFPO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQkFBaUIsS0FBSSxDQUFDO0lBSXRCLG1DQUFtQztJQUVuQyxnQkFBZ0IsQ0FBRSxJQUFTO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBRSxJQUFJLEVBQUUsSUFBSSxDQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVELHNCQUFzQixDQUFFLFdBQW1CO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBRSxDQUFDO0lBQ3BHLENBQUM7SUFFRCxlQUFlO1FBQ2QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFHO1lBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztTQUMzRDtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFFLENBQUM7UUFDL0YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFHO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFFLENBQUM7U0FDdEM7SUFDRixDQUFDO0lBRUQsV0FBVyxDQUFFLE9BQXNCO1FBQ2xDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWE7ZUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUc7WUFFbkQsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFFLFNBQVMsQ0FBRTttQkFDbkMsT0FBTyxDQUFFLFNBQVMsQ0FBRSxDQUFDLFlBQVksRUFBRztnQkFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFFLE9BQU8sQ0FBRSxTQUFTLENBQUUsQ0FBQyxZQUFZLENBQUUsQ0FBQzthQUMzRDtZQUVGLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO21CQUNwQixPQUFPLENBQUMsY0FBYyxDQUFFLGFBQWEsQ0FBRTttQkFDdkMsT0FBTyxDQUFFLGFBQWEsQ0FBRSxDQUFDLFlBQVksRUFBRztnQkFDMUMsSUFBSSxDQUFDLHNCQUFzQixDQUFFLE9BQU8sQ0FBRSxhQUFhLENBQUUsQ0FBQyxZQUFZLENBQUUsQ0FBQzthQUNyRTtTQUNGO0lBQ0gsQ0FBQztDQUNELENBQUE7QUF2RUE7SUFIQyxTQUFTLENBQUMsV0FBVyxFQUFFO1FBQ3ZCLE1BQU0sRUFBRSxJQUFJO0tBQ1osQ0FBQzs7K0RBQ29CO0FBR3RCO0lBREMsS0FBSyxFQUFFOztxREFDaUI7QUFHekI7SUFEQyxLQUFLLEVBQUU7OzBEQUNpQjtBQUd6QjtJQURFLEtBQUssRUFBRTs7dURBQ2E7QUFHdEI7SUFEQyxLQUFLLEVBQUU7O3NEQUNlO0FBR3RCO0lBREMsS0FBSyxFQUFFOzs7cURBQ2lDO0FBSTFDO0lBREMsS0FBSyxFQUFFOzt5REFDVztBQWpDUCxxQkFBcUI7SUFoQmpDLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7Ozs7R0FLUjtRQUNGLFNBQVMsRUFBRTtZQUNWO2dCQUNDLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUUsR0FBRyxFQUFFLENBQUMsdUJBQXFCLENBQUU7Z0JBQ3RELEtBQUssRUFBRSxJQUFJO2FBQ1g7U0FDRDtLQUNELENBQUM7R0FDVyxxQkFBcUIsQ0FxRmpDO1NBckZZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGbGF0cGlja3JPcHRpb25zIH0gZnJvbSAnLi9mbGF0cGlja3Itb3B0aW9ucy5pbnRlcmZhY2UnO1xuXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XG5cbmlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKXtcbiAgICByZXF1aXJlKCAnZmxhdHBpY2tyJyApO1xufVxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZzItZmxhdHBpY2tyJyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2IGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dC1jb250YWluZXJcIiAjZmxhdHBpY2tyPlxuXHRcdFx0PGlucHV0ICpuZ0lmPVwiIWhpZGVCdXR0b25cIiBjbGFzcz1cIm5nMi1mbGF0cGlja3ItaW5wdXQge3sgYWRkQ2xhc3MgfX1cIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBbdGFiaW5kZXhdPVwidGFiaW5kZXhcIiB0eXBlPVwidGV4dFwiIGRhdGEtaW5wdXQ+XG5cdFx0XHQ8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cdFx0PC9kaXY+XG5cdFx0YCxcblx0cHJvdmlkZXJzOiBbXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZiggKCkgPT4gTmcyRmxhdHBpY2tyQ29tcG9uZW50ICksXG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH1cblx0XVxufSlcbmV4cG9ydCBjbGFzcyBOZzJGbGF0cGlja3JDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcblxuICBwdWJsaWMgZmxhdHBpY2tyOiBPYmplY3Q7XG4gIHByaXZhdGUgX3RhYmluZGV4ID0gMDtcblxuXHRwcml2YXRlIGRlZmF1bHRGbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdHdyYXA6IHRydWUsXG5cdFx0Y2xpY2tPcGVuczogdHJ1ZSxcblx0XHRvbkNoYW5nZTogKCBzZWxlY3RlZERhdGVzOiBhbnkgKSA9PiB7IHRoaXMud3JpdGVWYWx1ZSggc2VsZWN0ZWREYXRlcyApOyB9XG5cdH07XG5cblx0QFZpZXdDaGlsZCgnZmxhdHBpY2tyJywge1xuXHRcdHN0YXRpYzogdHJ1ZVxuXHR9KVxuXHRmbGF0cGlja3JFbGVtZW50OiBhbnk7XG5cblx0QElucHV0KClcblx0Y29uZmlnOiBGbGF0cGlja3JPcHRpb25zO1xuXG5cdEBJbnB1dCgpXG5cdHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuXG4gIEBJbnB1dCgpXG5cdGFkZENsYXNzOiBzdHJpbmcgPSBcIlwiO1xuXG5cdEBJbnB1dCgpXG5cdHNldERhdGU6IHN0cmluZyB8IERhdGU7XG5cbiAgQElucHV0KClcbiAgZ2V0IHRhYmluZGV4KCkgeyByZXR1cm4gdGhpcy5fdGFiaW5kZXg7IH1cbiAgc2V0IHRhYmluZGV4KCB0aTogbnVtYmVyICkgeyB0aGlzLl90YWJpbmRleCA9IE51bWJlciggdGkgKTsgfVxuXG5cdEBJbnB1dCgpXG5cdGhpZGVCdXR0b24gPSBmYWxzZTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdHdyaXRlVmFsdWUoIHZhbHVlOmFueSApIHtcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSggdmFsdWUgKTtcblx0fVxuXG5cdHJlZ2lzdGVyT25DaGFuZ2UoIGZuOiBhbnkgKSB7XG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcblx0fVxuXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKCkge31cblxuXHRwcm9wYWdhdGVDaGFuZ2UgPSAoIF86IGFueSApID0+IHt9O1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0c2V0RGF0ZUZyb21JbnB1dCggZGF0ZTogYW55ICkge1xuXHRcdHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3Iuc2V0RGF0ZSggZGF0ZSwgdHJ1ZSApO1xuXHR9XG5cblx0c2V0QWx0SW5wdXRQbGFjZWhvbGRlciggcGxhY2Vob2xkZXI6IHN0cmluZyApIHtcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIgKTtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRpZiggdGhpcy5jb25maWcgKSB7XG5cdFx0XHRPYmplY3QuYXNzaWduKCB0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zLCB0aGlzLmNvbmZpZyApO1xuXHRcdH1cblx0XHR0aGlzLmZsYXRwaWNrciA9IHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50LmZsYXRwaWNrciggdGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucyApO1xuXHRcdGlmKCB0aGlzLnNldERhdGUgKSB7XG5cdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoIHRoaXMuc2V0RGF0ZSApO1xuXHRcdH1cblx0fVxuXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xuXHRcdGlmKCB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudCBcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IgKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiggY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3NldERhdGUnICkgXG5cdFx0XHRcdFx0JiYgY2hhbmdlc1sgJ3NldERhdGUnIF0uY3VycmVudFZhbHVlICkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZXREYXRlRnJvbUlucHV0KCBjaGFuZ2VzWyAnc2V0RGF0ZScgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoIHRoaXMuY29uZmlnLmFsdElucHV0XG5cdFx0XHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApIFxuXHRcdFx0XHRcdCYmIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldEFsdElucHV0UGxhY2Vob2xkZXIoIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdH1cbn1cbiJdfQ==