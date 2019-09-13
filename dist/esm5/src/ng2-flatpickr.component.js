import * as tslib_1 from "tslib";
import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
if (typeof window !== 'undefined') {
    require('flatpickr');
}
var Ng2FlatpickrComponent = /** @class */ (function () {
    function Ng2FlatpickrComponent() {
        var _this = this;
        this._tabindex = 0;
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: function (selectedDates) { _this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.addClass = "";
        this.hideButton = false;
        this.propagateChange = function (_) { };
    }
    Ng2FlatpickrComponent_1 = Ng2FlatpickrComponent;
    Object.defineProperty(Ng2FlatpickrComponent.prototype, "tabindex", {
        get: function () { return this._tabindex; },
        set: function (ti) { this._tabindex = Number(ti); },
        enumerable: true,
        configurable: true
    });
    ///////////////////////////////////
    Ng2FlatpickrComponent.prototype.writeValue = function (value) {
        this.propagateChange(value);
    };
    Ng2FlatpickrComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    Ng2FlatpickrComponent.prototype.registerOnTouched = function () { };
    ///////////////////////////////////
    Ng2FlatpickrComponent.prototype.setDateFromInput = function (date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    };
    Ng2FlatpickrComponent.prototype.setAltInputPlaceholder = function (placeholder) {
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    };
    Ng2FlatpickrComponent.prototype.ngAfterViewInit = function () {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    };
    Ng2FlatpickrComponent.prototype.ngOnChanges = function (changes) {
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
    };
    var Ng2FlatpickrComponent_1;
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
            template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return Ng2FlatpickrComponent_1; }),
                    multi: true
                }
            ]
        })
    ], Ng2FlatpickrComponent);
    return Ng2FlatpickrComponent;
}());
export { Ng2FlatpickrComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS3pFLElBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0lBQzdCLE9BQU8sQ0FBRSxXQUFXLENBQUUsQ0FBQztDQUMxQjtBQWtCRDtJQWhCQTtRQUFBLGlCQXFHQztRQWxGUyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWYsNEJBQXVCLEdBQXFCO1lBQ25ELElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLElBQUk7WUFDaEIsUUFBUSxFQUFFLFVBQUUsYUFBa0IsSUFBUSxLQUFJLENBQUMsVUFBVSxDQUFFLGFBQWEsQ0FBRSxDQUFDLENBQUMsQ0FBQztTQUN6RSxDQUFDO1FBV0YsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFHekIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQVV0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBY25CLG9CQUFlLEdBQUcsVUFBRSxDQUFNLElBQU8sQ0FBQyxDQUFDO0lBc0NwQyxDQUFDOzhCQXJGWSxxQkFBcUI7SUE2QmhDLHNCQUFJLDJDQUFRO2FBQVosY0FBaUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUN6QyxVQUFjLEVBQVUsSUFBSyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBRSxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUM7OztPQURwQjtJQU0xQyxtQ0FBbUM7SUFFbkMsMENBQVUsR0FBVixVQUFZLEtBQVM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBRSxLQUFLLENBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCLFVBQWtCLEVBQU87UUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGlEQUFpQixHQUFqQixjQUFxQixDQUFDO0lBSXRCLG1DQUFtQztJQUVuQyxnREFBZ0IsR0FBaEIsVUFBa0IsSUFBUztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUUsSUFBSSxFQUFFLElBQUksQ0FBRSxDQUFDO0lBQ3RFLENBQUM7SUFFRCxzREFBc0IsR0FBdEIsVUFBd0IsV0FBbUI7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBRSxhQUFhLEVBQUUsV0FBVyxDQUFFLENBQUM7SUFDcEcsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFDQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUc7WUFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDO1NBQzNEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsdUJBQXVCLENBQUUsQ0FBQztRQUMvRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUc7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQztTQUN0QztJQUNGLENBQUM7SUFFRCwyQ0FBVyxHQUFYLFVBQWEsT0FBc0I7UUFDbEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYTtlQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRztZQUVuRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUUsU0FBUyxDQUFFO21CQUNuQyxPQUFPLENBQUUsU0FBUyxDQUFFLENBQUMsWUFBWSxFQUFHO2dCQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsT0FBTyxDQUFFLFNBQVMsQ0FBRSxDQUFDLFlBQVksQ0FBRSxDQUFDO2FBQzNEO1lBRUYsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7bUJBQ3BCLE9BQU8sQ0FBQyxjQUFjLENBQUUsYUFBYSxDQUFFO21CQUN2QyxPQUFPLENBQUUsYUFBYSxDQUFFLENBQUMsWUFBWSxFQUFHO2dCQUMxQyxJQUFJLENBQUMsc0JBQXNCLENBQUUsT0FBTyxDQUFFLGFBQWEsQ0FBRSxDQUFDLFlBQVksQ0FBRSxDQUFDO2FBQ3JFO1NBQ0Y7SUFDSCxDQUFDOztJQXRFRDtRQUhDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDdkIsTUFBTSxFQUFFLElBQUk7U0FDWixDQUFDOzttRUFDb0I7SUFHdEI7UUFEQyxLQUFLLEVBQUU7O3lEQUNpQjtJQUd6QjtRQURDLEtBQUssRUFBRTs7OERBQ2lCO0lBR3pCO1FBREUsS0FBSyxFQUFFOzsyREFDYTtJQUd0QjtRQURDLEtBQUssRUFBRTs7MERBQ2U7SUFHdEI7UUFEQyxLQUFLLEVBQUU7Ozt5REFDaUM7SUFJMUM7UUFEQyxLQUFLLEVBQUU7OzZEQUNXO0lBakNQLHFCQUFxQjtRQWhCakMsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLG9SQUtSO1lBQ0YsU0FBUyxFQUFFO2dCQUNWO29CQUNDLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUUsY0FBTSxPQUFBLHVCQUFxQixFQUFyQixDQUFxQixDQUFFO29CQUN0RCxLQUFLLEVBQUUsSUFBSTtpQkFDWDthQUNEO1NBQ0QsQ0FBQztPQUNXLHFCQUFxQixDQXFGakM7SUFBRCw0QkFBQztDQUFBLEFBckZELElBcUZDO1NBckZZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGbGF0cGlja3JPcHRpb25zIH0gZnJvbSAnLi9mbGF0cGlja3Itb3B0aW9ucy5pbnRlcmZhY2UnO1xuXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XG5cbmlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKXtcbiAgICByZXF1aXJlKCAnZmxhdHBpY2tyJyApO1xufVxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZzItZmxhdHBpY2tyJyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2IGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dC1jb250YWluZXJcIiAjZmxhdHBpY2tyPlxuXHRcdFx0PGlucHV0ICpuZ0lmPVwiIWhpZGVCdXR0b25cIiBjbGFzcz1cIm5nMi1mbGF0cGlja3ItaW5wdXQge3sgYWRkQ2xhc3MgfX1cIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBbdGFiaW5kZXhdPVwidGFiaW5kZXhcIiB0eXBlPVwidGV4dFwiIGRhdGEtaW5wdXQ+XG5cdFx0XHQ8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cdFx0PC9kaXY+XG5cdFx0YCxcblx0cHJvdmlkZXJzOiBbXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZiggKCkgPT4gTmcyRmxhdHBpY2tyQ29tcG9uZW50ICksXG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH1cblx0XVxufSlcbmV4cG9ydCBjbGFzcyBOZzJGbGF0cGlja3JDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcblxuICBwdWJsaWMgZmxhdHBpY2tyOiBPYmplY3Q7XG4gIHByaXZhdGUgX3RhYmluZGV4ID0gMDtcblxuXHRwcml2YXRlIGRlZmF1bHRGbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdHdyYXA6IHRydWUsXG5cdFx0Y2xpY2tPcGVuczogdHJ1ZSxcblx0XHRvbkNoYW5nZTogKCBzZWxlY3RlZERhdGVzOiBhbnkgKSA9PiB7IHRoaXMud3JpdGVWYWx1ZSggc2VsZWN0ZWREYXRlcyApOyB9XG5cdH07XG5cblx0QFZpZXdDaGlsZCgnZmxhdHBpY2tyJywge1xuXHRcdHN0YXRpYzogdHJ1ZVxuXHR9KVxuXHRmbGF0cGlja3JFbGVtZW50OiBhbnk7XG5cblx0QElucHV0KClcblx0Y29uZmlnOiBGbGF0cGlja3JPcHRpb25zO1xuXG5cdEBJbnB1dCgpXG5cdHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuXG4gIEBJbnB1dCgpXG5cdGFkZENsYXNzOiBzdHJpbmcgPSBcIlwiO1xuXG5cdEBJbnB1dCgpXG5cdHNldERhdGU6IHN0cmluZyB8IERhdGU7XG5cbiAgQElucHV0KClcbiAgZ2V0IHRhYmluZGV4KCkgeyByZXR1cm4gdGhpcy5fdGFiaW5kZXg7IH1cbiAgc2V0IHRhYmluZGV4KCB0aTogbnVtYmVyICkgeyB0aGlzLl90YWJpbmRleCA9IE51bWJlciggdGkgKTsgfVxuXG5cdEBJbnB1dCgpXG5cdGhpZGVCdXR0b24gPSBmYWxzZTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdHdyaXRlVmFsdWUoIHZhbHVlOmFueSApIHtcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSggdmFsdWUgKTtcblx0fVxuXG5cdHJlZ2lzdGVyT25DaGFuZ2UoIGZuOiBhbnkgKSB7XG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcblx0fVxuXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKCkge31cblxuXHRwcm9wYWdhdGVDaGFuZ2UgPSAoIF86IGFueSApID0+IHt9O1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0c2V0RGF0ZUZyb21JbnB1dCggZGF0ZTogYW55ICkge1xuXHRcdHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3Iuc2V0RGF0ZSggZGF0ZSwgdHJ1ZSApO1xuXHR9XG5cblx0c2V0QWx0SW5wdXRQbGFjZWhvbGRlciggcGxhY2Vob2xkZXI6IHN0cmluZyApIHtcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIgKTtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRpZiggdGhpcy5jb25maWcgKSB7XG5cdFx0XHRPYmplY3QuYXNzaWduKCB0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zLCB0aGlzLmNvbmZpZyApO1xuXHRcdH1cblx0XHR0aGlzLmZsYXRwaWNrciA9IHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50LmZsYXRwaWNrciggdGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucyApO1xuXHRcdGlmKCB0aGlzLnNldERhdGUgKSB7XG5cdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoIHRoaXMuc2V0RGF0ZSApO1xuXHRcdH1cblx0fVxuXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xuXHRcdGlmKCB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudCBcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IgKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiggY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3NldERhdGUnICkgXG5cdFx0XHRcdFx0JiYgY2hhbmdlc1sgJ3NldERhdGUnIF0uY3VycmVudFZhbHVlICkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZXREYXRlRnJvbUlucHV0KCBjaGFuZ2VzWyAnc2V0RGF0ZScgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoIHRoaXMuY29uZmlnLmFsdElucHV0XG5cdFx0XHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApIFxuXHRcdFx0XHRcdCYmIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldEFsdElucHV0UGxhY2Vob2xkZXIoIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdH1cbn1cbiJdfQ==