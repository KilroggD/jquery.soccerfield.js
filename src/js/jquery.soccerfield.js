/* Jquery plugin for footbal field player coords
 * Author: Kilrogg Deadeye
 */

;
(function ($) {
    "use strict";
    $.soccerfield = function (container, data, options) {
        var defaults = {
            field: {
                width: "960px",
                height: "600px",
                img: 'img/soccerfield_green.png',
                startHidden: false,
                animate: false,
                fadeTime: 1000,
                autoReveal:false,
                onReveal: function () {

                }
            },
            players: {
                font_size: 16,
                reveal: true,
                sim: true,
                timeout: 1000,
                fadeTime: 1000,
                img: false,
                onReveal: function () {

                }
            }
        };
        var $container = $(container);
        $container.addClass('soccerfield-field-container');
        $container.append("<div class='soccerfield-field'></div>");
        var element = $container.find(".soccerfield-field").first();
        var $element = $(element);
        var soccerfield = this;
        soccerfield.options = {};
        soccerfield.init = function () {
            soccerfield.options = $.extend(true, defaults, options);
            soccerfield.data = data;
            var i, len = soccerfield.data.length;
            if (soccerfield.options.field.startHidden) {
                $(element).css({"display": "none"});
            }
            $(element).css({"width": soccerfield.options.field.width, "height": soccerfield.options.field.height, "position": "relative"});
            $(element).data('originalClassList', $(element).attr('class'));
            if (soccerfield.options.field.img) {
                $element.append('<img class="soccerfield-field-field-img" src="' + soccerfield.options.field.img + '" />');
            }
            //loop through players
            for (i = 0; i < len; i++) {
                if (data[i]["name"] && data[i]["position"]) {
                    appendPlayer(data[i], i);
                }
            }
            if(soccerfield.options.field.autoReveal) {
                soccerfield.revealField();
            }
        };
        soccerfield.destroy = function () {
            $container.removeData("soccerfield");
            $container.empty();
        };
        var onAnimationEnd = function () {
            soccerfield.options.field.onReveal();
            soccerfield.revealPlayers();
        };
        //append player element to the field
        var appendPlayer = function (player, i) {
            var name = player.name, pos, posX, posY, $container = $("<div class='soccerfield-player' id='soccerfield-player-" + i + "'></div>");
            var img = player.img || soccerfield.options.players.img;			
            pos = player.position.split("_");
            if (soccerfield.options.players.reveal) {
                $container.css({"display": "none"});
            }
            $container.addClass("posY-" + pos[0]);
            $container.addClass("posX-" + pos[1]);
            if (img) {
                $container.append("<div style='left:-"+soccerfield.options.players.font_size+"px' class='soccerfield-player-img'><img src='" + img + "'/></div>");
            }
            $container.append("<span class='soccerfield-player-name' style='font-size:" + soccerfield.options.players.font_size + "px"+";min-height:"+ soccerfield.options.players.font_size*2.25 + "px"+"'>" + name + "</span>");
            $element.append($container);
        };

        //reveal Field with or without animation
        soccerfield.revealField = function () {
            if (!soccerfield.options.field.animate) {
                $(element).show();
                onAnimationEnd();
            } else {
                //console.log('animate reveal!');
                $element.fadeIn(soccerfield.options.field.fadeTime, function () {
                    onAnimationEnd();
                });
            }
        };
        //private function to reveal players
        soccerfield.revealPlayers = function () {

            if (soccerfield.options.players.sim) {
                //reveal simultaneously
                $(".soccerfield-player").fadeIn(soccerfield.options.players.fadeTime, function () {
                    setTimeout(function () {
                        soccerfield.options.players.onReveal();
                    }, soccerfield.options.players.fadeTime);
                });
            } else {
                var $playerDivs = $element.find(".soccerfield-player"), i = 1, c = 0, timeout = soccerfield.options.players.timeout;
                //reveal one by one
                $playerDivs.each(function () {
                    $(this).delay(timeout * i).fadeIn(soccerfield.options.players.fadeTime, function () {
                        c++;
                        if (c === soccerfield.data.length) {
                            setTimeout(function () {
                                soccerfield.options.players.onReveal();
                            }, soccerfield.options.players.fadeTime);
                        }
                    });
                    i++;
                    return true;
                });
            }
        };

        soccerfield.init();
    };
    // add the plugin to the jQuery.fn object
    $.fn.soccerfield = function (data, options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function () {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('pluginName')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var soccerfield = new $.soccerfield(this, data, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('soccerfield', soccerfield);

            }

        });

    };



})(jQuery);
