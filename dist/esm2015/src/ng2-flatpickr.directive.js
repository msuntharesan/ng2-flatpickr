import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
let Ng2FlatpickrDirective = class Ng2FlatpickrDirective {
    constructor(parent, ngControl, element, renderer) {
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
    onClick() {
        this.flatpickr.toggle();
    }
    get control() {
        return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
    }
    ngAfterViewInit() {
        /** We cannot initialize the flatpickr instance in ngOnInit(); it will
            randomize the date when the form control initializes. */
        let nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions.wrap) {
            this.renderer.setElementAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    }
    ngOnChanges(changes) {
        if (this.flatpickr
            && this.flatpickrAltInput
            && changes.hasOwnProperty('placeholder')
            && changes['placeholder'].currentValue) {
            this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
        }
    }
    ngOnDestroy() {
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
    }
    ngOnInit() {
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
        Object.keys(this.flatpickrOptions).forEach((key) => {
            (this.flatpickrOptions[key] === undefined) &&
                delete this.flatpickrOptions[key];
        });
        if (this.control) {
            this.formControlListener = this.control.valueChanges
                .subscribe((value) => {
                if (!(value instanceof Date)) {
                    // Quietly update the value of the form control to be a
                    // Date object. This avoids any external subscribers
                    // from being notified a second time (once for the user
                    // initiated event, and once for our conversion to
                    // Date()).
                    this.control.setValue(new Date('' + value), {
                        onlySelf: true,
                        emitEvent: false,
                        emitModelToViewChange: false,
                        emitViewToModelChange: false
                    });
                }
            });
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    eventOnChange(selectedDates, dateStr, instance) {
        let event = {
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
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    eventOnClose(selectedDates, dateStr, instance) {
        let event = {
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
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    eventOnOpen(selectedDates, dateStr, instance) {
        let event = {
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
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    eventOnReady(selectedDates, dateStr, instance) {
        let event = {
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
    }
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    getOption(option, defaultValue) {
        let localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
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
export { Ng2FlatpickrDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ1MsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDcEQsTUFBTSxFQUFFLFFBQVEsRUFDbkMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFlLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzFFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBMlJqQyxZQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBakQ3Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELE9BQU87UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMs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aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXG5cdE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQ29udHJvbCwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGbGF0cGlja3JFdmVudCB9IGZyb20gJy4vZmxhdHBpY2tyLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBGbGF0cGlja3JJbnN0YW5jZSB9IGZyb20gJy4vZmxhdHBpY2tyLWluc3RhbmNlJztcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tmbGF0cGlja3JdJywgZXhwb3J0QXM6ICduZzItZmxhdHBpY2tyJyB9KVxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0LCBPbkNoYW5nZXMge1xuXHQvKipcblx0ICogVGhlIGZsYXRwaWNrciBjb25maWd1cmF0aW9uIGFzIGEgc2luZ2xlIG9iamVjdCBvZiB2YWx1ZXMuXG5cdCAqXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3Ivb3B0aW9ucy8gZm9yIGZ1bGwgbGlzdC5cblx0ICovXG5cdEBJbnB1dCggJ2ZsYXRwaWNrcicgKSBwdWJsaWMgZmxhdHBpY2tyT3B0aW9uczogRmxhdHBpY2tyT3B0aW9ucztcblxuXHQvKipcblx0ICogUGxhY2Vob2xkZXIgZm9yIGlucHV0IGZpZWxkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAncGxhY2Vob2xkZXInICkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEV4YWN0bHkgdGhlIHNhbWUgYXMgZGF0ZSBmb3JtYXQsIGJ1dCBmb3IgdGhlIGFsdElucHV0IGZpZWxkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJGIGosIFlcIlxuXHQgKi9cblx0QElucHV0KCAnYWx0Rm9ybWF0JyApIHB1YmxpYyBmbGF0cGlja3JBbHRGb3JtYXQ6IHN0cmluZztcblxuXHQvKipcblx0ICogU2hvdyB0aGUgdXNlciBhIHJlYWRhYmxlIGRhdGUgKGFzIHBlciBhbHRGb3JtYXQpLCBidXQgcmV0dXJuIHNvbWV0aGluZ1xuXHQgKiB0b3RhbGx5IGRpZmZlcmVudCB0byB0aGUgc2VydmVyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2FsdElucHV0JyApIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhpcyBjbGFzcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGNyZWF0ZWQgYnkgdGhlIGFsdElucHV0XG5cdCAqIG9wdGlvbi5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiXCJcblx0ICovXG5cdEBJbnB1dCggJ2FsdElucHV0Q2xhc3MnICkgcHVibGljIGZsYXRwaWNrckFsdElucHV0Q2xhc3M6IHN0cmluZztcblxuXHQvKipcblx0ICogQWxsb3dzIHRoZSB1c2VyIHRvIGVudGVyIGEgZGF0ZSBkaXJlY3RseSBpbnB1dCB0aGUgaW5wdXQgZmllbGQuIEJ5XG5cdCAqIGRlZmF1bHQsIGRpcmVjdCBlbnRyeSBpcyBkaXNhYmxlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdhbGxvd0lucHV0JyApIHB1YmxpYyBmbGF0cGlja3JBbGxvd0lucHV0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJbnN0ZWFkIG9mIGJvZHksIGFwcGVuZHMgdGhlIGNhbGVuZGFyIHRvIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnYXBwZW5kVG8nICkgcHVibGljIGZsYXRwaWNrckFwcGVuZFRvOiBIVE1MRWxlbWVudDtcblxuXHQvKipcblx0ICogV2hldGhlciBjbGlja2luZyBvbiB0aGUgaW5wdXQgc2hvdWxkIG9wZW4gdGhlIHBpY2tlci5cblx0ICogWW91IGNvdWxkIGRpc2FibGUgdGhpcyBpZiB5b3Ugd2lzaCB0byBvcGVuIHRoZSBjYWxlbmRhciBtYW51YWxseVxuXHQgKiB3aXRoLm9wZW4oKS5cblx0ICpcblx0ICogRGVmYXVsdDogIHRydWVcblx0ICovXG5cdEBJbnB1dCggJ2NsaWNrT3BlbnMnICkgcHVibGljIGZsYXRwaWNrckNsaWNrT3BlbnM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEEgc3RyaW5nIG9mIGNoYXJhY3RlcnMgd2hpY2ggYXJlIHVzZWQgdG8gZGVmaW5lIGhvdyB0aGUgZGF0ZSB3aWxsIGJlXG5cdCAqIGRpc3BsYXllZCBpbiB0aGUgaW5wdXQgYm94LlxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvIGZvciBzdXBwb3J0ZWQgdG9rZW5zLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJZLW0tZFwiXG5cdCAqL1xuXHRASW5wdXQoICdkYXRlRm9ybWF0JyApIHB1YmxpYyBmbGF0cGlja3JEYXRlRm9ybWF0OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGluaXRpYWwgc2VsZWN0ZWQgZGF0ZShzKS5cblx0ICpcblx0ICogSWYgeW91J3JlIHVzaW5nIHttb2RlOiBcIm11bHRpcGxlXCJ9IG9yIGEgcmFuZ2UgY2FsZW5kYXIgc3VwcGx5IGFuIEFycmF5IG9mXG5cdCAqIERhdGUgb2JqZWN0cyBvciBhbiBBcnJheSBvZiBkYXRlIHN0cmluZ3Mgd2hpY2ggZm9sbG93IHlvdXIgZGF0ZUZvcm1hdC5cblx0ICpcblx0ICogT3RoZXJ3aXNlLCB5b3UgY2FuIHN1cHBseSBhIHNpbmdsZSBEYXRlIG9iamVjdCBvciBhIGRhdGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnZGVmYXVsdERhdGUnICkgcHVibGljIGZsYXRwaWNrckRlZmF1bHREYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBEaXNhYmxlIGFuIGFycmF5IG9mIHNwZWNpZmljIGRhdGVzLCBkYXRlIHJhbmdlcywgb3IgZnVuY3Rpb25zIHRvIGRpc2FibGVcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1zcGVjaWZpYy1kYXRlc1xuXHQgKlxuXHQgKiBEZWZhdWx0OiAgW11cblx0ICovXG5cdEBJbnB1dCggJ2Rpc2FibGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xuXG5cdC8qKlxuXHQgKiBTZXQgZGlzYWJsZU1vYmlsZSB0byB0cnVlIHRvIGFsd2F5cyB1c2UgdGhlIG5vbi1uYXRpdmUgcGlja2VyLiBCeVxuXHQgKiBkZWZhdWx0LCBGbGF0cGlja3IgdXRpbGl6ZXMgbmF0aXZlIGRhdGV0aW1lIHdpZGdldHMgdW5sZXNzIGNlcnRhaW5cblx0ICogb3B0aW9ucyAoZS5nLiBkaXNhYmxlKSBhcmUgdXNlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdkaXNhYmxlTW9iaWxlJyApIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlTW9iaWxlOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZW5hYmxlXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctYWxsLWRhdGVzLWV4Y2VwdC1zZWxlY3QtZmV3XG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBbXVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xuXG5cdC8qKlxuXHQgKiBFbmFibGVzIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2VuYWJsZVRpbWUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZVRpbWU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgc2Vjb25kcyBpbiB0aGUgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlU2Vjb25kcycgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlU2Vjb25kczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIGhvdXIgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICAxXG5cdCAqL1xuXHRASW5wdXQoICdob3VySW5jcmVtZW50JyApIHB1YmxpYyBmbGF0cGlja3JIb3VySW5jcmVtZW50OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIERpc3BsYXlzIHRoZSBjYWxlbmRhciBpbmxpbmUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnaW5saW5lJyApIHB1YmxpYyBmbGF0cGlja3JJbmxpbmU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFVzZSBhIHNwZWNpZmljIGxvY2FsZSBmb3IgdGhlIGZsYXRwaWNrciBpbnN0YW5jZS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ2xvY2FsZScgKSBwdWJsaWMgZmxhdHBpY2tyTG9jYWxlOiBPYmplY3Q7XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHBpY2sgdG8gKGluY2x1c2l2ZSkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdtYXhEYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNYXhEYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWluaW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBzdGFydCBwaWNraW5nIGZyb20gKGluY2x1c2l2ZSkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdtaW5EYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNaW5EYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgbWludXRlIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgNVxuXHQgKi9cblx0QElucHV0KCAnbWludXRlSW5jcmVtZW50JyApIHB1YmxpYyBmbGF0cGlja3JNaW51dGVJbmNyZW1lbnQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogXCJzaW5nbGVcIiwgXCJtdWx0aXBsZVwiLCBvciBcInJhbmdlXCJcblx0ICpcblx0ICogRGVmYXVsdDogIFwic2luZ2xlXCJcblx0ICovXG5cdEBJbnB1dCggJ21vZGUnICkgcHVibGljIGZsYXRwaWNrck1vZGU6IHN0cmluZztcblxuXHQvKipcblx0ICogSFRNTCBmb3IgdGhlIGFycm93IGljb24sIHVzZWQgdG8gc3dpdGNoIG1vbnRocy5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiPlwiXG5cdCAqL1xuXHRASW5wdXQoICduZXh0QXJyb3cnICkgcHVibGljIGZsYXRwaWNrck5leHRBcnJvdzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBIaWRlcyB0aGUgZGF5IHNlbGVjdGlvbiBpbiBjYWxlbmRhci4gVXNlIGl0IGFsb25nIHdpdGggZW5hYmxlVGltZSB0b1xuXHQgKiBjcmVhdGUgYSB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdub0NhbGVuZGFyJyApIHB1YmxpYyBmbGF0cGlja3JOb0NhbGVuZGFyOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0aGF0IGV4cGVjdHMgYSBkYXRlIHN0cmluZyBhbmQgbXVzdCByZXR1cm4gYSBEYXRlIG9iamVjdC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdwYXJzZURhdGUnICkgcHVibGljIGZsYXRwaWNrclBhcnNlRGF0ZTogRnVuY3Rpb247XG5cblx0LyoqXG5cdCAqIEhUTUwgZm9yIHRoZSBsZWZ0IGFycm93IGljb24uXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIjxcIlxuXHQgKi9cblx0QElucHV0KCAncHJldkFycm93JyApIHB1YmxpYyBmbGF0cGlja3JQcmV2QXJyb3c6IHN0cmluZztcblxuXHQvKipcblx0ICogU2hvdyB0aGUgbW9udGggdXNpbmcgdGhlIHNob3J0aGFuZCB2ZXJzaW9uIChpZSwgU2VwIGluc3RlYWQgb2YgU2VwdGVtYmVyKS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdzaG9ydGhhbmRDdXJyZW50TW9udGgnICkgcHVibGljIGZsYXRwaWNrclNob3J0aGFuZEN1cnJlbnRNb250aDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogUG9zaXRpb24gdGhlIGNhbGVuZGFyIGluc2lkZSB0aGUgd3JhcHBlciBhbmQgbmV4dCB0byB0aGUgaW5wdXQgZWxlbWVudFxuXHQgKiAoTGVhdmUgZmFsc2UgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdzdGF0aWMnICkgcHVibGljIGZsYXRwaWNrclN0YXRpYzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRGlzcGxheXMgdGltZSBwaWNrZXIgaW4gMjQgaG91ciBtb2RlIHdpdGhvdXQgQU0vUE0gc2VsZWN0aW9uIHdoZW4gZW5hYmxlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICd0aW1lXzI0aHInICkgcHVibGljIGZsYXRwaWNrclRpbWVfMjRocjogYm9vbGVhbjtcblxuXHRASW5wdXQoICd1dGMnICkgcHVibGljIGZsYXRwaWNrclV0YzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlcyBkaXNwbGF5IG9mIHdlZWsgbnVtYmVycyBpbiBjYWxlbmRhci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICd3ZWVrTnVtYmVycycgKSBwdWJsaWMgZmxhdHBpY2tyV2Vla051bWJlcnM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEN1c3RvbSBlbGVtZW50cyBhbmQgaW5wdXQgZ3JvdXBzLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3dyYXAnICkgcHVibGljIGZsYXRwaWNrcldyYXA6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIG9uQ2hhbmdlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUsIG9yIGNoYW5nZXMgdGhlIHRpbWUgb24gYSBzZWxlY3RlZCBkYXRlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uQ2hhbmdlJyApIHB1YmxpYyBmbGF0cGlja3JPbkNoYW5nZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25DbG9zZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBjbG9zZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25DbG9zZScgKSBwdWJsaWMgZmxhdHBpY2tyT25DbG9zZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25PcGVuIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIG9wZW5lZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvbk9wZW4nICkgcHVibGljIGZsYXRwaWNrck9uT3BlbjogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25SZWFkeSBnZXRzIHRyaWdnZXJlZCBvbmNlIHRoZSBjYWxlbmRhciBpcyBpbiBhIHJlYWR5IHN0YXRlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uUmVhZHknICkgcHVibGljIGZsYXRwaWNrck9uUmVhZHk6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqIEFsbG93IGRvdWJsZS1jbGlja2luZyBvbiB0aGUgY29udHJvbCB0byBvcGVuL2Nsb3NlIGl0LiAqL1xuXHRASG9zdExpc3RlbmVyKCAnZGJsY2xpY2snIClcblx0cHVibGljIG9uQ2xpY2soKSB7XG5cdFx0dGhpcy5mbGF0cGlja3IudG9nZ2xlKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DbG9zZTogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPbk9wZW46IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25SZWFkeTogRnVuY3Rpb247XG5cblx0cHJvdGVjdGVkIGZsYXRwaWNrcjogRmxhdHBpY2tySW5zdGFuY2U7XG5cdHByb3RlY3RlZCBmb3JtQ29udHJvbExpc3RlbmVyOiBTdWJzY3JpcHRpb247XG5cblx0LyoqIEFsbG93IGFjY2VzcyBwcm9wZXJ0aWVzIHVzaW5nIGluZGV4IG5vdGF0aW9uICovXG5cdFtrZXk6c3RyaW5nXTogYW55O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByb3RlY3RlZCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG5cdFx0cHJvdGVjdGVkIG5nQ29udHJvbDogTmdDb250cm9sLFxuXHRcdHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLFxuXHRcdHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXJcblx0KSB7fVxuXG5cdGdldCBjb250cm9sKCk6IEZvcm1Db250cm9sIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5mb3JtRGlyZWN0aXZlLmdldENvbnRyb2wodGhpcy5uZ0NvbnRyb2wpIDogbnVsbDtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHQvKiogV2UgY2Fubm90IGluaXRpYWxpemUgdGhlIGZsYXRwaWNrciBpbnN0YW5jZSBpbiBuZ09uSW5pdCgpOyBpdCB3aWxsXG5cdFx0XHRyYW5kb21pemUgdGhlIGRhdGUgd2hlbiB0aGUgZm9ybSBjb250cm9sIGluaXRpYWxpemVzLiAqL1xuXHRcdGxldCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cblx0XHRpZiAodHlwZW9mIG5hdGl2ZUVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IG5hdGl2ZUVsZW1lbnQgPT09IG51bGwpIHtcblx0XHRcdHRocm93ICdFcnJvcjogaW52YWxpZCBpbnB1dCBlbGVtZW50IHNwZWNpZmllZCc7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyT3B0aW9ucy53cmFwKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUoIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGF0YS1pbnB1dCcsICcnICk7XG5cdFx0XHRuYXRpdmVFbGVtZW50ID0gbmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHRoaXMuZmxhdHBpY2tyID0gPEZsYXRwaWNrckluc3RhbmNlPm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xuXHRcdGlmKCB0aGlzLmZsYXRwaWNrclxuXHRcdFx0JiYgdGhpcy5mbGF0cGlja3JBbHRJbnB1dFxuXHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApIFxuXHRcdFx0JiYgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApIHtcblx0XHRcdFx0dGhpcy5mbGF0cGlja3IuYWx0SW5wdXQuc2V0QXR0cmlidXRlKCAncGxhY2Vob2xkZXInLCBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICk7XG5cdFx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5mbGF0cGlja3IpIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyLmRlc3Ryb3koKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5mb3JtQ29udHJvbExpc3RlbmVyKSB7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIudW5zdWJzY3JpYmUoKTtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25DbG9zZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmZsYXRwaWNrck9uT3BlbiA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmdsb2JhbE9uQ2hhbmdlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2hhbmdlO1xuXHRcdHRoaXMuZ2xvYmFsT25DbG9zZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNsb3NlO1xuXHRcdHRoaXMuZ2xvYmFsT25PcGVuID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uT3Blbjtcblx0XHR0aGlzLmdsb2JhbE9uUmVhZHkgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25SZWFkeTtcblxuXHRcdHRoaXMuZmxhdHBpY2tyT3B0aW9ucyA9IHtcblx0XHRcdGFsdEZvcm1hdDogdGhpcy5nZXRPcHRpb24oJ2FsdEZvcm1hdCcpLFxuXHRcdFx0YWx0SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dCcpLFxuXHRcdFx0YWx0SW5wdXRDbGFzczogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0Q2xhc3MnKSxcblx0XHRcdGFsbG93SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbGxvd0lucHV0JyksXG5cdFx0XHRhcHBlbmRUbzogdGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJyksXG5cdFx0XHRjbGlja09wZW5zOiB0aGlzLmdldE9wdGlvbignY2xpY2tPcGVucycsIHRydWUpLFxuXHRcdFx0ZGF0ZUZvcm1hdDogdGhpcy5nZXRPcHRpb24oJ2RhdGVGb3JtYXQnKSxcblx0XHRcdGRlZmF1bHREYXRlOiB0aGlzLmdldE9wdGlvbignZGVmYXVsdERhdGUnKSxcblx0XHRcdGRpc2FibGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlJyksXG5cdFx0XHRkaXNhYmxlTW9iaWxlOiB0aGlzLmdldE9wdGlvbignZGlzYWJsZU1vYmlsZScpLFxuXHRcdFx0ZW5hYmxlOiB0aGlzLmdldE9wdGlvbignZW5hYmxlJyksXG5cdFx0XHRlbmFibGVUaW1lOiB0aGlzLmdldE9wdGlvbignZW5hYmxlVGltZScpLFxuXHRcdFx0ZW5hYmxlU2Vjb25kczogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZVNlY29uZHMnKSxcblx0XHRcdGhvdXJJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdob3VySW5jcmVtZW50JyksXG5cdFx0XHRpbmxpbmU6IHRoaXMuZ2V0T3B0aW9uKCdpbmxpbmUnKSxcblx0XHRcdGxvY2FsZTogdGhpcy5nZXRPcHRpb24oJ2xvY2FsZScpLFxuXHRcdFx0bWF4RGF0ZTogdGhpcy5nZXRPcHRpb24oJ21heERhdGUnKSxcblx0XHRcdG1pbkRhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtaW5EYXRlJyksXG5cdFx0XHRtaW51dGVJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdtaW51dGVJbmNyZW1lbnQnKSxcblx0XHRcdG1vZGU6IHRoaXMuZ2V0T3B0aW9uKCdtb2RlJyksXG5cdFx0XHRuZXh0QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCduZXh0QXJyb3cnKSxcblx0XHRcdG5vQ2FsZW5kYXI6IHRoaXMuZ2V0T3B0aW9uKCdub0NhbGVuZGFyJyksXG5cdFx0XHRvbkNoYW5nZTogdGhpcy5ldmVudE9uQ2hhbmdlLmJpbmQodGhpcyksXG5cdFx0XHRvbkNsb3NlOiB0aGlzLmV2ZW50T25DbG9zZS5iaW5kKHRoaXMpLFxuXHRcdFx0b25PcGVuOiB0aGlzLmV2ZW50T25PcGVuLmJpbmQodGhpcyksXG5cdFx0XHRvblJlYWR5OiB0aGlzLmV2ZW50T25SZWFkeS5iaW5kKHRoaXMpLFxuXHRcdFx0cGFyc2VEYXRlOiB0aGlzLmdldE9wdGlvbigncGFyc2VEYXRlJyksXG5cdFx0XHRwcmV2QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCdwcmV2QXJyb3cnKSxcblx0XHRcdHNob3J0aGFuZEN1cnJlbnRNb250aDogdGhpcy5nZXRPcHRpb24oJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcpLFxuXHRcdFx0c3RhdGljOiB0aGlzLmdldE9wdGlvbignc3RhdGljJyksXG5cdFx0XHR0aW1lXzI0aHI6IHRoaXMuZ2V0T3B0aW9uKCd0aW1lXzI0aHInKSxcblx0XHRcdHV0YzogdGhpcy5nZXRPcHRpb24oJ3V0YycpLFxuXHRcdFx0d2Vla051bWJlcnM6IHRoaXMuZ2V0T3B0aW9uKCd3ZWVrTnVtYmVycycpLFxuXHRcdFx0d3JhcDogdGhpcy5nZXRPcHRpb24oJ3dyYXAnLCB0cnVlKSxcblx0XHR9O1xuXG5cdFx0Ly8gUmVtb3ZlIHVuc2V0IHByb3BlcnRpZXNcblx0XHRPYmplY3Qua2V5cyggdGhpcy5mbGF0cGlja3JPcHRpb25zICkuZm9yRWFjaCggKCBrZXk6IHN0cmluZyApID0+IHtcblx0XHRcdCh0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSAmJlxuXHRcdFx0XHRkZWxldGUgdGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV07XG5cdFx0fSApO1xuXG5cdFx0aWYgKHRoaXMuY29udHJvbCkge1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlc1xuXHRcdFx0XHQuc3Vic2NyaWJlKCAoIHZhbHVlOiBhbnkgKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCAhKCB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgKSApIHtcblx0XHRcdFx0XHRcdC8vIFF1aWV0bHkgdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBjb250cm9sIHRvIGJlIGFcblx0XHRcdFx0XHRcdC8vIERhdGUgb2JqZWN0LiBUaGlzIGF2b2lkcyBhbnkgZXh0ZXJuYWwgc3Vic2NyaWJlcnNcblx0XHRcdFx0XHRcdC8vIGZyb20gYmVpbmcgbm90aWZpZWQgYSBzZWNvbmQgdGltZSAob25jZSBmb3IgdGhlIHVzZXJcblx0XHRcdFx0XHRcdC8vIGluaXRpYXRlZCBldmVudCwgYW5kIG9uY2UgZm9yIG91ciBjb252ZXJzaW9uIHRvXG5cdFx0XHRcdFx0XHQvLyBEYXRlKCkpLlxuXHRcdFx0XHRcdFx0dGhpcy5jb250cm9sLnNldFZhbHVlKCBuZXcgRGF0ZSggJycgKyB2YWx1ZSApLCB7XG5cdFx0XHRcdFx0XHRcdG9ubHlTZWxmOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRlbWl0RXZlbnQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uQ2hhbmdlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25DaGFuZ2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2hhbmdlICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZS5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPbkNoYW5nZSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uQ2xvc2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbkNsb3NlKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbkNsb3NlICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlLmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2xvc2UgKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uT3BlbiBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uT3Blbiggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25PcGVuICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4uZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25PcGVuICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbk9wZW4oIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uUmVhZHkgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPblJlYWR5KCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPblJlYWR5ICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5LmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uUmVhZHkgKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uUmVhZHkoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3Igb3B0aW9uIHtvcHRpb259LCBvciB7ZGVmYXVsdFZhbHVlfSBpZiBpdFxuXHQgKiBkb2Vzbid0IGV4aXN0LlxuXHQgKi9cblx0cHJvdGVjdGVkIGdldE9wdGlvbiggb3B0aW9uOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSApOiBhbnkge1xuXHRcdGxldCBsb2NhbE5hbWUgPSAnZmxhdHBpY2tyJyArIG9wdGlvbi5zdWJzdHJpbmcoIDAsIDEgKS50b1VwcGVyQ2FzZSgpXG5cdFx0XHQrIG9wdGlvbi5zdWJzdHJpbmcoIDEgKTtcblxuXHRcdGlmICggdHlwZW9mIHRoaXNbbG9jYWxOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tsb2NhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5mbGF0cGlja3JPcHRpb25zW29wdGlvbl07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG59XG4iXX0=