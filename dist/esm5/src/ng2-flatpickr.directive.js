import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
var Ng2FlatpickrDirective = /** @class */ (function () {
    function Ng2FlatpickrDirective(parent, ngControl, element, renderer) {
        this.parent = parent;
        this.ngControl = ngControl;
        this.element = element;
        this.renderer = renderer;
        /**
         * onChange gets triggered when the user selects a date, or changes the time on a selected date.
         *
         * Default:  null
         */
        this.flatpickrOnChange = new EventEmitter();
        /**
         * onClose gets triggered when the calendar is closed.
         *
         * Default:  null
         */
        this.flatpickrOnClose = new EventEmitter();
        /**
         * onOpen gets triggered when the calendar is opened.
         *
         * Default:  null
         */
        this.flatpickrOnOpen = new EventEmitter();
        /**
         * onReady gets triggered once the calendar is in a ready state.
         *
         * Default:  null
         */
        this.flatpickrOnReady = new EventEmitter();
    }
    /** Allow double-clicking on the control to open/close it. */
    Ng2FlatpickrDirective.prototype.onClick = function () {
        this.flatpickr.toggle();
    };
    Object.defineProperty(Ng2FlatpickrDirective.prototype, "control", {
        get: function () {
            return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
        },
        enumerable: true,
        configurable: true
    });
    Ng2FlatpickrDirective.prototype.ngAfterViewInit = function () {
        /** We cannot initialize the flatpickr instance in ngOnInit(); it will
            randomize the date when the form control initializes. */
        var nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions.wrap) {
            this.renderer.setElementAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    };
    Ng2FlatpickrDirective.prototype.ngOnChanges = function (changes) {
        if (this.flatpickr
            && this.flatpickrAltInput
            && changes.hasOwnProperty('placeholder')
            && changes['placeholder'].currentValue) {
            this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
        }
    };
    Ng2FlatpickrDirective.prototype.ngOnDestroy = function () {
        if (this.flatpickr) {
            this.flatpickr.destroy();
        }
        if (this.formControlListener) {
            this.formControlListener.unsubscribe();
            this.formControlListener = undefined;
        }
        this.flatpickrOnChange = undefined;
        this.flatpickrOnClose = undefined;
        this.flatpickrOnOpen = undefined;
        this.flatpickrOnReady = undefined;
    };
    Ng2FlatpickrDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.globalOnChange = this.flatpickrOptions.onChange;
        this.globalOnClose = this.flatpickrOptions.onClose;
        this.globalOnOpen = this.flatpickrOptions.onOpen;
        this.globalOnReady = this.flatpickrOptions.onReady;
        this.flatpickrOptions = {
            altFormat: this.getOption('altFormat'),
            altInput: this.getOption('altInput'),
            altInputClass: this.getOption('altInputClass'),
            allowInput: this.getOption('allowInput'),
            appendTo: this.getOption('appendTo'),
            clickOpens: this.getOption('clickOpens', true),
            dateFormat: this.getOption('dateFormat'),
            defaultDate: this.getOption('defaultDate'),
            disable: this.getOption('disable'),
            disableMobile: this.getOption('disableMobile'),
            enable: this.getOption('enable'),
            enableTime: this.getOption('enableTime'),
            enableSeconds: this.getOption('enableSeconds'),
            hourIncrement: this.getOption('hourIncrement'),
            inline: this.getOption('inline'),
            locale: this.getOption('locale'),
            maxDate: this.getOption('maxDate'),
            minDate: this.getOption('minDate'),
            minuteIncrement: this.getOption('minuteIncrement'),
            mode: this.getOption('mode'),
            nextArrow: this.getOption('nextArrow'),
            noCalendar: this.getOption('noCalendar'),
            onChange: this.eventOnChange.bind(this),
            onClose: this.eventOnClose.bind(this),
            onOpen: this.eventOnOpen.bind(this),
            onReady: this.eventOnReady.bind(this),
            parseDate: this.getOption('parseDate'),
            prevArrow: this.getOption('prevArrow'),
            shorthandCurrentMonth: this.getOption('shorthandCurrentMonth'),
            static: this.getOption('static'),
            time_24hr: this.getOption('time_24hr'),
            utc: this.getOption('utc'),
            weekNumbers: this.getOption('weekNumbers'),
            wrap: this.getOption('wrap', true),
        };
        // Remove unset properties
        Object.keys(this.flatpickrOptions).forEach(function (key) {
            (_this.flatpickrOptions[key] === undefined) &&
                delete _this.flatpickrOptions[key];
        });
        if (this.control) {
            this.formControlListener = this.control.valueChanges
                .subscribe(function (value) {
                if (!(value instanceof Date)) {
                    // Quietly update the value of the form control to be a
                    // Date object. This avoids any external subscribers
                    // from being notified a second time (once for the user
                    // initiated event, and once for our conversion to
                    // Date()).
                    _this.control.setValue(new Date('' + value), {
                        onlySelf: true,
                        emitEvent: false,
                        emitModelToViewChange: false,
                        emitViewToModelChange: false
                    });
                }
            });
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnChange = function (selectedDates, dateStr, instance) {
        var event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnChange) {
            this.flatpickrOnChange.emit(event);
        }
        if (this.globalOnChange) {
            this.globalOnChange(event);
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnClose = function (selectedDates, dateStr, instance) {
        var event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnClose) {
            this.flatpickrOnClose.emit(event);
        }
        if (this.globalOnClose) {
            this.globalOnClose(event);
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnOpen = function (selectedDates, dateStr, instance) {
        var event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnOpen) {
            this.flatpickrOnOpen.emit(event);
        }
        if (this.globalOnOpen) {
            this.globalOnOpen(event);
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnReady = function (selectedDates, dateStr, instance) {
        var event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnReady) {
            this.flatpickrOnReady.emit(event);
        }
        if (this.globalOnReady) {
            this.globalOnReady(event);
        }
    };
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    Ng2FlatpickrDirective.prototype.getOption = function (option, defaultValue) {
        var localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
            + option.substring(1);
        if (typeof this[localName] !== 'undefined') {
            return this[localName];
        }
        else if (typeof this.flatpickrOptions[option] !== 'undefined') {
            return this.flatpickrOptions[option];
        }
        else {
            return defaultValue;
        }
    };
    tslib_1.__decorate([
        Input('flatpickr'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOptions", void 0);
    tslib_1.__decorate([
        Input('placeholder'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input('altFormat'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltFormat", void 0);
    tslib_1.__decorate([
        Input('altInput'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltInput", void 0);
    tslib_1.__decorate([
        Input('altInputClass'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAltInputClass", void 0);
    tslib_1.__decorate([
        Input('allowInput'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAllowInput", void 0);
    tslib_1.__decorate([
        Input('appendTo'),
        tslib_1.__metadata("design:type", HTMLElement)
    ], Ng2FlatpickrDirective.prototype, "flatpickrAppendTo", void 0);
    tslib_1.__decorate([
        Input('clickOpens'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrClickOpens", void 0);
    tslib_1.__decorate([
        Input('dateFormat'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDateFormat", void 0);
    tslib_1.__decorate([
        Input('defaultDate'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDefaultDate", void 0);
    tslib_1.__decorate([
        Input('disable'),
        tslib_1.__metadata("design:type", Array)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDisable", void 0);
    tslib_1.__decorate([
        Input('disableMobile'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrDisableMobile", void 0);
    tslib_1.__decorate([
        Input('enable'),
        tslib_1.__metadata("design:type", Array)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnable", void 0);
    tslib_1.__decorate([
        Input('enableTime'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnableTime", void 0);
    tslib_1.__decorate([
        Input('enableSeconds'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrEnableSeconds", void 0);
    tslib_1.__decorate([
        Input('hourIncrement'),
        tslib_1.__metadata("design:type", Number)
    ], Ng2FlatpickrDirective.prototype, "flatpickrHourIncrement", void 0);
    tslib_1.__decorate([
        Input('inline'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrInline", void 0);
    tslib_1.__decorate([
        Input('locale'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrLocale", void 0);
    tslib_1.__decorate([
        Input('maxDate'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMaxDate", void 0);
    tslib_1.__decorate([
        Input('minDate'),
        tslib_1.__metadata("design:type", Object)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMinDate", void 0);
    tslib_1.__decorate([
        Input('minuteIncrement'),
        tslib_1.__metadata("design:type", Number)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMinuteIncrement", void 0);
    tslib_1.__decorate([
        Input('mode'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrMode", void 0);
    tslib_1.__decorate([
        Input('nextArrow'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrNextArrow", void 0);
    tslib_1.__decorate([
        Input('noCalendar'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrNoCalendar", void 0);
    tslib_1.__decorate([
        Input('parseDate'),
        tslib_1.__metadata("design:type", Function)
    ], Ng2FlatpickrDirective.prototype, "flatpickrParseDate", void 0);
    tslib_1.__decorate([
        Input('prevArrow'),
        tslib_1.__metadata("design:type", String)
    ], Ng2FlatpickrDirective.prototype, "flatpickrPrevArrow", void 0);
    tslib_1.__decorate([
        Input('shorthandCurrentMonth'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrShorthandCurrentMonth", void 0);
    tslib_1.__decorate([
        Input('static'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrStatic", void 0);
    tslib_1.__decorate([
        Input('time_24hr'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrTime_24hr", void 0);
    tslib_1.__decorate([
        Input('utc'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrUtc", void 0);
    tslib_1.__decorate([
        Input('weekNumbers'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrWeekNumbers", void 0);
    tslib_1.__decorate([
        Input('wrap'),
        tslib_1.__metadata("design:type", Boolean)
    ], Ng2FlatpickrDirective.prototype, "flatpickrWrap", void 0);
    tslib_1.__decorate([
        Output('onChange'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnChange", void 0);
    tslib_1.__decorate([
        Output('onClose'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnClose", void 0);
    tslib_1.__decorate([
        Output('onOpen'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnOpen", void 0);
    tslib_1.__decorate([
        Output('onReady'),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Ng2FlatpickrDirective.prototype, "flatpickrOnReady", void 0);
    tslib_1.__decorate([
        HostListener('dblclick'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Ng2FlatpickrDirective.prototype, "onClick", null);
    Ng2FlatpickrDirective = tslib_1.__decorate([
        Directive({ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }),
        tslib_1.__metadata("design:paramtypes", [ControlContainer,
            NgControl,
            ElementRef,
            Renderer])
    ], Ng2FlatpickrDirective);
    return Ng2FlatpickrDirective;
}());
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ1MsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDcEQsTUFBTSxFQUFFLFFBQVEsRUFDbkMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFlLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzFFO0lBMlJDLCtCQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBakQ3Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELHVDQUFPLEdBQWQ7UUFDQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsc0JBQUksMENBQU87YUFBWDtZQUNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENB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QTdlWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCxcblx0T25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xDb250YWluZXIsIEZvcm1Db250cm9sLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZsYXRwaWNrckV2ZW50IH0gZnJvbSAnLi9mbGF0cGlja3ItZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZsYXRwaWNrckluc3RhbmNlIH0gZnJvbSAnLi9mbGF0cGlja3ItaW5zdGFuY2UnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2ZsYXRwaWNrcl0nLCBleHBvcnRBczogJ25nMi1mbGF0cGlja3InIH0pXG5leHBvcnQgY2xhc3MgTmcyRmxhdHBpY2tyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cdC8qKlxuXHQgKiBUaGUgZmxhdHBpY2tyIGNvbmZpZ3VyYXRpb24gYXMgYSBzaW5nbGUgb2JqZWN0IG9mIHZhbHVlcy5cblx0ICpcblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9vcHRpb25zLyBmb3IgZnVsbCBsaXN0LlxuXHQgKi9cblx0QElucHV0KCAnZmxhdHBpY2tyJyApIHB1YmxpYyBmbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBQbGFjZWhvbGRlciBmb3IgaW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdwbGFjZWhvbGRlcicgKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogRXhhY3RseSB0aGUgc2FtZSBhcyBkYXRlIGZvcm1hdCwgYnV0IGZvciB0aGUgYWx0SW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXG5cdCAqL1xuXHRASW5wdXQoICdhbHRGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckFsdEZvcm1hdDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSB1c2VyIGEgcmVhZGFibGUgZGF0ZSAoYXMgcGVyIGFsdEZvcm1hdCksIGJ1dCByZXR1cm4gc29tZXRoaW5nXG5cdCAqIHRvdGFsbHkgZGlmZmVyZW50IHRvIHRoZSBzZXJ2ZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnYWx0SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsdElucHV0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGlzIGNsYXNzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgY3JlYXRlZCBieSB0aGUgYWx0SW5wdXRcblx0ICogb3B0aW9uLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJcIlxuXHQgKi9cblx0QElucHV0KCAnYWx0SW5wdXRDbGFzcycgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcblx0ICogZGVmYXVsdCwgZGlyZWN0IGVudHJ5IGlzIGRpc2FibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2FsbG93SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsbG93SW5wdXQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluc3RlYWQgb2YgYm9keSwgYXBwZW5kcyB0aGUgY2FsZW5kYXIgdG8gdGhlIHNwZWNpZmllZCBub2RlIGluc3RlYWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdhcHBlbmRUbycgKSBwdWJsaWMgZmxhdHBpY2tyQXBwZW5kVG86IEhUTUxFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBpbnB1dCBzaG91bGQgb3BlbiB0aGUgcGlja2VyLlxuXHQgKiBZb3UgY291bGQgZGlzYWJsZSB0aGlzIGlmIHlvdSB3aXNoIHRvIG9wZW4gdGhlIGNhbGVuZGFyIG1hbnVhbGx5XG5cdCAqIHdpdGgub3BlbigpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgdHJ1ZVxuXHQgKi9cblx0QElucHV0KCAnY2xpY2tPcGVucycgKSBwdWJsaWMgZmxhdHBpY2tyQ2xpY2tPcGVuczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQSBzdHJpbmcgb2YgY2hhcmFjdGVycyB3aGljaCBhcmUgdXNlZCB0byBkZWZpbmUgaG93IHRoZSBkYXRlIHdpbGwgYmVcblx0ICogZGlzcGxheWVkIGluIHRoZSBpbnB1dCBib3guXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZm9ybWF0dGluZy8gZm9yIHN1cHBvcnRlZCB0b2tlbnMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIlktbS1kXCJcblx0ICovXG5cdEBJbnB1dCggJ2RhdGVGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckRhdGVGb3JtYXQ6IHN0cmluZztcblxuXHQvKipcblx0ICogU2V0cyB0aGUgaW5pdGlhbCBzZWxlY3RlZCBkYXRlKHMpLlxuXHQgKlxuXHQgKiBJZiB5b3UncmUgdXNpbmcge21vZGU6IFwibXVsdGlwbGVcIn0gb3IgYSByYW5nZSBjYWxlbmRhciBzdXBwbHkgYW4gQXJyYXkgb2Zcblx0ICogRGF0ZSBvYmplY3RzIG9yIGFuIEFycmF5IG9mIGRhdGUgc3RyaW5ncyB3aGljaCBmb2xsb3cgeW91ciBkYXRlRm9ybWF0LlxuXHQgKlxuXHQgKiBPdGhlcndpc2UsIHlvdSBjYW4gc3VwcGx5IGEgc2luZ2xlIERhdGUgb2JqZWN0IG9yIGEgZGF0ZSBzdHJpbmcuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdkZWZhdWx0RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyRGVmYXVsdERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIERpc2FibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZGlzYWJsZVxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLXNwZWNpZmljLWRhdGVzXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBbXVxuXHQgKi9cblx0QElucHV0KCAnZGlzYWJsZScgKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZTogc3RyaW5nW10gfCBEYXRlW107XG5cblx0LyoqXG5cdCAqIFNldCBkaXNhYmxlTW9iaWxlIHRvIHRydWUgdG8gYWx3YXlzIHVzZSB0aGUgbm9uLW5hdGl2ZSBwaWNrZXIuIEJ5XG5cdCAqIGRlZmF1bHQsIEZsYXRwaWNrciB1dGlsaXplcyBuYXRpdmUgZGF0ZXRpbWUgd2lkZ2V0cyB1bmxlc3MgY2VydGFpblxuXHQgKiBvcHRpb25zIChlLmcuIGRpc2FibGUpIGFyZSB1c2VkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2Rpc2FibGVNb2JpbGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGVNb2JpbGU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBlbmFibGVcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1hbGwtZGF0ZXMtZXhjZXB0LXNlbGVjdC1mZXdcblx0ICpcblx0ICogRGVmYXVsdDogIFtdXG5cdCAqL1xuXHRASW5wdXQoICdlbmFibGUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZTogc3RyaW5nW10gfCBEYXRlW107XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlVGltZScgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlVGltZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlcyBzZWNvbmRzIGluIHRoZSB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdlbmFibGVTZWNvbmRzJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGVTZWNvbmRzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgaG91ciBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIDFcblx0ICovXG5cdEBJbnB1dCggJ2hvdXJJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrckhvdXJJbmNyZW1lbnQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogRGlzcGxheXMgdGhlIGNhbGVuZGFyIGlubGluZS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdpbmxpbmUnICkgcHVibGljIGZsYXRwaWNrcklubGluZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVXNlIGEgc3BlY2lmaWMgbG9jYWxlIGZvciB0aGUgZmxhdHBpY2tyIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnbG9jYWxlJyApIHB1YmxpYyBmbGF0cGlja3JMb2NhbGU6IE9iamVjdDtcblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gcGljayB0byAoaW5jbHVzaXZlKS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ21heERhdGUnICkgcHVibGljIGZsYXRwaWNrck1heERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHN0YXJ0IHBpY2tpbmcgZnJvbSAoaW5jbHVzaXZlKS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ21pbkRhdGUnICkgcHVibGljIGZsYXRwaWNrck1pbkRhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBtaW51dGUgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICA1XG5cdCAqL1xuXHRASW5wdXQoICdtaW51dGVJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrck1pbnV0ZUluY3JlbWVudDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBcInNpbmdsZVwiLCBcIm11bHRpcGxlXCIsIG9yIFwicmFuZ2VcIlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJzaW5nbGVcIlxuXHQgKi9cblx0QElucHV0KCAnbW9kZScgKSBwdWJsaWMgZmxhdHBpY2tyTW9kZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBIVE1MIGZvciB0aGUgYXJyb3cgaWNvbiwgdXNlZCB0byBzd2l0Y2ggbW9udGhzLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCI+XCJcblx0ICovXG5cdEBJbnB1dCggJ25leHRBcnJvdycgKSBwdWJsaWMgZmxhdHBpY2tyTmV4dEFycm93OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEhpZGVzIHRoZSBkYXkgc2VsZWN0aW9uIGluIGNhbGVuZGFyLiBVc2UgaXQgYWxvbmcgd2l0aCBlbmFibGVUaW1lIHRvXG5cdCAqIGNyZWF0ZSBhIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ25vQ2FsZW5kYXInICkgcHVibGljIGZsYXRwaWNrck5vQ2FsZW5kYXI6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEZ1bmN0aW9uIHRoYXQgZXhwZWN0cyBhIGRhdGUgc3RyaW5nIGFuZCBtdXN0IHJldHVybiBhIERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3BhcnNlRGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyUGFyc2VEYXRlOiBGdW5jdGlvbjtcblxuXHQvKipcblx0ICogSFRNTCBmb3IgdGhlIGxlZnQgYXJyb3cgaWNvbi5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiPFwiXG5cdCAqL1xuXHRASW5wdXQoICdwcmV2QXJyb3cnICkgcHVibGljIGZsYXRwaWNrclByZXZBcnJvdzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSBtb250aCB1c2luZyB0aGUgc2hvcnRoYW5kIHZlcnNpb24gKGllLCBTZXAgaW5zdGVhZCBvZiBTZXB0ZW1iZXIpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcgKSBwdWJsaWMgZmxhdHBpY2tyU2hvcnRoYW5kQ3VycmVudE1vbnRoOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBQb3NpdGlvbiB0aGUgY2FsZW5kYXIgaW5zaWRlIHRoZSB3cmFwcGVyIGFuZCBuZXh0IHRvIHRoZSBpbnB1dCBlbGVtZW50XG5cdCAqIChMZWF2ZSBmYWxzZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3N0YXRpYycgKSBwdWJsaWMgZmxhdHBpY2tyU3RhdGljOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBEaXNwbGF5cyB0aW1lIHBpY2tlciBpbiAyNCBob3VyIG1vZGUgd2l0aG91dCBBTS9QTSBzZWxlY3Rpb24gd2hlbiBlbmFibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3RpbWVfMjRocicgKSBwdWJsaWMgZmxhdHBpY2tyVGltZV8yNGhyOiBib29sZWFuO1xuXG5cdEBJbnB1dCggJ3V0YycgKSBwdWJsaWMgZmxhdHBpY2tyVXRjOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGVzIGRpc3BsYXkgb2Ygd2VlayBudW1iZXJzIGluIGNhbGVuZGFyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3dlZWtOdW1iZXJzJyApIHB1YmxpYyBmbGF0cGlja3JXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3VzdG9tIGVsZW1lbnRzIGFuZCBpbnB1dCBncm91cHMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnd3JhcCcgKSBwdWJsaWMgZmxhdHBpY2tyV3JhcDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogb25DaGFuZ2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSwgb3IgY2hhbmdlcyB0aGUgdGltZSBvbiBhIHNlbGVjdGVkIGRhdGUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25DaGFuZ2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvbkNsb3NlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIGNsb3NlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvbkNsb3NlJyApIHB1YmxpYyBmbGF0cGlja3JPbkNsb3NlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvbk9wZW4gZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uT3BlbicgKSBwdWJsaWMgZmxhdHBpY2tyT25PcGVuOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvblJlYWR5IGdldHMgdHJpZ2dlcmVkIG9uY2UgdGhlIGNhbGVuZGFyIGlzIGluIGEgcmVhZHkgc3RhdGUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25SZWFkeScgKSBwdWJsaWMgZmxhdHBpY2tyT25SZWFkeTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKiogQWxsb3cgZG91YmxlLWNsaWNraW5nIG9uIHRoZSBjb250cm9sIHRvIG9wZW4vY2xvc2UgaXQuICovXG5cdEBIb3N0TGlzdGVuZXIoICdkYmxjbGljaycgKVxuXHRwdWJsaWMgb25DbGljaygpIHtcblx0XHR0aGlzLmZsYXRwaWNrci50b2dnbGUoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBnbG9iYWxPbkNoYW5nZTogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPbkNsb3NlOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uT3BlbjogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPblJlYWR5OiBGdW5jdGlvbjtcblxuXHRwcm90ZWN0ZWQgZmxhdHBpY2tyOiBGbGF0cGlja3JJbnN0YW5jZTtcblx0cHJvdGVjdGVkIGZvcm1Db250cm9sTGlzdGVuZXI6IFN1YnNjcmlwdGlvbjtcblxuXHQvKiogQWxsb3cgYWNjZXNzIHByb3BlcnRpZXMgdXNpbmcgaW5kZXggbm90YXRpb24gKi9cblx0W2tleTpzdHJpbmddOiBhbnk7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJvdGVjdGVkIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcblx0XHRwcm90ZWN0ZWQgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG5cdFx0cHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG5cdFx0cHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlclxuXHQpIHt9XG5cblx0Z2V0IGNvbnRyb2woKTogRm9ybUNvbnRyb2wge1xuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCkgOiBudWxsO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdC8qKiBXZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGUgZmxhdHBpY2tyIGluc3RhbmNlIGluIG5nT25Jbml0KCk7IGl0IHdpbGxcblx0XHRcdHJhbmRvbWl6ZSB0aGUgZGF0ZSB3aGVuIHRoZSBmb3JtIGNvbnRyb2wgaW5pdGlhbGl6ZXMuICovXG5cdFx0bGV0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdGlmICh0eXBlb2YgbmF0aXZlRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgbmF0aXZlRWxlbWVudCA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgJ0Vycm9yOiBpbnZhbGlkIGlucHV0IGVsZW1lbnQgc3BlY2lmaWVkJztcblx0XHR9XG5cblx0XHRpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSggdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkYXRhLWlucHV0JywgJycgKTtcblx0XHRcdG5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVFbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5mbGF0cGlja3IgPSA8RmxhdHBpY2tySW5zdGFuY2U+bmF0aXZlRWxlbWVudC5mbGF0cGlja3IoIHRoaXMuZmxhdHBpY2tyT3B0aW9ucyApO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyXG5cdFx0XHQmJiB0aGlzLmZsYXRwaWNrckFsdElucHV0XG5cdFx0XHQmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCAncGxhY2Vob2xkZXInICkgXG5cdFx0XHQmJiBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICkge1xuXHRcdFx0XHR0aGlzLmZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoICdwbGFjZWhvbGRlcicsIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrcikge1xuXHRcdFx0dGhpcy5mbGF0cGlja3IuZGVzdHJveSgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIpIHtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lci51bnN1YnNjcmliZSgpO1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DaGFuZ2U7XG5cdFx0dGhpcy5nbG9iYWxPbkNsb3NlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2xvc2U7XG5cdFx0dGhpcy5nbG9iYWxPbk9wZW4gPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25PcGVuO1xuXHRcdHRoaXMuZ2xvYmFsT25SZWFkeSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vblJlYWR5O1xuXG5cdFx0dGhpcy5mbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdFx0YWx0Rm9ybWF0OiB0aGlzLmdldE9wdGlvbignYWx0Rm9ybWF0JyksXG5cdFx0XHRhbHRJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0JyksXG5cdFx0XHRhbHRJbnB1dENsYXNzOiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXRDbGFzcycpLFxuXHRcdFx0YWxsb3dJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsbG93SW5wdXQnKSxcblx0XHRcdGFwcGVuZFRvOiB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSxcblx0XHRcdGNsaWNrT3BlbnM6IHRoaXMuZ2V0T3B0aW9uKCdjbGlja09wZW5zJywgdHJ1ZSksXG5cdFx0XHRkYXRlRm9ybWF0OiB0aGlzLmdldE9wdGlvbignZGF0ZUZvcm1hdCcpLFxuXHRcdFx0ZGVmYXVsdERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdkZWZhdWx0RGF0ZScpLFxuXHRcdFx0ZGlzYWJsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGUnKSxcblx0XHRcdGRpc2FibGVNb2JpbGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlTW9iaWxlJyksXG5cdFx0XHRlbmFibGU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGUnKSxcblx0XHRcdGVuYWJsZVRpbWU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVUaW1lJyksXG5cdFx0XHRlbmFibGVTZWNvbmRzOiB0aGlzLmdldE9wdGlvbignZW5hYmxlU2Vjb25kcycpLFxuXHRcdFx0aG91ckluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ2hvdXJJbmNyZW1lbnQnKSxcblx0XHRcdGlubGluZTogdGhpcy5nZXRPcHRpb24oJ2lubGluZScpLFxuXHRcdFx0bG9jYWxlOiB0aGlzLmdldE9wdGlvbignbG9jYWxlJyksXG5cdFx0XHRtYXhEYXRlOiB0aGlzLmdldE9wdGlvbignbWF4RGF0ZScpLFxuXHRcdFx0bWluRGF0ZTogdGhpcy5nZXRPcHRpb24oJ21pbkRhdGUnKSxcblx0XHRcdG1pbnV0ZUluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ21pbnV0ZUluY3JlbWVudCcpLFxuXHRcdFx0bW9kZTogdGhpcy5nZXRPcHRpb24oJ21vZGUnKSxcblx0XHRcdG5leHRBcnJvdzogdGhpcy5nZXRPcHRpb24oJ25leHRBcnJvdycpLFxuXHRcdFx0bm9DYWxlbmRhcjogdGhpcy5nZXRPcHRpb24oJ25vQ2FsZW5kYXInKSxcblx0XHRcdG9uQ2hhbmdlOiB0aGlzLmV2ZW50T25DaGFuZ2UuYmluZCh0aGlzKSxcblx0XHRcdG9uQ2xvc2U6IHRoaXMuZXZlbnRPbkNsb3NlLmJpbmQodGhpcyksXG5cdFx0XHRvbk9wZW46IHRoaXMuZXZlbnRPbk9wZW4uYmluZCh0aGlzKSxcblx0XHRcdG9uUmVhZHk6IHRoaXMuZXZlbnRPblJlYWR5LmJpbmQodGhpcyksXG5cdFx0XHRwYXJzZURhdGU6IHRoaXMuZ2V0T3B0aW9uKCdwYXJzZURhdGUnKSxcblx0XHRcdHByZXZBcnJvdzogdGhpcy5nZXRPcHRpb24oJ3ByZXZBcnJvdycpLFxuXHRcdFx0c2hvcnRoYW5kQ3VycmVudE1vbnRoOiB0aGlzLmdldE9wdGlvbignc2hvcnRoYW5kQ3VycmVudE1vbnRoJyksXG5cdFx0XHRzdGF0aWM6IHRoaXMuZ2V0T3B0aW9uKCdzdGF0aWMnKSxcblx0XHRcdHRpbWVfMjRocjogdGhpcy5nZXRPcHRpb24oJ3RpbWVfMjRocicpLFxuXHRcdFx0dXRjOiB0aGlzLmdldE9wdGlvbigndXRjJyksXG5cdFx0XHR3ZWVrTnVtYmVyczogdGhpcy5nZXRPcHRpb24oJ3dlZWtOdW1iZXJzJyksXG5cdFx0XHR3cmFwOiB0aGlzLmdldE9wdGlvbignd3JhcCcsIHRydWUpLFxuXHRcdH07XG5cblx0XHQvLyBSZW1vdmUgdW5zZXQgcHJvcGVydGllc1xuXHRcdE9iamVjdC5rZXlzKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKS5mb3JFYWNoKCAoIGtleTogc3RyaW5nICkgPT4ge1xuXHRcdFx0KHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpICYmXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XTtcblx0XHR9ICk7XG5cblx0XHRpZiAodGhpcy5jb250cm9sKSB7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzXG5cdFx0XHRcdC5zdWJzY3JpYmUoICggdmFsdWU6IGFueSApID0+IHtcblx0XHRcdFx0XHRpZiAoICEoIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSApICkge1xuXHRcdFx0XHRcdFx0Ly8gUXVpZXRseSB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGNvbnRyb2wgdG8gYmUgYVxuXHRcdFx0XHRcdFx0Ly8gRGF0ZSBvYmplY3QuIFRoaXMgYXZvaWRzIGFueSBleHRlcm5hbCBzdWJzY3JpYmVyc1xuXHRcdFx0XHRcdFx0Ly8gZnJvbSBiZWluZyBub3RpZmllZCBhIHNlY29uZCB0aW1lIChvbmNlIGZvciB0aGUgdXNlclxuXHRcdFx0XHRcdFx0Ly8gaW5pdGlhdGVkIGV2ZW50LCBhbmQgb25jZSBmb3Igb3VyIGNvbnZlcnNpb24gdG9cblx0XHRcdFx0XHRcdC8vIERhdGUoKSkuXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRyb2wuc2V0VmFsdWUoIG5ldyBEYXRlKCAnJyArIHZhbHVlICksIHtcblx0XHRcdFx0XHRcdFx0b25seVNlbGY6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGVtaXRFdmVudDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2Vcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DaGFuZ2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbkNoYW5nZSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlLmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2hhbmdlICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DbG9zZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uQ2xvc2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2xvc2UgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25DbG9zZSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25DbG9zZSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25PcGVuIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25PcGVuKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbk9wZW4gKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uT3Blbi5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPbk9wZW4gKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uT3BlbiggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25SZWFkeSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uUmVhZHkoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uUmVhZHkgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25SZWFkeSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25SZWFkeSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBvcHRpb24ge29wdGlvbn0sIG9yIHtkZWZhdWx0VmFsdWV9IGlmIGl0XG5cdCAqIGRvZXNuJ3QgZXhpc3QuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZ2V0T3B0aW9uKCBvcHRpb246IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55ICk6IGFueSB7XG5cdFx0bGV0IGxvY2FsTmFtZSA9ICdmbGF0cGlja3InICsgb3B0aW9uLnN1YnN0cmluZyggMCwgMSApLnRvVXBwZXJDYXNlKClcblx0XHRcdCsgb3B0aW9uLnN1YnN0cmluZyggMSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgdGhpc1tsb2NhbE5hbWVdICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdHJldHVybiB0aGlzW2xvY2FsTmFtZV07XG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdHJldHVybiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==