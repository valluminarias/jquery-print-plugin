/**
 * @author Val Luminarias <vluminarias@yahoo.com>
 */

(function($) {
    $.fn.printThis = function(options) {

        // Defaults for the plugin
        var settings = $.extend({}, {
            title: 'New Document', // Title of the print Document
            styles: null, // stylesheets links
            exclude: null, // elements to be excluded
            include: null // hidden elements to be included
        }, options || {});

        // Initializing the new window for print document
        var print_window = window.open('',
            settings.title,
            'height=800,width=1020,scrollbars=yes'
        );

        print_window.document.write('<html><head>');
        print_window.document.write('<title>' + settings.title + '</title>');

        // Cloning the data/object make sure we are not
        // going to make changes to the original data/object
        var html = this.clone();
        
        // Adding the stylesheets
        if(settings.styles) {
            if($.isArray(settings.styles)) {
                $.each(settings.styles, function(i, val) {
                    var elem = print_window.document.createElement('link');
                    elem.rel = 'stylesheet';
                    elem.href = val;
                    $(print_window.document).find('head').append(elem);
                })
            } else {
                var elem = print_window.document.createElement('link');
                elem.rel = 'stylesheet';
                elem.href = settings.styles;
                $(print_window.document).find('head').append(elem);
            }
        }
        print_window.document.write('</head><body>');

        // Getting rid of the excluded contents
        if(settings.exclude) {
            if($.isArray(settings.exclude)) {
                $.each(settings.exclude, function(i, val) {
                   $(html).find(val).remove();
                });
            } else {
                $(html).find(settings.exclude).remove();
            }
        }

        // Making included contents visible
        if(settings.include) {
            if($.isArray(settings.include)) {
                $.each(settings.include, function(i, val) {
                   $(html).find(val).show();
                });
            } else {
                $(html).find(settings.include).show();
            }
        }

        // Appending all the settings to the print window
        $(print_window.document.body).append(html);
        print_window.document.write('</body></html>');
        print_window.document.close();
        print_window.focus();

        // Printing the new document
        print_window.print();
    }
}(jQuery));
