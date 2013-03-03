(function($) {
$.extend($.validator.prototype, {
    showLabel: function(element, message) {
        var label = this.errorsFor( element );
        if (label.length == 0) {
            var railsGenerated = $(element).next('span.help-inline');
            if (railsGenerated.length) {
                railsGenerated.attr('for', this.idOrName(element))
                railsGenerated.attr('generated', 'true');
                label = railsGenerated;
            }
        }
        if (label.length) {
            label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
            label.attr('generated') && label.html(message);
        } else {
            label = $('<' + this.settings.errorElement + '/>')
                  .attr({'for':  this.idOrName(element), generated: true})
                  .addClass(this.settings.errorClass)
                  .addClass('help-inline')
                  .html(message || '');
            if (this.settings.wrapper) {
                label = label.hide().show().wrap('<' + this.settings.wrapper + '/>').parent();
            }
            if (!this.labelContainer.append(label).length) {
                this.settings.errorPlacement
                    ? this.settings.errorPlacement(label, $(element))
                    : label.insertAfter(element);
            }
        }
        if (!message && this.settings.success) {
            label.text('');
            typeof this.settings.success == 'string'
                ? label.addClass(this.settings.success)
                : this.settings.success(label);
        }
        this.toShow = this.toShow.add(label);
    }
});
$.extend($.validator.defaults, {
    errorClass: 'error',
    validClass: 'success',
    errorElement: 'span',
    highlight: function (element, errorClass, validClass) {
      $(element).closest('div.control-group').removeClass(validClass).addClass(errorClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).closest('div.control-group').removeClass(errorClass).addClass(validClass);
      $(element).next('span.help-inline').text('');
    },
    errorPlacement: function(error, element) {
      $(element).parents('div.controls').append(error);
    },
});
}(jQuery));