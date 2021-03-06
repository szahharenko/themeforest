

/**
 * Redux Metaboxes
 * Dependencies      : jquery
 * Created by        : Dovy Paukstys
 * Date              : 19 Feb. 2014
 */

/* global reduxMetaboxes, redux */

jQuery(function($) {

	"use strict";

	$.reduxMetaBoxes = $.reduxMetaBoxes || {};

	$(document).ready(function () {
		$.reduxMetaBoxes.init();
		jQuery( '#wp-admin-bar-_options a.ab-item' ).unbind();
	});

	$.reduxMetaBoxes.init = function(){
		$.reduxMetaBoxes.notLoaded = true;
		$.reduxMetaBoxes.checkBoxVisibility();

		$('.redux-container').each(function() {
			$(this).parents('.postbox:first').find('h3.hndle').addClass('redux-hndle');
			$(this).parents('.postbox:first').addClass('redux-metabox');
			$(this).parents('.postbox:first').addClass( 'redux-' + redux.args.opt_name );
			if ( redux.args.container_class !== "" ) {
				$(this).parents('.postbox:first').addClass( redux.args.class );
			}
		});
		$('#page_template').change(function() {
			$.reduxMetaBoxes.checkBoxVisibility('page_template');
		});
		$('input[name="post_format"]:radio').change(function() {
			$.reduxMetaBoxes.checkBoxVisibility('post_format');
		});

		$.redux.initFields();
	};

	$('#publishing-action .button, #save-action .button').click(function() {
		window.onbeforeunload = null;
	});

	var testValue;

	$.reduxMetaBoxes.checkBoxVisibility = function(fieldID) {
		if (reduxMetaboxes.length !== 0) {
			$.each(reduxMetaboxes, function(box, values) {

				$.each(values, function(field, v) {
					if (field === fieldID || !fieldID) {
						if (field === "post_format") {
							testValue = $("input:radio[name='post_format']:checked").val();
						} else {
							testValue = $('#'+field).val();
						}
						if (testValue) {
							var visible = false;
							$.each(v, function(key, val) {

								// console.log(val);
								if (val === testValue) {
									visible = true;
								}
							});
							if (!visible && !$.reduxMetaBoxes.notLoaded) {
								$('#'+box).hide();

							}
							else if (!visible) {
								$('#'+box).fadeOut('50');

							} else {
								$('#'+box).fadeIn('300');

								$.redux.initFields();
							}
						}
					}
				});
			});
		}
	};
	
	$('.reset-this-field + fieldset').each(function() {
		if ( !$(this).hasClass('redux-container-section') ) {
			$(this).append('<div class="pull-right metaboxes-default button-reset button button-small" title="Click to reset this value to default"><i class="el el-remove"></i></div>');
				// console.log($('.button-reset'));
				// i++;
				// console.log(i);
                    // $( '.button-reset' ).qtip(
                    //     {
                    //         content: {
                    //             text: 'test',
                    //             title: 'test2',
                    //         },
                          
                    //     }
                    // );

			$(this).find('.metaboxes-default').bind('click', function(){
				console.log('click reset');
				var fieldId = $(this).parent().data('id');
				$(this).parent().find('input, textarea, select').prop('disabled', true);
				// $('.redux-notices').append('<div class="redux-save-warn notice-yellow reset-warn"><strong>You need to save changes to see default values.</strong></div>');
				$('.redux-notices .redux-save-warn').slideDown();
				$(this).parent().css('position', 'relative').append('<div class="metabox-block redux-reset-message"><span>Save your changes to reset this value <span class="cancel-remove-metabox button button-small pull-right">Cancel</span> <input type="hidden" value="'+fieldId+'" name="remove_redux['+fieldId+'] id="remove_'+fieldId+'"/></span></div>');
			});
			var el = this;
			$(this).on('click', '.cancel-remove-metabox', function(){
				$(el).find('.metabox-block').remove();
				$(el).find('input, textarea, select').prop('disabled', false);
			});
		}
	});

	// $('.redux_metabox_panel').each(function() {
	// 	console.log('reset section');
	// 	$(this).prepend('<div class="pull-right metaboxes-section-default button button-small">Reset Section</div>');

	// 	var metabox = $(this);

	// 	$(this).find('.metaboxes-section-default').bind('click', function() {
	// 		console.log('reset section click');
	// 		metabox.find('.metaboxes-default').each(function (index, element) {
	// 			var fieldId = $(this).parent().data('id');
	// 			$(this).parent().find('input, textarea, select').prop('disabled', true);
	// 			$('.redux-notices .redux-save-warn').slideDown();
	// 			$(this).parent().css('position', 'relative').append('<div class="metabox-block redux-reset-message"><span>Save your changes to reset this value <span class="cancel-remove-metabox button button-small pull-right">Cancel</span> <input type="hidden" value="'+fieldId+'" name="remove_redux['+fieldId+'] id="remove_'+fieldId+'"/></span></div>');

	// 			var el = this;
	// 			$(this).on('click', '.cancel-remove-metabox', function() {
	// 				$(el).find('.metabox-block').remove();
	// 				$(el).find('input, textarea, select').prop('disabled', false);
	// 			});
	// 		});
	// 	});
	// });
});
