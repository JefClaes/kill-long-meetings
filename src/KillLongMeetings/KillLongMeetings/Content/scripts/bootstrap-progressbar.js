!function ($) {

	var ProgressBar = function (element, options) {
		this.element = $(element);
		this.progress = 0;
		this.intervalId = undefined;
		this.isRunning = false;

		var hasOptions = typeof options == 'object';

		this.warningMarker = $.fn.progressbar.defaults.warningMarker;
		if (hasOptions && typeof options.warningMarker == 'number') {
			this.warningMarker = options.warningMarker;
		}

		this.dangerMarker = $.fn.progressbar.defaults.dangerMarker;
		if (hasOptions && typeof options.dangerMarker == 'number') {
			this.dangerMarker = options.dangerMarker;
		}
		
		if (this.warningMarker > this.dangerMarker) {
			this.warningMarker = this.dangerMarker;
		}

		this.interval = $.fn.progressbar.defaults.interval;
		if (hasOptions && typeof options.interval == 'number') {
			this.interval = options.interval;
		}

		this.maximum = $.fn.progressbar.defaults.maximum;
		if (hasOptions && typeof options.maximum == 'number') {
			this.maximum = options.maximum;
		}

		this.step = $.fn.progressbar.defaults.step;
		if (hasOptions && typeof options.step == 'number') {
			this.step = options.step;
		}

		this.element.html($(DRPGlobal.template));
	};

	ProgressBar.prototype = {
		constructor: ProgressBar,

		start: function () {
			if (this.isRunning) return;
			this.isRunning = true;

			var self = this;
			this.intervalId = setInterval(
				function () {
					self.progress += self.step;
					self._setProgress();
					if (self.progress >= self.maximum) {
						self.progress = 0;
						window.clearInterval(self.intervalId);
						self.intervalId = undefined;
					}
				}, this.interval);
		},

		reset: function () {
			if (!this.isRunning) return;
			this.isRunning = false;

			window.clearInterval(this.intervalId);
			this.intervalId = undefined;
			this.progress = 0;
			this.element.find('.bar-success').css('width', '0%');
			this.element.find('.bar-warning').css('width', '0%');
			this.element.find('.bar-danger').css('width', '0%');
		},

		setMaximum: function (maximum) {
		    this.maximum = maximum;
		},

		_setProgress: function () {
		    var percent = Math.ceil((this.progress / this.maximum) * 100);

		    this.element.trigger({
		        type: "progressChanged",
		        percent: percent
		    });

			if (percent <= this.warningMarker) {
				this.element.find('.bar-success').css('width', percent + "%");
				return;
			}
			if (percent > this.warningMarker && percent <= this.dangerMarker) {
				this.element.find('.bar-warning').css('width', (percent - this.warningMarker) + "%");
				return;
			}
			this.element.find('.bar-danger').css('width', (percent - this.dangerMarker) + "%");
		}
	};

	$.fn.progressbar = function (option) {
	    var args = Array.apply(null, arguments);
	    args.shift();
	    return this.each(function () {
	        var $this = $(this),
				data = $this.data('progressbar'),
				options = typeof option == 'object' && option;

	        if (!data) {
	            $this.data('progressbar', new ProgressBar(this, $.extend({}, $.fn.progressbar().defaults, options)));
	        }
	        if (typeof option == 'string' && typeof data[option] == 'function') {
	            data[option].apply(data, args);
	        }
	    });
	}

	$.fn.progressbar.defaults = {
		warningMarker: 50,
		dangerMarker: 90,
		interval: 1000,
		maximum: 100,
		step: 1
	};

	$.fn.progressbar.Constructor = ProgressBar;

	var DRPGlobal = {};

	DRPGlobal.template = '<div class="progress">' +
						 '<div class="bar bar-success" style="width: 0%;"></div>' +
						 '<div class="bar bar-warning" style="width: 0%;"></div>' +
						 '<div class="bar bar-danger" style="width: 0%;"></div>' +
						 '</div>';

} (window.jQuery);